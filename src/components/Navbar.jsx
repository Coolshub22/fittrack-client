import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const authenticatedNavItems = [
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/workouts', name: 'Workouts' },
  { path: '/progress', name: 'Progress' },
  { path: '/profile', name: 'Profile' },
];

const publicNavItems = [];

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLoggedIn = false; // Replace this with actual auth logic

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-sky-500 font-semibold transition-colors duration-200'
      : 'text-gray-100 hover:text-sky-400 transition-colors duration-200';

  return (
    <header className="w-full bg-gray-900 border-b border-gray-800 py-4 shadow">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <NavLink to="/" className="text-white text-2xl font-bold">
          FitnessApp
        </NavLink>

        {/* Desktop Navigation */}
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

        {/* Auth Buttons (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-gray-200 border border-gray-700 rounded hover:bg-gray-700"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                console.log('Logout logic here');
                navigate('/');
              }}
              className="px-4 py-2 text-white border border-gray-700 rounded hover:bg-gray-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 px-4 py-3 space-y-3">
          {publicNavItems.map((item, i) => (
            <NavLink
              to={item.path}
              key={'mobile-' + item.path + i}
              className={navLinkClass}
              onClick={toggleMobileMenu}
            >
              {item.name}
            </NavLink>
          ))}
          {isLoggedIn &&
            authenticatedNavItems.map((item, i) => (
              <NavLink
                to={item.path}
                key={'mobile-' + item.path + i}
                className={navLinkClass}
                onClick={toggleMobileMenu}
              >
                {item.name}
              </NavLink>
            ))}

          <hr className="border-gray-700" />

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
                console.log('Logged out');
                navigate('/');
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
