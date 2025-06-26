
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'
import { myRouter } from './routes.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={myRouter} />
    </AuthProvider>
  </React.StrictMode>
);
