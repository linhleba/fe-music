import axios from 'axios';
import * as Config from '../constants/Config';
import React from 'react';

const apiCaller = (endpoint, method = 'GET', payload, headers = null) => {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: payload,
    headers: headers,
    // withCredentials: true,
  }).catch(function (error) {
    // handle error
    return error;
  });
};

export default apiCaller;
