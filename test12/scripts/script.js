const header = document.querySelector('.header');
const gallery = document.querySelector('.gallery');
const banner = document.querySelector('.banner');
const statistics = document.querySelector('.statistics');
const footer = document.querySelector('.footer');

function createButton(place, str) {
    place.insertAdjacentHTML("beforeend", `<button class='continue continue_${str}'>continue...</button>`);
}
createButton(header, 'header-to-gallery');
createButton(gallery, 'gallery-to-banner');
createButton(banner, 'banner-to-statistics');
createButton(statistics, 'statistics-to-footer');



const continueBtnHeader = header.querySelector('.continue_header-to-gallery');
const continueBtnGallery = gallery.querySelector('.continue_gallery-to-banner');
const continueBtnBanner = banner.querySelector('.continue_banner-to-statistics');
const continueBtnStatistics = statistics.querySelector('.continue_statistics-to-footer');

function animation(btn, arr) {

    function xyz(){
        for(let elem of arr) {
            if(typeof elem!=='string'){
                elem.classList.add('continue_animation');
            }
            else if(document.querySelectorAll(`.${elem}`).length > 1){
                for(let item of document.querySelectorAll(`.${elem}`)){
                    item.classList.add(`${elem}_animation`);
                }
            }        
            else {
                document.querySelector(`.${elem}`).classList.add(`${elem}_animation`);
            }
        }
        btn.classList.add('delete');
        window.scrollTo({top: 10000, behavior: 'smooth'});
    }
    return xyz;
}

continueBtnHeader.addEventListener('click', animation(continueBtnHeader, ['gallery', 'gallery__intro', 'gallery__grid', 'gallery__image-out', continueBtnGallery]));
continueBtnGallery.addEventListener('click', animation(continueBtnGallery, ['banner', 'banner__button', 'banner__text', continueBtnBanner]));
continueBtnBanner.addEventListener('click', animation(continueBtnBanner, ['statistics', 'statistics__title', 'statistics__subtitle', 'statistics__text', 'statistics__container', 'statistics__data', continueBtnStatistics]));
continueBtnStatistics.addEventListener('click', animation(continueBtnStatistics, ['footer', 'footer__button', 'footer__text']));


document.querySelector('.gallery__grid').addEventListener('click', function(event){
    document.querySelector('.popup__image').setAttribute('src', `${event.target.getAttribute('src')}`);
    document.querySelector('.popup').classList.add('popup_opened');
});

document.querySelector('.popup').addEventListener('click', function(event){
    if(event.target!==document.querySelector('.popup__image')){
        document.querySelector('.popup').classList.remove('popup_opened');
    }
});

let counter = 0;
document.querySelector('.banner__button').addEventListener('click', function(){
    banner.style.transition = 'background-position-y 0.5s';
    counter+=325;
    banner.style.backgroundPositionY = `-${counter}px`;
    if(counter===975){
        setTimeout(delay, 500);
    }
});
function delay() {
    counter=0;
    banner.style.transition = 'none';
    banner.style.backgroundPositionY = `-${counter}px`;
}

const form = document.forms.secret;
form.addEventListener('submit', function(event){
    event.preventDefault();
    const audioAchieve = new Audio();
    audioAchieve.src = 'sounds/achievement.wav';
    if(form.elements.season.value==7 && form.elements.dust.value==70 && !document.querySelector('.achievement').classList.contains('achievement_animation')){
        document.querySelector('.achievement').classList.add('achievement_animation');
        audioAchieve.play();
        form.innerHTML = '<div class="footer__ending-answer">The end</div>';
    } 
    if(form.elements.season.value==7){
        form.elements.season.style = 'border: 2px solid #34a853';
    } else {
        form.elements.season.style = 'border: 2px solid #ea4335';
    }
    if(form.elements.dust.value==70){
        form.elements.dust.style = 'border: 2px solid #34a853';
    } else {
        form.elements.dust.style = 'border: 2px solid #ea4335';
    }
});

const audioSilence = new Audio();
audioSilence.src = 'sounds/silence.wav';
document.querySelector('.footer__button').addEventListener('click', function(){
    audioSilence.play();
});