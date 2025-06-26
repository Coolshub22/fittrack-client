import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader, Calendar, Dumbbell, BarChart3, PlusCircle } from 'lucide-react';
import api from '../api/api'; 
const DashboardPage = () => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile');
        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const shortcuts = [
    {
      title: 'My Workouts',
      icon: <Dumbbell className="text-accent w-6 h-6" />,
      onClick: () => navigate('/workouts'),
    },
    {
      title: 'Progress Dashboard',
      icon: <BarChart3 className="text-accent w-6 h-6" />,
      onClick: () => navigate('/progress'),
    },
    {
      title: 'My Schedule',
      icon: <Calendar className="text-accent w-6 h-6" />,
      onClick: () => navigate('/calendar'), // placeholder
    },
    {
      title: 'New Workout',
      icon: <PlusCircle className="text-accent w-6 h-6" />,
      onClick: () => navigate('/create-workout'),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-accent w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-text-primary mb-6">
        {user ? `Welcome, ${user.username}!` : 'Welcome to FitTrack'}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {shortcuts.map((shortcut, index) => (
          <div
            key={index}
            onClick={shortcut.onClick}
            className="bg-ui-cards p-6 rounded-2xl shadow-md border border-slate-700 hover:ring-2 hover:ring-accent hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              {shortcut.icon}
              <span className="text-xl font-semibold text-text-primary">{shortcut.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
