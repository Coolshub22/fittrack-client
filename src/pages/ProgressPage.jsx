import React, { useState } from 'react';
import { BarChart3, TrendingUp, Flame, Clock, Calendar, Trophy } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ProgressPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const progressStats = {
    totalWorkouts: 127,
    totalExercises: 340,
    caloriesBurned: '28,500',
    personalBestSquat: '120 kg',
    longestRun: '15.2 km',
    avgWorkoutDuration: '52 minutes',
    currentStreak: 12,
    totalDistance: '245 km'
  };

  const weeklyProgress = [
    { week: 'Week 1', workouts: 4, calories: 1200, duration: 180 },
    { week: 'Week 2', workouts: 5, calories: 1450, duration: 220 },
    { week: 'Week 3', workouts: 3, calories: 980, duration: 140 },
    { week: 'Week 4', workouts: 6, calories: 1680, duration: 280 },
    { week: 'Week 5', workouts: 5, calories: 1520, duration: 240 },
    { week: 'Week 6', workouts: 7, calories: 1920, duration: 320 },
    { week: 'Week 7', workouts: 4, calories: 1200, duration: 185 },
    { week: 'Week 8', workouts: 6, calories: 1750, duration: 290 }
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
        {/* Header */}
        <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 mb-8 border border-slate-600">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-5xl font-extrabold text-light-grey tracking-tight">
              My Progress Dashboard
            </h1>
            <Trophy className="h-16 w-16 text-deep-sky-blue animate-pulse" />
          </div>
          
          {/* Tab Navigation */}
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              value={`${progressStats.caloriesBurned} kcal`}
              bgColor="bg-slate-grey"
              iconColor="text-lime-green"
            />
            <StatCard
              icon={Clock}
              title="Avg Duration"
              value={progressStats.avgWorkoutDuration}
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
              icon={BarChart3}
              title="Total Exercises"
              value={progressStats.totalExercises}
              bgColor="bg-slate-grey"
              iconColor="text-deep-sky-blue"
            />
            <StatCard
              icon={TrendingUp}
              title="Total Distance"
              value={progressStats.totalDistance}
              bgColor="bg-slate-grey"
              iconColor="text-lime-green"
            />
          </div>
        )}

        {/* Charts Tab */}
        {activeTab === 'charts' && (
          <div className="space-y-8">
            {/* Weekly Progress Line Chart */}
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

            {/* Exercise Distribution Pie Chart */}
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

              {/* Monthly Calories Bar Chart */}
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

        {/* Trends Tab */}
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

        {/* Motivational Footer */}
        <div className="text-center mt-12 p-6 bg-slate-grey rounded-xl border border-slate-600">
          <p className="text-stone-grey text-lg italic">
            "Every workout brings you closer to your goals. Keep pushing, Mwirigi! 💪"
          </p>
        </div>
      </div>

      <style jsx>{`
        .bg-midnight-blue { background-color: #111827; }
        .bg-slate-grey { background-color: #1F2937; }
        .text-light-grey { color: #E5E7EB; }
        .text-stone-grey { color: #9CA3AF; }
        .text-deep-sky-blue { color: #00BFFF; }
        .text-lime-green { color: #32CD32; }
        .bg-deep-sky-blue { background-color: #00BFFF; }
        .border-slate-600 { border-color: #475569; }
      `}</style>
    </div>
  );
};

export default ProgressPage;