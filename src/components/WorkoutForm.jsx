import React, { useState } from 'react';

export default function WorkoutForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    workout_name: initialData.workout_name || '',
    notes: initialData.notes || '',
    intensity: initialData.intensity || '',
    duration: initialData.duration || '',
    date: initialData.date
      ? new Date(initialData.date).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      intensity: parseFloat(formData.intensity),
      duration: parseInt(formData.duration),
      date: new Date(formData.date).toISOString().replace('Z', ''),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-ui-cards p-6 rounded-2xl border border-slate-700 shadow-md space-y-5"
    >
      <div>
        <label className="block mb-1 text-text-primary font-semibold">Workout Name</label>
        <input
          type="text"
          name="workout_name"
          value={formData.workout_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label className="block mb-1 text-text-primary font-semibold">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label className="block mb-1 text-text-primary font-semibold">Intensity (0–10)</label>
        <input
          type="number"
          name="intensity"
          value={formData.intensity}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
          className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label className="block mb-1 text-text-primary font-semibold">Duration (minutes)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          min="0"
          className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label className="block mb-1 text-text-primary font-semibold">Date</label>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-accent text-white px-6 py-3 rounded-xl font-semibold bg-sky-700 hover:bg-sky-600 transition-all duration-200"
      >
        {initialData?.id ? 'Edit Workout' : 'New Workout'}
      </button>
    </form>
  );
}
