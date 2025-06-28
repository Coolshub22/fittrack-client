import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';



const authenticatedNavItems = [
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/workouts', name: 'Workouts' },
  { path: '/progress', name: 'Progress' },
  { path: '/profile', name: 'Profile' },
  { path: '/about', name: 'About Us' },
];

const publicNavItems = [];

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    (isActive
      ? 'text-sky-400 font-semibold'
      : 'text-white hover:text-sky-400') +
    ' block transition-colors duration-200';

  return (
    <header className="w-full bg-gray-900 border-b border-gray-800 py-4 shadow">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4">
        <span
          onClick={() => navigate(isLoggedIn ? '/dashboard' : '/')}
          className="flex items-center space-x-2 text-white text-2xl font-bold cursor-pointer hover:text-sky-400 transition-colors"
        >
          <img src="/vite.svg" alt="logo" className="w-9 h-9" />
          <span>FitTrack</span>
        </span>

        <div className="hidden lg:flex flex-grow justify-center space-x-6">
          {publicNavItems.map((item, i) => (
            <NavLink to={item.path} key={item.path + i} className={navLinkClass}>
              {item.name}
            </NavLink>
          ))}
          {isLoggedIn &&
            authenticatedNavItems.map((item, i) => (
              <NavLink to={item.path} key={item.path + i} className={navLinkClass}>
                {item.name}
              </NavLink>
            ))}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-gray-200 border border-gray-700 rounded hover:bg-gray-700"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button onClick={handleLogout} className="flex items-center p-3  gap-2 text-white-rounded hover:bg-gray-700 border-gray-700 rounded">
             <LogOut size={18} />
             Logout
           </button>
          )}
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-100">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 px-4 py-3 space-y-4">
          {isLoggedIn && (
            <div className="flex flex-col space-y-3">
              {authenticatedNavItems.map((item, i) => (
                <NavLink
                  to={item.path}
                  key={'mobile-' + item.path + i}
                  className={navLinkClass}
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          )}

          {!isLoggedIn ? (
            <>
              <button
                className="w-full px-4 py-2 text-white bg-gray-700 rounded"
                onClick={() => {
                  navigate('/login');
                  toggleMobileMenu();
                }}
              >
                Login
              </button>
              <button
                className="w-full px-4 py-2 bg-sky-500 text-white rounded"
                onClick={() => {
                  navigate('/register');
                  toggleMobileMenu();
                }}
              >
                Register
              </button>
            </>
          ) : (
            <button
              className="w-full px-4 py-2 text-white bg-gray-700 rounded"
              onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
