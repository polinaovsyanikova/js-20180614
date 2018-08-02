export default class ShoppingCart {
  constructor({ element }) {
    this._element = element;

    this._items = [];

    this._render();
  }

  addItem(item) {
    this._items.push(item);

    this._render();
  }

  _render() {
    if (this._items.length === 0) {
      this._element.innerHTML = `
        <p>Shopping Cart</p>
        <p>No items yet</p>
      `;

      return;
    }


    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${ this._items.map(item => `
        
          <li>${ item } <button>x</button></li>
        
        `).join('')}
      </ul>
    `;
  }
}
