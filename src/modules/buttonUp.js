const buttonUp = () => {
  const buttonUp = document.querySelector('.up')

  if (buttonUp) {
    buttonUp.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })

    window.addEventListener('scroll', e => {
      if (window.scrollY > 300) {
        buttonUp.classList.add('visible')
      } else {
        buttonUp.classList.remove('visible')
      }
    })
  }
}

export default buttonUp