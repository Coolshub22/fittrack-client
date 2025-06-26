import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Flame, Clock, Calendar, Trophy, Scale, Weight, Play, Square, Activity } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ProgressPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const [progressStats, setProgressStats] = useState({
    totalWorkouts: 1,
    totalExercises: 0,
    caloriesBurned: 340,
    personalBestSquat: '100 kg',
    longestRun: '31.5 km',
    avgWorkoutDuration: 0,
    currentStreak: 1,
    totalDistance: 0,
    startingWeight: 80,
    weightHistory: [
      { date: '2025-06-25', weight: 78.5 },
      { date: '2025-06-20', weight: 79.0 },
      { date: '2025-06-15', weight: 79.5 },
      { date: '2025-06-10', weight: 80.0 },
    ],
  });

  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [workoutDuration, setWorkoutDuration] = useState(0);

  const [newDailyWeight, setNewDailyWeight] = useState('');
  const [recordedWorkoutSessions, setRecordedWorkoutSessions] = useState([
    { date: '2025-06-24', duration: 65, type: 'Cardio' },
    { date: '2025-06-23', duration: 45, type: 'Strength' },
    { date: '2025-06-22', duration: 70, type: 'HIIT' },
  ]);

  useEffect(() => {
    let interval = null;
    if (isWorkoutActive && workoutStartTime) {
      interval = setInterval(() => {
        setWorkoutDuration(Math.floor((Date.now() - workoutStartTime) / 1000));
      }, 1000);
    } else if (!isWorkoutActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive, workoutStartTime]);

  const weeklyProgress = [
    { week: 'Week 1', workouts: 4, calories: 1200, duration: 180 },
    { week: 'Week 2', workouts: 5, calories: 1450, duration: 220 },
    { week: 'Week 3', workouts: 3, calories: 980, duration: 140 },
    { week: 'Week 4', workouts: 6, calories: 1680, duration: 280 },
    { week: 'Week 5', calories: 1520, duration: 240, workouts: 5 },
    { week: 'Week 6', calories: 1920, duration: 320, workouts: 7 },
    { week: 'Week 7', calories: 1200, duration: 185, workouts: 4 },
    { week: 'Week 8', calories: 1750, duration: 290, workouts: 6 }
  ];

  const exerciseDistribution = [
    { name: 'Strength Training', value: 45, color: '#00BFFF' },
    { name: 'Cardio', value: 30, color: '#32CD32' },
    { name: 'Flexibility', value: 15, color: '#FF6B6B' },
    { name: 'Sports', value: 10, color: '#FFD93D' }
  ];

  const monthlyCalories = [
    { month: 'Jan', calories: 4200 },
    { month: 'Feb', calories: 3800 },
    { month: 'Mar', calories: 5100 },
    { month: 'Apr', calories: 4600 },
    { month: 'May', calories: 5400 },
    { month: 'Jun', calories: 6200 }
  ];

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startTrackingWorkout = () => {
    setIsWorkoutActive(true);
    setWorkoutStartTime(Date.now());
    setWorkoutDuration(0);
  };

  const stopTrackingWorkout = () => {
    if (workoutStartTime) {
      const durationInMinutes = Math.floor(workoutDuration / 60);
      const newSession = {
        date: new Date().toISOString().split('T')[0],
        duration: durationInMinutes,
        type: 'General Workout',
      };

      setRecordedWorkoutSessions((prev) => [newSession, ...prev]);

      setProgressStats((prev) => {
        const updatedTotalWorkouts = prev.totalWorkouts + 1;
        const updatedCaloriesBurned = prev.caloriesBurned + (durationInMinutes * 10);
        const updatedTotalExercises = prev.totalExercises + 5;

        const previousTotalDurationMinutes = prev.avgWorkoutDuration * (prev.totalWorkouts);
        const newAvgWorkoutDuration = Math.floor((previousTotalDurationMinutes + durationInMinutes) / updatedTotalWorkouts);

        const updatedCurrentStreak = prev.currentStreak + 1;
        const updatedTotalDistance = prev.totalDistance + (durationInMinutes / 10);

        return {
          ...prev,
          totalWorkouts: updatedTotalWorkouts,
          caloriesBurned: updatedCaloriesBurned,
          totalExercises: updatedTotalExercises,
          avgWorkoutDuration: newAvgWorkoutDuration,
          currentStreak: updatedCurrentStreak,
          totalDistance: updatedTotalDistance,
        };
      });
    }
    setIsWorkoutActive(false);
    setWorkoutStartTime(null);
    setWorkoutDuration(0);
  };

  const handleLogDailyWeight = () => {
    const weight = parseFloat(newDailyWeight);
    if (!isNaN(weight) && weight > 0) {
      const today = new Date().toISOString().split('T')[0];
      setProgressStats(prevStats => {
        const updatedWeightHistory = [
          { date: today, weight: weight },
          ...prevStats.weightHistory.filter(entry => entry.date !== today)
        ];
        return { ...prevStats, weightHistory: updatedWeightHistory };
      });
      setNewDailyWeight('');
    } else {
      alert('Please enter a valid weight.');
    }
  };

  const currentWeight = progressStats.weightHistory.length > 0
    ? progressStats.weightHistory[0].weight
    : progressStats.startingWeight;

  const weightDifference = currentWeight - progressStats.startingWeight;

  const StatCard = ({ icon: Icon, title, value, bgColor, iconColor }) => (
    <div className={`${bgColor} p-6 rounded-xl shadow-lg border border-slate-600 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
      <div className="flex items-center space-x-4">
        <Icon className={`h-12 w-12 ${iconColor}`} />
        <div className="flex-1">
          <p className="text-stone-grey text-sm font-medium uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-light-grey mt-1">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-midnight-blue p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 mb-8 border border-slate-600">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-5xl font-extrabold text-light-grey tracking-tight">
              My Progress Dashboard
            </h1>
            <Trophy className="h-16 w-16 text-deep-sky-blue animate-pulse" />
          </div>
          
          <div className="flex space-x-4 mb-6">
            {['overview', 'charts', 'trends'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-deep-sky-blue text-white shadow-lg'
                    : 'bg-midnight-blue text-stone-grey hover:bg-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={BarChart3}
                title="Total Workouts"
                value={progressStats.totalWorkouts}
                bgColor="bg-slate-grey"
                iconColor="text-deep-sky-blue"
              />
              <StatCard
                icon={Flame}
                title="Calories Burned"
                value={`${progressStats.caloriesBurned.toLocaleString()} kcal`}
                bgColor="bg-slate-grey"
                iconColor="text-lime-green"
              />
              <StatCard
                icon={Clock}
                title="Avg Duration"
                value={`${progressStats.avgWorkoutDuration} minutes`}
                bgColor="bg-slate-grey"
                iconColor="text-deep-sky-blue"
              />
              <StatCard
                icon={Calendar}
                title="Current Streak"
                value={`${progressStats.currentStreak} days`}
                bgColor="bg-slate-grey"
                iconColor="text-lime-green"
              />
              <StatCard
                icon={TrendingUp}
                title="Best Squat"
                value={progressStats.personalBestSquat}
                bgColor="bg-slate-grey"
                iconColor="text-deep-sky-blue"
              />
              <StatCard
                icon={TrendingUp}
                title="Longest Run"
                value={progressStats.longestRun}
                bgColor="bg-slate-grey"
                iconColor="text-lime-green"
              />
              <StatCard
                icon={Scale}
                title="Starting Weight"
                value={`${progressStats.startingWeight} kg`}
                bgColor="bg-slate-grey"
                iconColor="text-deep-sky-blue"
              />
              <StatCard
                icon={Weight}
                title="Weight Difference"
                value={`${weightDifference.toFixed(1)} kg`}
                bgColor="bg-slate-grey"
                iconColor={weightDifference > 0 ? "text-lime-green" : (weightDifference < 0 ? "text-red-500" : "text-stone-grey")}
              />
            </div>

            <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 border border-slate-600">
              <h2 className="text-3xl font-bold text-light-grey mb-6 flex items-center">
                <Clock className="h-8 w-8 text-deep-sky-blue mr-3" />
                Live Workout Timer
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
                <div className="text-6xl font-mono text-lime-green tracking-wider bg-midnight-blue p-4 rounded-xl shadow-inner border border-slate-700 min-w-[180px] text-center">
                  {formatTime(workoutDuration)}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <button
                    onClick={startTrackingWorkout}
                    disabled={isWorkoutActive}
                    className={`flex-1 flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isWorkoutActive
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-lime-green hover:bg-green-600 text-white transform hover:scale-105 shadow-md'
                    }`}
                  >
                    <Play className="h-6 w-6 mr-3" />
                    Start Workout
                  </button>
                  <button
                    onClick={stopTrackingWorkout}
                    disabled={!isWorkoutActive}
                    className={`flex-1 flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      !isWorkoutActive
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600 text-white transform hover:scale-105 shadow-md'
                    }`}
                  >
                    <Square className="h-6 w-6 mr-3" />
                    Stop Workout
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 border border-slate-600">
              <h3 className="text-3xl font-bold text-light-grey mb-6 flex items-center">
                <Weight className="h-8 w-8 text-deep-sky-blue mr-3" />
                Daily Weight Tracker
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-midnight-blue p-6 rounded-xl text-center border border-slate-700 shadow-inner">
                  <Scale className="h-16 w-16 text-lime-green mx-auto mb-3" />
                  <p className="text-stone-grey text-lg">Current Weight</p>
                  <h4 className="text-4xl font-bold text-light-grey mt-1">
                    {currentWeight.toFixed(1)} kg
                  </h4>
                </div>
                <div className="bg-midnight-blue p-6 rounded-xl border border-slate-700 shadow-inner flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-semibold text-light-grey mb-3 text-center">Log Today's Weight</h4>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Enter weight (kg)"
                      value={newDailyWeight}
                      onChange={(e) => setNewDailyWeight(e.target.value)}
                      className="w-full p-3 bg-slate-grey border border-slate-600 rounded-lg text-light-grey focus:border-deep-sky-blue focus:outline-none placeholder-stone-grey mb-4"
                    />
                  </div>
                  <button
                    onClick={handleLogDailyWeight}
                    className="w-full bg-deep-sky-blue hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md"
                  >
                    Log Weight
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-light-grey mb-4">Weight History</h4>
                {progressStats.weightHistory.length > 0 ? (
                  <ul className="space-y-3 max-h-56 overflow-y-auto pr-3 custom-scrollbar">
                    {progressStats.weightHistory.map((entry, index) => (
                      <li key={index} className="flex justify-between items-center bg-midnight-blue p-4 rounded-lg border border-slate-700 shadow-sm">
                        <span className="text-stone-grey text-md font-medium">
                          {new Date(entry.date).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric'
                          })}
                        </span>
                        <span className="text-lime-green font-bold text-lg">{entry.weight.toFixed(1)} kg</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-stone-grey text-md text-center py-6">No weight history logged yet.</p>
                )}
              </div>
            </div>

            <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 border border-slate-600">
              <h3 className="text-3xl font-bold text-light-grey mb-6 flex items-center">
                <Activity className="h-8 w-8 text-deep-sky-blue mr-3" />
                Recent Workout Sessions
              </h3>
              {recordedWorkoutSessions.length > 0 ? (
                <ul className="space-y-3 max-h-56 overflow-y-auto pr-3 custom-scrollbar">
                  {recordedWorkoutSessions.map((session, index) => (
                    <li key={index} className="flex justify-between items-center bg-midnight-blue p-4 rounded-lg border border-slate-700 shadow-sm">
                      <span className="text-stone-grey text-md font-medium">
                        {new Date(session.date).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                        <span className="block text-sm text-gray-500">{session.type}</span>
                      </span>
                      <span className="text-lime-green font-bold text-lg">{session.duration} minutes</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-stone-grey text-md text-center py-6">No workout sessions logged yet. Start a workout!</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'charts' && (
          <div className="space-y-8">
            <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 border border-slate-600">
              <h2 className="text-3xl font-bold text-light-grey mb-6 flex items-center">
                <TrendingUp className="h-8 w-8 text-deep-sky-blue mr-3" />
                Weekly Workout Progress
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="week" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#E5E7EB'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="workouts" 
                      stroke="#00BFFF" 
                      strokeWidth={3}
                      dot={{ fill: '#00BFFF', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#00BFFF', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 border border-slate-600">
                <h2 className="text-2xl font-bold text-light-grey mb-6">Exercise Distribution</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={exerciseDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {exerciseDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#E5E7EB'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 border border-slate-600">
                <h2 className="text-2xl font-bold text-light-grey mb-6">Monthly Calories Burned</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyCalories}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#E5E7EB'
                        }} 
                      />
                      <Bar dataKey="calories" fill="#32CD32" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 border border-slate-600">
            <h2 className="text-3xl font-bold text-light-grey mb-6">Workout Duration Trends</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="week" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#E5E7EB'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="duration" 
                    stroke="#00BFFF" 
                    fill="rgba(0, 191, 255, 0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="text-center mt-12 p-6 bg-slate-grey rounded-xl border border-slate-600">
          <p className="text-stone-grey text-lg italic">
            "Every workout brings you closer to your goals. Keep pushing! 💪"
          </p>
        </div>
      </div>

      <style>{`
        .bg-midnight-blue { background-color: #111827; }
        .bg-slate-grey { background-color: #1F2937; }
        .text-light-grey { color: #E5E7EB; }
        .text-stone-grey { color: #9CA3AF; }
        .text-deep-sky-blue { color: #00BFFF; }
        .text-lime-green { color: #32CD32; }
        .bg-deep-sky-blue { background-color: #00BFFF; }
        .border-slate-600 { border-color: #475569; }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1F2937;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
    </div>
  );
};

export default ProgressPage;