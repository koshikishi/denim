// Оживление мобильного меню
const menuToggleBtn = document.querySelector(`.header__toggle`);

if (menuToggleBtn) {
  menuToggleBtn.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    menuToggle();
  });
}

// Плавная прокрутка к якорю
const pageDownBtn = document.querySelector(`.hero__down`);

if (pageDownBtn) {
  pageDownBtn.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    document.getElementById(pageDownBtn.hash.substring(1)).scrollIntoView({behavior: `smooth`});
  });
}

// Создание сетки Masonry
const catalogMasonry = document.querySelector(`.catalog--masonry .catalog__list`);

if (catalogMasonry) {
  const msnry = new Masonry(catalogMasonry, {
    itemSelector: `.card`,
    gutter: 30,
    fitWidth: true,
    transitionDuration: 0
  });
}

// Появление и закрытие мобильного меню
function menuToggle() {
  if (menuToggleBtn.classList.contains(`header__toggle--opened`)) {
    menuClose();
  } else {
    menuOpen();
  }
}

// Появление мобильного меню
function menuOpen() {
  menuToggleBtn.classList.add(`header__toggle--opened`);
}

// Закрытие мобильного меню
function menuClose() {
  cssAnimationReset(menuToggleBtn, `header__toggle--opened`);
  menuToggleBtn.classList.replace(`header__toggle--opened`, `header__toggle--closing`);

  window.setTimeout(() => {
    menuToggleBtn.classList.remove(`header__toggle--closing`);
  }, 500);
}

// Сброс CSS-анимации
function cssAnimationReset(elmnt, cls) {
  elmnt.classList.remove(cls);
  void elmnt.offsetWidth;
  elmnt.classList.add(cls);
}
