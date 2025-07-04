import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutForm from '../components/WorkoutForm';
import api from '../api/api';
import { toast } from 'react-toastify';

export default function CreateWorkoutPage() {
  const navigate = useNavigate();

  const handleCreateWorkout = async (newWorkout) => {
    console.log('Submitting workout:', newWorkout);
    try {
      await api.post('/workouts', newWorkout);
      toast.success('Workout created successfully!');
      navigate('/workouts');
    } catch (err) {
      console.error(err);
      toast.error('Failed to create workout');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* <h2 className="text-3xl font-bold text-center text-text-primary mb-8">
        New Workout
      </h2> */}
      <p className='mb-2 font-semibold'>Fill in your Workout & Exercise Info:</p>
      <WorkoutForm onSubmit={handleCreateWorkout} />
    </div>
  );
}
