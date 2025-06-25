// src/api/api.js
const API_BASE_URL = 'http://localhost:9000';

const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `HTTP error! Status: ${response.status}` }));
      throw new Error(errorData.error);
    }
    return response.json();
  } catch (error) {
    console.error(`API request failed for endpoint ${endpoint}:`, error);
    throw error;
  }
};

export const createUser = (userData) => request('/users', { method: 'POST', body: JSON.stringify(userData) });
export const getUsers = () => request('/users');
export const getUser = (userId) => request(`/users/${userId}`);
export const updateUser = (userId, userData) => request(`/users/${userId}`, { method: 'PATCH', body: JSON.stringify(userData) });
export const deleteUser = (userId) => request(`/users/${userId}`, { method: 'DELETE' });
export const createWorkout = (workoutData) => request('/workouts', { method: 'POST', body: JSON.stringify(workoutData) });
export const getWorkouts = (userId) => request(userId ? `/workouts?user_id=${userId}` : '/workouts');
export const getWorkout = (workoutId) => request(`/workouts/${workoutId}`);
export const updateWorkout = (workoutId, workoutData) => request(`/workouts/${workoutId}`, { method: 'PATCH', body: JSON.stringify(workoutData) });
export const deleteWorkout = (workoutId) => request(`/workouts/${workoutId}`, { method: 'DELETE' });
export const createExercise = (exerciseData) => request('/exercises', { method: 'POST', body: JSON.stringify(exerciseData) });
export const getExercises = () => request('/exercises');
export const getExercise = (exerciseId) => request(`/exercises/${exerciseId}`);
export const updateExercise = (exerciseId, exerciseData) => request(`/exercises/${exerciseId}`, { method: 'PATCH', body: JSON.stringify(exerciseData) });
export const deleteExercise = (exerciseId) => request(`/exercises/${exerciseId}`, { method: 'DELETE' });
