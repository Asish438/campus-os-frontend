import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8070/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('campus_os_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error handling and auto-logout on 401
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Check if not already on login page
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        console.warn('[Axios] 401 Unauthorized - Session expired or invalid token');
        // Clear expired token only if we're calling a protected route
        if (!error.config.url.includes('/auth/login')) {
          localStorage.removeItem('campus_os_token');
          localStorage.removeItem('campus_os_user');
          window.location.href = '/login?expired=true';
        }
      }
    }
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    console.error('[API Error]:', message);
    return Promise.reject(error);
  }
);

export default api;

