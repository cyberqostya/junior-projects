// Favicon
(function(){

    const favicon = document.createElement('link');
    const faviconSources = [
        '/img/fav1.svg',
        '/img/fav2.svg',
    ];
    let faviconCounter = 0;
    
    favicon.setAttribute('rel', 'icon');
    favicon.setAttribute('type', 'image/svg');
    favicon.setAttribute('href', faviconSources[0])
    document.querySelector('head').append(favicon);
    
    setInterval(() => {
        faviconCounter++;
        if(faviconCounter === faviconSources.length) {
            faviconCounter = 0;
        }
        favicon.setAttribute('href', faviconSources[faviconCounter]);
    }, 1000);

})();

// Форма регистрации
(function(){

  const form = document.querySelector('.form');

  async function formSend(event) {
    event.preventDefault();
    let formData = new FormData(form);
    let response = await fetch('sendmail.php', {
      method: 'POST',
      body: formData,
    });

    if(response.ok) {
      let result = await response.json();
      alert(result.message);
      form.reset();
    } else {
      alert('Возникла непредвиденная ошибка');
    }
  }

  form.addEventListener('submit', formSend);

})();