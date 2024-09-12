const sliders = {};
function addSlide(mobileWidth, name, data) {
  if (document.documentElement.clientWidth <= mobileWidth) {
    sliders[name] = new Slider(data);
  }
}


// Создание слайдеров
addSlide(
  995, 
  'whyweSlider', 
  {
    sliderWindow: document.querySelector('.whywe__advantages-window'),
    sliderRoad: document.querySelector('.whywe__advantages'),
    slides: document.querySelectorAll('.whywe__advantage'),
    dotsContainer: document.querySelector('.whywe__slider-dots'),
    sliderDigitCounter: document.querySelector('.whywe__slider-counter'),
    arrows: {
      sliderLeftArrow: document.querySelector('.whywe__slider-arrow_left'),
      sliderRightArrow: document.querySelector('.whywe__slider-arrow_right'),
    },
  }
);
addSlide(
  960, 
  'stagesSlider', 
  {
    sliderWindow: document.querySelector('.stages__container-window'),
    sliderRoad: document.querySelector('.stages__container'),
    slides: document.querySelectorAll('.stages__stage'),
    dotsContainer: document.querySelector('.stages__slider-dots'),
  }
);


// Форма
const feedbackForm = new End({
  end: document.querySelector('.end'),
  form: document.forms.callback,
  nameInput: document.forms.callback.elements.name,
  telInput: document.forms.callback.elements.tel,
  submitBtn: document.forms.callback.elements.submit,
  subtitle: document.querySelector('.end__subtitle'),
  success: document.querySelector('.end__success'),
  successMessageName: document.querySelector('.end__success-client-name'),
});


// Обновление для подтягивания стилей из JavaScript
// window.addEventListener('resize', () => { location.reload() });