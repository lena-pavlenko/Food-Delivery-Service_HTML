const menuTrigger = () => {
  const header = document.querySelector('.header')

  if (header) {
    header.addEventListener('click', e => {
      if (e.target.closest('.menu-trigger')) {
        e.target.closest('.menu-trigger').classList.toggle('animate')
        e.target.closest('.menu-trigger').nextElementSibling.classList.toggle('open')
        
        if (screen.width <= 1100) {
          document.body.classList.toggle('no-scroll')
        }
      }
    })
  }
}

export default menuTrigger