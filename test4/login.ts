export const loginData: { [prop: string]: string } = {
  login: 'какой-то логин',
  password: 'какой-то пароль',
  parsingUrl: 'https://www.avito.ru/sankt-peterburg/koshki/poroda-meyn-kun-ASgBAgICAUSoA5IV',
  loginUrl: 'https://www.avito.ru/#login?authsrc=h',
}

export async function login(browser):Promise<void> {
  let page = await browser.newPage();

  console.log(`Перехожу на страницу ${loginData.loginUrl}...`);
  await page.goto(loginData.loginUrl, {
    waitUntil: 'load',
    timeout: 0,
  });

  await page.focus('input[data-marker="login-form/login"]');
  await page.keyboard.type(loginData.login, { delay: 500 }); // Псевдо имитация человеческого ввода
  await page.focus('input[data-marker="login-form/password"]');
  await page.keyboard.type(loginData.password, { delay: 500 });
  await page.click('[class*="auth-form-auth-form__submit"] button[type="submit"]');
  await new Promise(resolve => setTimeout(resolve, 5000));

}