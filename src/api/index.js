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

export const getGenre = async () => {
  let data = [];
  await apiCaller('api/genre', 'get').then((res) => {
    data = res.data.object;
  });
  return data;
};
export const getAuthor = async () => {
  let data = [];
  await apiCaller('api/author', 'get').then((res) => {
    data = res.data;
  });
  return data;
};

export const uploadSong = async (payload) => {
  let status;
  await apiCaller('api/song/upload', 'post', payload, {
    Accept: 'application/json',
  }).then((res) => {
    status = res.data.status;
  });
  return status;
};

export const deleteSong = async (id) => {
  let status;
  await apiCaller('api/song/delete', 'delete', null, { id: id }).then((res) => {
    status = res.data.status;
  });

  return status;
};
