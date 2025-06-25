// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar'; // Corrected path
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-background text-primary">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
