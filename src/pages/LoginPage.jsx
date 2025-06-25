import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('authToken', '123'); // Simulate login
    window.dispatchEvent(new Event("storage")); // ← Trigger Navbar update
    navigate('/dashboard'); // Redirect to dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <button
          onClick={handleLogin}
          className="w-full bg-accent text-white py-2 rounded hover:bg-opacity-90 transition"
        >
          Login as Test User
        </button>
      </div>
    </div>
  );
}
