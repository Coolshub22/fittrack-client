// src/api/api.js
import axios from 'axios';

// ✅ Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000', // 🔁 Change this to match your actual backend port
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Optional: Automatically add token to requests (if using auth)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Export API instance as default
// Example CRUD helpers

export const createUser = (userData) => api.post('/users', userData);
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const updateUser = (id, userData) => api.patch(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export const createWorkout = (data) => api.post('/workouts', data);
export const getWorkouts = (userId) => api.get(userId ? `/workouts?user_id=${userId}` : '/workouts');
export const getWorkout = (id) => api.get(`/workouts/${id}`);
export const updateWorkout = (id, data) => api.patch(`/workouts/${id}`, data);
export const deleteWorkout = (id) => api.delete(`/workouts/${id}`);

export const createExercise = (data) => api.post('/exercises', data);
export const getExercises = () => api.get('/exercises');
export const getExercise = (id) => api.get(`/exercises/${id}`);
export const updateExercise = (id, data) => api.patch(`/exercises/${id}`, data);
export const deleteExercise = (id) => api.delete(`/exercises/${id}`);

export default api;
