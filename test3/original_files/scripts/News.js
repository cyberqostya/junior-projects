export default class News {
  constructor() {
    this.block;
  }

  createBlock(data) {
    // Создание элементов и наполнение их содежимым
      // Родительский контейнер
    const news = document.createElement('li');
    news.classList.add('news');
    data.read ? this.addRead(news) : '';

      // Ссылка
    const newsLink = document.createElement('a');
    newsLink.classList.add('news__link');
    newsLink.setAttribute('href', data.link);
    newsLink.setAttribute('target', '__blank');

      // Заголовок
    const newsTitle = document.createElement('h3');
    newsTitle.classList.add('news__title');
    newsTitle.textContent = data.title;

      // Текст
    const newsText = document.createElement('p');
    newsText.classList.add('news__text');
    newsText.textContent = data.text;

      // Контейнер для Автора и Даты
    const newsAboutContainer = document.createElement('div');
    newsAboutContainer.classList.add('news__about-container');

      // Автор
    const newsAuthor = document.createElement('p');
    newsAuthor.classList.add('news__author');
    newsAuthor.textContent = data.author;

      // Дата
    const newsDate = document.createElement('p');
    newsDate.classList.add('news__date');
    newsDate.textContent = data.date;


    // Создание дерева элементов (помещение друг в друга)
    newsLink.appendChild(newsTitle);
    newsLink.appendChild(newsText);

    newsAboutContainer.appendChild(newsDate);
    newsAboutContainer.appendChild(newsAuthor);

    newsLink.appendChild(newsAboutContainer);

    news.append(newsLink);


    // Запись готового блока в this для доступа извне
    this.block = news;
  }

  addRead(element) {
    element.classList.add('news_read');
  }
}