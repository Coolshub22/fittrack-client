import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkout } from '../api/api';

export default function CreateWorkoutPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workout_name: '',
    date: '',
    intensity: '',
    notes: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (!formData.workout_name || !formData.date) {
      setError('Please fill out workout name and date.');
      setSubmitting(false);
      return;
    }

    try {
      await createWorkout(formData);
      navigate('/workouts');
    } catch (err) {
      console.error(err);
      setError('Failed to create workout. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] text-[#E5E7EB] p-6">
      <div className="max-w-xl mx-auto bg-[#1F2937] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Create New Workout</h1>

        {error && <div className="text-red-400 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-[#9CA3AF]">Workout Name</label>
            <input
              type="text"
              name="workout_name"
              className="w-full p-2 rounded bg-[#111827] text-[#E5E7EB] border border-[#374151]"
              value={formData.workout_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-[#9CA3AF]">Date</label>
            <input
              type="date"
              name="date"
              className="w-full p-2 rounded bg-[#111827] text-[#E5E7EB] border border-[#374151]"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-[#9CA3AF]">Intensity (1 - 10)</label>
            <input
              type="number"
              name="intensity"
              min="1"
              max="10"
              className="w-full p-2 rounded bg-[#111827] text-[#E5E7EB] border border-[#374151]"
              value={formData.intensity}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-[#9CA3AF]">Notes</label>
            <textarea
              name="notes"
              className="w-full p-2 rounded bg-[#111827] text-[#E5E7EB] border border-[#374151]"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#00BFFF] text-[#111827] font-bold py-2 rounded hover:opacity-90 transition-opacity"
          >
            {submitting ? 'Saving...' : 'Create Workout'}
          </button>
        </form>
      </div>
    </div>
  );
}
