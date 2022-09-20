import settings from './settings';
import axios from 'axios';
import cache from './cache';

const get = query => {
  return axios(settings.api + query, {
    headers: {Authorization: cache.token},
    method: 'GET',
  });
};

const getWithPage = endpoint => {
  const link = endpoint;
  return axios(link, {
    headers: {Authorization: cache.token},
    method: 'GET',
  });
};

const postRegister = (endpoint, data) => {
  var data = JSON.stringify(data);
  var config = {
    method: 'post',
    url: settings.api + endpoint,
    headers: {
      Authorization: cache.token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios(config);
};

const checkUser = (endpoint, email) => {
  let formData = new FormData();
  formData.append('email', email);

  var config = {
    headers: {'content-type': 'multipart/form-data'},
  };

  return axios.post(settings.api + endpoint, formData, config);
};

const postLogin = (endpoint, data) => {
  var data = JSON.stringify(data);
  var config = {
    method: 'post',
    url: settings.api + endpoint,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: data,
  };
  return axios(config);
};

export {get, postRegister, postLogin, getWithPage, checkUser};
