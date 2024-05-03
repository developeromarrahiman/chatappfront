import axios from 'axios';
import { getToken } from './getToken';

// const baseURL = process.env.BASE_URL;
const http = axios.create({
  baseURL: `/api`,
  // baseURL: `/`,
  timeout: 30000,
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (Boolean(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
