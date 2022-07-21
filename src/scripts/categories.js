/* eslint-disable */
let getItemList = {
  garnitura: {
    items: [
      66744, 66745, 218814, 138948, 226585, 110717, 235849, 235850, 235851,
      226586, 66740, 218490, 108627, 176427, 218817, 156306, 216621, 156307,
      234180, 133689, 191406,
    ],
    categories: [],
    exclude_brands: [],
    link: 'https://www.technodom.kz/smartfony-i-gadzhety/naushniki/vse-naushniki/f/brands/hyperx/cl-naushniki-harakteristiki-792/igrovihe',
  },
  keyboard: {
    items: [133690, 176482, 230775, 212137, 246484, 224418, 151901],
    categories: [],
    link: 'https://www.technodom.kz/noutbuki-i-komp-jutery/komp-juternye-aksessuary/klaviatury/f/brands/hyperx/cl-klaviatury-osnovnyye-380/igrovaja',
  },
  mouse: {
    items: [107348, 232527, 215364, 122711, 128346, 176483],
    categories: [],
    link: 'https://www.technodom.kz/noutbuki-i-komp-jutery/komp-juternye-aksessuary/myshi/f/brands/hyperx/cl-myshi-osnovnyye-game-mouse/da',
  },
  microphones: {
    items: [151900, 229480, 230932],
    categories: [],
    link: 'https://www.technodom.kz/tv-audio-foto-video/audio-tehnika/mikrofony/f/brands/hyperx/cl-microphones-main-792/igrovoy-mikrofon',
  },
  carpets: {
    items: [66759, 156310, 212143],
    categories: [],
    link: 'https://www.technodom.kz/noutbuki-i-komp-jutery/komp-juternye-aksessuary/kovriki-dlja-myshi/f/brands/hyperx/cl-kovriki-osnovnyye-gaming-mouse-pad/da',
  },
  chargers: {
    items: [176425],
    categories: [],
    link: 'https://www.technodom.kz/vsjo-dlja-gejmerov/playstation/aksessuary-playstation/f/brands/hyperx',
  },
};

const categories = [{
    name: 'Игровые гарнитуры',
    dataAttribute: 'garnitura',
  },
  {
    name: 'Игровые клавиатуры',
    dataAttribute: 'keyboard',
  },
  {
    name: 'Игровые мышки',
    dataAttribute: 'mouse',
  },
  {
    name: 'Игровые микрофоны',
    dataAttribute: 'microphone',
  },
  {
    name: 'Зарядные устройства',
    dataAttribute: 'chargers',
  },
  {
    name: 'Зарядные устройства',
    dataAttribute: 'chargers',
  },
  {
    name: 'Зарядные устройства',
    dataAttribute: 'chargers',
  },
  {
    name: 'Зарядные устройства',
    dataAttribute: 'chargers',
  },
  {
    name: 'Зарядные устройства',
    dataAttribute: 'chargers',
  },
  {
    name: 'Зарядные устройства',
    dataAttribute: 'chargers',
  },
  {
    name: 'Зарядные устройства',
    dataAttribute: 'chargers',
  },
  {
    name: 'Зарядные устройства',
    dataAttribute: 'chargers',
  },
  {
    name: 'Зарядные устройства',
    dataAttribute: 'chargers',
  },
  {
    name: 'Зарядные устройства',
    dataAttribute: 'chargers',
  },

]

if (categories.length > 0) {
  categories.forEach(category => {
    const categoryBtn = document.createElement("button");
    categoryBtn.className = 'categories__btn';
    categoryBtn.textContent = category.name;
    categoryBtn.setAttribute("data-key", category.dataAttribute);
    document.querySelector('.buttons__buttons').append(categoryBtn);
  })
}

const categoriesButtonsContainer = document.querySelector(
  '.categories__buttons-container'
);
const categoriesOverlay = document.querySelector('.categories__overlay');
const categoriesButtonsCloseBtn = document.querySelector('.buttons__top-close-btn');
const categoriesButtons = document.querySelectorAll('.categories__btn');
const categoriesMoreLinkContainer = document.querySelector(
  '.categories__more-link-container'
);
const categoriesMoreLink = document.querySelector('.categories__more-link');
const burgerBtns = document.querySelectorAll('.categories__burger-btn');

