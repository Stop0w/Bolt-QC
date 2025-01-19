import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

export const competitionApi = {
  getAll: () => api.get('/competitions'),
  create: (data) => api.post('/competitions', data),
  join: (id) => api.post(`/competitions/${id}/join`),
  getResults: (id) => api.get(`/competitions/${id}/results`),
};

export default api;
