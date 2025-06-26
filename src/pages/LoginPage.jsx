import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api'; 

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await api.post('/login', {
      username: formData.username,
      password: formData.password
    });
    console.log('Login response:', res.data);
    const { access_token } = res.data;

    login(access_token);
    navigate('/dashboard');
  } catch (err) {
    console.log('Login error', err.response?.data || err.message);
    const message =
      err.response?.data?.error || 'Login failed. Check credentials.';
    setError(message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-6 p-2 rounded bg-gray-700 text-white"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-sky-500 py-2 rounded hover:bg-sky-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
