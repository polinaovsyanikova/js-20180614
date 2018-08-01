'use strict'

import Component from '../../component.js';
import PhoneCatalog from "../components/phone-catalog.js";
import PhonesPage from "../phones-page";

console.log(PhoneCatalog);

export default class PhoneViewer extends Component {

  constructor ({ element }) {
    super({ element });

    this.on('click', '[data-element="button-back"]', () => {
      this._trigger('back');
    });

    this.on('click', '[data-element="button-add"]', () => {
      this._trigger('add', this._phone.id);
    });
  }

  showPhone(phone) {
    this._phone = phone;
    this._render(phone);

    super.show();
  }

  _render(phone) {
    this._element.innerHTML = `
      <img class="phone" src="${ phone.images[0] }">

      <button data-element="button-back">Back</button>
      <button data-element="button-add">Add to basket</button>
  
  
      <h1>${ phone.name }</h1>

      <p>${ phone.description }</p>  
  
      <ul class="phone-thumbs">
        ${ phone.images.map(image => `

          <li>
            <img src="${ image }">
          </li>
          
        `).join('')}
      </ul>
    `;
  }
}
