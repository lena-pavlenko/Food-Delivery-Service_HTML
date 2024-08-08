import cityArray from './cities';

const cityModule = () => {
  const citySelectParent = document.getElementById('citySelect')

  // Выпадашка с городом
  const citySelectHandler = (trigger, option, array) => {

    if (citySelectParent) {
      if (trigger) {
        citySelectParent.classList.toggle('opened')
        injectItems(array)
      }
  
      if (option) {
        citySelectParent.querySelectorAll('.city-select__item').forEach(item => {
          item.classList.remove('city-select__item_current')
        })
        option.classList.add('city-select__item_current')
  
        citySelectParent.querySelector('.city-select__text').innerText = option.innerText
        citySelectParent.querySelector('input').value = option.dataset.id
  
        chooseOption(option.dataset.id, array)
  
        if (citySelectParent.classList.contains('opened')) {
          citySelectParent.classList.remove('opened')
        }
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
      citySelectParent.querySelector('.city-select__drop').insertAdjacentElement('beforeend', list)
    } else {
      citySelectParent.querySelector('.city-select__drop').innerHTML = 'Список пуст'
    }
  }

  // Очищение html
  const clearHtml = () => {
    citySelectParent.querySelector('.city-select__drop').innerHTML = ''
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

  // Выпадашка с городом
  if (citySelectParent) {
    citySelectParent.addEventListener('click', e => {
      citySelectHandler(e.target.closest('.city-select__visible'),e.target.closest('.city-select__item'), cityArray)
    })
  }
  
}

export default cityModule