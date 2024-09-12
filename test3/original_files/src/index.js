import './index.css';
import Widget from '../scripts/Widget';
import News from '../scripts/News';
import dataWithoutServer from '../scripts/dataWithoutServer';

const root = document.querySelector('.root');
const widget = new Widget();
const news = new News();
let data; // Сюда придут данные с сервера или с локального файла (при неисправности сервера)

// Функция вычленяет количество непрочитанных новостей из данных
function countUnreadNews(data) {
  let counter = 0;
  data.forEach((element) => {
    !element.read ? counter++ : '';
  });
  return counter;
}


fetch('http://localhost:3000')
  .then(res => res.json())
  .then(res => {
    data = res;
  })
  .catch(err => {
    // Если сервер не подключен, то данные придут с другого файла
    console.log(err);
    data = dataWithoutServer;
  })
  .finally(() => {
    widget.createBlock(); // Создание блока виджета
    for (let element of data) {
      news.createBlock(element);  // Исходя из пришедших с сервера данных происходит создание
      widget.addNews(news.block); // блока новостей и псоледующее его добавление в виджет (одно за другим)
    }
    widget.setCountUnreadNews(countUnreadNews(data)); // Данные о статьях просматриваются и из них высчитывается количество непрочитанных
    root.appendChild(widget.block);

    // Обработчик событий клика на виджет (делегирование)
    widget.block.addEventListener('click', (event) => {

      // Клик совершен по хедеру - разверни/сверни блок
      if (event.target.closest('.widget__header') || event.target.classList.contains('widget__header')) {
        widget.newsContainer.classList.toggle('widget__news-container_opened');
      } 
        // Клик совершен по какой-либо новости
        else {      
        const link = event.path.find((element) => {return element.classList.contains('news')}); // Событие произошло на элементе с ссылкой?
        if (!link.classList.contains('news_read')) {  // И она является непрочитанной
          news.addRead(link);
          widget.decreaseCountUnreadNews();
        }
      }
    });
  });