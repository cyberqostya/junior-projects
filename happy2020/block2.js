(function() {
const messages = [
  'А теперь к делу',
  'Мои друзья сказали, что фотка, которую я тебе сейчас покажу',
  'Поможет нам их найти',
  'Но я совсем не понимаю, что там изображено',
  'Надеюсь, что ты узнаешь это место',
  'Это должно быть недалеко',
  'Гляди:'
];

const block2 = document.querySelector('.block2');
const titleBLock = block2.querySelector('.block__title');
const blockPrompt = block2.querySelector('.block__prompt');
const blockInputs = block2.querySelector('.block__inputs');
const blockImage = block2.querySelector('.block__image');
const inputs = blockInputs.querySelectorAll('.block__input');

const block3 = document.querySelector('.block3');

let counter = 0; 


const mur = new Audio();
mur.preload = 'auto';
mur.src = './audios/catmur.mp3';
const myau = new Audio();
myau.preload = 'auto';
myau.src = './audios/catmyau.mp3';
const panter = new Audio();
panter.preload = 'auto';
panter.src = './audios/panter.mp3';




const handlerClickScreen = (event) => {

  if ( counter < messages.length ) { 

    titleBLock.style.opacity = 0;

    setTimeout(() => {
      titleBLock.innerHTML = messages[ counter ] || 'Ну я же говорил тебе не кликать так быстро( Теперь придётся перезагружаться. Надеюсь ты запомнила первый пароль';
      titleBLock.style.opacity = 1;
  
      counter++;
  
    }, 500);

  } else {

    block2.removeEventListener('click', handlerClickScreen);

    panter.play();

    setTimeout(() => {

      if ( !titleBLock.textContent.match('перезагружаться') ) {
        titleBLock.textContent = '';
        blockInputs.style = 'opacity: 1; pointer-events: all';
        blockImage.style.opacity = 1;
      }

    }, 1000);


  }

};


block2.addEventListener('click', handlerClickScreen);

blockInputs.addEventListener('input', (event) => {

  if ( event.target !== inputs[2]) {

    event.target.nextElementSibling.focus();

  } else {

    if ( inputs[0].value == 3 && inputs[1].value == 1 && inputs[2].value == 4) {

      mur.play();
      panter.pause();

      block2.style = 'display: none';
      block3.style = 'opacity: 1; pointer-events: all; position: static';

    } else {

      myau.play();

      blockPrompt.innerHTML = 'Мяуошибка( Кажется здесь изображен мост';
      blockPrompt.style = 'opacity: 1; color: red; font-weight: 400';

      setTimeout(() => {

        blockPrompt.innerHTML = 'Еще я заметил трубы водосливные и какие-то рамки на дороге наверху. Они должны помочь найти место';

        setTimeout(() => {

          blockPrompt.innerHTML = 'Осмотри соседние со стрелкой колонны. Мб что-то в зазорчиках лежит';

        }, 60000);

      }, 40000);

    }

  }

});
inputs.forEach((item) => {
  item.addEventListener('focus', () => {
    item.value = '';
  });
});

})();