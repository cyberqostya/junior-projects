
// Объявление классов

class Buttons {
  constructor(container) {
    this.container = container;
  }
}



class Popup {
  constructor(popup) {
    this.popup = popup;
  }

  open() {
    this.popup.classList.add('popup_active');
  }

  close() {
    this.popup.classList.remove('popup_active');
  }
}



class PopupWindow {
  constructor(windowClass, blocksToHide, blocksToShow, mobileBlocks) {
    this.windowClass = windowClass;
    this.window = document.querySelector(`.${windowClass}`);
    this.blocksToHide = blocksToHide;
    this.blocksToShow = blocksToShow;
    this.mobileBlocks = mobileBlocks;
  }

  open() {
    this.window.classList.add(`${this.windowClass}-active`);
    this.mobileBlocks.forEach((item) => {
      if (item.classList.contains('main') && window.innerWidth > 768) {
        
      } else {
        item.style = 'display: none';
      }
    });
  }

  close() {
    this.window.classList.remove(`${this.windowClass}-active`);
    this.mobileBlocks.forEach((item) => {item.removeAttribute('style')});
  }

  hideBlocks() {
    this.blocksToHide.forEach((item) => {
      item.style = 'display: none';
    });
  }

  toThank() {
    this.hideBlocks();

    this.blocksToShow.forEach((item) => {
      item.style = 'display: block';
    })
  }

  closeThank() {
    this.blocksToHide.forEach((item) => {
      item.removeAttribute('style');
    });

    this.blocksToShow.forEach((item) => {
      item.removeAttribute('style');
    })
  }
}



class Slider {
  constructor(container) {
    this.container = container;
    this.positionPercent = 0;
    this.positionPixels = 0;
    this.stepPercent = 100;
    this.stepPixels = 80;
  }

  moveRight() {
    this.positionPercent -= this.stepPercent;
    this.positionPixels -= this.stepPixels;
    this.container.style = `left: calc(${this.positionPercent}% + ${this.positionPixels}px)`;
  }

  moveLeft() {
    this.positionPercent += this.stepPercent;
    this.positionPixels += this.stepPixels;
    this.container.style = `left: calc(${this.positionPercent}% + ${this.positionPixels}px)`;
  }
}


class Claim {
  constructor(container) {
    this.container = container;
    this.data = [
      {name: 'price', title: 'Есть хорошая новость — сейчас цены низкие. Плохая — они растут каждый месяц.', text: 'Если вы уже участвовали в любой конференции JUG Ru Group, у вас есть скидка на Personal-билет. Оставьте свой имейл, мы проверим факт участия и пришлем промокод.', buttonText: 'Проверить'},
      {name: 'report', title: 'Хм… а какие темы и каких спикеров вы бы хотели видеть в программе?', text: 'Расскажите подробнее, пожалуйста. Оставьте свой имейл, мы пришлём вам форму для отзыва о докладах.', buttonText: 'Отправить'},
      {name: 'mood', title: 'Спасибо!  Всё в порядке!', text: 'Чтобы оставаться в курсе наших дел — читайте блог на Хабре, телеграм-канал @23derevo и подписывайтесь на наши рассылки.', buttonText: 'Подписаться'},
      {name: 'nomoney', title: 'Благодарим за поддержку!', text: 'Если вы уже участвовали в любой конференции JUG Ru Group, у вас есть скидка на Personal-билет. Оставьте свой имейл, мы проверим факт участия и дадим промокод.', buttonText: 'Проверить'},

    ]
  }

  createBlock(str) {
    const choosenObj = this.data.find((item) => {return item.name === str});

    const templ = `
      <p class="claim-block__title">${choosenObj.title}</p>
      <div class="claim-block__line"></div>
      <p class="claim-block__text">${choosenObj.text}</p>

      <form class="popup__form popup__form_claim" name="claimForm">
        <input class="popup__form-input popup__form-input_claim" type="email" placeholder="Укажите email" required name="input"></input>
        <button class="popup__form-button popup__form-button_claim">${choosenObj.buttonText}</button>
      </form>
      <p class="popup__personal popup__personal_claim">Нажимая на кнопку вы соглашаетесь на обработку <a class="popup__personal-link popup__personal-link_claim" href="#">персональных данных</a></p>

      <p class="popup__thankyou-for-buy popup__thankyou-for-buy_claim">Спасибо, что подписались на нашу рассылку!</p>
    `
    this.container.insertAdjacentHTML('afterbegin', templ);
  }

  removeBlock() {
    this.container.innerHTML = '';
  }

  renderSomeBlocks() {
    this.container.removeChild(this.container.querySelector('.popup__form'));
    this.container.removeChild(this.container.querySelector('.popup__personal'));
    this.container.querySelector('.popup__thankyou-for-buy').style = 'display: block';
  }
}



// Объявление переменных

const buyForm = document.forms.buyForm;
const mobileBlocks = [
  document.querySelector('.main'),
  document.querySelector('.ticket'),
  document.querySelector('.events'),
  document.querySelector('.tariffs'),
  document.querySelector('.videos'),
  document.querySelector('.for-what'),
  document.querySelector('.reviews'),
  document.querySelector('.about'),
];

const buttons = new Buttons(document.querySelector('.main__buttons-container'));
const popup = new Popup(document.querySelector('.popup'));

const buyWindow = new PopupWindow(
  'popup__window-shell_buy', 
  [
    buyForm, document.querySelector('.popup__personal')
  ],
  [
    document.querySelector('.popup__thankyou-for-buy')
  ],
  mobileBlocks,
);

const sendWindow = new PopupWindow(
  'popup__window-shell_send', 
  [
    document.querySelector('.popup__title_send'), 
    document.querySelector('.popup__claims-container')
  ], 
  [
    document.querySelector('.popup__thankyou-for-send-image'), 
    document.querySelector('.popup__thankyou-for-send')
  ],
  mobileBlocks,
);

const slider = new Slider(document.querySelector('.reviews__slider'));

const claim = new Claim(document.querySelector('.claim-block'));



// Непостредственно работа

buttons.container.addEventListener('click', (event) => {
  if (event.target.classList.contains('main__button_buy')) {
    popup.open();
    buyWindow.open(); 
  } else if (event.target.classList.contains('main__button_send')) {
    popup.open();
    sendWindow.open();
  } 
});

document.querySelectorAll('.popup__exit').forEach((item) => {
  item.addEventListener('click', () => {
    popup.close();
    buyWindow.close();
    buyWindow.closeThank();
    buyForm.elements.input.value = '';
    
    sendWindow.close();
    sendWindow.closeThank();

    claim.removeBlock();
  });
});

buyForm.addEventListener('submit', (event) => {
  event.preventDefault();
  buyWindow.toThank();
});

document.querySelector('.popup__claims-container').addEventListener('click', (event) => {
  if (window.innerWidth > 768) {
    sendWindow.toThank();
  } else {
    if (event.target.classList.contains('popup__claim')) {
      sendWindow.hideBlocks();
      claim.createBlock(Array.from(event.target.classList).find((item) => {return item.match(/js-.+/)}).substr(3));
      document.forms.claimForm.addEventListener('submit', function tracking(event) {
        event.preventDefault();
        document.forms.claimForm.removeEventListener('submit', tracking);
        claim.renderSomeBlocks();
      });
    }
  }
});

document.querySelector('.reviews').addEventListener('click', (event) => {
  if (event.target.classList.contains('reviews__arrow_right')) {
    slider.moveRight();
  } else if (event.target.classList.contains('reviews__arrow_left')) {
    slider.moveLeft();
  }
});



