import React, { useState } from 'react';
import { User, Calendar, MapPin, Mail, Phone, Heart, Trophy, Edit3, Save, X } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    name: 'Mwirigi Redbull',
    email: 'mwirigi.redbull@fittrack.co.ke',
    phone: '+254 712 345 678',
    age: 28,
    location: 'Nairobi, Kenya',
    bio: 'Fitness enthusiast and personal trainer. Always pushing limits and inspiring others!',
    joinDate: 'January 15, 2023',
    fitnessLevel: 'Advanced',
    achievements: 12,
    favoriteWorkout: 'HIIT Training',
    avatar: '🏋️‍♂️'
  });

  const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Professional'];
  const avatarOptions = ['🏋️‍♂️', '🧘‍♀️', '🏃‍♂️', '🏊‍♀️', '🤸‍♀️', '💪', '🚴‍♂️', '🏃‍♀️', '🤸‍♂️', '🏊‍♂️'];

  const handleEditUser = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  const startEdit = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const InfoCard = ({ icon: Icon, label, value, iconColor = "text-blue-400" }) => (
    <div className="bg-gray-800 p-4 rounded-xl shadow-inner border border-gray-600 hover:border-blue-400 transition-all duration-300">
      <div className="flex items-center space-x-3">
        <Icon className={`h-6 w-6 ${iconColor}`} />
        <div className="flex-1">
          <span className="font-semibold text-gray-400 text-sm uppercase tracking-wider">{label}:</span>
          <span className="text-gray-200 text-base ml-2">{value}</span>
        </div>
      </div>
    </div>
  );

  const ProfileForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState(user);

    const handleSubmit = () => {
      if (!formData.name || !formData.email) {
        alert('Name and email are required!');
        return;
      }
      onSave({ ...formData, age: parseInt(formData.age) || 0, achievements: parseInt(formData.achievements) || 0 });
    };

    return (
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-600">
        <h2 className="text-2xl font-bold text-gray-200 mb-6 flex items-center">
          <Edit3 className="h-6 w-6 text-blue-400 mr-2" />
          Edit Profile
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                min="1"
                max="120"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Fitness Level</label>
              <select
                value={formData.fitnessLevel}
                onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
              >
                {fitnessLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Achievements</label>
              <input
                type="number"
                value={formData.achievements}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Favorite Workout</label>
              <input
                type="text"
                value={formData.favoriteWorkout}
                onChange={(e) => setFormData({ ...formData, favoriteWorkout: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                placeholder="e.g., HIIT Training, Yoga, CrossFit"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">Avatar</label>
            <div className="flex flex-wrap gap-2">
              {avatarOptions.map(avatar => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setFormData({ ...formData, avatar })}
                  className={`text-2xl p-2 rounded-lg border-2 transition-all duration-200 ${
                    formData.avatar === avatar
                      ? 'border-blue-400 bg-gray-900'
                      : 'border-gray-600 hover:border-blue-400'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none h-24"
              placeholder="Tell us about yourself and your fitness journey..."
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              onClick={onCancel}
              className="bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold py-3 px-6 rounded-xl transition-all duration-300"
            >
              <X className="h-4 w-4 inline mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
            >
              <Save className="h-4 w-4 inline mr-2" />
              Save Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 font-sans">
        <div className="max-w-4xl mx-auto">
          <ProfileForm
            user={user}
            onSave={handleEditUser}
            onCancel={cancelEdit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-600">
          <div className="flex items-center justify-between">
            <h1 className="text-5xl font-extrabold text-gray-200 tracking-tight">
              My Fitness Profile
            </h1>
            <User className="h-16 w-16 text-blue-400" />
          </div>
        </div>

        {/* Main Profile Display */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-600">
          {/* Profile Header */}
          <div className="text-center mb-8 relative">
            <button
              onClick={startEdit}
              className="absolute top-0 right-0 bg-blue-400 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
            >
              <Edit3 className="h-4 w-4" />
            </button>

            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 bg-gray-900 rounded-full border-4 border-blue-400 flex items-center justify-center text-6xl shadow-2xl">
                {user.avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <Trophy className="h-4 w-4" />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-gray-200 mb-2">{user.name}</h2>
            <div className="inline-flex items-center px-4 py-2 bg-gray-900 rounded-full border border-gray-600">
              <span className="text-gray-400 text-sm mr-2">Fitness Level:</span>
              <span className="text-green-500 font-bold">{user.fitnessLevel}</span>
            </div>
          </div>

          {/* Bio Section */}
          {user.bio && (
            <div className="bg-gray-900 p-6 rounded-xl shadow-inner mb-8 border border-gray-600">
              <h3 className="text-xl font-bold text-gray-200 mb-3 flex items-center">
                <Heart className="h-5 w-5 text-blue-400 mr-2" />
                About Me
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed italic">
                "{user.bio}"
              </p>
            </div>
          )}

          {/* Contact & Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {user.email && (
              <InfoCard icon={Mail} label="Email" value={user.email} />
            )}
            {user.phone && (
              <InfoCard icon={Phone} label="Phone" value={user.phone} />
            )}
            {user.age > 0 && (
              <InfoCard icon={Calendar} label="Age" value={`${user.age} years`} />
            )}
            {user.location && (
              <InfoCard icon={MapPin} label="Location" value={user.location} />
            )}
            <InfoCard icon={Calendar} label="Member Since" value={user.joinDate} />
          </div>

          {/* Fitness Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900 p-6 rounded-xl text-center border border-gray-600 hover:border-blue-400 transition-all duration-300">
              <Trophy className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <h4 className="text-2xl font-bold text-gray-200">{user.achievements}</h4>
              <p className="text-gray-400">Achievements</p>
            </div>
            {user.favoriteWorkout && (
              <div className="bg-gray-900 p-6 rounded-xl text-center border border-gray-600 hover:border-blue-400 transition-all duration-300">
                <Heart className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-gray-200">{user.favoriteWorkout}</h4>
                <p className="text-gray-400">Favorite Workout</p>
              </div>
            )}
            <div className="bg-gray-900 p-6 rounded-xl text-center border border-gray-600 hover:border-blue-400 transition-all duration-300">
              <User className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-gray-200">{user.fitnessLevel}</h4>
              <p className="text-gray-400">Fitness Level</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Connect & Follow
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Send Message
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-gray-800 rounded-xl border border-gray-600">
          <p className="text-gray-400 text-lg">
            Join our amazing fitness community and connect with like-minded individuals! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;