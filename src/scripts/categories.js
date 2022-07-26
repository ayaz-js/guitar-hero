/* eslint-disable */
let getItemList = {
  electroGuitars: {
    items: [255644,260469,262522,262523,262524,221552,262492,221553],
    categories: [],
    exclude_brands: [],
    link: '/catalog/tv-audio-foto-video/muzykal-nye-instrumenty/gitary/f/cl-1998-harakteristiki-type/ehlektro',
  },
  ukulele: {
    items: [260474,260476,260475,260470,260471,260473,260472],
    categories: [],
    link: '/catalog/tv-audio-foto-video/muzykal-nye-instrumenty/gitary/f/cl-1998-harakteristiki-type/ukulele',
  },
  acusticGuitars: {
    items: [262522,262523,262524,221552,262492,221553,260467,254264,254187,260381],
    categories: [],
    link: '/catalog/tv-audio-foto-video/muzykal-nye-instrumenty/gitary/f/cl-1998-harakteristiki-type/akusticheskaja',
  },
  electroAcusticGuitars: {
    items: [256952,262493,262494,254190,254192],
    categories: [],
    link: '/catalog/tv-audio-foto-video/muzykal-nye-instrumenty/gitary/f/cl-1998-harakteristiki-type/ehlektroakusticheskaja',
  },
  classicGuitars: {
    items: [254963,245862],
    categories: [],
    link: '#',
  },
};

const categories = [{
    name: 'Гитары электрические',
    dataAttribute: 'electroGuitars',
  },
  {
    name: 'Укулеле',
    dataAttribute: 'ukulele',
  },
  {
    name: 'Гитары акустические',
    dataAttribute: 'acusticGuitars',
  },
  {
    name: 'Электроакустическая Гитара',
    dataAttribute: 'electroAcusticGuitars',
  },
  {
    name: 'Гитары Классические',
    dataAttribute: 'classicGuitars',
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