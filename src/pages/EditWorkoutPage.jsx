import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkoutForm from '../components/WorkoutForm'; // Assuming WorkoutForm is in components folder
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function EditWorkoutPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await api.get(`/workouts/${id}`);
        setWorkout(res.data);
      } catch (err) {
        toast.error('Failed to load workout');
        navigate('/workouts');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchWorkout();
    else navigate('/login');
  }, [id, token, navigate]);

  const handleUpdateWorkout = async (updatedWorkout) => {
    try {
      await api.patch(`/workouts/${id}`, updatedWorkout);
      toast.success('Workout updated successfully!');
      navigate('/workouts');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to update workout");
    }
  };

  if (loading) return <p className="text-center text-text-secondary">Loading workout...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className='mb-2 font-semibold text-text-primary'>Edit your Workout & Exercise Info:</p>
      {workout && (
        <WorkoutForm
          initialData={workout} // Pass the fetched workout data here
          onSubmit={handleUpdateWorkout}
        />
      )}
    </div>
  );
}
