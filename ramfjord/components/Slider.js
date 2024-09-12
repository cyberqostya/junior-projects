class Slider {
  constructor(data) {

    // DOM Элементы
    this.sliderWindow = data.sliderWindow;
    this.sliderRoad = data.sliderRoad;
    this.slides = Array.from(data.slides);

    this.sliderDigitCounter = data.sliderDigitCounter;

    this.arrows = data.arrows;

    this.dotsContainer = data.dotsContainer;
    this.dots = [];


    this.addSliderStyles();
    // Внутренние элементы
    this.SLIDE_COUNTER = 0;
    this.SLIDE_WIDTH = this.slides[0].clientWidth;
    this.SLIDE_GAP = parseInt(getComputedStyle(this.sliderRoad).columnGap);
    this.CURSOR_COORD_ON_CLICK = 0;
    this.CORRECTION_FOR_OFFSET_FROM_LEFT_BORDER_OF_WINDOW = this.sliderWindow.getBoundingClientRect().left;
    this.ACTION_LENGTH = 0;
    this.SLIDER_POSITION_ON_LAST_SLIDE = 0;
    this.SWIPE_THRESHOLD = this.SLIDE_WIDTH / 4;


    // Начало работы
    this.sliderDigitCounter ? this.drowDigitCounter() : '';
    this.drowDots();
    this.sliderWindow.addEventListener('touchstart', this.swipeStart);
  }

  // Добавление классов слайдера для применения стилей слайдера
  addSliderStyles() {
    this.sliderWindow.classList.add('slider__outer');
    this.sliderRoad.classList.add('slider__road');
    this.slides.forEach(item => item.classList.add('slider__slide'));
  }

  // Счетчик цифровой
  drowDigitCounter() { this.sliderDigitCounter.textContent = `${this.SLIDE_COUNTER + 1}/${this.slides.length}` }

  // Стрелки
  drowArrows() {
    this.activateArrow();
    if(this.SLIDE_COUNTER === 0) { this.deactivateArrow(this.arrows.sliderLeftArrow) }
    if(this.SLIDE_COUNTER === this.slides.length - 1) { this.deactivateArrow(this.arrows.sliderRightArrow) }
  }
  activateArrow() { Object.values(this.arrows).forEach(item => item.classList.add('_active')) }
  deactivateArrow(arrow) { arrow.classList.remove('_active') }

  // Добавление счетчиков (точек) слайдов
  drowDots() {
    this.slides.forEach((item, index) => {
      const dot = document.createElement('div');
      dot.classList.add('whywe__slider-dot', 'slider__dot');
      index === 0 ? this.activateDot(dot) : '';
      this.dotsContainer.append(dot);
      this.dots.push(dot); // Теперь this.dots доступен
    });
  }
  activateDot(dot) { dot.classList.add('_active') }
  deactivateDots() { this.dots.forEach(item => item.classList.remove('_active')) }

  // Слайдер
  deactivateSlider() {
    this.sliderRoad.style.transition = 'none';
    document.documentElement.style.userSelect = 'none';
    document.documentElement.style.overflow = 'hidden';
  }
  activateSlider() {
    this.sliderRoad.style.transition = 'left .5s';
    document.documentElement.style.userSelect = 'all';
    document.documentElement.style.overflow = 'auto';
  }
  swipeStart = (e) => {
    this.CURSOR_COORD_ON_CLICK = e.touches[0].clientX - this.CORRECTION_FOR_OFFSET_FROM_LEFT_BORDER_OF_WINDOW;
    this.deactivateSlider();
    this.sliderWindow.addEventListener('touchmove', this.swipeAction);
    this.sliderWindow.addEventListener('touchend', this.swipeEnd);
  }
  swipeAction = (e) => {
    this.ACTION_LENGTH = e.touches[0].clientX - this.CORRECTION_FOR_OFFSET_FROM_LEFT_BORDER_OF_WINDOW - this.CURSOR_COORD_ON_CLICK;
    this.sliderRoad.style.left = `${this.SLIDER_POSITION_ON_LAST_SLIDE + this.ACTION_LENGTH}px`;
  }
  swipeEnd = () => {
    if (this.ACTION_LENGTH > 0 && this.ACTION_LENGTH > this.SWIPE_THRESHOLD) {
      this.SLIDE_COUNTER > 0 ? this.SLIDE_COUNTER-- : this.SLIDE_COUNTER = this.slides.length - 1;
    } else if (this.ACTION_LENGTH < 0 && this.ACTION_LENGTH < -this.SWIPE_THRESHOLD) {
      this.SLIDE_COUNTER < this.slides.length - 1 ? this.SLIDE_COUNTER++ : this.SLIDE_COUNTER = 0;
    }
    
    this.activateSlider();
    this.swipe();
    this.SLIDER_POSITION_ON_LAST_SLIDE = -this.SLIDE_COUNTER * (this.SLIDE_WIDTH + this.SLIDE_GAP);
    
    this.sliderWindow.removeEventListener('touchmove', this.swipeAction);
    this.sliderWindow.removeEventListener('touchend', this.swipeEnd);
  }
  swipe() {console.log(this.SLIDE_WIDTH)
    this.sliderRoad.style.left = `${-this.SLIDE_COUNTER * (this.SLIDE_WIDTH + this.SLIDE_GAP)}px`;
    this.sliderDigitCounter ? this.drowDigitCounter() : '';
    this.deactivateDots();
    this.activateDot( this.dots[this.SLIDE_COUNTER] );
    this.arrows ? this.drowArrows() : '';
  }

}