'use strict'

import HttpService from '../../common/services/http-service.js';

const PhoneService = {
  getAll(callback) {
    HttpService.sendRequest('/api/phones.json', callback)
  },

  get(phoneId, callback) {
    HttpService.sendRequest(`/api/phones/${phoneId}.json`, callback)
  },
};

export default PhoneService;
