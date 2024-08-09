const filterProds = () => {
  const filterButtons = document.querySelectorAll('.product-filter__button')
  const products = document.querySelectorAll('.product-card[data-type]')

  document.addEventListener('click', e => {
    if (e.target.closest('.product-filter__button')) {
      const currentBtn = e.target.closest('.product-filter__button')
      filterButtons.forEach(btn => {
        btn.classList.remove('product-filter__button_current')
      })
      currentBtn.classList.add('product-filter__button_current')

      if (products.length) {
        products.forEach(product => {
          if (product.dataset.type === currentBtn.dataset.filter) {
            product.classList.remove('hidden')
          } else {
            product.classList.add('hidden')
          }

          if (currentBtn.dataset.filter === 'all') {
            product.classList.remove('hidden')
          }
        })
      }
    }
  })
}

export default filterProds