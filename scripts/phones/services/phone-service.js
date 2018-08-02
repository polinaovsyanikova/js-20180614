'use strict'

import HttpService from '../../common/services/http-service.js';

const PhoneService = {
  getAll(callback) {
    HttpService.sendRequest('phones.json', callback)
  },

  get(phoneId, callback) {
    HttpService.sendRequest(`phones/${phoneId}.json`, callback)
  },
};

export default PhoneService;
