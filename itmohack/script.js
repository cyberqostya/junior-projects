// Объявление элементов блоков

  // Хедер
const headerBlock = document.querySelector('.header');
const headerNav = headerBlock.querySelector('.header__nav');

// Intro
const introBlock = document.querySelector('.intro');
const introButton = introBlock.querySelector('.intro__button');

// About
const aboutBlock = document.querySelector('.about');
const aboutButton = aboutBlock.querySelector('.about__button');

// Participation
const participationBlock = document.querySelector('.participation');
const participationButton = participationBlock.querySelector('.participation__button');

// Timing
const timingBlock = document.querySelector('.timing');
const timingButton = timingBlock.querySelector('.timing__button');

// Hackathons
const hackathonsBlock = document.querySelector('.hackathons');

// Popup
const popupBlock = document.querySelector('.popup');
  const popupForm = popupBlock.querySelector('.popup__form');
    const popupNameField = popupForm.querySelector('.popup__field-name-js');
    const popupSurnameField = popupForm.querySelector('.popup__field-surname-js');
    const popupUploadApplication = popupForm.querySelector('.popup__upload-label-application-js');
    const popupUploadCV = popupForm.querySelector('.popup__upload-label-cv-js');
    const popupUploadVideo = popupForm.querySelector('.popup__upload-label-video-js');
    const popupButton = popupForm.querySelector('.popup__form-button');

// ==============================




// Объявление переменных
const errorMessages = {
  required: 'Обязательное поле',
  symbols: 'Использованы неподходящие символы',
  min: 'Минимальное длина - 2',
  format: 'Неправильный формат'
};

const regExSymb = /[^А-ЯЁа-яёA-Za-z\-]/;
const regExName = /^[А-ЯЁа-яё]+(\-[А-ЯЁа-яё]{2,})?$|^[A-Za-z]+(\-[A-Za-z]{2,})?$/;

let forActivationButton = {
  name: false,
  surname: false,
  application: false,
  cv: false,
  video: false,
};
// ==============================




// Функция скролла к верху элемента 
function scrollTo(element) {
  element.scrollIntoView({ behavior: 'smooth' });
}

// Функция проверка на ошибку и смена цвета границы
function changeColorBorder(text, block) {
  if (text === 'reset') {
    block.classList.remove('popup__field-input_success');
    block.classList.remove('popup__field-input_failed');
  } else
  if (text) {
    block.classList.add('popup__field-input_failed');
  } else {
    block.classList.remove('popup__field-input_failed');
    block.classList.add('popup__field-input_success');
  }
}

// Функция добавления обработчиков событий на поле ввода
function addListenerToField(field, key) {

  const fieldErrorBlock = field.querySelector('.popup__field-error');
  const fieldInputBlock = field.querySelector('.popup__field-input');

  function changeData(message, boolean) {
    fieldErrorBlock.textContent = message;
    changeColorBorder(fieldErrorBlock.textContent, fieldInputBlock);
    forActivationButton[key] = boolean;

    deActivateButton();
  }
  
  field.addEventListener('input', (evt) => {

    if (evt.target.value.length < 1) {
      changeData(errorMessages.required, false);
    } else
    if (!!evt.target.value.match(regExSymb)) {
      changeData(errorMessages.symbols, false);
    } else
    if (evt.target.value.length < 2) {
      changeData(errorMessages.min, false);
    } else
    if (!evt.target.value.match(regExName)) {
      changeData(errorMessages.format, false);
    } else {
      let text = fieldInputBlock.value;
      text = text.toLowerCase();
      text = text[0].toUpperCase() + text.slice(1);
      
      if (text.indexOf('-')) {
        text = text.slice(0, text.indexOf('-') + 1) + text[text.indexOf('-') + 1].toUpperCase() + text.slice(text.indexOf('-') + 2);
      }
      
      changeData('', true);
      fieldInputBlock.value = text;
    }
  });

  return { error: fieldErrorBlock, input: fieldInputBlock };
}
const fieldNameObject = addListenerToField(popupNameField, 'name');
const fieldSurnameObject = addListenerToField(popupSurnameField, 'surname');

