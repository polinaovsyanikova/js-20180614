'use strict'

import Component from '../../component.js';
import PhoneCatalog from "../components/phone-catalog.js";
import PhonesPage from "../phones-page";

console.log(PhoneCatalog);

export default class PhoneViewer extends Component {
    constructor({element}) {
        super({ element });

        this.on('click', '.phone-thumbs li img', (event) => {
            let thumbnail = event.delegateTarget;

            this.initGallery(thumbnail.getAttribute('src'))
        });

        this.on('click', '.btn-back', (event) => {
            let btnBack = event.delegateTarget;
            super.hide();
        });
    }

    showPhone(phone) {
        this._phone = phone;
        this._render();

        super.show();
    }

    initGallery(thumbnailSrc) {
        let mainImage = document.querySelector('.phone');
        mainImage.setAttribute('src', thumbnailSrc);
    }

    _render() {
        this._element.innerHTML = `
      <img class="phone" src="img/phones/motorola-xoom-with-wi-fi.0.jpg">

      <button class="btn-back">Back</button>
      <button class="btn-success">Add to basket</button>
  
  
      <h1>Motorola XOOM™ with Wi-Fi</h1>
  
      <p>Motorola XOOM with Wi-Fi has a super-powerful dual-core processor and Android™ 3.0 (Honeycomb) — the Android platform designed specifically for tablets. With its 10.1-inch HD widescreen display, you’ll enjoy HD video in a thin, light, powerful and upgradeable tablet.</p>
  
      <ul class="phone-thumbs">
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.0.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.1.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.2.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.3.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.4.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.5.jpg">
        </li>
      </ul>
    `;
    }
}
