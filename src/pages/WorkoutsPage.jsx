import React, { useState, useEffect, useMemo } from 'react';
import { PlusCircle, Calendar, FileText, Trash2, Edit, ChevronDown, Clock, Dumbbell as DumbbellIcon } from 'lucide-react';
// Using the api.js file you provided earlier.
import * as api from './api';

function ExerciseList({ workoutId }) {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setIsLoading(true);
        const allExercises = await api.getExercises();
        const relevantExercises = allExercises.filter(ex => ex.workout_id === workoutId);
        setExercises(relevantExercises);
        setError(null);
      } catch (err) {
        setError("Failed to load exercises for this workout.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [workoutId]);

  if (isLoading) {
    return <div className="text-center p-4 text-gray-500 dark:text-gray-400">Loading exercises...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (exercises.length === 0) {
    return <div className="text-center p-4 text-gray-500 dark:text-gray-400">No exercises found for this workout.</div>;
  }

  return (
    <div className="space-y-3 p-4">
      {exercises.map(ex => (
        <div key={ex.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
          <h5 className="font-semibold text-gray-800 dark:text-white">{ex.name}</h5>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-300 mt-1">
            <span className="capitalize bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-0.5 rounded-full">{ex.type}</span>
            {ex.type === 'strength' ? (
              <>
                <span><DumbbellIcon size={14} className="inline mr-1"/>{ex.weight || 0} kg</span>
                <span>Sets: {ex.sets || 0}</span>
                <span>Reps: {ex.reps || 0}</span>
              </>
            ) : (
              <span><Clock size={14} className="inline mr-1"/>{ex.duration || 0} mins</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


export default function WorkoutsPage({ navigate, currentUser }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedWorkoutId, setExpandedWorkoutId] = useState(null); 
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const data = await api.getWorkouts(currentUser.id);
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setWorkouts(sorted);
      } catch (err) {
        setError('Failed to fetch workouts.');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, [currentUser, navigate]);
  
  const handleEditWorkout = (e, id) => {
    e.stopPropagation();
    navigate(`/workouts/${id}/edit`);
  };

  const handleDeleteWorkout = async (e, id) => {
      e.stopPropagation();
      if (window.confirm('Are you sure you want to delete this workout?')) {
        try {
            await api.deleteWorkout(id);
            setWorkouts(workouts.filter(w => w.id !== id));
        } catch (err) {
            setError("Failed to delete workout. Please try again.");
        }
      }
  }

  const handleToggleExpand = (id) => {
    setExpandedWorkoutId(prevId => (prevId === id ? null : id));
  };

  const filteredWorkouts = useMemo(() => {
    return workouts.filter(w => 
      w.workout_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (w.notes && w.notes.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [workouts, searchTerm]);

  if (loading) return <p className="text-center text-lg mt-8">Loading your workouts...</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Your Workouts</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
            <input 
              type="text"
              placeholder="Search workouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 w-full sm:w-auto"
            />
            <button onClick={() => navigate('/workouts/new')} className="flex-shrink-0 flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">
                <PlusCircle className="mr-2 h-5 w-5" />
                New Workout
            </button>
        </div>
      </div>
      
      {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
      
      {filteredWorkouts.length > 0 ? (
        <div className="space-y-4">
          {filteredWorkouts.map(workout => {
            const isExpanded = expandedWorkoutId === workout.id;
            return (
              <div key={workout.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300">
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  onClick={() => handleToggleExpand(workout.id)}
                >
                  <div className="flex justify-between items-start">
                      <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{workout.workout_name}</h3>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{new Date(workout.date).toLocaleDateString()}</span>
                          </div>
                      </div>
                      <div className="flex items-center space-x-2">
                           <button onClick={(e) => handleEditWorkout(e, workout.id)} className="p-1 text-blue-500 hover:text-blue-700"><Edit size={18}/></button>
                           <button onClick={(e) => handleDeleteWorkout(e, workout.id)} className="p-1 text-red-500 hover:text-red-700"><Trash2 size={18}/></button>
                           <ChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                      <FileText className="inline h-4 w-4 mr-1"/>
                      {workout.notes || "No notes for this workout."}
                  </p>
                </div>
                {/* Collapsible section for exercises */}
                {isExpanded && (
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <ExerciseList workoutId={workout.id} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
              {searchTerm ? 'No workouts match your search.' : 'You haven\'t logged any workouts yet.'}
            </h3>
        </div>
      )}
    </div>
  );
};