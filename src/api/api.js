import axios from 'axios';

/**
 * Creates a configured Axios instance for API communication.
 */
const api = axios.create({
  /**
   * The base URL for all API requests.
   * It's configured to use an environment variable (VITE_API_URL), 
   * which is the standard and most secure way to handle API endpoints.
   * A fallback to localhost:5000 is provided for local development.
   */
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios Request Interceptor
 * * This function automatically attaches the user's authentication token 
 * to the `Authorization` header for every outgoing request.
 * This is crucial for accessing protected backend routes.
 */
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage (or your preferred storage)
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (token) {
      // If the token exists, add it to the request headers
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle any errors that occur during request setup
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      window.location.href = '/'; // or '/login'
    }
    return Promise.reject(error);
  }
);


export default api;