if (categoriesButtons.length > 8) {
  const categoriesMoreBtn = document.createElement("button");
  let extraCategories = Array.from(categoriesButtons).splice(7, categoriesButtons.length);
  extraCategories.forEach(item => item.style.display = "none");
  categoriesMoreBtn.textContent = "Показать больше категорий";
  categoriesMoreBtn.className = "buttons__more-btn";
  document.querySelector('.buttons__buttons').append(categoriesMoreBtn);
  categoriesMoreBtn.addEventListener("click", function () {
    extraCategories.forEach(item => item.style.display = "flex");
    document.querySelector('.buttons__buttons').style.maxHeight = "none";
    if (this.textContent === "Показать больше категорий") {
      this.textContent = "Свернуть";
    } else {
      extraCategories.forEach(item => item.style.display = "none");
      document.querySelector('.buttons__buttons').style.maxHeight = "410px";
      this.textContent = "Показать больше категорий"
    }
  })
}

let selectedButton;

categoriesButtonsContainer.addEventListener("click", function (e) {
  const target = e.target;
  if (target.tagName !== "BUTTON" || target.className !== "categories__btn") {
    return
  } else {
    highlightButton(target);
  }
})

document.querySelector('.categories__btn').click();

function highlightButton(target) {
  if (selectedButton) {
    selectedButton.classList.remove("categories__btn--active")
  }
  selectedButton = target;
  createReesObject(selectedButton.dataset.key)
  selectedButton.classList.add("categories__btn--active");
  // categoriesButtonsContainer.scrollIntoView({
  //   block: "start",
  //   behavior: "smooth",
  // })
  if (window.screen.width < 780) {
    categoriesOverlay.classList.add("categories__overlay--hidden")
    document.documentElement.style.overflowY = "auto";
    categoriesButtonsContainer.classList.add("buttons--hidden");
  }
  document.querySelector('.categories__burger-btn').scrollIntoView({
    block: "start",
    behavior: "smooth",
  })
}

function createReesObject(categoryBtnDataset) {
  const reesObject = {};
  const locationId = JSON.parse(localStorage.getItem("cityMagentoId")).data;
  for (const [key, value] of Object.entries(getItemList)) {
    if (categoryBtnDataset === key) {
      if (value.items) {
        reesObject.items = value.items;
      }
      if (value.categories) {
        reesObject.categories = value.categories;
      }
      if (value.exclude_brands) {
        reesObject.exclude_brands = value.exclude_brands;
      }
      reesObject.locations = [locationId];
      categoriesMoreLink.href = value.link;
    }
  }

  r46(
    'recommend',
    'ec5b3c5f36db9897c47b614bddf5bf77',
    reesObject,
    function (response) {
      if (!response.html) {
        document.querySelector(
          '#r46reco'
        ).innerHTML = `<p>Извините, но товары в этой категории закончились.</p>`;
        categoriesMoreLinkContainer.style.display = 'none';
        return;
      }
      categoriesMoreLinkContainer.style.display = 'block';
      document.querySelector('#r46reco').innerHTML = response.html;
    },
    function (error) {
      console.error(error);
    }
  );
}

Array.from(burgerBtns).forEach(burgerBtn => {
  burgerBtn.addEventListener("click", function () {
    categoriesOverlay.classList.remove("categories__overlay--hidden");
    document.documentElement.style.overflowY = "hidden";
    categoriesButtonsContainer.classList.remove("buttons--hidden");
  })
})

categoriesButtonsCloseBtn.addEventListener("click", () => {
  categoriesOverlay.classList.add("categories__overlay--hidden");
  document.documentElement.style.overflowY = "auto";
  categoriesButtonsContainer.classList.add("buttons--hidden");

})

categoriesOverlay.addEventListener("click", (e) => {
  if (e.target === categoriesOverlay) {
    categoriesOverlay.classList.add("categories__overlay--hidden")
    document.documentElement.style.overflowY = "auto";
    categoriesButtonsContainer.classList.add("buttons--hidden");
  }
})