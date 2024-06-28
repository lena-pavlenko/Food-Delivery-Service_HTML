import './index.html';

import './scss/index.scss';

import Swiper from 'swiper/bundle';

window.onload = function() {
  const header = document.querySelector('.header')
  
  const searchTrigger = document.querySelector('.search-block__btn')
  const margin = 23;
  let menuWidth = document.querySelector('.menu-products').clientWidth - margin

  // Открытие/закрытие поиска
  const searchHandler = () => {
    const searchBlock = document.querySelector('.search-block')
    if (searchBlock) {
      const searchControl = searchBlock.querySelector('.search-block__control')

      searchControl.classList.toggle('open')
      searchControl.style.width = `${menuWidth}px`

      if (searchControl.classList.contains('open')) {
        menuWidth = 0
      } else {
        menuWidth = document.querySelector('.menu-products').clientWidth - margin
      }
    }
  }

  searchTrigger.addEventListener('click', () => {
    searchHandler()
  })

  if (header) {
    const scrollHeader = header.querySelectorAll('.header__row')[1]

    // События при скролле
    window.addEventListener('scroll', e => {
      menuWidth = document.querySelector('.menu-products').clientWidth - margin

      const headerPaddingTop = parseInt(window.getComputedStyle(header).paddingTop)
      const topHeaderHeight = header.querySelectorAll('.header__row')[0].clientHeight
      
      // Фикс шапки
      if (screen.width > 1100 && window.scrollY > topHeaderHeight + headerPaddingTop) {
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
    })
  }

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
          nextEl: '[data-swiperNav="bannerNext"]',
          prevEl: '[data-swiperNav="bannerPrev"]',
        },
    });
  }

  // Выпадашка с городом
  const citySelectParent = document.getElementById('citySelect')



  citySelectParent.addEventListener('click', (e) => {
    if (e.target.closest('.city-select__btn')) {
      citySelectParent.classList.toggle('opened')
      injectItems(cityArray)
    }
    
  })

  const cityArray = [
    {
      id: 1,
      name: 'Волгоград',
    },
    {
      id: 2,
      name: 'Москва',
    },
    {
      id: 3,
      name: 'Санкт-Петербург',
    },
    {
      id: 4,
      name: 'Уфа',
    },
    {
      id: 5,
      name: 'Краснодар',
    },
    {
      id: 6,
      name: 'Петропавловск-Камчатский',
    },
    {
      id: 7,
      name: 'Комсомольск-на-Амуре',
    },
    {
      id: 8,
      name: 'Орел',
    },
  ]

  
  const renderItem = (city) => {
    return `<li class="city-select__item">${city.name}</li>`
  }

  const injectItems = (array) => {
    
    const list = document.createElement('ul');
    list.classList.add('city-select__list')

    if (array.length) {
      sortArray(array)
      array.forEach(city => {
        list.innerHTML += renderItem(city)
      });
      clearHtml()
      document.querySelector('.city-select__drop').insertAdjacentElement('beforeend', list)
    } else {
      document.querySelector('.city-select__drop').innerHTML = 'Список пуст'
    }
  }

  const clearHtml = () => {
    document.querySelector('.city-select__drop').innerHTML = ''
  }

  const sortArray = (array) => {
    array.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  injectItems(cityArray)
  
}









