import axios from 'axios';
import { apiConfig } from '../config/api.config';
import { getLocalAccessToken } from './token.service';

const instance = axios.create({ ...apiConfig });

instance.interceptors.request.use(config => {
  const token = getLocalAccessToken();
  if (token && token !== 'undefined') {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(res => res.data);

export default instance;
