
import React, { useEffect, useState } from 'react';
import { Dumbbell, Flame, Timer, BarChart3, MapPin, Loader, Trophy } from 'lucide-react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

const ProgressPage = () => {
  const { token } = useAuth();
  const [summary, setSummary] = useState(null);
  const [personalBests, setPersonalBests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const [progressRes, pbRes] = await Promise.all([
          api.get('/progress'),
          api.get('/personal-bests'),
        ]);
        setSummary(progressRes.data);
        setPersonalBests(pbRes.data);
      } catch (error) {
        console.error('Error fetching progress or personal bests:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProgress();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-12 h-12 text-accent" />

      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-text-primary mb-6">Progress Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-ui-cards p-6 rounded-2xl shadow-md border border-slate-700 flex items-center space-x-4">
          <Dumbbell className="w-6 h-6 text-accent" />
          <div>
            <p className="text-text-secondary text-lg">Total Workouts</p>
            <p className="text-2xl font-bold text-text-primary">{summary?.totalWorkouts ?? 0}</p>
          </div>
        </div>

        <div className="bg-ui-cards p-6 rounded-2xl shadow-md border border-slate-700 flex items-center space-x-4">
          <Flame className="w-6 h-6 text-accent" />
          <div>
            <p className="text-text-secondary text-lg">Calories Burned</p>
            <p className="text-2xl font-bold text-text-primary">{summary?.caloriesBurned ?? 0} kcal</p>
          </div>
        </div>

        <div className="bg-ui-cards p-6 rounded-2xl shadow-md border border-slate-700 flex items-center space-x-4">
          <Timer className="w-6 h-6 text-accent" />
          <div>
            <p className="text-text-secondary text-lg">Avg. Duration</p>
            <p className="text-2xl font-bold text-text-primary">{summary?.avgWorkoutDuration ?? '0 minutes'}</p>
          </div>
        </div>

        <div className="bg-ui-cards p-6 rounded-2xl shadow-md border border-slate-700 flex items-center space-x-4">
          <BarChart3 className="w-6 h-6 text-accent" />
          <div>
            <p className="text-text-secondary text-lg">Total Exercises</p>
            <p className="text-2xl font-bold text-text-primary">{summary?.totalExercises ?? 0}</p>

          </div>
        </div>

        <div className="bg-ui-cards p-6 rounded-2xl shadow-md border border-slate-700 flex items-center space-x-4">
          <Trophy className="w-6 h-6 text-accent" />
          <div>
            <p className="text-text-secondary text-lg">Current Streak</p>
            <p className="text-2xl font-bold text-text-primary">{summary?.currentStreak ?? 0} days</p>

          </div>
        </div>

        <div className="bg-ui-cards p-6 rounded-2xl shadow-md border border-slate-700 flex items-center space-x-4">
          <MapPin className="w-6 h-6 text-accent" />
          <div>
            <p className="text-text-secondary text-lg">Total Distance</p>
            <p className="text-2xl font-bold text-text-primary">{summary?.totalDistance ?? '0 km'}</p>
          </div>
        </div>
      </div>

      {/* Personal Bests */}
      <div className="bg-ui-cards p-6 rounded-2xl shadow-md border border-slate-700">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Personal Bests</h2>

        {personalBests && personalBests.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-text-secondary text-lg">
            {personalBests.map((pb) => (
              <li key={pb.id}>
                <span className="font-semibold text-text-primary">{pb.exercise_name}</span>{' '}
                {pb.max_weight && `- ${pb.max_weight} kg`}
                {pb.max_reps && `, ${pb.max_reps} reps`}
                {pb.max_duration && `, ${pb.max_duration} min`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-text-secondary">No personal bests recorded yet.</p>
        )}
      </div>

    </div>
  );
};

export default ProgressPage;
