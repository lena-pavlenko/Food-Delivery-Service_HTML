import search from './search';
import cityModule from './cities/cityModule';
import buttonUp from './buttonUp.js'
import menuTrigger from './menuTrigger';
import slider from './slider.js';
import cart from './cart.js';

export default {
  init() {
    search()
    cityModule()
    buttonUp()
    menuTrigger()
    slider()
    cart()
  }
}