// Функция добавления обработчика событий на загрузчики файлов
function addUploadListener(block, key) {
  block.addEventListener('change', function() {
    block.classList.add('popup__upload-label_success');
    this.querySelector('.popup__upload-text').textContent = this.childNodes[1].files[0].name;
    forActivationButton[key] = true;
    deActivateButton();
  });
}

// Функция очистки текстовых инпутов
function cleanInputText(fieldObject) {
  fieldObject.input.value = '';
  fieldObject.error.textContent = '';
  changeColorBorder('reset', fieldObject.input);
}

// Функция очистки загрузочных инпутов
function cleanInputFile(block, text) {
  block.querySelector('.popup__upload-input').value = '';
  block.querySelector('.popup__upload-text').textContent = text;
  block.classList.remove('popup__upload-label_success');
}

// Функция закрытия попапа
function closePopup() {
  popupBlock.style.display = 'none';
  cleanInputText(fieldNameObject);
  cleanInputText(fieldSurnameObject);

  cleanInputFile(popupUploadApplication, 'Загрузить заявку (pdf)');
  cleanInputFile(popupUploadCV, 'Загрузить резюме (pdf)');
  cleanInputFile(popupUploadVideo, 'Загрузить видео (mp4, avi, mov)');

  forActivationButton = {
    name: false,
    surname: false,
    application: false,
    cv: false,
    video: false,
  };
  deActivateButton();
  document.body.style.overflow = 'auto';
}

// Функция открытия попапа
function openPopup() {
  popupBlock.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Функция активации/деактивации кнопки формы
function deActivateButton() {
  let counter = 0;
  for (let el in forActivationButton) {
    if (!forActivationButton[el]) {
      ++counter;
      break;
    }
  }

  if (!counter) {
    popupButton.removeAttribute('disabled');
    popupButton.classList.remove('popup__form-button_disabled');
  } else {
    popupButton.setAttribute('disabled', true);
    popupButton.classList.add('popup__form-button_disabled');
  }
}
// ==============================




// Обработчик сравнивает текстконтент элемента, на который нажали, и заголовков блоков страницы
// scroll
headerNav.addEventListener('click', (e) => {
  if (e.target.classList.contains('header__list-item')) {
    for (let el of [aboutBlock, participationBlock, timingBlock, hackathonsBlock]) {
      if (el.querySelector('.block-title').textContent === e.target.textContent) {
        scrollTo(el);
        break;
      }      
    }
  }
});

// Обработчики на кнопки блоков для скролла
introButton.addEventListener('click', () => { scrollTo(aboutBlock); });
aboutButton.addEventListener('click', () => { scrollTo(participationBlock); });
participationButton.addEventListener('click', () => { scrollTo(timingBlock); });
timingButton.addEventListener('click', () => { openPopup() });

// Обработчик попапа
popupBlock.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('popup')) {
    closePopup();
  }
});

// Обработчик загрузки файлов
addUploadListener(popupUploadApplication, 'application');
addUploadListener(popupUploadCV, 'cv');
addUploadListener(popupUploadVideo, 'video');
// ================================




// DVD
const root = document.querySelector('.root');
const dvd = root.querySelector('.dvd');
const FPS = 60;

let xPosition = 1;
let yPosition = 1;
let xSpeed = 3;
let ySpeed = 3;

if (window.innerWidth < 769) {
  xSpeed = 2;
  ySpeed = 2;
}

function update() {
  dvd.style.left = xPosition + 'px';
  dvd.style.bottom = yPosition + 'px';
}

function randomColor() {
  return ('#' + Math.random().toString(16).slice(2, 8));
}

setInterval(() => {
  if(xPosition + dvd.clientWidth >= window.innerWidth || xPosition <= 0) {
    xSpeed = -xSpeed;
    dvd.querySelector('path').style.fill = randomColor();
  }
  if(yPosition + dvd.clientHeight >= root.clientHeight - headerBlock.clientHeight || yPosition <= 0 ) {
    ySpeed = -ySpeed;
    dvd.querySelector('path').style.fill = randomColor();
  }

  xPosition += xSpeed;
  yPosition += ySpeed;
  update();
}, 1000/FPS);