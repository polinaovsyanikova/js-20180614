import Component from '../../component.js'

export default class ShoppingCart extends Component {
    constructor ({element}) {
        super ({element});

        this._items = {};
        this._cart = document.querySelector('ul[data-element=shopping-list]');
        this._render();

        this.on('click', 'data-element="btn-remove"', (event) => {
            let item = event.delegateTarget.dataset.item;

            this.removeItem(item);
        })
    }

    addItem(phoneId) {
        if (!this._items[item]) {
            this._items[item] = 0;
        }

        this._items[item]++;

        this._update();
    }

    removeItem(item) {
        if (this._items[item]) {
            this._items[item]--;
        }

        if (this._items[item] === 0) {
            delete this._items[item];
        }

        this._update();
    }

    _render() {
        this._element.innerHTML = `
        <ul data-element="shopping-list">Shopping cart</ul>
    `;
    }

    _update() {
        this._cart.innerHTML = `
           ${ Object.keys(this._items).map(item => `
             <li>
              ${ item } (${ this._items[item] })
               <button
                data-element="btn-remove"
                data-item="${ item }"
               >
                x
               </button>
             </li>
        `).join('')}
    `;
    }
}