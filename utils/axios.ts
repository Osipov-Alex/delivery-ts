import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api',
})

api.interceptors.request.use((config) => {
  // Спросить за знак восклицания
  config.headers!.Autorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
}, (e) => {
  return Promise.reject(e);
})

export default api;