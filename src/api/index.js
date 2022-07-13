import apiCaller from '../utils/apiCaller';
import axios from 'axios';
import * as Config from '../constants/Config';

export const getSong = async () => {
  let data = [];
  await apiCaller('api/song', 'get').then((res) => {
    data = res.data;
  });
  return data;
};

export const getSongById = async (id) => {
  let data = [];
  await axios
    .get(`${Config.API_URL}/api/song/get`, { params: { id: id } })
    .then((res) => {
      data = res.data;
    });
  return data;
};

export const signIn = async (payload) => {
  let data;
  await apiCaller('api/login', 'post', payload).then((res) => {
    data = res.data;
  });
  return data;
};
