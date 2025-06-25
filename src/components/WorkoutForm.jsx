import React, { useState, useEffect } from 'react';

export default function WorkoutForm({ onSubmit, initialData = {}, currentUser }) {
  const [workoutName, setWorkoutName] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');

  const isEditMode = Boolean(initialData && initialData.id);

  useEffect(() => {
    if (isEditMode) {
      setWorkoutName(initialData.workout_name || '');
      setDate(initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '');
      setNotes(initialData.notes || '');
    }
  }, [initialData, isEditMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); 

    if (!workoutName.trim() || !date) {
      setError('Workout Name and Date are required.');
      return;
    }
    
    if (!currentUser || !currentUser.id) {
        setError('You must be logged in to save a workout.');
        return;
    }
    
    const workoutData = {
      ...initialData, 
      workout_name: workoutName,
      date,
      notes,
      user_id: currentUser.id,
    };

    onSubmit(workoutData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      {/* Error display */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Workout Name Field */}
      <div>
        <label htmlFor="workoutName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Workout Name
        </label>
        <input
          id="workoutName"
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., Morning Run, Leg Day"
          required
        />
      </div>

      {/* Date Field */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      {/* Notes Field */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="4"
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Any details about your workout, how you felt, etc."
        ></textarea>
      </div>

      {/* Submit Button */}
      <div>
        <button 
          type="submit" 
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          {isEditMode ? 'Update Workout' : 'Create Workout'}
        </button>
      </div>
    </form>
  );
};
