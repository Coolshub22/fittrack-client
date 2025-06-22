import React from 'react';
import { Calendar, Trash2, ChevronRight } from 'lucide-react';

const WorkoutCard = ({ workout, onSelect, onDelete }) => {
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(workout.id);
    }
  };

  return (
    <div 
      className="bg-slate-800 rounded-lg p-4 flex justify-between items-center transition-all duration-200 hover:bg-slate-700/50 hover:ring-2 hover:ring-sky-500 cursor-pointer"
      onClick={() => onSelect(workout.id)}
    >
      <div>
        <h3 className="text-lg font-bold text-slate-100">{workout.name}</h3>
        <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
          <Calendar size={14} />
          {new Date(workout.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={handleDeleteClick} 
          className="text-rose-500 hover:text-rose-400 p-2 rounded-full bg-slate-700/50 hover:bg-slate-700"
          aria-label={`Delete workout ${workout.name}`}
        >
          <Trash2 size={18} />
        </button>
        <div className="text-sky-400">
             <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const sampleWorkout = {
    id: 1,
    name: 'Full Body Strength',
    date: '2025-06-21',
    notes: 'Focused on compound lifts. Felt strong.',
  };

  const handleSelect = (id) => {
    alert(`Selected workout with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Attempting to delete workout with ID: ${id}`);
  };

  return (
    <div className="bg-slate-900 min-h-screen p-8 font-sans">
      <div className="max-w-md mx-auto">
         <h1 className="text-2xl font-bold text-white mb-6 text-center">Workout Card Demo</h1>
         <WorkoutCard workout={sampleWorkout} onSelect={handleSelect} onDelete={handleDelete} />
      </div>
    </div>
  );
}

