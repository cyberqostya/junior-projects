import puppeteer from 'puppeteer';

export async function startBrowser() {

	let browser;
	try {
    console.log("Открываю браузер...");
    browser = await puppeteer.launch({
        timeout: 0,
        headless: true, // Браузер запускается с интерфейсом при установленном false
        ignoreHTTPSErrors: true // Игнор ошибок из-за использования незащищенного протокола
    });
	} catch (err) {
    console.log("Ошибка: ", err);
	}
	return browser;
}