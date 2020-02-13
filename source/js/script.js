// Оживление мобильного меню
const menuToggle = document.querySelector(`.header__toggle a`);

if (menuToggle) {
  menuToggle.onclick = (evt) => {
    evt.preventDefault();
    elementToggle(menuToggle.parentElement, `header__toggle`);
  };
}

// Плавная прокрутка к якорю
const pageDownBtn = document.querySelector(`.hero__down`);

if (pageDownBtn) {
  pageDownBtn.onclick = (evt) => {
    evt.preventDefault();
    document.getElementById(pageDownBtn.hash.substring(1)).scrollIntoView({behavior: `smooth`});
  };
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

// Оживление фильтра каталога
const filter = document.getElementById(`filter`);

if (filter) {
  const filterToggle = filter.querySelector(`.filter__select`);
  const filterDropdown = filter.querySelector(`.filter__dropdown`);
  const filterClose = filterDropdown.querySelector(`.filter__close`);
  const filterOverlay = filter.querySelector(`.filter__overlay`);
  const filterFieldBtns = filterDropdown.querySelectorAll(`.filter__field-title button`);

  // Появление и закрытие выпадающего списка
  filterToggle.onclick = (evt) => {
    evt.preventDefault();

    if (filter.classList.contains(`filter--opened`)) {
      filterFieldsClose(filterFieldBtns, `filter__field-title`);
    }

    elementToggle(filter, `filter`);
  };

  // Закрытие выпадающего списка
  for (const elmnt of [filterClose, filterOverlay]) {
    elmnt.onclick = (evt) => {
      evt.preventDefault();
      filterFieldsClose(filterFieldBtns, `filter__field-title`);
      elementClose(filter, `filter`);
    };
  }

  // Появление и закрытие полей формы выпадающего списка
  for (const btn of filterFieldBtns) {
    btn.onclick = (evt) => {
      evt.preventDefault();
      elementToggle(btn.parentElement, `filter__field-title`);
    };
  }

  // Оживление слайдера цены фильтра
  const filterRange = filterDropdown.querySelector(`.filter__price-range`);
  const filterRangeInputs = filterDropdown.querySelectorAll(`.filter__price-input`);
  const filterRangeTooltipsFormat = {
    to(val) {
      return `$ ${Math.round(val)}`;
    },
    from(val) {
      return Number(val.replace(/\$/, ``));
    }
  };

  noUiSlider.create(filterRange, {
    start: [0, 300],
    range: {
      'min': 0,
      'max': 300
    },
    step: 1,
    connect: true,
    tooltips: [filterRangeTooltipsFormat, filterRangeTooltipsFormat]
  });

  // Связь слайдера цены с полями ввода
  filterRange.noUiSlider.on(`update`, (values, handle) => {
    filterRangeInputs[handle].value = Math.round(values[handle]);
  });

  filterRangeInputs.forEach((input, handle) => {
    input.onchange = function () {
      filterRange.noUiSlider.setHandle(handle, this.value);
    };
  });

  filterDropdown.onreset = () => {
    filterRange.noUiSlider.reset();
  };
}

// Оживление галереи продукта
if (document.querySelector(`.product__gallery-inner`)) {
  const productGallery = new Glide(`.product__gallery-inner`, {
    type: `carousel`,
    classes: {
      activeNav: `product__gallery-preview--active`
    }
  }).mount();
}

// Появление и закрытие элемента
function elementToggle(elmnt, cls) {
  if (elmnt.classList.contains(`${cls}--opened`)) {
    elementClose(elmnt, cls);
  } else {
    elementOpen(elmnt, cls);
  }
}

// Появление элемента
function elementOpen(elmnt, cls) {
  elmnt.classList.add(`${cls}--opened`);
}

// Закрытие элемента
function elementClose(elmnt, cls) {
  cssAnimationReset(elmnt, `${cls}--opened`);
  elmnt.classList.replace(`${cls}--opened`, `${cls}--closing`);

  window.setTimeout(() => {
    elmnt.classList.remove(`${cls}--closing`);
  }, 500);
}

// Закрытие полей формы выпадающего списка
function filterFieldsClose(list, cls) {
  for (const elmnt of list) {
    if (elmnt.parentElement.classList.contains(`${cls}--opened`)) {
      elementClose(elmnt.parentElement, cls);
    }
  }
}

// Сброс CSS-анимации
function cssAnimationReset(elmnt, cls) {
  elmnt.classList.remove(cls);
  void elmnt.offsetWidth;
  elmnt.classList.add(cls);
}
