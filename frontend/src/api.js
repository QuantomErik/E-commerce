/* import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem(ACCESS_TOKEN)
      ? 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request Headers:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    if (typeof error.response === 'undefined') {
      alert('A server/network error occurred.');
      return Promise.reject(error);
    }

    if (error.response.status === 401 && originalRequest.url === API_URL + 'api/token/refresh/') {
      window.location.href = '/login/';
      return Promise.reject(error);
    }

    if (error.response.data.code === 'token_not_valid' &&
        error.response.status === 401 &&
        error.response.statusText === 'Unauthorized') {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        const now = Math.ceil(Date.now() / 1000);
        if (tokenParts.exp > now) {
          return axiosInstance
            .post('/api/token/refresh/', { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem(ACCESS_TOKEN, response.data.access);
              localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

              axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
              originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch(err => {
              console.error('Error refreshing token:', err);
              window.location.href = '/login/';
            });
        } else {
          console.log('Refresh token is expired', tokenParts.exp, now);
          window.location.href = '/login/';
        }
      } else {
        console.log('Refresh token not available.');
        window.location.href = '/login/';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
 */


import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const csrfToken = Cookies.get('csrftoken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    console.log('Request Headers:', config.headers); 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    if (typeof error.response === 'undefined') {
      alert('A server/network error occurred.');
      return Promise.reject(error);
    }

    if (error.response.status === 401 && originalRequest.url === API_URL + 'api/token/refresh/') {
      window.location.href = '/login/';
      return Promise.reject(error);
    }

    if (error.response.data.code === 'token_not_valid' &&
        error.response.status === 401 &&
        error.response.statusText === 'Unauthorized') {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        const now = Math.ceil(Date.now() / 1000);
        if (tokenParts.exp > now) {
          return axiosInstance
            .post('/api/token/refresh/', { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem(ACCESS_TOKEN, response.data.access);
              localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

              axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
              originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch(err => {
              console.error('Error refreshing token:', err);
              window.location.href = '/login/';
            });
        } else {
          console.log('Refresh token is expired', tokenParts.exp, now);
          window.location.href = '/login/';
        }
      } else {
        console.log('Refresh token not available.');
        window.location.href = '/login/';
      }
    }

    return Promise.reject(error);
  }
);

/* export const fetchDeals = () => {
  return axiosInstance.get('/api/todays-deals/')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching deals:', error);
      throw error;
    });
}; */

export default axiosInstance;
