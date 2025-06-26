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

    if (!currentUser?.id) {
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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto bg-ui-cards text-text-primary p-8 rounded-xl shadow-md border border-slate-700"
    >
      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-md border-l-4 border-red-500">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="workoutName" className="block text-sm font-medium mb-1">
          Workout Name
        </label>
        <input
          id="workoutName"
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="e.g., Morning Run, Leg Day"
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
          required
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-1">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="4"
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Any details about your workout, how you felt, etc."
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-accent text-white font-semibold rounded shadow transition transform hover:scale-105 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {isEditMode ? 'Update Workout' : 'Create Workout'}
      </button>

    </form>
  );
}
