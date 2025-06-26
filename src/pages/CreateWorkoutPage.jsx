import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CreateWorkoutsPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workout_name: "",
    intensity: "",
    duration: "",
    notes: "",
  });

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        workout_name: formData.workout_name,
        intensity: parseFloat(formData.intensity),
        duration: parseInt(formData.duration),
        notes: formData.notes,
      };

      const response = await api.post("/workouts", payload);
      navigate("/dashboard"); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Workout</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block mb-1 font-medium">Workout Name</label>
          <input
            type="text"
            name="workout_name"
            value={formData.workout_name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Intensity (0 - 10)</label>
          <input
            type="number"
            name="intensity"
            step="0.1"
            min="0"
            max="10"
            value={formData.intensity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            min="0"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes (optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitting ? "Saving..." : "Create Workout"}
        </button>
      </form>
    </div>
  );
};

export default CreateWorkoutsPage;
