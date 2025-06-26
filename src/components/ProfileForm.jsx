import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const ProfileForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user);
  const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Professional'];
  const avatarOptions = ['🏋️‍♂️', '🧘‍♀️', '🏃‍♂️', '🏊‍♀️', '🤸‍♀️', '💪'];

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
    <div className="bg-ui-cards p-6 rounded-2xl border border-slate-700">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Edit Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          className="bg-gray-900 text-gray-200 p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="bg-gray-900 text-gray-200 p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="bg-gray-900 text-gray-200 p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          className="bg-gray-900 text-gray-200 p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
          placeholder="Age"
          type="number"
          value={formData.age || ''}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <input
          className="bg-gray-900 text-gray-200 p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <select
          className="bg-gray-900 text-gray-200 p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
          value={formData.fitnessLevel}
          onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })}
        >
          <option disabled value="">Select Fitness Level</option>
          {fitnessLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <input
          className="bg-gray-900 text-gray-200 p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
          placeholder="Achievements"
          type="number"
          value={formData.achievements || ''}
          onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
        />
        <input
          className="bg-gray-900 text-gray-200 p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
          placeholder="Favorite Workout"
          value={formData.favoriteWorkout}
          onChange={(e) => setFormData({ ...formData, favoriteWorkout: e.target.value })}
        />
        <input
          className="bg-gray-900 text-gray-200 p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
          placeholder="Starting Weight (kg)"
          type="number"
          value={formData.startingWeight || ''}
          onChange={(e) => setFormData({ ...formData, startingWeight: e.target.value })}
        />
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">Choose Avatar:</p>
        <div className="flex gap-2 flex-wrap">
          {avatarOptions.map(avatar => (
            <button
              key={avatar}
              onClick={() => setFormData({ ...formData, avatar })}
              className={`text-2xl p-2 rounded-lg border transition ${
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

      <textarea
        className="w-full p-3 bg-gray-900 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:border-blue-400 h-24"
        placeholder="Tell us about your fitness journey..."
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
      />

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={onCancel}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded-lg"
        >
          <X className="inline w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg"
        >
          <Save className="inline w-4 h-4 mr-2" />
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
