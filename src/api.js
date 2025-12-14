import axios from 'axios';

const api = axios.create({
  baseURL: 'https://myshopbackend-gj8m.onrender.com/api',
});

// Automatically attach token to requests if exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('userToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
