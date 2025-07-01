import React, { useEffect, useState } from 'react';
import {
  Dumbbell,
  Flame,
  Timer,
  MapPin,
  BarChart3,
  MapPin,
  Loader,
  Trophy,
} from 'lucide-react';
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
          api.get('/progress'), // Fetches summary data including streaks and specific PBs
          api.get('/personal-bests'), // Fetches all personal best records
        ]);
        setSummary(progressRes.data);
        setPersonalBests(pbRes.data);
      } catch (error) {
        console.error('Error fetching progress or personal bests:', error);
        // Optionally, set an error state to display to the user
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
      <h1 className="text-4xl font-extrabold text-text-primary mb-8">Progress Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {[
          {
            label: 'Total Workouts',
            icon: <Dumbbell className="w-6 h-6 text-blue-400" />,
            value: summary?.totalWorkouts ?? 0,
          },
          {
            label: 'Calories Burned',
            icon: <Flame className="w-6 h-6 text-red-500" />,
            value: `${summary?.caloriesBurned ?? 0} kcal`,
          },
          {
            label: 'Avg. Duration',
            icon: <Timer className="w-6 h-6 text-yellow-400" />,
            value: summary?.avgWorkoutDuration ?? '0 minutes',
          },
          {
            label: 'Total Exercises',
            icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
            value: summary?.totalExercises ?? 0,
          },
          {
            label: 'Current Streak',
            icon: <Trophy className="w-6 h-6 text-emerald-400" />,
            value: `${summary?.currentStreak ?? 0} days`,
          },
          {
            label: 'Longest Streak',
            icon: <Trophy className="w-6 h-6 text-emerald-400" />,
            value: `${summary?.longestStreak ?? 0} days`,
          },
          // Personal Best for Squat from summary
          {
            label: 'PB Squat',
            icon: <Dumbbell className="w-6 h-6 text-gray-400" />,
            value: summary?.personalBestSquat ?? 'N/A',
          },
          // Personal Best for Run from summary
          {
            label: 'Longest Run',
            icon: <MapPin className="w-6 h-6 text-cyan-400" />,
            value: summary?.longestRun ?? 'N/A',
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-ui-cards p-6 rounded-2xl shadow-md border border-slate-700 flex items-center space-x-4
              hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition duration-200"
          >
            {card.icon}
            <div>
              <p className="text-text-secondary text-lg">{card.label}</p>
              <p className="text-2xl font-bold text-text-primary">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-ui-cards p-6 rounded-2xl shadow-md border border-slate-700 hover:border-blue-500 hover:shadow-blue-500/30 transition duration-200">
        <h2 className="text-2xl font-bold text-text-primary mb-4">All Personal Bests</h2>

        {personalBests && personalBests.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-text-secondary text-lg">
            {personalBests.map((pb) => (
              <li key={pb.id}>
                <span className="font-semibold text-text-primary">{pb.exercise_name}</span>{' '}
                {pb.max_weight && `- ${pb.max_weight} kg`}
                {pb.max_reps && `, ${pb.max_reps} reps`}
                {pb.max_duration && `, ${pb.max_duration} min`}
                {pb.max_distance && `, ${pb.max_distance} km`} {/* Added distance */}
                {pb.date_achieved && ` (on ${new Date(pb.date_achieved).toLocaleDateString()})`} {/* Added date */}
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