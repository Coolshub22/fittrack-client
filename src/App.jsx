// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
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

      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={() =>
          "bg-gray-800 text-white rounded-lg shadow-lg p-4 font-medium"
        }
        bodyClassName={() => "text-sm"}
        progressClassName="bg-green-500"
      />
    </div>
  );
}

export default App;
