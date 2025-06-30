import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Dumbbell as DumbbellIcon } from 'lucide-react';
import api from '../api/api';
import { toast } from 'react-toastify';

export default function WorkoutForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    workout_name: initialData?.workout_name || '',
    notes: initialData?.notes || '',
    intensity: initialData?.intensity || '',
    duration: initialData?.duration || '',
    date: initialData?.date
      ? new Date(initialData.date).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
  });

  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState(initialData?.workout_type_id || '');
  const [availableExerciseTemplates, setAvailableExerciseTemplates] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await api.get('/workout_types');
        setWorkoutTypes(res.data);
      } catch (err) {
        console.error('Failed to fetch workout types', err);
        toast.error('Failed to load workout types.');
      }
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchTemplatesAndSetInitialData = async () => {
      setLoading(true);
      try {
        setFormData({
          workout_name: initialData?.workout_name || '',
          notes: initialData?.notes || '',
          intensity: initialData?.intensity || '',
          duration: initialData?.duration || '',
          date: initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        });
        setSelectedWorkoutType(initialData?.workout_type_id || '');

        const typeIdToFetch = initialData?.workout_type_id || selectedWorkoutType;

        let templates = [];
        if (typeIdToFetch) {
          const templatesRes = await api.get(`/workout_types/${typeIdToFetch}/exercises`);
          templates = templatesRes.data;
          setAvailableExerciseTemplates(templates);
        } else {
          setAvailableExerciseTemplates([]);
        }

        if (initialData?.exercises) {
          const prePopulatedExercises = initialData.exercises.map(ex => {
            const template = templates.find(t => t.id === ex.exercise_template_id);
            return {
              id: ex.id,
              exercise_template_id: ex.exercise_template_id,
              name: template ? template.name : ex.name,
              type: template ? template.type : ex.type,
              supports_distance: template ? template.supports_distance : ex.supports_distance,
              sets: ex.sets || '',
              reps: ex.reps || '',
              weight: ex.weight || '',
              duration: ex.duration || '',
              distance: ex.distance || '',
            };
          });
          setSelectedExercises(prePopulatedExercises);
        } else if (!initialData) {
          setSelectedExercises([]);
        }
      } catch (err) {
        console.error('Failed to fetch data for form initialization', err);
        toast.error('Failed to load form data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplatesAndSetInitialData();
  }, [initialData, selectedWorkoutType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleExerciseToggle = (template) => {
    setSelectedExercises(prev => {
      const exists = prev.find(e => e.exercise_template_id === template.id);
      if (exists) {
        return prev.filter(e => e.exercise_template_id !== template.id);
      } else {
        return [...prev, {
          id: null,
          exercise_template_id: template.id,
          name: template.name,
          type: template.type,
          supports_distance: template.supports_distance,
          sets: '',
          reps: '',
          weight: '',
          duration: '',
          distance: '',
        }];
      }
    });
  };

  const handleExerciseDetailChange = (templateId, field, value) => {
    setSelectedExercises(prev =>
      prev.map(ex =>
        ex.exercise_template_id === templateId
          ? { ...ex, [field]: value }
          : ex
      )
    );
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.workout_name.trim()) newErrors.workout_name = 'Workout name is required';
    if (!selectedWorkoutType) newErrors.workout_type_id = 'Workout type is required';
    if (selectedExercises.length === 0) newErrors.exercises = 'At least one exercise is required';

    selectedExercises.forEach((ex, index) => {
      if (!ex.exercise_template_id) {
        newErrors[`exercise_${index}_template`] = `Exercise ${index + 1}: template is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }
    setLoading(true);

    const payload = {
      workout_name: formData.workout_name,
      notes: formData.notes,
      intensity: formData.intensity ? parseFloat(formData.intensity) : null,
      duration: formData.duration ? parseInt(formData.duration) : null,
      date: new Date(formData.date).toISOString(),
      workout_type_id: parseInt(selectedWorkoutType),
      exercises: selectedExercises.map(ex => ({
        id: ex.id,
        exercise_template_id: parseInt(ex.exercise_template_id),
        sets: ex.sets ? parseInt(ex.sets) : null,
        reps: ex.reps ? parseInt(ex.reps) : null,
        weight: ex.weight ? parseFloat(ex.weight) : null,
        duration: ex.duration ? parseInt(ex.duration) : null,
        distance: ex.distance ? parseFloat(ex.distance) : null,
      })),
    };

    onSubmit(payload);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-xl space-y-6">
      {/* Workout Name */}
      <div>
        <label htmlFor="workout_name" className="block mb-1 text-white font-semibold">Workout Name *</label>
        <input
          type="text"
          id="workout_name"
          name="workout_name"
          value={formData.workout_name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-600"
          placeholder="e.g., Morning Cardio"
        />
        {errors.workout_name && <p className="text-red-400 text-sm mt-1">{errors.workout_name}</p>}
      </div>

      {/* Workout Type */}
      <div>
        <label htmlFor="workoutType" className="block mb-1 text-white font-semibold">Workout Type *</label>
        <select
          id="workoutType"
          value={selectedWorkoutType}
          onChange={(e) => setSelectedWorkoutType(parseInt(e.target.value))}
          className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-600"
        >
          <option value="">Select type...</option>
          {workoutTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
        {errors.workout_type_id && <p className="text-red-400 text-sm mt-1">{errors.workout_type_id}</p>}
      </div>

      {/* Exercises Section */}
      {availableExerciseTemplates.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Select Exercises</h4>
          {availableExerciseTemplates.map((template) => {
            const isSelected = selectedExercises.some(ex => ex.exercise_template_id === template.id);
            const selectedExerciseData = isSelected ? selectedExercises.find(ex => ex.exercise_template_id === template.id) : null;

            return (
              <div key={template.id} className={`p-4 rounded border ${isSelected ? 'bg-sky-900 border-sky-500' : 'bg-slate-800 border-slate-600'}`}>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleExerciseToggle(template)}
                    className="accent-sky-500"
                  />
                  <DumbbellIcon className="text-white w-5 h-5" />
                  <span className="text-white font-medium">{template.name} ({template.type})</span>
                </label>

                {isSelected && selectedExerciseData && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {template.type === 'strength' && (
                      <>
                        <input type="number" value={selectedExerciseData.sets} onChange={(e) => handleExerciseDetailChange(template.id, 'sets', e.target.value)} className="w-full px-3 py-2 rounded bg-slate-700 text-white border border-slate-500" placeholder="Sets" />
                        <input type="number" value={selectedExerciseData.reps} onChange={(e) => handleExerciseDetailChange(template.id, 'reps', e.target.value)} className="w-full px-3 py-2 rounded bg-slate-700 text-white border border-slate-500" placeholder="Reps" />
                        <input type="number" value={selectedExerciseData.weight} onChange={(e) => handleExerciseDetailChange(template.id, 'weight', e.target.value)} className="w-full px-3 py-2 rounded bg-slate-700 text-white border border-slate-500" placeholder="Weight (kg)" />
                      </>
                    )}
                    {template.type !== 'strength' && (
                      <input type="number" value={selectedExerciseData.duration} onChange={(e) => handleExerciseDetailChange(template.id, 'duration', e.target.value)} className="w-full px-3 py-2 rounded bg-slate-700 text-white border border-slate-500" placeholder="Duration (minutes)" />
                    )}
                    {template.supports_distance && (
                      <input type="number" value={selectedExerciseData.distance} onChange={(e) => handleExerciseDetailChange(template.id, 'distance', e.target.value)} className="w-full px-3 py-2 rounded bg-slate-700 text-white border border-slate-500" placeholder="Distance (km)" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {errors.exercises && <p className="text-red-400 text-sm">{errors.exercises}</p>}
        </div>
      )}

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block mb-1 text-white font-semibold">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-600"
          rows={3}
          placeholder="Any additional notes about this workout..."
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 text-white px-6 py-3 rounded font-semibold hover:bg-sky-500 transition-all duration-200"
        >
          {loading ? 'Submitting...' : (initialData ? 'Update Workout' : 'Create Workout')}
        </button>
      </div>
    </form>
  );
}
