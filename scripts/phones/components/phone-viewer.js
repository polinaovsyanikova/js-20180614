'use strict'

import Component from '../../component.js';

export default class PhoneViewer extends Component {

  showPhone(phone) {
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
