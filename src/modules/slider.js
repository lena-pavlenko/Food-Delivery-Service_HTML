import Swiper from 'swiper/bundle';

const slider = () => {
  if (document.querySelector('[data-swiper="banner"]')) {
    const swiperBanner = new Swiper('[data-swiper="banner"]', {
        loop: true,
        autoplay: true,
        slidesPerView: 1,
        pagination: {
          el: '[data-swiperPagination="bannerPagination"]',
        },
        navigation: {
          nextEl: '[data-swiperNav="bannerNext"]',
          prevEl: '[data-swiperNav="bannerPrev"]',
        },
    });
  }
}

export default slider