import './index.html';
import './scss/index.scss';

import Swiper from 'swiper/bundle';

window.onload = function() {
  const header = document.querySelector('.header')
  const scrollHeader = header.querySelectorAll('.header__row')[1]
  const searchBlock = document.querySelector('.search-block')

  // Слайдер баннеров
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
  }

  // События при скролле
  window.addEventListener('scroll', e => {
    const headerPaddingTop = parseInt(window.getComputedStyle(header).paddingTop)
    const topHeaderHeight = header.querySelectorAll('.header__row')[0].clientHeight
    
    let menuWidth = document.querySelector('.menu-products').clientWidth
    
    // Фикс шапки
    if (window.scrollY > topHeaderHeight + headerPaddingTop) {
      scrollHeader.classList.add('header-scroll')
      document.body.style.paddingTop = `${topHeaderHeight + headerPaddingTop}px`
    } else {
      scrollHeader.classList.remove('header-scroll')
      document.body.style.paddingTop = ''
    }
  
    if (scrollHeader.classList.contains('header-scroll')) {
      header.classList.add('isScroll')
    } else {
      header.classList.remove('isScroll')
    }

    // Открытие/закрытие поиска
    if (searchBlock) {
      const searchTrigger = searchBlock.querySelector('.search-block__btn')
      const searchControl = searchBlock.querySelector('.search-block__control')
    
      searchTrigger.addEventListener('click', e => {
        searchControl.classList.toggle('open')
        searchControl.style.width = `${menuWidth}px`
        if (searchControl.classList.contains('open')) {
          menuWidth = 0
        } else {
          menuWidth = document.querySelector('.menu-products').clientWidth
        }
      })
    }
  })
  
}







