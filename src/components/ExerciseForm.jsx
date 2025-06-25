import React, { useState } from 'react';

// ExerciseForm component included inline
const ExerciseForm = ({
  exercise = null,
  onSubmit,
  onCancel,
  mode = 'create',
}) => {
  const [formData, setFormData] = useState({
    name: exercise?.name || '',
    category: exercise?.category || '',
    muscleGroup: exercise?.muscleGroup || '',
    equipment: exercise?.equipment || '',
    instructions: exercise?.instructions || '',
    difficulty: exercise?.difficulty || 'beginner',
  });
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (exercise && mode === 'edit') {
      setFormData({
        name: exercise.name || '',
        category: exercise.category || '',
        muscleGroup: exercise.muscleGroup || '',
        equipment: exercise.equipment || '',
        instructions: exercise.instructions || '',
        difficulty: exercise.difficulty || 'beginner',
      });
    }
  }, [exercise, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.category) newErrors.category = 'Required';
    if (!formData.muscleGroup) newErrors.muscleGroup = 'Required';
    if (!formData.equipment) newErrors.equipment = 'Required';
    if (!formData.instructions.trim()) newErrors.instructions = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow space-y-5 text-white">
      <h2 className="text-xl font-bold">
        {mode === 'edit' ? 'Edit Exercise' : 'New Exercise'}
      </h2>

      <div>
        <label className="block mb-1">Name *</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        />
        {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="block mb-1">Category *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        >
          <option value="">Select...</option>
          {['Strength', 'Cardio', 'Flexibility', 'Balance', 'Sports', 'Functional'].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-400 text-sm">{errors.category}</p>}
      </div>

      <div>
        <label className="block mb-1">Muscle Group *</label>
        <select
          name="muscleGroup"
          value={formData.muscleGroup}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        >
          <option value="">Select...</option>
          {['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Full Body', 'Cardio'].map((muscle) => (
            <option key={muscle} value={muscle}>{muscle}</option>
          ))}
        </select>
        {errors.muscleGroup && <p className="text-red-400 text-sm">{errors.muscleGroup}</p>}
      </div>

      <div>
        <label className="block mb-1">Equipment *</label>
        <select
          name="equipment"
          value={formData.equipment}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        >
          <option value="">Select...</option>
          {['None (Bodyweight)', 'Dumbbells', 'Barbell', 'Resistance Bands', 'Kettlebell', 'Machine', 'Cable', 'Other'].map((equip) => (
            <option key={equip} value={equip}>{equip}</option>
          ))}
        </select>
        {errors.equipment && <p className="text-red-400 text-sm">{errors.equipment}</p>}
      </div>

      <div>
        <label className="block mb-1">Difficulty</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        >
          {['beginner', 'intermediate', 'advanced'].map((lvl) => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Instructions *</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        />
        {errors.instructions && <p className="text-red-400 text-sm">{errors.instructions}</p>}
      </div>

      <div className="flex justify-end gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-200"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 text-white"
        >
          {mode === 'edit' ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};
export default ExerciseForm;