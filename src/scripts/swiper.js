/* eslint-disable */
const swiper = new Swiper('.swiper', {
  slidesPerView: 6,
  spaceBetween: 8,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
  },

  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1140: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
    1280: {
      slidesPerView: 6,
    },
  }
});

/* eslint-disable */
r46('recommend', 'e67b86dfd1118f71a5e77c95100f38ad', {
  items: [255644, 260469, 262523, 221553, 260467, 256952, 245862, 254264],
}, (response) => {
  console.log(response)
  const slides = response.html.match(
    /(<div class="swiper-slide">)(.*?)(<\/a><\/div>)/g
  );
  console.log(swiper)
  // swiper.removeAllSlides();
  swiper.appendSlide(slides);
  console.log(slides)
}, (error) => {
  console.log(error);
});
