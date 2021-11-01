import { read, write } from './localStorage.service';

export const getLocalAccessToken = () => read('token');
export const setLocalAccessToken = token => write('token', token);
