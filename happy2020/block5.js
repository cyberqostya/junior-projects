(function() {

  const messages = [
    'Но погоди, где же мои друзья?',
    'Давай вместе крикнем "Вы где? Дайте знак"',
    'Кричи!',
    '(не нажимай на экран, пока не увидишь какого-нибудь знака и продолжай звать)',

    'Юхууу! Ты это видела??',
    'Скорее туда!',
  ];

  const block5 = document.querySelector('.block5');
  const titleBLock = block5.querySelector('.block__title');

  let counter = 0; 


  const fort = new Audio();
  fort.preload = 'auto';
  fort.src = './audios/fort.mp3';


  const handlerClickScreen = (event) => {

    if ( counter < messages.length ) { 

      if (counter==4) {
        fort.play();
      }
  
      titleBLock.style.opacity = 0;
  
      setTimeout(() => {
        titleBLock.innerHTML = messages[ counter ] || 'Мика-земляника торопыжка че поделать';
        titleBLock.style.opacity = 1;
    
        counter++;
    
      }, 500);
  
    } else {
  
      block5.removeEventListener('click', handlerClickScreen);
  
    }
  
  };

  block5.addEventListener('click', handlerClickScreen);


})();