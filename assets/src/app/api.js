import axios from 'axios';
import Cookies from 'js-cookie';

// Create a request instance
const requests = axios.create();

requests.interceptors.request.use((config) => {
  const headers = config.headers || {};
  const token = Cookies.get('jwt');

  if (!headers.Authorization) headers.Authorization = `Bearer ${token}`;

  return {
    ...config,
    headers,
  };
})

export const defaultInstance = axios.create();

export default requests;
