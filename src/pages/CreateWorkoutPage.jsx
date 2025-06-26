import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function CreateWorkoutPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workout_name: '',
    notes: '',
    intensity: '',
    duration: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/workouts', {
        ...formData,
        intensity: parseFloat(formData.intensity),
        duration: parseInt(formData.duration),
      });

      navigate(`/workouts/${res.data.id}`);
    } catch (err) {
      setError('Failed to create workout. Please check your input.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-ui-cards p-8 rounded-xl shadow-md border border-slate-700"
      >
        <h2 className="text-3xl font-bold mb-6">Create New Workout</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2 font-medium">Workout Name</label>
        <input
          type="text"
          name="workout_name"
          value={formData.workout_name}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-gray-800 text-white rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
          required
        />

        <label className="block mb-2 font-medium">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-gray-800 text-white rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <label className="block mb-2 font-medium">Intensity (0-10)</label>
        <input
          type="number"
          name="intensity"
          value={formData.intensity}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
          className="w-full mb-4 p-2 bg-gray-800 text-white rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <label className="block mb-2 font-medium">Duration (minutes)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          min="1"
          className="w-full mb-6 p-2 bg-gray-800 text-white rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <button
          type="submit"
          className="w-full bg-accent text-white py-2 rounded hover:bg-accent/90 transition"
        >
          Save Workout
        </button>
      </form>
    </div>
  );
}
