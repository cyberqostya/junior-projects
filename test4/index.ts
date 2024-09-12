import { startBrowser } from './browser.js';
import pageController from './pageController.js';

// Запуск экземпляра браузера
let browserInstance = startBrowser();

// Передача экземпляра браузера скраперу
pageController(browserInstance);


