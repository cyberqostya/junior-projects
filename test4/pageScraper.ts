import { convertDate } from './helpers.js';
import { loginData } from './login.js';

interface Ads {
  title?: string,
  description: string,
  url?: string,
  price?: number,
  author: string,
  date: string,
  phone: string
}

export async function pageScraper(browser): Promise<Ads[]> {
  let page = await browser.newPage();
  console.log(`Перехожу на страницу ${loginData.parsingUrl}...`);
  await page.goto(loginData.parsingUrl, {
    waitUntil: 'load',
    timeout: 0,
  });

  // Первый парсинг с разводящей страницы
  // Построен основной костяк выдачи результатов
  const data = await page.evaluate((): Ads[] => {
    const ads: Ads[] = [];
    document.querySelectorAll('[data-marker="item"]').forEach(i => {
      ads.push({
        title: i.querySelector('[itemprop="name"]').textContent,
        description: '',
        url: 'https://www.avito.ru' + i.querySelector('[itemprop="url"]').getAttribute('href'),
        price: i.querySelector('[itemprop="price"]') ? Number(i.querySelector('[itemprop="price"]').getAttribute('content')) : NaN,
        author: '', // i.querySelector('[class*="iva-item-userInfoStep"] [class*="style-title"]').textContent,
        date: '',
        phone: ''
      });
    });
    return ads;
  });
  
  // Подготовка ко второму заходу
  // Парсинг с внутренних страниц товаров
  async function getFullData(i) {
    let newPage = await browser.newPage();
    await newPage.goto(i.url, {
      waitUntil: 'load',
      timeout: 0,
    });

    const additionalProps = await newPage.evaluate((): Ads => {
      const additionalProps: Ads = {
        description: '',
        author: '',
        date: '',
        phone: ''
      };

      const phone = document.querySelector('[class*="button-textBox"] [class*="text-text"]');
      const description = document.querySelector('[itemprop="description"] p');

      additionalProps.description = description ? description.textContent.trim() : 'Данные не указаны';
      additionalProps.date = document.querySelector('.title-info-metadata-item-redesign').textContent.trim();
      additionalProps.author = document.querySelector('[data-marker="seller-info/label"]').textContent.trim();
      additionalProps.phone = phone ? phone.textContent : 'Данные не указаны';

      return additionalProps;
    });

        // Попытка узнать телефон при залогиненом пользователе
        // await newPage.evaluate(()=>{
        //   const phoneBtn = document.querySelector('[data-marker="item-phone-button/card"]');
        //   phoneBtn.dispatchEvent(new Event('click', {bubbles: true}));
        // });

        // Взятие картинки телефона в виде data:image/png для дальнейшего преобразования
        // additionalProps.phone = await newPage.evaluate(() => {
        //   let phone;
        //   const phoneBtn = document.querySelector('[data-marker="item-phone-button/card"]');
        //   if(phoneBtn !== null) {
        //     phone = phoneBtn.querySelector('img').getAttribute('src');
        //   } else {
        //     phone = 'Данные не указаны';
        //   }
        //   return phone;
        // });
    
    await newPage.close();
    return additionalProps;
  }

  for (let i = 0; i < data.length; i++) {
    const additionalProps = await getFullData(data[i]);
    additionalProps.date = convertDate(additionalProps.date); // Преобразование строк (Сегодня в 18:30 или Вчера в 10:00 или 23 марта в 3:14) в формат ISO-8601
    data[i] = { ...data[i], ...additionalProps }
  }

  return data;
}