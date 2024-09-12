// Создание приложения
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundAlpha: 0,
});
document.body.append(app.view);

const sprites = {};

// Функция установки размеров основных спрайтов по ширине окна
function setSpriteSize(sprite) {
  sprite.width = window.innerWidth;
  sprite.height = window.innerHeight;
}

// Функция добавления тени карточке
// function setShadow(sprite) {
//   const dropShadowFilter = new PIXI.filters.DropShadowFilter();
//   dropShadowFilter.color = 0x000000;
//   dropShadowFilter.alpha = 0.7;
//   dropShadowFilter.blur = 6;
//   dropShadowFilter.distance = 10;
//   sprite.filters = [dropShadowFilter];
// }

// Добавление Background
if(window.innerWidth > 3840) {
  sprites.background = PIXI.Sprite.from("./images/background5K.jpg");
} else if(window.innerWidth > 2560) {
sprites.background = PIXI.Sprite.from("./images/background4K.jpg");
} else if(window.innerWidth > 1920) {
sprites.background = PIXI.Sprite.from("./images/background2K.jpg");
} else {
sprites.background = PIXI.Sprite.from("./images/background1K.jpg");
}
setSpriteSize(sprites.background);
app.stage.addChild(sprites.background);

// Добавление градиента
sprites.gradient = PIXI.Sprite.from("./images/gradient.svg");
setSpriteSize(sprites.gradient);
app.stage.addChild(sprites.gradient);

// Добавление карточек
sprites.cards = [];

const totalCards = 500; // Задаем количество карточек

for (let i = 0; i < totalCards; i++) {
  // const card = PIXI.Sprite.from("./images/card.png");
  const card = PIXI.Sprite.from("./images/cardwithshadow.png");
  card.width = 300;
  card.height = 300;

  // Тень съедает огромное количество ресурсов
  // setShadow(card);

  card.x = Math.random() * app.screen.width;
  card.y = Math.random() * app.screen.height;
  card.direction = Math.random() * Math.PI * 2;
  card.turningSpeed = Math.random() - 0.8;
  card.speed = 2 + Math.random() * 2;
  sprites.cards.push(card);
  app.stage.addChild(card);
}

const cardBoundsPadding = 300;
const cardBounds = new PIXI.Rectangle(
  -cardBoundsPadding,
  -cardBoundsPadding,
  app.screen.width + cardBoundsPadding * 2,
  app.screen.height + cardBoundsPadding * 2
);

app.ticker.add(() => {
  for (let i = 0; i < totalCards; i++) {
    const card = sprites.cards[i];
    card.direction += card.turningSpeed * 0.01;
    card.x += Math.sin(card.direction) * card.speed;
    card.y += Math.cos(card.direction) * card.speed;
    card.rotation = -card.direction - Math.PI / 2;

    // wrap the dudes by testing their bounds...
    if (card.x < cardBounds.x) {
      card.x += cardBounds.width;
    } else if (card.x > cardBounds.x + cardBounds.width) {
      card.x -= cardBounds.width;
    }

    if (card.y < cardBounds.y) {
      card.y += cardBounds.height;
    } else if (card.y > cardBounds.y + cardBounds.height) {
      card.y -= cardBounds.height;
    }
  }
});
