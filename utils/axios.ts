import axios from 'axios';
import { AuthResponse } from '../redux/slice/authSlice';


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

api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await api.get<AuthResponse>('/refresh');
      localStorage.setItem('token', response.data.accessToken);
      return api.request(originalRequest);
    } catch (e) {
      console.log('НЕ АВТОРИЗОВАН')
    }
  }
  throw error;
});

export default api;