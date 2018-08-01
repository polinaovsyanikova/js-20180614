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
    key: 'on',
    value: function on(eventName, selector, callback) {
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
    var element = _ref.element,
        phones = _ref.phones,
        onPhoneSelected = _ref.onPhoneSelected;
    classCallCheck(this, PhoneCatalog);

    var _this = possibleConstructorReturn(this, (PhoneCatalog.__proto__ || Object.getPrototypeOf(PhoneCatalog)).call(this, { element: element }));

    _this._phones = phones;
    _this._cartItems = [];
    _this._render();

    _this._cart = document.getElementById('cart');

    _this.on('click', '[data-element="phone-link"]', function (event) {
      var phoneLink = event.delegateTarget;

      onPhoneSelected(phoneLink.dataset.phoneId);
    });

    _this.on('click', '.btn-success', function (event) {
      var itemLink = event.delegateTarget;

      _this.addToCart(itemLink.dataset.phoneId);
    });

    _this.on('click', '#cart', function (event) {
      var item = event.delegateTarget;
      console.log(item);

      _this.removeFromCart(item.parentElement().dataset.phoneId);
    });
    return _this;
  }

  createClass(PhoneCatalog, [{
    key: 'addToCart',
    value: function addToCart(phoneId) {
      this._cartItems.push(phoneId);
      this.renderCart();
    }
  }, {
    key: 'removeFromCart',
    value: function removeFromCart(item) {
      this._cartItems.splice(this._cartItems.indexOf(item), 1);
      this.renderCart();
    }
  }, {
    key: 'renderCart',
    value: function renderCart() {
      this._cart.innerHTML = '\n    ' + this._cartItems.map(function (item) {
        return '\n      <li class="cart-item" data-phone-id="' + item + '">\n      <p>' + item + '</p> <button class="btn-remove">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0438\u0437 \u043A\u043E\u0440\u0437\u0438\u043D\u044B</button>\n        </li>\n      ';
      }).join('') + '\n    ';
    }
  }, {
    key: '_render',
    value: function _render() {
      this._element.innerHTML = '\n      <ul class="phones">\n        ' + this._phones.map(function (phone) {
        return '\n        \n          <li class="thumbnail">\n            <a\n              href="#!/phones/' + phone.id + '"\n              class="thumb"\n              data-element="phone-link"\n              data-phone-id="' + phone.id + '"\n            >\n              <img alt="' + phone.name + '" src="' + phone.imageUrl + '">\n            </a>\n  \n            <div class="phones__btn-buy-wrapper">\n              <a data-phone-id="' + phone.id + '" class="btn btn-success" >\n                Add\n              </a>\n            </div>\n  \n            <a \n              href="#!/phones/' + phone.id + '"\n              data-element="phone-link"\n              data-phone-id="' + phone.id + '"\n            >\n              ' + phone.name + '\n            </a>\n            \n            <p>' + phone.snippet + '</p>\n          </li>\n        \n        ';
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

        _this.on('click', '.phone-thumbs li img', function (event) {
            var thumbnail = event.delegateTarget;

            _this.initGallery(thumbnail.getAttribute('src'));
        });

        _this.on('click', '.btn-back', function (event) {
            var btnBack = event.delegateTarget;
            get(PhoneViewer.prototype.__proto__ || Object.getPrototypeOf(PhoneViewer.prototype), 'hide', _this).call(_this);
        });
        return _this;
    }

    createClass(PhoneViewer, [{
        key: 'showPhone',
        value: function showPhone(phone) {
            this._phone = phone;
            this._render();

            get(PhoneViewer.prototype.__proto__ || Object.getPrototypeOf(PhoneViewer.prototype), 'show', this).call(this);
        }
    }, {
        key: 'initGallery',
        value: function initGallery(thumbnailSrc) {
            var mainImage = document.querySelector('.phone');
            mainImage.setAttribute('src', thumbnailSrc);
        }
    }, {
        key: '_render',
        value: function _render() {
            this._element.innerHTML = '\n      <img class="phone" src="img/phones/motorola-xoom-with-wi-fi.0.jpg">\n\n      <button class="btn-back">Back</button>\n      <button class="btn-success">Add to basket</button>\n  \n  \n      <h1>Motorola XOOM\u2122 with Wi-Fi</h1>\n  \n      <p>Motorola XOOM with Wi-Fi has a super-powerful dual-core processor and Android\u2122 3.0 (Honeycomb) \u2014 the Android platform designed specifically for tablets. With its 10.1-inch HD widescreen display, you\u2019ll enjoy HD video in a thin, light, powerful and upgradeable tablet.</p>\n  \n      <ul class="phone-thumbs">\n        <li>\n          <img src="img/phones/motorola-xoom-with-wi-fi.0.jpg">\n        </li>\n        <li>\n          <img src="img/phones/motorola-xoom-with-wi-fi.1.jpg">\n        </li>\n        <li>\n          <img src="img/phones/motorola-xoom-with-wi-fi.2.jpg">\n        </li>\n        <li>\n          <img src="img/phones/motorola-xoom-with-wi-fi.3.jpg">\n        </li>\n        <li>\n          <img src="img/phones/motorola-xoom-with-wi-fi.4.jpg">\n        </li>\n        <li>\n          <img src="img/phones/motorola-xoom-with-wi-fi.5.jpg">\n        </li>\n      </ul>\n    ';
        }
    }]);
    return PhoneViewer;
}(Component);

var phonesFromServer = [{
  "age": 0,
  "id": "motorola-xoom-with-wi-fi",
  "imageUrl": "img/phones/motorola-xoom-with-wi-fi.0.jpg",
  "name": "Motorola XOOM\u2122 with Wi-Fi",
  "snippet": "The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
}, {
  "age": 1,
  "id": "motorola-xoom",
  "imageUrl": "img/phones/motorola-xoom.0.jpg",
  "name": "MOTOROLA XOOM\u2122",
  "snippet": "The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM, the world's first tablet powered by Android 3.0 (Honeycomb)."
}, {
  "age": 2,
  "carrier": "AT&T",
  "id": "motorola-atrix-4g",
  "imageUrl": "img/phones/motorola-atrix-4g.0.jpg",
  "name": "MOTOROLA ATRIX\u2122 4G",
  "snippet": "MOTOROLA ATRIX 4G the world's most powerful smartphone."
}, {
  "age": 3,
  "id": "dell-streak-7",
  "imageUrl": "img/phones/dell-streak-7.0.jpg",
  "name": "Dell Streak 7",
  "snippet": "Introducing Dell\u2122 Streak 7. Share photos, videos and movies together. It\u2019s small enough to carry around, big enough to gather around."
}, {
  "age": 4,
  "carrier": "Cellular South",
  "id": "samsung-gem",
  "imageUrl": "img/phones/samsung-gem.0.jpg",
  "name": "Samsung Gem\u2122",
  "snippet": "The Samsung Gem\u2122 brings you everything that you would expect and more from a touch display smart phone \u2013 more apps, more features and a more affordable price."
}, {
  "age": 5,
  "carrier": "Dell",
  "id": "dell-venue",
  "imageUrl": "img/phones/dell-venue.0.jpg",
  "name": "Dell Venue",
  "snippet": "The Dell Venue; Your Personal Express Lane to Everything"
}, {
  "age": 6,
  "carrier": "Best Buy",
  "id": "nexus-s",
  "imageUrl": "img/phones/nexus-s.0.jpg",
  "name": "Nexus S",
  "snippet": "Fast just got faster with Nexus S. A pure Google experience, Nexus S is the first phone to run Gingerbread (Android 2.3), the fastest version of Android yet."
}, {
  "age": 7,
  "carrier": "Cellular South",
  "id": "lg-axis",
  "imageUrl": "img/phones/lg-axis.0.jpg",
  "name": "LG Axis",
  "snippet": "Android Powered, Google Maps Navigation, 5 Customizable Home Screens"
}, {
  "age": 8,
  "id": "samsung-galaxy-tab",
  "imageUrl": "img/phones/samsung-galaxy-tab.0.jpg",
  "name": "Samsung Galaxy Tab\u2122",
  "snippet": "Feel Free to Tab\u2122. The Samsung Galaxy Tab\u2122 brings you an ultra-mobile entertainment experience through its 7\u201D display, high-power processor and Adobe\xAE Flash\xAE Player compatibility."
}, {
  "age": 9,
  "carrier": "Cellular South",
  "id": "samsung-showcase-a-galaxy-s-phone",
  "imageUrl": "img/phones/samsung-showcase-a-galaxy-s-phone.0.jpg",
  "name": "Samsung Showcase\u2122 a Galaxy S\u2122 phone",
  "snippet": "The Samsung Showcase\u2122 delivers a cinema quality experience like you\u2019ve never seen before. Its innovative 4\u201D touch display technology provides rich picture brilliance, even outdoors"
}, {
  "age": 10,
  "carrier": "Verizon",
  "id": "droid-2-global-by-motorola",
  "imageUrl": "img/phones/droid-2-global-by-motorola.0.jpg",
  "name": "DROID\u2122 2 Global by Motorola",
  "snippet": "The first smartphone with a 1.2 GHz processor and global capabilities."
}, {
  "age": 11,
  "carrier": "Verizon",
  "id": "droid-pro-by-motorola",
  "imageUrl": "img/phones/droid-pro-by-motorola.0.jpg",
  "name": "DROID\u2122 Pro by Motorola",
  "snippet": "The next generation of DOES."
}, {
  "age": 12,
  "carrier": "AT&T",
  "id": "motorola-bravo-with-motoblur",
  "imageUrl": "img/phones/motorola-bravo-with-motoblur.0.jpg",
  "name": "MOTOROLA BRAVO\u2122 with MOTOBLUR\u2122",
  "snippet": "An experience to cheer about."
}, {
  "age": 13,
  "carrier": "T-Mobile",
  "id": "motorola-defy-with-motoblur",
  "imageUrl": "img/phones/motorola-defy-with-motoblur.0.jpg",
  "name": "Motorola DEFY\u2122 with MOTOBLUR\u2122",
  "snippet": "Are you ready for everything life throws your way?"
}, {
  "age": 14,
  "carrier": "T-Mobile",
  "id": "t-mobile-mytouch-4g",
  "imageUrl": "img/phones/t-mobile-mytouch-4g.0.jpg",
  "name": "T-Mobile myTouch 4G",
  "snippet": "The T-Mobile myTouch 4G is a premium smartphone designed to deliver blazing fast 4G speeds so that you can video chat from practically anywhere, with or without Wi-Fi."
}, {
  "age": 15,
  "carrier": "US Cellular",
  "id": "samsung-mesmerize-a-galaxy-s-phone",
  "imageUrl": "img/phones/samsung-mesmerize-a-galaxy-s-phone.0.jpg",
  "name": "Samsung Mesmerize\u2122 a Galaxy S\u2122 phone",
  "snippet": "The Samsung Mesmerize\u2122 delivers a cinema quality experience like you\u2019ve never seen before. Its innovative 4\u201D touch display technology provides rich picture brilliance,even outdoors"
}, {
  "age": 16,
  "carrier": "Sprint",
  "id": "sanyo-zio",
  "imageUrl": "img/phones/sanyo-zio.0.jpg",
  "name": "SANYO ZIO",
  "snippet": "The Sanyo Zio by Kyocera is an Android smartphone with a combination of ultra-sleek styling, strong performance and unprecedented value."
}, {
  "age": 17,
  "id": "samsung-transform",
  "imageUrl": "img/phones/samsung-transform.0.jpg",
  "name": "Samsung Transform\u2122",
  "snippet": "The Samsung Transform\u2122 brings you a fun way to customize your Android powered touch screen phone to just the way you like it through your favorite themed \u201CSprint ID Service Pack\u201D."
}, {
  "age": 18,
  "id": "t-mobile-g2",
  "imageUrl": "img/phones/t-mobile-g2.0.jpg",
  "name": "T-Mobile G2",
  "snippet": "The T-Mobile G2 with Google is the first smartphone built for 4G speeds on T-Mobile's new network. Get the information you need, faster than you ever thought possible."
}, {
  "age": 19,
  "id": "motorola-charm-with-motoblur",
  "imageUrl": "img/phones/motorola-charm-with-motoblur.0.jpg",
  "name": "Motorola CHARM\u2122 with MOTOBLUR\u2122",
  "snippet": "Motorola CHARM fits easily in your pocket or palm.  Includes MOTOBLUR service."
}];
var phoneFromServer = {
  "additionalFeatures": "Front Facing 1.3MP Camera",
  "android": {
    "os": "Android 2.2",
    "ui": "Dell Stage"
  },
  "availability": ["T-Mobile"],
  "battery": {
    "standbyTime": "",
    "talkTime": "",
    "type": "Lithium Ion (Li-Ion) (2780 mAH)"
  },
  "camera": {
    "features": ["Flash", "Video"],
    "primary": "5.0 megapixels"
  },
  "connectivity": {
    "bluetooth": "Bluetooth 2.1",
    "cell": "T-mobile HSPA+ @ 2100/1900/AWS/850 MHz",
    "gps": true,
    "infrared": false,
    "wifi": "802.11 b/g"
  },
  "description": "Introducing Dell\u2122 Streak 7. Share photos, videos and movies together. It\u2019s small enough to carry around, big enough to gather around. Android\u2122 2.2-based tablet with over-the-air upgrade capability for future OS releases.  A vibrant 7-inch, multitouch display with full Adobe\xAE Flash 10.1 pre-installed.  Includes a 1.3 MP front-facing camera for face-to-face chats on popular services such as Qik or Skype.  16 GB of internal storage, plus Wi-Fi, Bluetooth and built-in GPS keeps you in touch with the world around you.  Connect on your terms. Save with 2-year contract or flexibility with prepaid pay-as-you-go plans",
  "display": {
    "screenResolution": "WVGA (800 x 480)",
    "screenSize": "7.0 inches",
    "touchScreen": true
  },
  "hardware": {
    "accelerometer": true,
    "audioJack": "3.5mm",
    "cpu": "nVidia Tegra T20",
    "fmRadio": false,
    "physicalKeyboard": false,
    "usb": "USB 2.0"
  },
  "id": "dell-streak-7",
  "images": ["img/phones/dell-streak-7.0.jpg", "img/phones/dell-streak-7.1.jpg", "img/phones/dell-streak-7.2.jpg", "img/phones/dell-streak-7.3.jpg", "img/phones/dell-streak-7.4.jpg"],
  "name": "Dell Streak 7",
  "sizeAndWeight": {
    "dimensions": ["199.9 mm (w)", "119.8 mm (h)", "12.4 mm (d)"],
    "weight": "450.0 grams"
  },
  "storage": {
    "flash": "16000MB",
    "ram": "512MB"
  }
};

var PhoneService = {
  getAll: function getAll() {
    return phonesFromServer;
  },
  get: function get(phoneId) {
    return phoneFromServer;
  }
};

var PhonesPage = function () {
  function PhonesPage(_ref) {
    var element = _ref.element;
    classCallCheck(this, PhonesPage);

    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
  }

  createClass(PhonesPage, [{
    key: '_initCatalog',
    value: function _initCatalog() {
      var _this = this;

      this._catalog = new PhoneCatalog({
        element: this._element.querySelector('[data-component="phone-catalog"]'),
        phones: PhoneService.getAll(),

        onPhoneSelected: function onPhoneSelected(phoneId) {
          var phone = PhoneService.get(phoneId);

          _this._catalog.hide();
          _this._viewer.showPhone(phone);
        },

        backToCatalog: function backToCatalog() {
          _this._catalog.show();
        }
      });
    }
  }, {
    key: '_initViewer',
    value: function _initViewer() {
      this._viewer = new PhoneViewer({
        element: this._element.querySelector('[data-component="phone-viewer"]')
      });
    }
  }, {
    key: '_render',
    value: function _render() {
      this._element.innerHTML = '\n      <div class="container-fluid">\n        <div class="row">\n      \n          <!--Sidebar-->\n          <div class="col-md-2">\n            <section>\n              <p>\n                Search:\n                <input>\n              </p>\n      \n              <p>\n                Sort by:\n                <select>\n                  <option value="name">Alphabetical</option>\n                  <option value="age">Newest</option>\n                </select>\n              </p>\n            </section>\n      \n            <section>\n              <p>Shopping Cart</p>\n              <ul id="cart">\n              </ul>\n            </section>\n          </div>\n      \n          <!--Main content-->\n          <div class="col-md-10">\n            <div data-component="phone-catalog"></div>\n            <div data-component="phone-viewer" class="js-hidden"></div>\n          </div>\n        </div>\n      </div>\n    ';
    }
  }]);
  return PhonesPage;
}();

new PhonesPage({
  element: document.querySelector('[data-page-container]')
});

}());
