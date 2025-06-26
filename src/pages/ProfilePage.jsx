import React, { useState } from 'react';
import { User, Heart, Trophy, Scale, Edit3 } from 'lucide-react';
import ProfileForm from '../components/ProfileForm';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    name: '',
    email: '',
    phone: '',
    age: 0,
    location: '',
    bio: '',
    joinDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }),
    fitnessLevel: '',
    achievements: 0,
    favoriteWorkout: '',
    startingWeight: 0,
    avatar: '🏋️‍♂️'
  });

  const handleEditUser = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-900 py-10 px-4 font-sans">
        <div className="max-w-3xl mx-auto">
          <ProfileForm
            user={user}
            onSave={handleEditUser}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    );
  }

  const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="bg-ui-cards p-4 rounded-2xl border border-slate-700 hover:border-blue-400 transition duration-300">
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-blue-400" />
        <div>
          <p className="text-sm text-text-secondary">{label}</p>
          <p className="text-lg font-semibold text-text-primary">{value || 'Not Set'}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-text-primary">My Fitness Profile</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-400 hover:bg-blue-600 text-white p-2 rounded-full transition"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-blue-400 flex items-center justify-center text-5xl shadow-lg">
            {user.avatar}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InfoCard icon={User} label="Name" value={user.name} />
          <InfoCard icon={Trophy} label="Achievements" value={user.achievements} />
          <InfoCard icon={Heart} label="Favorite Workout" value={user.favoriteWorkout} />
          <InfoCard icon={Scale} label="Starting Weight" value={user.startingWeight ? `${user.startingWeight} kg` : ''} />
        </div>

        <div className="bg-ui-cards p-6 rounded-2xl border border-slate-700 mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-3">About Me</h2>
          <p className="text-text-secondary italic">{user.bio || "Tell us about your fitness journey."}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
