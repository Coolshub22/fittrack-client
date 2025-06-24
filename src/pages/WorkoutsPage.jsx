import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Loader, Calendar, ChevronRight } from 'lucide-react';

// --- MOCK API (Self-contained to resolve import error) ---
// In your real application, this logic would live in `src/api/api.js`.
const api = {
  get: async (endpoint) => {
    console.log(`API GET: ${endpoint}`);
    if (endpoint === '/workouts') {
      // Simulate a network delay
      return new Promise(resolve => setTimeout(() => resolve({
        data: [
          { id: 1, name: 'Full Body Strength', date: '2025-06-21' },
          { id: 2, name: 'Morning Cardio & Core', date: '2025-06-22' },
          { id: 3, name: 'Leg Day', date: '2025-06-23' },
        ]
      }), 800));
    }
    return Promise.reject(new Error("Unknown API endpoint"));
  },
};

// --- WORKOUT CARD COMPONENT (Self-contained to resolve import error) ---
// In your real application, this would live in `src/components/WorkoutCard.jsx`.
const WorkoutCard = ({ workout }) => {
  const navigate = useNavigate();

  if (!workout) return null;

  return (
    <div
      className="bg-ui-cards rounded-lg p-4 flex justify-between items-center transition-all duration-200 hover:bg-slate-700/50 hover:ring-2 hover:ring-accent cursor-pointer"
      onClick={() => navigate(`/workouts/${workout.id}`)}
      role="link"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && navigate(`/workouts/${workout.id}`)}
    >
      <div>
        <h3 className="text-lg font-bold text-text-primary">{workout.name || 'Untitled Workout'}</h3>
        <p className="text-sm text-text-secondary flex items-center gap-2 mt-1">
          <Calendar size={14} />
          {workout.date 
            ? new Date(workout.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            : 'No date'
          }
        </p>
      </div>
      <div className="text-accent">
        <ChevronRight size={20} />
      </div>
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---
const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/workouts');
      setWorkouts(response.data);
    } catch (err) {
      setError('Failed to load workouts. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Loader size={48} className="animate-spin text-accent" />
        </div>
      );
    }

    if (error) {
      return <div className="text-center py-20 text-rose-400 bg-rose-500/10 rounded-lg">{error}</div>;
    }

    if (workouts.length === 0) {
      return (
        <div className="text-center py-20 bg-ui-cards/50 rounded-lg">
          <h3 className="text-xl font-semibold text-text-primary">No Workouts Found</h3>
          <p className="text-text-secondary mt-2">Get started by logging your first session!</p>
          <button 
            onClick={() => navigate('/create-workout')} 
            className="mt-6 flex items-center justify-center gap-2 mx-auto bg-accent hover:opacity-90 text-background font-bold py-2 px-5 rounded-lg transition-opacity duration-200"
          >
            <Plus size={20} /> Log a Workout
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {workouts.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-text-primary">Your Workouts</h1>
        <button
          onClick={() => navigate('/create-workout')}
          className="flex items-center gap-2 bg-accent hover:opacity-90 text-background font-bold py-2 px-4 rounded-lg transition-opacity duration-200"
        >
          <Plus size={20} /> New Workout
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default WorkoutsPage;
