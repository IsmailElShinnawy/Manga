export const getLocalAccessToken = () => localStorage.getItem('token');
export const setLocalAccessToken = token => localStorage.setItem('token', token);
