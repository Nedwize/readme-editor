import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
});

export const postAPI = (data) => {
  return instance.post('/readme', data);
};
