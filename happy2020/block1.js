// block1 -------------------------
(function() {
const messages = {
  start: [
    'Меня зовут котик Мурзик, <br>🐈',
    'Я люблю греться на солнышке ☀️ и мурлыкать',
    'А еще хозяин называет меня хоошишом 🍑 и милашычем)))',
    'У меня случилась беда - все мои друзья куда-то пропали 🧭',
    'Помоги мне их найти, ...пожалуйста 🔍',
    'Ты ведь умненькая 🧠 и смышленая девчонка',
    'Да и башаааая: скоро будет целых <br>22 годика ✌️',
    'Ты ведь мне поможешь?',
  ],

  choose: [
    'СПАСИБО! <br> (большое) <br> Хорошо, что ты не нажала НЕТ))',
    'А я то думал *хнык* что тебе интересно *хнык* <br>👎',
  ],

  end: [
    'Покажи на сколько ты внимательная и любопытная! Введи *пальчиковый* пароль:'
  ]

}

let counter = 0; 

const block1 = document.querySelector('.block1');
const titleBLock = block1.querySelector('.block__title');
const buttonsBlock = block1.querySelector('.buttons');
const blockPrompt = block1.querySelector('.block__prompt');
const blockInputs = block1.querySelector('.block__inputs');
const inputs = blockInputs.querySelectorAll('.block__input');

const block2 = document.querySelector('.block2');


const mur = new Audio();
mur.preload = 'auto';
mur.src = './audios/catmur.mp3';
const myau = new Audio();
myau.preload = 'auto';
myau.src = './audios/catmyau.mp3';



const handlerClickScreen = (event) => {

  if ( counter < messages.start.length ) {

    if ( counter === 0 ) {

      blockPrompt.style.opacity = '0';
      mur.play();
  
    }   
    
    else if ( counter === messages.start.length - 1 ) {
  
      block1.removeEventListener('click', handlerClickScreen);
  
      setTimeout(() => {
        titleBLock.textContent.match('Западе') ? '' : buttonsBlock.style = 'opacity: 1; pointer-events: all';
      }, 1500);
  
    }

    titleBLock.style.opacity = 0;

    setTimeout(() => {
      titleBLock.innerHTML = messages.start[ counter ] || 'Ты самый быстрый кликер на Диком Западе <br> O_o <br> Нужно кликать помедленнее, чтобы скрипты успевали за тобой. Перезагружайся...';
      titleBLock.style.opacity = 1;
  
      counter++;
  
    }, 500);

  } else {

    titleBLock.style.opacity = 0;

    setTimeout(() => {
      titleBLock.innerHTML = messages.end[ 0 ];
      titleBLock.style.opacity = 1;  
    }, 500);



    block1.removeEventListener('click', handlerClickScreen);

    setTimeout(() => {

      blockInputs.style = 'opacity: 1; pointer-events: all';

    }, 1000);


  }

};



// Начало работы
block1.addEventListener('click', handlerClickScreen);

buttonsBlock.addEventListener('click', (event) => {
  if ( event.target.classList.contains('buttons__button_yes') ) {

    mur.play();
    
    titleBLock.style.opacity = 0;

    setTimeout(() => {
      titleBLock.innerHTML = messages.choose[0];
      titleBLock.style.opacity = 1;

      block1.addEventListener('click', handlerClickScreen);
    }, 500);
    
  } else if ( event.target.classList.contains('buttons__button_no') ) {

    myau.play();
    
    titleBLock.style.opacity = 0;

    setTimeout(() => {
      titleBLock.innerHTML = messages.choose[1];
      titleBLock.style.opacity = 1;

      blockPrompt.textContent = '...или ты специально так нажала, чтобы узнать часть пароля?';

      setTimeout(() => {
        blockPrompt.style.opacity = '1';
      }, 5000);

    }, 500);
   
  }

  buttonsBlock.style.display = 'none';

});


blockInputs.addEventListener('input', (event) => {

  if ( event.target !== inputs[2]) {

    event.target.nextElementSibling.focus();

  } else {

    if ( inputs[0].value == 1 && inputs[1].value == 2 && inputs[2].value == 5) {

      mur.play();

      block1.style = 'display: none';
      block2.style = 'opacity: 1; pointer-events: all; position: static';

    } else {

      myau.play();

      blockPrompt.innerHTML = 'Мяуошибка( попробуй снова';
      blockPrompt.style = 'opacity: 1; color: red; font-weight: 400';

      setTimeout(() => {

        blockPrompt.innerHTML = 'Мяка-пяка-земляняка через минуту высветится посказка, но так же не интересно, да?';

        setTimeout(() => {

          blockPrompt.innerHTML = '(по возрастанию)';

        }, 60000);

      }, 30000);

    }

  }

});
inputs.forEach((item) => {
  item.addEventListener('focus', () => {
    item.value = '';
  });
});

})();
// block1 -------------------------