import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Trash2, ChevronRight, Plus } from 'lucide-react';


// --- MOCK API ---
// In a real app, this would be in a separate api.js file and use fetch/axios.
const mockApi = {
  workouts: [
    { id: 1, name: 'Full Body Strength', date: '2025-06-21' },
    { id: 2, name: 'Morning Cardio & Core', date: '2025-06-22' },
    { id: 3, name: 'Leg Day', date: '2025-06-23' },
  ],
  getWorkouts: async function() {
    console.log("API: Fetching all workouts...");
    return new Promise(resolve => setTimeout(() => resolve([...this.workouts]), 800));
  },
  deleteWorkout: async function(id) {
    console.log(`API: Deleting workout ${id}...`);
    const workoutExists = this.workouts.some(w => w.id === id);
    if (workoutExists) {
        this.workouts = this.workouts.filter(w => w.id !== id);
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 400));
    }
    return Promise.reject(new Error("Workout not found"));
  },
};
// --- END MOCK API ---


const WorkoutCard = ({ workout, onSelect, onDelete }) => {
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(workout.id);
  };
  return (
    <div 
      className="bg-slate-800 rounded-lg p-4 flex justify-between items-center transition-all duration-200 hover:bg-slate-700/50 hover:ring-2 hover:ring-sky-500 cursor-pointer"
      onClick={() => onSelect(workout.id, 'view')}
    >
      <div>
        <h3 className="text-lg font-bold text-slate-100">{workout.name}</h3>
        <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
          <Calendar size={14} />
          {new Date(workout.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={handleDeleteClick} className="text-rose-500 hover:text-rose-400 p-2 rounded-full bg-slate-700/50 hover:bg-slate-700">
          <Trash2 size={18} />
        </button>
        <div className="text-sky-400"><ChevronRight size={20} /></div>
      </div>
    </div>
  );
};


const WorkoutsPage = ({ onSelect, onCreate }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockApi.getWorkouts();
      setWorkouts(data);
    } catch (err) {
      setError('Failed to load workouts.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this workout?')) {
        try {
            await mockApi.deleteWorkout(id);
            setWorkouts(prev => prev.filter(w => w.id !== id));
        } catch (err) {
            alert('Failed to delete workout.');
            console.error(err);
        }
    }
  };

  if (loading) return <div className="text-center text-slate-400">Loading workouts...</div>;
  if (error) return <div className="text-center text-rose-500">{error}</div>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-white">Your Workouts</h1>
        <button
          onClick={onCreate}
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <Plus size={20} /> New Workout
        </button>
      </div>
      <div className="space-y-4">
        {workouts.length > 0 ? (
          workouts.map(workout => (
            <WorkoutCard key={workout.id} workout={workout} onSelect={onSelect} onDelete={handleDelete} />
          ))
        ) : (
          <div className="text-center py-12 bg-slate-800/50 rounded-lg">
            <p className="text-slate-400">No workouts logged yet.</p>
            <button onClick={onCreate} className="mt-4 text-sky-400 font-semibold hover:underline">
              Log your first workout!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


// This demo shows how the page would be rendered in your main App.
export default function App() {
    const handleCreate = () => {
        alert("Navigating to 'Create Workout' page...");
    };

    const handleSelect = (id) => {
        alert(`Navigating to details for workout ID: ${id}`);
    };

    return (
        <div className="bg-slate-900 min-h-screen p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <WorkoutsPage onCreate={handleCreate} onSelect={handleSelect} />
            </div>
        </div>
    );
}
