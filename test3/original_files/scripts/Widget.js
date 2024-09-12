export default class Widget {
  constructor() {
    this.block;
    this.newsContainer;
    this.headerCountUnreadNews;
  }

  createBlock() {
    // Создание элементов и наполнение их содежимым
      // Родительский контейнер
    const widget = document.createElement('section');
    widget.classList.add('widget');

      // Хедер
    const widgetHeader = document.createElement('header');
    const widgetHeaderTitle = document.createElement('h2');
    const widgetHeaderCountUnreadNews = document.createElement('p');

    widgetHeader.classList.add('widget__header');
    widgetHeaderTitle.classList.add('widget__header-title');
    widgetHeaderTitle.textContent = 'Свежие новости';
    widgetHeaderCountUnreadNews.classList.add('widget__header-count-unread-news');

      // Блок с новостями
    const widgetNewsContainer = document.createElement('ul');
    widgetNewsContainer.classList.add('widget__news-container');


    // Создание дерева элементов (помещение друг в друга)
    widgetHeader.appendChild(widgetHeaderTitle);
    widgetHeader.appendChild(widgetHeaderCountUnreadNews);
    widget.appendChild(widgetHeader);
    widget.appendChild(widgetNewsContainer);


    // Запись готового блока в this для доступа извне
    this.block = widget;
    this.newsContainer = widgetNewsContainer;
    this.headerCountUnreadNews = widgetHeaderCountUnreadNews;
  }

  _createSeparator() {
    const newsSeparator = document.createElement('div');
    newsSeparator.classList.add('widget__separator');
    return newsSeparator;
  }

  addNews(news, last = false) {
    this.newsContainer.appendChild(news);

    if (!last) {
      const separator = this._createSeparator();
      this.newsContainer.appendChild(separator);
    }
  }

  setCountUnreadNews(count) {
    count === 0 ? this.headerCountUnreadNews.style.display = 'none' : this.headerCountUnreadNews.textContent = count;
  }
  decreaseCountUnreadNews() {
    this.headerCountUnreadNews.textContent = Number(this.headerCountUnreadNews.textContent) - 1;
    Number(this.headerCountUnreadNews.textContent) === 0 ? this.headerCountUnreadNews.style.display = 'none' : '';
  }
}