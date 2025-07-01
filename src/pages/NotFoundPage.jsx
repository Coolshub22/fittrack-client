import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

export default function NotFoundPage() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-6 py-20">
      <h1 className="text-7xl font-extrabold text-sky-500 mb-6">404</h1>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-400 text-center max-w-md mb-8">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>

      <Link
        to={isLoggedIn ? '/dashboard' : '/'}
        className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Go to Home
      </Link>

      <footer className="mt-16 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} FitTrack. All rights reserved.
      </footer>
    </div>
  );
}
