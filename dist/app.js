(function () {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var HIDDEN_CLASS = 'js-hidden';

var Component = function () {
  function Component(_ref) {
    var element = _ref.element;
    classCallCheck(this, Component);

    this._element = element;
  }

  createClass(Component, [{
    key: 'show',
    value: function show() {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }, {
    key: '_trigger',
    value: function _trigger(eventName, data) {
      var customEvent = new CustomEvent(eventName, {
        detail: data
      });

      this._element.dispatchEvent(customEvent);
    }
  }, {
    key: 'on',
    value: function on(eventName, selector, callback) {
      if (!callback) {
        callback = selector;
        this._element.addEventListener(eventName, callback);

        return;
      }

      this._element.addEventListener(eventName, function (event) {
        var delegateTarget = event.target.closest(selector);

        if (!delegateTarget) {
          return;
        }

        event.delegateTarget = delegateTarget;

        callback(event);
      });
    }
  }]);
  return Component;
}();

var PhoneCatalog = function (_Component) {
  inherits(PhoneCatalog, _Component);

  function PhoneCatalog(_ref) {
    var element = _ref.element;
    classCallCheck(this, PhoneCatalog);

    var _this = possibleConstructorReturn(this, (PhoneCatalog.__proto__ || Object.getPrototypeOf(PhoneCatalog)).call(this, { element: element }));

    _this.on('click', '[data-element="phone-link"]', function (event) {
      var phoneLink = event.delegateTarget;
      var phoneElement = phoneLink.closest('[data-element="phone"]');

      _this._trigger('phoneSelected', phoneElement.dataset.phoneId);
    });

    _this.on('click', '[data-element="button-add"]', function (event) {
      var addButton = event.delegateTarget;
      var phoneElement = addButton.closest('[data-element="phone"]');

      _this._trigger('addToShoppingCart', phoneElement.dataset.phoneId);
    });
    return _this;
  }

  createClass(PhoneCatalog, [{
    key: 'showPhones',
    value: function showPhones(phones) {
      this._phones = phones;

      this._render();

      this.show();
    }
  }, {
    key: '_render',
    value: function _render() {
      this._element.innerHTML = '\n      <ul class="phones">\n        ' + this._phones.map(function (phone) {
        return '\n        \n          <li\n            class="thumbnail"\n            data-element="phone"\n            data-phone-id="' + phone.id + '"\n          >\n            <a\n              href="#!/phones/' + phone.id + '"\n              class="thumb"\n              data-element="phone-link"\n            >\n              <img alt="' + phone.name + '" src="' + phone.imageUrl + '">\n            </a>\n  \n            <div class="phones__btn-buy-wrapper">\n              <a class="btn btn-success" data-element="button-add">\n                Add\n              </a>\n            </div>\n  \n            <a \n              href="#!/phones/' + phone.id + '"\n              data-element="phone-link"\n            >\n              ' + phone.name + '\n            </a>\n            \n            <p>' + phone.snippet + '</p>\n          </li>\n        \n        ';
      }).join('') + '\n      </ul>\n    ';
    }
  }]);
  return PhoneCatalog;
}(Component);

console.log(PhoneCatalog);

var PhoneViewer = function (_Component) {
  inherits(PhoneViewer, _Component);

  function PhoneViewer(_ref) {
    var element = _ref.element;
    classCallCheck(this, PhoneViewer);

    var _this = possibleConstructorReturn(this, (PhoneViewer.__proto__ || Object.getPrototypeOf(PhoneViewer)).call(this, { element: element }));

    _this.on('click', '[data-element="button-back"]', function () {
      _this._trigger('back');
    });

    _this.on('click', '[data-element="button-add"]', function () {
      _this._trigger('add', _this._phone.id);
    });
    return _this;
  }

  createClass(PhoneViewer, [{
    key: 'showPhone',
    value: function showPhone(phone) {
      this._phone = phone;
      this._render(phone);

      get(PhoneViewer.prototype.__proto__ || Object.getPrototypeOf(PhoneViewer.prototype), 'show', this).call(this);
    }
  }, {
    key: '_render',
    value: function _render(phone) {
      this._element.innerHTML = '\n      <img class="phone" src="' + phone.images[0] + '">\n\n      <button data-element="button-back">Back</button>\n      <button data-element="button-add">Add to basket</button>\n  \n  \n      <h1>' + phone.name + '</h1>\n\n      <p>' + phone.description + '</p>  \n  \n      <ul class="phone-thumbs">\n        ' + phone.images.map(function (image) {
        return '\n\n          <li>\n            <img src="' + image + '">\n          </li>\n          \n        ';
      }).join('') + '\n      </ul>\n    ';
    }
  }]);
  return PhoneViewer;
}(Component);

var API_URL = 'https://mgrinko.github.io/js-20180614/api/';

var HttpService = {
  sendRequest: function sendRequest(url, successCallback, errorCallback) {
    var method = 'GET';
    var xhr = new XMLHttpRequest();

    xhr.open(method, API_URL + url, true);
    xhr.send();

    xhr.onload = function () {
      var responseData = JSON.parse(xhr.responseText);

      successCallback(responseData);
    };

    xhr.onerror = function () {
      errorCallback(new Error(xhr.status + ': ' + xhr.statusText));
    };
  }
};

var PhoneService = {
  getAll: function getAll(callback) {
    HttpService.sendRequest('phones.json', callback);
  },
  get: function get(phoneId, callback) {
    HttpService.sendRequest('phones/' + phoneId + '.json', callback);
  }
};

var PhonesFilter = function (_Component) {
    inherits(PhonesFilter, _Component);

    function PhonesFilter(_ref) {
        var element = _ref.element;
        classCallCheck(this, PhonesFilter);

        var _this = possibleConstructorReturn(this, (PhonesFilter.__proto__ || Object.getPrototypeOf(PhonesFilter)).call(this, { element: element }));

        _this._element = element;

        _this._render();

        _this.on('click', '[data-element="btn-search"]', function (event) {
            event.preventDefault();
            var value = event.delegateTarget.previousElementSibling.value;
            console.log(value);

            _this._filter(value);
        });

        _this.on('change', '[data-element="sort"]', function (event) {
            var value = event.delegateTarget.value;

            console.log(value);

            _this._sort(value);
        });
        return _this;
    }

    createClass(PhonesFilter, [{
        key: '_filter',
        value: function _filter(value) {
            var _this2 = this;

            // this._catalog = new PhoneCatalog({
            //     element: this._element.querySelector('[data-component="phone-catalog"]'),
            // });

            PhoneService.getAll(function (phones) {
                phones.sort(function (a, b) {
                    if (a.id < b.id) return -1;
                    if (a.id > b.id) return 1;
                    return 0;
                });

                console.log(phones);
                _this2._catalog.showPhones(phones);
            });
        }
    }, {
        key: '_sort',
        value: function _sort(value) {
            var _this3 = this;

            var catalog = document.querySelector('[data-component="phone-catalog"]');

            this._catalog = new PhoneCatalog({
                element: catalog
            });

            PhoneService.getAll(function (phones) {
                if (value === 'name') {
                    phones.sort(function (a, b) {
                        if (a.id < b.id) return -1;
                        if (a.id > b.id) return 1;
                        return 0;
                    });
                } else if (value = 'age') {
                    phones.sort(function (a, b) {
                        if (a.age < b.age) return -1;
                        if (a.age > b.age) return 1;
                        return 0;
                    });
                }

                _this3._catalog.showPhones(phones);
            });
        }
    }, {
        key: '_render',
        value: function _render() {
            this._element.innerHTML = '\n      <p>\n        Search:\n        <form>\n        <input data-element="search">\n            <button data-element="btn-search">\u041F\u043E\u0438\u0441\u043A</button>\n        </form>\n        \n      </p>\n\n      <p>\n        Sort by:\n        <select data-element="sort">\n          <option value="name">Alphabetical</option>\n          <option value="age">Newest</option>\n        </select>\n      </p>\n    ';
        }
    }]);
    return PhonesFilter;
}(Component);

var ShoppingCart = function (_Component) {
  inherits(ShoppingCart, _Component);

  function ShoppingCart(_ref) {
    var element = _ref.element;
    classCallCheck(this, ShoppingCart);

    var _this = possibleConstructorReturn(this, (ShoppingCart.__proto__ || Object.getPrototypeOf(ShoppingCart)).call(this, { element: element }));

    _this._items = {};

    _this._render();

    _this.on('click', '[data-element="button-remove"]', function (event) {
      var item = event.delegateTarget.dataset.item;

      _this.removeItem(item);
    });
    return _this;
  }

  createClass(ShoppingCart, [{
    key: 'addItem',
    value: function addItem(item) {
      if (!this._items[item]) {
        this._items[item] = 0;
      }

      this._items[item]++;

      this._render();
    }
  }, {
    key: 'removeItem',
    value: function removeItem(item) {
      if (this._items[item]) {
        this._items[item]--;
      }

      if (this._items[item] === 0) {
        delete this._items[item];
      }

      this._render();
    }
  }, {
    key: '_render',
    value: function _render() {
      var _this2 = this;

      this._element.innerHTML = '\n      <p>Shopping Cart</p>\n      <ul>\n        ' + Object.keys(this._items).map(function (item) {
        return '\n        \n          <li>\n            ' + item + ' (' + _this2._items[item] + ')\n            <button\n              data-element="button-remove"\n              data-item="' + item + '"\n            >\n              x\n            </button>\n          </li>\n        \n        ';
      }).join('') + '\n      </ul>\n    ';
    }
  }]);
  return ShoppingCart;
}(Component);

var PhonesPage = function () {
  function PhonesPage(_ref) {
    var element = _ref.element;
    classCallCheck(this, PhonesPage);

    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilters();
  }

  createClass(PhonesPage, [{
    key: '_initCatalog',
    value: function _initCatalog() {
      var _this = this;

      this._catalog = new PhoneCatalog({
        element: this._element.querySelector('[data-component="phone-catalog"]')
      });

      PhoneService.getAll(function (phones) {
        _this._catalog.showPhones(phones);
      });

      this._catalog.on('phoneSelected', function (event) {
        var phoneId = event.detail;

        PhoneService.get(phoneId, function (phone) {
          _this._catalog.hide();
          _this._viewer.showPhone(phone);
        });
      });

      this._catalog.on('addToShoppingCart', function (event) {
        var phoneId = event.detail;

        _this._shoppingCart.addItem(phoneId);
      });
    }
  }, {
    key: '_initViewer',
    value: function _initViewer() {
      var _this2 = this;

      this._viewer = new PhoneViewer({
        element: this._element.querySelector('[data-component="phone-viewer"]')
      });

      this._viewer.on('back', function () {
        _this2._viewer.hide();
        _this2._catalog.show();
      });

      this._viewer.on('add', function (event) {
        var phoneId = event.detail;

        _this2._shoppingCart.addItem(phoneId);
      });
    }
  }, {
    key: '_initShoppingCart',
    value: function _initShoppingCart() {
      this._shoppingCart = new ShoppingCart({
        element: this._element.querySelector('[data-component="shopping-cart"]')
      });
    }
  }, {
    key: '_initFilters',
    value: function _initFilters() {
      this._filter = new PhonesFilter({
        element: this._element.querySelector('[data-component="phones-filter"]')
      });
    }
  }, {
    key: '_render',
    value: function _render() {
      this._element.innerHTML = '\n      <div class="container-fluid">\n        <div class="row">\n      \n          <!--Sidebar-->\n          <div class="col-md-2">\n            <section>\n              <div data-component="phones-filter"></div>\n            </section>\n      \n            <section>\n              <div data-component="shopping-cart"></div>\n            </section>\n          </div>\n      \n          <!--Main content-->\n          <div class="col-md-10">\n            <div data-component="phone-catalog"></div>\n            <div data-component="phone-viewer" class="js-hidden"></div>\n          </div>\n        </div>\n      </div>\n    ';
    }
  }]);
  return PhonesPage;
}();

new PhonesPage({
  element: document.querySelector('[data-page-container]')
});

}());
