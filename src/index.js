import './index.html';
import './scss/index.scss';

import Swiper from 'swiper/bundle';

if (document.querySelector('[data-swiper="banner"]')) {
    const swiperBanner = new Swiper('[data-swiper="banner"]', {
        loop: true,
        autoplay: true,
        slidesPerView: 1,
        pagination: {
          el: '[data-swiperPagination="bannerPagination"]',
        },
        navigation: {
          nextEl: '[data-swiperNav="bannerPrev"]',
          prevEl: '[data-swiperNav="bannerNext"]',
        },
    });
    console.log(swiperBanner.el);
}


