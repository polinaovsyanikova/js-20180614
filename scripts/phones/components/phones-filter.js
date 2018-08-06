import Component from "../../component";
import PhoneCatalog from './phone-catalog.js';
import PhoneService from '../services/phone-service';

export default class PhonesFilter extends Component {
    constructor({element}) {
        super({element});
        this._element = element;

        this._render();

        this.on('click', '[data-element="btn-search"]', (event) => {
            event.preventDefault();
            let value = event.delegateTarget.previousElementSibling.value;
            console.log(value);

            this._filter(value);
        });

        this.on('change', '[data-element="sort"]', (event) => {
            let value = event.delegateTarget.value;

            console.log(value);

            this._sort(value);
        });
    }

    _filter(value) {
        let catalog = document.querySelector('[data-component="phone-catalog"]');

        this._catalog = new PhoneCatalog({
            element: catalog,
        });

        PhoneService.getAll((phones) => {
            phones.filter(function(a, b){
                if(a.id < b.id) return -1;
                if(a.id > b.id) return 1;
                return 0;
            });

            console.log(phones);
            this._catalog.showPhones(phones)
        });
    }

    _sort(value) {
        let catalog = document.querySelector('[data-component="phone-catalog"]');

        this._catalog = new PhoneCatalog({
            element: catalog,
        });

        PhoneService.getAll((phones) => {
            if (value === 'name') {
                phones.sort(function(a, b){
                    if(a.id < b.id) return -1;
                    if(a.id > b.id) return 1;
                    return 0;
                });
            } else if (value = 'age') {
                phones.sort(function(a, b){
                    if(a.age < b.age) return -1;
                    if(a.age > b.age) return 1;
                    return 0;
                });
            }

            this._catalog.showPhones(phones)
        });
    }

    _render() {
        this._element.innerHTML = `
      <p>
        Search:
        <form>
        <input data-element="search">
            <button data-element="btn-search">Поиск</button>
        </form>
        
      </p>

      <p>
        Sort by:
        <select data-element="sort">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
    }
}
