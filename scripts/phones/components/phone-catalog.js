'use strict';

import Component from '../../component.js'

export default class PhoneCatalog extends Component {
    constructor({element, phones, onPhoneSelected}) {
        super({element});

        this._phones = phones;
        this._cartItems = [];
        this._render();

        this._cart = document.getElementById('cart');

        this.on('click', '[data-element="phone-link"]', (event) => {
            let phoneLink = event.delegateTarget;

            onPhoneSelected(phoneLink.dataset.phoneId);
        });

        this.on('click', '.btn-success', (event) => {
            let itemLink = event.delegateTarget;

            this.addToCart(itemLink.dataset.phoneId);
        });

        this.on('click', '.btn-remove', (event) => {
            let item = event.delegateTarget;

            this.removeFromCart(item.parentElement().dataset.phoneId);
        })
    }

    addToCart(phoneId) {
        this._cartItems.push(phoneId);
        this.renderCart();
    }

    removeFromCart(item) {
        this._cartItems.splice(this._cartItems.indexOf(item), 1);
        this.renderCart();
    }

    renderCart() {
        this._cart.innerHTML = `
    ${ this._cartItems.map(item => `
      <li class="cart-item" data-phone-id="${item }">
      <p>${item }</p> <button class="btn-remove">Удалить из корзины</button>
        </li>
      `).join('') }
    `;
    }

    _render() {
        this._element.innerHTML = `
      <ul class="phones">
        ${ this._phones.map(phone => `
        
          <li class="thumbnail">
            <a
              href="#!/phones/${ phone.id }"
              class="thumb"
              data-element="phone-link"
              data-phone-id="${ phone.id }"
            >
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a data-phone-id="${ phone.id }" class="btn btn-success" >
                Add
              </a>
            </div>
  
            <a 
              href="#!/phones/${ phone.id }"
              data-element="phone-link"
              data-phone-id="${ phone.id }"
            >
              ${ phone.name }
            </a>
            
            <p>${ phone.snippet }</p>
          </li>
        
        `).join('') }
      </ul>
    `;
    }
}
