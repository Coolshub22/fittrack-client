import React, { useState } from 'react';

export default function CombinedWorkoutForm({ initialData = {}, onSubmit, mode = 'create' }) {
  const [formData, setFormData] = useState({
    // Workout fields
    workout_name: initialData.workout_name || '',
    notes: initialData.notes || '',
    intensity: initialData.intensity || '',
    duration: initialData.duration || '',
    date: initialData.date
      ? new Date(initialData.date).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
    
    // Exercise fields
    exercise_name: initialData.exercise_name || '',
    category: initialData.category || '',
    muscleGroup: initialData.muscleGroup || '',
    equipment: initialData.equipment || '',
    instructions: initialData.instructions || '',
    difficulty: initialData.difficulty || 'beginner',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Required workout fields
    if (!formData.workout_name.trim()) newErrors.workout_name = 'Workout name is required';
    
    // Required exercise fields
    if (!formData.exercise_name.trim()) newErrors.exercise_name = 'Exercise name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.muscleGroup) newErrors.muscleGroup = 'Muscle group is required';
    if (!formData.equipment) newErrors.equipment = 'Equipment is required';
    if (!formData.instructions.trim()) newErrors.instructions = 'Instructions are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        intensity: formData.intensity ? parseFloat(formData.intensity) : null,
        duration: formData.duration ? parseInt(formData.duration) : null,
        date: new Date(formData.date).toISOString().replace('Z', ''),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-ui-cards p-6 rounded-2xl border border-slate-700 shadow-md space-y-8"
    >
      {/* <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          {mode === 'edit' ? 'Edit Workout & Exercise' : 'Create New Workout & Exercise'}
        </h2>
        <p className="text-text-secondary text-sm">Fill out both workout details and exercise information</p>
      </div> */}

      {/* Workout Section */}
      <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-600">
        <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
          <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
          Workout Info
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block mb-1 text-text-primary font-semibold">Workout Name *</label>
            <input
              type="text"
              name="workout_name"
              value={formData.workout_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g., Morning Cardio Session"
            />
            {errors.workout_name && <p className="text-red-400 text-sm mt-1">{errors.workout_name}</p>}
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
              placeholder="5.0"
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
              placeholder="30"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-text-primary font-semibold">Date & Time</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-text-primary font-semibold">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Any additional notes about this workout..."
            />
          </div>
        </div>
      </div>

      {/* Exercise Section */}
      <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-600">
        <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
          <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
          Exercise Info
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block mb-1 text-text-primary font-semibold">Exercise Name *</label>
            <input
              type="text"
              name="exercise_name"
              value={formData.exercise_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g., Push-ups, Squats, Running"
            />
            {errors.exercise_name && <p className="text-red-400 text-sm mt-1">{errors.exercise_name}</p>}
          </div>

          <div>
            <label className="block mb-1 text-text-primary font-semibold">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option className='bg-slate-800 rounded-3xl' value="">Select category...</option>
              {['Strength', 'Cardio', 'Flexibility', 'Balance', 'Sports', 'Functional'].map((cat) => (
                <option className='bg-slate-800 rounded-3xl' key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block mb-1 text-text-primary font-semibold">Muscle Group *</label>
            <select
              name="muscleGroup"
              value={formData.muscleGroup}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option className='bg-slate-800 rounded-3xl' value="">Select muscle group...</option>
              {['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Full Body', 'Cardio'].map((muscle) => (
                <option className='bg-slate-800 rounded-3xl' key={muscle} value={muscle}>{muscle}</option>
              ))}
            </select>
            {errors.muscleGroup && <p className="text-red-400 text-sm mt-1">{errors.muscleGroup}</p>}
          </div>

          <div>
            <label className="block mb-1 text-text-primary font-semibold">Equipment *</label>
            <select
              name="equipment"
              value={formData.equipment}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option className='bg-slate-800 rounded-3xl' value="">Select equipment...</option>
              {['None (Bodyweight)', 'Dumbbells', 'Barbell', 'Resistance Bands', 'Kettlebell', 'Machine', 'Cable', 'Other'].map((equip) => (
                <option className='bg-slate-800 rounded-3xl' key={equip} value={equip}>{equip}</option>
              ))}
            </select>
            {errors.equipment && <p className="text-red-400 text-sm mt-1">{errors.equipment}</p>}
          </div>

          <div>
            <label className="block mb-1 text-text-primary font-semibold">Difficulty Level</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                <option className='bg-slate-800 rounded-3xl' key={lvl} value={lvl}>{lvl.charAt(0).toUpperCase() + lvl.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-text-primary font-semibold">Instructions *</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-4 py-2 rounded-xl bg-ui-input text-text-primary border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Detailed instructions on how to perform this exercise..."
            />
            {errors.instructions && <p className="text-red-400 text-sm mt-1">{errors.instructions}</p>}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-accent text-white px-6 py-3 rounded-xl font-semibold bg-sky-700 hover:bg-sky-600 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {initialData?.id ? 'Edit Workout & Exercise' : 'New Workout & Exercise'}
      </button>
    </form>
  );
}