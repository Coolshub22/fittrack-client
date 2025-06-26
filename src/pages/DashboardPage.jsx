// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader, Dumbbell, BarChart3, PlusCircle } from 'lucide-react';
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
      title: 'New Workout',
      icon: <PlusCircle className="text-accent w-6 h-6" />,
      onClick: () => navigate('/workouts/new'),
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
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

      {/* Stats Section */}
      {user && (
        <div className="bg-ui-cards p-6 rounded-2xl border border-slate-700 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">Your Stats</h2>

          <div className="space-y-4">
            <p className="text-lg text-text-secondary">
              <span className="font-semibold text-text-primary">Current Streak:</span>{' '}
              {user.current_streak ?? 'N/A'} days
            </p>

            <div className="text-lg text-text-secondary">
              <span className="font-semibold text-text-primary">Personal Bests:</span>
              {user.personal_bests && user.personal_bests.length > 0 ? (
                <ul className="list-disc list-inside mt-2">
                  {user.personal_bests.map((pb, idx) => (
                    <li key={idx}>
                      {pb.exercise_name} -{' '}
                      {pb.max_weight ? `${pb.max_weight} kg` : ''}
                      {pb.max_reps ? `, ${pb.max_reps} reps` : ''}
                      {pb.max_duration ? `, ${pb.max_duration} min` : ''}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2">No personal bests yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
