const search = () => {
  const header = document.querySelector('.header')
  const menu = document.querySelector('.menu-products')
  const mobileSearch = document.querySelector('.mobile-block__search-block')

  // Очистка поля ввода
  const clearValue = (target) => {
    target.value = ''
  }

  // Данные для отображения строки поиска
  const margin = 23
  const mobMargin = 10

  let menuWidth = 0
  let searchWidth = 0

  if (menu) menuWidth = menu.clientWidth - margin

  if (mobileSearch) searchWidth = document.body.scrollWidth - mobileSearch.getBoundingClientRect().right - mobMargin

  // Открытие/закрытие поиска
  const searchHandlerDesktop = (target) => {

    const searchControl = target.querySelector('.search-block__control')

    if (searchControl) {
      searchControl.classList.toggle('open')
      searchControl.style.width = `${menuWidth}px`
  
      if (searchControl.classList.contains('open')) {
        menuWidth = 0
      } else {
        menuWidth = menu.clientWidth - margin
      }
    }
  }

  const searchHandlerMobile = (target) => {
    const searchControl = target.querySelector('.search-block__control')

    if (searchControl) {
      searchControl.classList.toggle('open')
      searchControl.style.width = `${searchWidth}px`

      if (searchControl.classList.contains('open')) {
        searchWidth = 0
      } else {
        searchWidth = document.body.scrollWidth - target.getBoundingClientRect().right - mobMargin
      }
    }
  }

  // Поиск
  document.addEventListener('click', (e) => {
    
    if (e.target.closest('.search-block__btn') && e.target.closest('.search-block__btn').parentElement) {

      if (!e.target.closest('.search-block__btn').parentElement.classList.contains('mobile-block__search-block')) {
        searchHandlerDesktop(e.target.closest('.search-block__btn').parentElement)
      } else {
        searchHandlerMobile(e.target.closest('.search-block__btn').parentElement)
      }
    } 

    if (e.target.closest('.search-block__reset')) {
      const current = e.target.closest('.search-block__reset')
      const input = current.closest('.search-block__control').querySelector('input[name="q"]')
      clearValue(input)
    }
  })

  if (header) {

    let scrollHeader = null
    if (header.querySelectorAll('.header__row').length) {
      scrollHeader = header.querySelectorAll('.header__row')[1]
    }

    // События при скролле
    window.addEventListener('scroll', e => {
      let topHeaderHeight = 0
      if (menu) menuWidth = menu.clientWidth - margin

      const headerPaddingTop = parseInt(window.getComputedStyle(header).paddingTop)

      if (header.querySelectorAll('.header__row').length) {
        topHeaderHeight = header.querySelectorAll('.header__row')[0].clientHeight
      }

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

  window.addEventListener('resize', () => {
    if (menu) {
      menuWidth = menu.clientWidth - margin
    }

    if (mobileSearch) {
      searchWidth = document.body.scrollWidth - mobileSearch.getBoundingClientRect().right - mobMargin
    }
  })
}

export default search