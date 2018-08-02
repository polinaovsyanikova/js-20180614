'use strict'

const HIDDEN_CLASS = 'js-hidden';

export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  show() {
    this._element.classList.remove(HIDDEN_CLASS)
  }

  hide() {
    this._element.classList.add(HIDDEN_CLASS)
  }

  _trigger(eventName, data) {
    let customEvent = new CustomEvent(eventName, {
      detail: data
    });

    this._element.dispatchEvent(customEvent);
  }

  on(eventName, selector, callback) {
    if (!callback) {
      callback = selector
      this._element.addEventListener(eventName, callback);

      return;
    }

    this._element.addEventListener(eventName, (event) => {
      let delegateTarget = event.target.closest(selector);

      if (!delegateTarget) {
        return;
      }

      event.delegateTarget = delegateTarget;

      callback(event);
    });
  }
}
