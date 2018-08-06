'use strict'

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ShoppingCart from './components/shopping-cart.js';


export default class PhonesPage {
    constructor({element}) {
        this._element = element;

        this._render();

        this._initCatalog();
        this._initViewer();
        this._initShoppingCart();
    }

    _initCatalog() {
        this._catalog = new PhoneCatalog({
            element: this._element.querySelector('[data-component="phone-catalog"]'),
            phones: PhoneService.getAll(),

            onPhoneSelected: (phoneId) => {
                let phone = PhoneService.get(phoneId);

                this._catalog.hide();
                this._viewer.showPhone(phone);
            },

            backToCatalog: () => {
                this._catalog.show();
            }
        });

        this._catalog.on('addToShoppingCart', (event) => {
            let phoneId = event.detail;

            this._cart.addItem(phoneId);
        });
    }

    _initViewer() {
        this._viewer = new PhoneViewer({
            element: this._element.querySelector('[data-component="phone-viewer"]'),
        });
    }

    _initShoppingCart() {
        this._cart = new ShoppingCart({
            element: this._element.querySelector('[data-component="shopping-cart"]'),
        });
    }

    _render() {
        this._element.innerHTML = `
      <div class="container-fluid">
        <div class="row"
      
          <!--Sidebar-->
          <div class="col-md-2">
            <section>
              <p>
                Search:
                <input>
              </p>
      
              <p>
                Sort by:
                <select>
                  <option value="name">Alphabetical</option>
                  <option value="age">Newest</option>
                </select>
              </p>
            </section>
      
           <section>
              <div data-component="shopping-cart"></div>
            </section>
          </div>
      
          <!--Main content-->
          <div class="col-md-10">
            <div data-component="phone-catalog"></div>
            <div data-component="phone-viewer" class="js-hidden"></div>
          </div>
        </div>
      </div>
    `;
    }
}
