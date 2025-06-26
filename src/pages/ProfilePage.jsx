import React, { useState } from 'react';
import { User, Calendar, MapPin, Mail, Phone, Heart, Trophy, Edit3, Save, X, Scale } from 'lucide-react';

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
    joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    fitnessLevel: '',
    achievements: 0,
    favoriteWorkout: '',
    startingWeight: 0,
    avatar: '🏋️‍♂️'
  });

  const fitnessLevels = ['Select Level', 'Beginner', 'Intermediate', 'Advanced', 'Expert', 'Professional'];
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

  const InfoCard = ({ icon: Icon, label, value, iconColor = "text-blue-400", hint = "" }) => {
    const displayValue = value || hint;
    const textColor = value ? "text-gray-200" : "text-gray-500 italic";

    return (
      <div className="bg-gray-800 p-3 rounded-lg shadow-inner border border-gray-700 hover:border-blue-400 transition-all duration-300">
        <div className="flex items-center space-x-3">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <div className="flex-1">
            <span className="font-semibold text-gray-400 text-sm uppercase tracking-wider">{label}:</span>
            <span className={`${textColor} text-base ml-2`}>{displayValue}</span>
          </div>
        </div>
      </div>
    );
  };

  const ProfileForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState(user);

    const handleSubmit = () => {
      if (!formData.name || !formData.email) {
        alert('Name and email are required!');
        return;
      }
      onSave({
        ...formData,
        age: parseInt(formData.age) || 0,
        achievements: parseInt(formData.achievements) || 0,
        startingWeight: parseFloat(formData.startingWeight) || 0
      });
    };

    return (
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700">
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
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                required
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                required
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                placeholder="e.g., +254 7XX XXX XXX"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Age</label>
              <input
                type="number"
                value={formData.age === 0 ? '' : formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                min="1"
                max="120"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                placeholder="e.g., Nairobi, Kenya"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Fitness Level</label>
              <select
                value={formData.fitnessLevel}
                onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
              >
                {fitnessLevels.map(level => (
                  <option key={level} value={level} disabled={level === 'Select Level'}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Achievements</label>
              <input
                type="number"
                value={formData.achievements === 0 ? '' : formData.achievements}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                min="0"
                placeholder="Number of fitness achievements"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Favorite Workout</label>
              <input
                type="text"
                value={formData.favoriteWorkout}
                onChange={(e) => setFormData({ ...formData, favoriteWorkout: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                placeholder="e.g., HIIT Training, Yoga, CrossFit"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2">Starting Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.startingWeight === 0 ? '' : formData.startingWeight}
                onChange={(e) => setFormData({ ...formData, startingWeight: e.target.value })}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none"
                min="0"
                placeholder="Enter your weight when joining"
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
                  className={`text-2xl p-2 rounded-lg border transition-all duration-200 ${
                    formData.avatar === avatar
                      ? 'border-blue-400 bg-gray-900'
                      : 'border-gray-700 hover:border-blue-400'
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
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-blue-400 focus:outline-none h-24"
              placeholder="Tell us about yourself and your fitness journey..."
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              onClick={onCancel}
              className="bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              <X className="h-4 w-4 inline mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
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
      <div className="min-h-screen bg-gray-900 p-4 font-sans">
        <div className="max-w-3xl mx-auto">
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
    <div className="min-h-screen bg-gray-900 p-4 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold text-gray-200 tracking-tight">
              My Fitness Profile
            </h1>
            <User className="h-8 w-8 text-blue-400" />
          </div>

          <div className="text-center mb-6 relative">
            <button
              onClick={startEdit}
              className="absolute top-0 right-0 bg-blue-400 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300"
            >
              <Edit3 className="h-4 w-4" />
            </button>

            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-gray-900 rounded-full border-2 border-blue-400 flex items-center justify-center text-4xl shadow-2xl">
                {user.avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                <Trophy className="h-3 w-3" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-200 mb-2">
              {user.name || "User Profile"}
            </h2>
            <div className="inline-flex items-center px-3 py-1 bg-gray-900 rounded-full border border-gray-700">
              <span className="text-gray-400 text-sm mr-2">Fitness Level:</span>
              <span className={`font-bold ${user.fitnessLevel ? 'text-green-500' : 'text-gray-500 italic'}`}>
                {user.fitnessLevel || "Not Set"}
              </span>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg shadow-inner mb-6 border border-gray-700">
            <h3 className="text-lg font-bold text-gray-200 mb-2 flex items-center">
              <Heart className="h-4 w-4 text-blue-400 mr-2" />
              About Me
            </h3>
            <p className="text-gray-400 text-base leading-relaxed italic">
              {user.bio || "Tell us a bit about your fitness journey and goals."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <InfoCard icon={Mail} label="Email" value={user.email} hint="e.g., your.email@example.com" />
            <InfoCard icon={Phone} label="Phone" value={user.phone} hint="e.g., +254 7XX XXX XXX" />
            <InfoCard icon={Calendar} label="Age" value={user.age > 0 ? `${user.age} years` : ''} hint="e.g., 30 years" />
            <InfoCard icon={MapPin} label="Location" value={user.location} hint="e.g., Nairobi, Kenya" />
            <InfoCard icon={Calendar} label="Member Since" value={user.joinDate} />
            <InfoCard
              icon={Scale}
              label="Starting Weight"
              value={user.startingWeight > 0 ? `${user.startingWeight} kg` : ''}
              hint="e.g., 75 kg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900 p-4 rounded-lg text-center border border-gray-700 hover:border-blue-400 transition-all duration-300">
              <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h4 className="text-xl font-bold text-gray-200">
                {user.achievements || 0}
              </h4>
              <p className="text-gray-400 text-sm">Achievements</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center border border-gray-700 hover:border-blue-400 transition-all duration-300">
              <Heart className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h4 className="text-base font-bold text-gray-200">
                {user.favoriteWorkout || "Not Set"}
              </h4>
              <p className="text-gray-400 text-sm">Favorite Workout</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center border border-gray-700 hover:border-blue-400 transition-all duration-300">
              <User className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h4 className="text-base font-bold text-gray-200">
                {user.fitnessLevel || "Not Set"}
              </h4>
              <p className="text-gray-400 text-sm">Fitness Level</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Connect & Follow
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Send Message
            </button>
          </div>
        </div>

        <div className="text-center mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-base">
            Join our amazing fitness community and connect with like-minded individuals! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;