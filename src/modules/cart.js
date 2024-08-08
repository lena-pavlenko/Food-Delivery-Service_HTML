const cart = () => {
  const floatBtn = document.querySelector('.float-cart')

  const hideButton = (target) => {
    target.classList.add('hide')
    if (target.nextElementSibling) target.nextElementSibling.classList.add('visible')
  }

  const plusButton = (target) => {
    if (target.previousElementSibling) {
      let value = +target.previousElementSibling.value
      value += 1
      target.previousElementSibling.value = value
    }
  }

  const minusButton = (target) => {
    if (target.closest('button[data-countbtn="minus"]').nextElementSibling && 
        target.closest('.product-card').querySelector('.product-card__button') && 
        target.closest('button[data-countbtn="minus"]').parentElement) {

          let value = +target.closest('button[data-countbtn="minus"]').nextElementSibling.value
          value -= 1
          if (value === 0) {
            target.closest('button[data-countbtn="minus"]').nextElementSibling.value = 1
            target.closest('.product-card').querySelector('.product-card__button').classList.remove('hide')
            target.closest('button[data-countbtn="minus"]').parentElement.classList.remove('visible')
          } else if (value < 0) {
            return
          } else {
            target.closest('button[data-countbtn="minus"]').nextElementSibling.value = value
          }
        }
  }

  document.body.addEventListener('click', e => {
    if (e.target.closest('.product-card__button')) {
      hideButton(e.target.closest('.product-card__button'))
    }

    if (e.target.closest('button[data-countbtn="plus"]')) {
      plusButton(e.target.closest('button[data-countbtn="plus"]'))
    }

    if (e.target.closest('button[data-countbtn="minus"]')) {
      minusButton(e.target)
    }
  })

  if (floatBtn) {
    window.addEventListener('scroll', e => {
      if (window.scrollY > 300) {
        floatBtn.classList.add('visible')
      } else {
        floatBtn.classList.remove('visible')
      }
    })
  }
}

export default cart