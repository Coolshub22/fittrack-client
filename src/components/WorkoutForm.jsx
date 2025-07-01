// Enhanced WorkoutForm with styling and functional improvements
import React, { useState, useEffect } from "react";
import { Dumbbell as DumbbellIcon, XCircle,MapPin } from "lucide-react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function WorkoutForm({ onSubmit, initialData = null }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workout_name: "",
    notes: "",
    intensity: "",
    duration: "",
    date: new Date().toISOString().slice(0, 16),
  });

  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("");
  const [availableExerciseTemplates, setAvailableExerciseTemplates] = useState(
    []
  );
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await api.get("/workout_types");
        setWorkoutTypes(res.data);
      } catch (err) {
        toast.error("Failed to load workout types.");
      }
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        workout_name: initialData.workout_name || "",
        notes: initialData.notes || "",
        intensity: initialData.intensity || "",
        duration: initialData.duration || "",
        date: initialData.date
          ? new Date(initialData.date).toISOString().slice(0, 16)
          : new Date().toISOString().slice(0, 16),
      });

      setSelectedWorkoutType(initialData.workout_type_id || "");

      if (initialData.exercises) {
        const prePopulatedExercises = initialData.exercises.map((ex) => ({
          id: ex.id,
          exercise_template_id: ex.exercise_template_id,
          name: ex.name,
          type: ex.type,
          supports_distance: ex.supports_distance,
          sets: ex.sets || "",
          reps: ex.reps || "",
          weight: ex.weight || "",
          duration: ex.duration || "",
          distance: ex.distance || "",
        }));
        setSelectedExercises(prePopulatedExercises);
      }
    }
  }, [initialData]);

  useEffect(() => {
    const fetchTemplates = async () => {
      if (!selectedWorkoutType) return;
      try {
        setLoading(true);
        const res = await api.get(
          `/workout_types/${selectedWorkoutType}/exercises`
        );
        setAvailableExerciseTemplates(res.data);
      } catch {
        toast.error("Failed to load exercises for this workout type.");
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, [selectedWorkoutType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleExerciseToggle = (template) => {
    setSelectedExercises((prev) => {
      const exists = prev.find((e) => e.exercise_template_id === template.id);
      if (exists) {
        return prev.filter((e) => e.exercise_template_id !== template.id);
      } else {
        return [
          ...prev,
          {
            id: null,
            exercise_template_id: template.id,
            name: template.name,
            type: template.type,
            supports_distance: template.supports_distance,
            sets: "",
            reps: "",
            weight: "",
            duration: "",
            distance: "",
          },
        ];
      }
    });
  };

  const handleExerciseDetailChange = (templateId, field, value) => {
    setSelectedExercises((prev) =>
      prev.map((ex) =>
        ex.exercise_template_id === templateId ? { ...ex, [field]: value } : ex
      )
    );
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.workout_name.trim())
      newErrors.workout_name = "Workout name is required";
    if (!selectedWorkoutType)
      newErrors.workout_type_id = "Workout type is required";
    if (selectedExercises.length === 0)
      newErrors.exercises = "At least one exercise is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return toast.error("Please fix the errors in the form.");
    setLoading(true);

    const payload = {
      workout_name: formData.workout_name,
      notes: formData.notes,
      intensity: formData.intensity ? parseFloat(formData.intensity) : null,
      duration: formData.duration ? parseInt(formData.duration) : null,
      date: new Date(formData.date).toISOString(),
      workout_type_id: parseInt(selectedWorkoutType),
      exercises: selectedExercises.map((ex) => ({
        id: ex.id,
        exercise_template_id: parseInt(ex.exercise_template_id),
        sets: ex.sets ? parseInt(ex.sets) : null,
        reps: ex.reps ? parseInt(ex.reps) : null,
        weight: ex.weight ? parseFloat(ex.weight) : null,
        duration: ex.duration ? parseInt(ex.duration) : null,
        distance: ex.distance ? parseFloat(ex.distance) : null,
      })),
    };

    if (!formData.duration) {
      const totalDuration = selectedExercises.reduce(
        (sum, ex) => sum + (parseInt(ex.duration) || 0),
        0
      );
      if (totalDuration > 0) payload.duration = totalDuration;
    }

    onSubmit(payload);
    setLoading(false);
  };

  const suggestedDuration = selectedExercises.reduce(
    (sum, ex) => sum + (parseInt(ex.duration) || 0),
    0
  );

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-2xl shadow-2xl space-y-6"
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to cancel? Unsaved changes will be lost."
                )
              ) {
                navigate("/workouts");
              }
            }}
            className="text-yellow-400 hover:text-red-500 transition-all duration-200"
            title="Cancel and return"
          >
            <XCircle className="w-8 h-8" />
          </button>
        </div>
        <div>
          <label className="block mb-1 text-white font-semibold">
            Workout Name *
          </label>
          <input
            name="workout_name"
            value={formData.workout_name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-2xl bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {errors.workout_name && (
            <p className="text-red-400 text-sm italic mt-1">
              {errors.workout_name}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-white font-semibold">
            Workout Type *
          </label>
          <select
            value={selectedWorkoutType}
            onChange={(e) => setSelectedWorkoutType(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Select type...</option>
            {workoutTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.workout_type_id && (
            <p className="text-red-400 text-sm italic mt-1">
              {errors.workout_type_id}
            </p>
          )}
        </div>

        {availableExerciseTemplates.length > 0 && (
          <div className="space-y-4">
            {availableExerciseTemplates.map((template) => {
              const isSelected = selectedExercises.some(
                (ex) => ex.exercise_template_id === template.id
              );
              const selectedExerciseData = selectedExercises.find(
                (ex) => ex.exercise_template_id === template.id
              );

              return (
                <div
                  key={template.id}
                  className={`transition-all duration-200 transform hover:scale-[1.01] p-4 rounded-2xl border ${
                    isSelected
                      ? "bg-sky-900 border-sky-500"
                      : "bg-slate-800 border-slate-600"
                  }`}
                >
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleExerciseToggle(template)}
                      className="accent-sky-500"
                    />
                    <DumbbellIcon className="text-white w-5 h-5" />
                    <span className="text-white font-medium">
                      {template.name} ({template.type})
                    </span>
                  </label>

                  {isSelected && selectedExerciseData && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      {template.type === "strength" && (
                        <>
                          <input
                            type="number"
                            value={selectedExerciseData.sets}
                            onChange={(e) =>
                              handleExerciseDetailChange(
                                template.id,
                                "sets",
                                e.target.value
                              )
                            }
                            className="px-3 py-2 rounded-2xl bg-slate-700 text-white border border-slate-500"
                            placeholder="Sets"
                          />
                          <input
                            type="number"
                            value={selectedExerciseData.reps}
                            onChange={(e) =>
                              handleExerciseDetailChange(
                                template.id,
                                "reps",
                                e.target.value
                              )
                            }
                            className="px-3 py-2 rounded-2xl bg-slate-700 text-white border border-slate-500"
                            placeholder="Reps"
                          />
                          <input
                            type="number"
                            value={selectedExerciseData.weight}
                            onChange={(e) =>
                              handleExerciseDetailChange(
                                template.id,
                                "weight",
                                e.target.value
                              )
                            }
                            className="px-3 py-2 rounded-2xl bg-slate-700 text-white border border-slate-500"
                            placeholder="Weight (kg)"
                          />
                        </>
                      )}
                      {template.type !== "strength" && (
                        <input
                          type="number"
                          value={selectedExerciseData.duration}
                          onChange={(e) =>
                            handleExerciseDetailChange(
                              template.id,
                              "duration",
                              e.target.value
                            )
                          }
                          className="px-3 py-2 rounded-2xl bg-slate-700 text-white border border-slate-500"
                          placeholder="Duration (minutes)"
                        />
                      )}
                      {template.supports_distance && (
                        <input
                          type="number"
                          value={selectedExerciseData.distance}
                          onChange={(e) =>
                            handleExerciseDetailChange(
                              template.id,
                              "distance",
                              e.target.value
                            )
                          }
                          className="px-3 py-2 rounded-2xl bg-slate-700 text-white border border-slate-500"
                          placeholder="Distance (km)"
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {errors.exercises && (
              <p className="text-red-400 text-sm italic">{errors.exercises}</p>
            )}
          </div>
        )}

        <div>
          <label className="block mb-1 text-white font-semibold">
            Workout Duration (minutes)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder={`Suggested: ${suggestedDuration || 0}`}
            className="w-full px-4 py-2 rounded-2xl bg-slate-800 text-white border border-slate-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-white font-semibold">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-2xl bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
            rows={3}
            placeholder="Any additional notes about this workout..."
          />
        </div>

        <div className="flex justify-between space-x-4 mt-4">
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 border-2 border-sky-500 text-sky-500 hover:bg-green-600 hover:text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? "Submitting..."
              : initialData
              ? "Update Workout"
              : "Create Workout"}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to cancel? Unsaved changes will be lost."
                )
              ) {
                navigate("/workouts");
              }
            }}
            className="flex-1 border-2 border-yellow-400 text-yellow-400 hover:bg-red-600 hover:text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
