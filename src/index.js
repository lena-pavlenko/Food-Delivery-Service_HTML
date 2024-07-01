import './index.html';

import './scss/index.scss';

import Swiper from 'swiper/bundle';

window.onload = function() {
  const header = document.querySelector('.header')
  const searchTrigger = document.querySelector('.search-block__btn')
  const citySelectParent = document.getElementById('citySelect')
  const buttonUp = document.querySelector('.up')

  // Данные для отображения строки поиска
  const margin = 23;
  let menuWidth = document.querySelector('.menu-products').clientWidth - margin

  // Данные для выпадающего списка городов
  const cityArray = [
    {
      id: 1,
      name: 'Волгоград',
      isCurrent: false,
    },
    {
      id: 2,
      name: 'Москва',
      isCurrent: false,
    },
    {
      id: 3,
      name: 'Санкт-Петербург',
      isCurrent: false,
    },
    {
      id: 4,
      name: 'Уфа',
      isCurrent: false,
    },
    {
      id: 5,
      name: 'Краснодар',
      isCurrent: false,
    },
    {
      id: 6,
      name: 'Петропавловск-Камчатский',
      isCurrent: false,
    },
    {
      id: 7,
      name: 'Комсомольск-на-Амуре',
      isCurrent: false,
    },
    {
      id: 8,
      name: 'Орел',
      isCurrent: false,
    },
  ]

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

  // Выпадашка с городом
  const citySelectHandler = (trigger, option) => {
    if (trigger) {
      citySelectParent.classList.toggle('opened')
      injectItems(cityArray)
    }

    if (option) {
      citySelectParent.querySelectorAll('.city-select__item').forEach(item => {
        item.classList.remove('city-select__item_current')
      })
      option.classList.add('city-select__item_current')

      citySelectParent.querySelector('.city-select__text').innerText = option.innerText
      citySelectParent.querySelector('input').value = option.dataset.id

      chooseOption(option.dataset.id, cityArray)

      if (citySelectParent.classList.contains('opened')) {
        citySelectParent.classList.remove('opened')
      }
    }
  }

  // Определение выбранного города
  const chooseOption = (id, array) => {
    array.forEach(el => el.id === Number(id) ? el.isCurrent = true : el.isCurrent = false)
  }

  // Создание верстки элемента списка
  const renderItem = ({name, id, isCurrent}) => {
    return `<li class="city-select__item ${isCurrent ? 'city-select__item_current' : ''}" data-id="${id}">${name}</li>`
  }

  // Вставка верстки на страницу
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

  // Очищение html
  const clearHtml = () => {
    document.querySelector('.city-select__drop').innerHTML = ''
  }

  // Сортировка городов в массиве по алфавиту
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

  // Поиск
  searchTrigger.addEventListener('click', () => {
    searchHandler()
  })
  
  // Выпадашка с городом
  citySelectParent.addEventListener('click', e => {
    citySelectHandler(e.target.closest('.city-select__visible'),e.target.closest('.city-select__item') )
  })

  header.addEventListener('click', e => {
    if (e.target.closest('.menu-trigger')) {
      e.target.closest('.menu-trigger').classList.toggle('animate')
      e.target.closest('.menu-trigger').nextElementSibling.classList.toggle('open')
      
      if (screen.width <= 1100) {
        document.body.classList.toggle('no-scroll')
      }
    }
  })

  buttonUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  })

  // Добавление в корзину
  document.body.addEventListener('click', e => {
    
    if (e.target.closest('.product-card__button')) {
      e.target.closest('.product-card__button').classList.add('hide')
      e.target.closest('.product-card__button').nextElementSibling.classList.add('visible')
    }

    if (e.target.closest('button[data-countbtn="plus"]')) {
      let value = +e.target.closest('button[data-countbtn="plus"]').previousElementSibling.value
      value += 1
      e.target.closest('button[data-countbtn="plus"]').previousElementSibling.value = value
    }

    if (e.target.closest('button[data-countbtn="minus"]')) {
      let value = +e.target.closest('button[data-countbtn="minus"]').nextElementSibling.value
      value -= 1
      if (value === 0) {
        e.target.closest('button[data-countbtn="minus"]').nextElementSibling.value = 1
        e.target.closest('.product-card').querySelector('.product-card__button').classList.remove('hide')
        e.target.closest('button[data-countbtn="minus"]').parentElement.classList.remove('visible')
      } else if (value < 0) {
        return
      } else {
        e.target.closest('button[data-countbtn="minus"]').nextElementSibling.value = value
      }
    }
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

      // Кнопка наверх
      if (window.scrollY > 300) {
        buttonUp.classList.add('visible')
      } else {
        buttonUp.classList.remove('visible')
      }
    })
  }

  window.addEventListener('resize', () => {
    menuWidth = document.querySelector('.menu-products').clientWidth - margin
  })
}









