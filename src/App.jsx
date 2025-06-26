// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar'; // Corrected path
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen bg-background text-primary">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
    </div>
  );
}

export default App;
