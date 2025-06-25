
import React from 'react';

export default function DashboardPage() {
  const token = localStorage.getItem('authToken'); 

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* NEW: visible confirmation */}
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>

      {/* NEW: token check result */}
      {token ? (
        <p className="text-green-400">You're logged in. Ready to track workouts.</p>
      ) : (
        <p className="text-red-400">No auth token found. You may not be logged in.</p>
      )}
    </div>
  );
}


