import React, { useState } from 'react';
import { User, Calendar, MapPin, Mail, Phone, Heart, Trophy, Users, Plus, Edit3, Trash2, Save, X, } from 'lucide-react';

const ProfilePage = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [users, setUsers] = useState([
    {
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
    },
    {
      id: 2,
      name: 'Wanjiku Njeri',
      email: 'wanjiku.njeri@fittrack.co.ke',
      phone: '+254 722 987 654',
      age: 26,
      location: 'Mombasa, Kenya',
      bio: 'Marathon runner and yoga instructor. Finding balance in strength and flexibility.',
      joinDate: 'March 8, 2023',
      fitnessLevel: 'Expert',
      achievements: 18,
      favoriteWorkout: 'Long Distance Running',
      avatar: '🧘‍♀️'
    },
    {
      id: 3,
      name: 'Kiprop Koech',
      email: 'kiprop.koech@fittrack.co.ke',
      phone: '+254 733 456 789',
      age: 32,
      location: 'Eldoret, Kenya',
      bio: 'Former athlete turned fitness coach. Specializing in endurance and strength training.',
      joinDate: 'June 20, 2022',
      fitnessLevel: 'Professional',
      achievements: 25,
      favoriteWorkout: 'CrossFit',
      avatar: '🏃‍♂️'
    }
  ]);

  const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Professional'];
  const avatarOptions = ['🏋️‍♂️', '🧘‍♀️', '🏃‍♂️', '🏊‍♀️', '🤸‍♀️', '💪', '🚴‍♂️', '🏃‍♀️', '🤸‍♂️', '🏊‍♂️'];

  const currentUser = users[selectedUser] || null;

  const handleAddUser = (newUser) => {
    const id = Math.max(...users.map(u => u.id), 0) + 1;
    const userWithId = {
      ...newUser,
      id,
      joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    setUsers([...users, userWithId]);
    setSelectedUser(users.length);
    setShowAddForm(false);
  };

  const handleEditUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsEditing(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    if (users.length <= 1) {
      alert('Cannot delete the last user!');
      return;
    }
    
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    
    if (selectedUser >= updatedUsers.length) {
      setSelectedUser(updatedUsers.length - 1);
    }
  };

  const startEdit = () => {
    setEditingUser({ ...currentUser });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  const InfoCard = ({ icon: Icon, label, value, iconColor = "text-deep-sky-blue" }) => (
    <div className="bg-midnight-blue p-4 rounded-xl shadow-inner border border-slate-600 hover:border-deep-sky-blue transition-all duration-300">
      <div className="flex items-center space-x-3">
        <Icon className={`h-6 w-6 ${iconColor}`} />
        <div className="flex-1">
          <span className="font-semibold text-stone-grey text-sm uppercase tracking-wider">{label}:</span>
          <span className="text-light-grey text-base ml-2">{value}</span>
        </div>
      </div>
    </div>
  );

  const UserCard = ({ user, index, isSelected, onClick }) => (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 relative group ${
        isSelected 
          ? 'bg-deep-sky-blue border-deep-sky-blue shadow-lg scale-105' 
          : 'bg-slate-grey border-slate-600 hover:border-deep-sky-blue hover:shadow-md'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-3xl">{user.avatar}</div>
        <div className="flex-1">
          <h3 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-light-grey'}`}>
            {user.name}
          </h3>
          <p className={`text-xs ${isSelected ? 'text-blue-100' : 'text-stone-grey'}`}>
            {user.fitnessLevel}
          </p>
        </div>
      </div>
      
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteUser(user.id);
          }}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      )}
    </div>
  );

  const ProfileForm = ({ user, onSave, onCancel, isNew = false }) => {
    const [formData, setFormData] = useState(user || {
      name: '',
      email: '',
      phone: '',
      age: '',
      location: '',
      bio: '',
      fitnessLevel: 'Beginner',
      achievements: 0,
      favoriteWorkout: '',
      avatar: '🏋️‍♂️'
    });

    const handleSubmit = () => {
      if (!formData.name || !formData.email) {
        alert('Name and email are required!');
        return;
      }
      onSave({ ...formData, age: parseInt(formData.age) || 0, achievements: parseInt(formData.achievements) || 0 });
    };

    return (
      <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 border border-slate-600">
        <h2 className="text-2xl font-bold text-light-grey mb-6 flex items-center">
          {isNew ? <Plus className="h-6 w-6 text-lime-green mr-2" /> : <Edit3 className="h-6 w-6 text-deep-sky-blue mr-2" />}
          {isNew ? 'Add New Profile' : 'Edit Profile'}
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-grey text-sm font-semibold mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 bg-midnight-blue border border-slate-600 rounded-lg text-light-grey focus:border-deep-sky-blue focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-stone-grey text-sm font-semibold mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 bg-midnight-blue border border-slate-600 rounded-lg text-light-grey focus:border-deep-sky-blue focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-stone-grey text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-3 bg-midnight-blue border border-slate-600 rounded-lg text-light-grey focus:border-deep-sky-blue focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-stone-grey text-sm font-semibold mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full p-3 bg-midnight-blue border border-slate-600 rounded-lg text-light-grey focus:border-deep-sky-blue focus:outline-none"
                min="1"
                max="120"
              />
            </div>
            
            <div>
              <label className="block text-stone-grey text-sm font-semibold mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full p-3 bg-midnight-blue border border-slate-600 rounded-lg text-light-grey focus:border-deep-sky-blue focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-stone-grey text-sm font-semibold mb-2">Fitness Level</label>
              <select
                value={formData.fitnessLevel}
                onChange={(e) => setFormData({...formData, fitnessLevel: e.target.value})}
                className="w-full p-3 bg-midnight-blue border border-slate-600 rounded-lg text-light-grey focus:border-deep-sky-blue focus:outline-none"
              >
                {fitnessLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-stone-grey text-sm font-semibold mb-2">Achievements</label>
              <input
                type="number"
                value={formData.achievements}
                onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                className="w-full p-3 bg-midnight-blue border border-slate-600 rounded-lg text-light-grey focus:border-deep-sky-blue focus:outline-none"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-stone-grey text-sm font-semibold mb-2">Favorite Workout</label>
              <input
                type="text"
                value={formData.favoriteWorkout}
                onChange={(e) => setFormData({...formData, favoriteWorkout: e.target.value})}
                className="w-full p-3 bg-midnight-blue border border-slate-600 rounded-lg text-light-grey focus:border-deep-sky-blue focus:outline-none"
                placeholder="e.g., HIIT Training, Yoga, CrossFit"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-stone-grey text-sm font-semibold mb-2">Avatar</label>
            <div className="flex flex-wrap gap-2">
              {avatarOptions.map(avatar => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setFormData({...formData, avatar})}
                  className={`text-2xl p-2 rounded-lg border-2 transition-all duration-200 ${
                    formData.avatar === avatar 
                      ? 'border-deep-sky-blue bg-midnight-blue' 
                      : 'border-slate-600 hover:border-deep-sky-blue'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-stone-grey text-sm font-semibold mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full p-3 bg-midnight-blue border border-slate-600 rounded-lg text-light-grey focus:border-deep-sky-blue focus:outline-none h-24"
              placeholder="Tell us about yourself and your fitness journey..."
            />
          </div>
          
          <div className="flex gap-4 justify-end">
            <button
              onClick={onCancel}
              className="bg-slate-600 hover:bg-slate-500 text-light-grey font-bold py-3 px-6 rounded-xl transition-all duration-300"
            >
              <X className="h-4 w-4 inline mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-lime-green hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
            >
              <Save className="h-4 w-4 inline mr-2" />
              Save Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-midnight-blue p-6 font-sans">
        <div className="max-w-4xl mx-auto">
          <ProfileForm
            onSave={handleAddUser}
            onCancel={() => setShowAddForm(false)}
            isNew={true}
          />
        </div>
      </div>
    );
  }

  if (isEditing && editingUser) {
    return (
      <div className="min-h-screen bg-midnight-blue p-6 font-sans">
        <div className="max-w-4xl mx-auto">
          <ProfileForm
            user={editingUser}
            onSave={handleEditUser}
            onCancel={cancelEdit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-blue p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 mb-8 border border-slate-600">
          <div className="flex items-center justify-between">
            <h1 className="text-5xl font-extrabold text-light-grey tracking-tight">
              Fitness Community Profiles
            </h1>
            <Users className="h-16 w-16 text-deep-sky-blue" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* User Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-grey rounded-2xl shadow-2xl p-6 border border-slate-600 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-light-grey flex items-center">
                  <Users className="h-6 w-6 text-deep-sky-blue mr-2" />
                  Profiles
                </h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-lime-green hover:bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {users.map((user, index) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    index={index}
                    isSelected={selectedUser === index}
                    onClick={() => setSelectedUser(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Profile Display */}
          <div className="lg:col-span-3">
            {currentUser ? (
              <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 border border-slate-600">
                {/* Profile Header */}
                <div className="text-center mb-8 relative">
                  <button
                    onClick={startEdit}
                    className="absolute top-0 right-0 bg-deep-sky-blue hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>

                  <div className="relative inline-block mb-6">
                    <div className="w-32 h-32 bg-midnight-blue rounded-full border-4 border-deep-sky-blue flex items-center justify-center text-6xl shadow-2xl">
                      {currentUser.avatar}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-lime-green text-white rounded-full w-8 h-8 flex items-center justify-center">
                      <Trophy className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <h2 className="text-4xl font-bold text-light-grey mb-2">{currentUser.name}</h2>
                  <div className="inline-flex items-center px-4 py-2 bg-midnight-blue rounded-full border border-slate-600">
                    <span className="text-stone-grey text-sm mr-2">Fitness Level:</span>
                    <span className="text-lime-green font-bold">{currentUser.fitnessLevel}</span>
                  </div>
                </div>

                {/* Bio Section */}
                {currentUser.bio && (
                  <div className="bg-midnight-blue p-6 rounded-xl shadow-inner mb-8 border border-slate-600">
                    <h3 className="text-xl font-bold text-light-grey mb-3 flex items-center">
                      <Heart className="h-5 w-5 text-deep-sky-blue mr-2" />
                      About Me
                    </h3>
                    <p className="text-stone-grey text-lg leading-relaxed italic">
                      "{currentUser.bio}"
                    </p>
                  </div>
                )}

                {/* Contact & Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {currentUser.email && (
                    <InfoCard icon={Mail} label="Email" value={currentUser.email} />
                  )}
                  {currentUser.phone && (
                    <InfoCard icon={Phone} label="Phone" value={currentUser.phone} />
                  )}
                  {currentUser.age > 0 && (
                    <InfoCard icon={Calendar} label="Age" value={`${currentUser.age} years`} />
                  )}
                  {currentUser.location && (
                    <InfoCard icon={MapPin} label="Location" value={currentUser.location} />
                  )}
                  <InfoCard icon={Calendar} label="Member Since" value={currentUser.joinDate} />
                </div>

                {/* Fitness Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-midnight-blue p-6 rounded-xl text-center border border-slate-600 hover:border-deep-sky-blue transition-all duration-300">
                    <Trophy className="h-12 w-12 text-lime-green mx-auto mb-3" />
                    <h4 className="text-2xl font-bold text-light-grey">{currentUser.achievements}</h4>
                    <p className="text-stone-grey">Achievements</p>
                  </div>
                  {currentUser.favoriteWorkout && (
                    <div className="bg-midnight-blue p-6 rounded-xl text-center border border-slate-600 hover:border-deep-sky-blue transition-all duration-300">
                      <Heart className="h-12 w-12 text-deep-sky-blue mx-auto mb-3" />
                      <h4 className="text-lg font-bold text-light-grey">{currentUser.favoriteWorkout}</h4>
                      <p className="text-stone-grey">Favorite Workout</p>
                    </div>
                  )}
                  <div className="bg-midnight-blue p-6 rounded-xl text-center border border-slate-600 hover:border-deep-sky-blue transition-all duration-300">
                    <User className="h-12 w-12 text-lime-green mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-light-grey">{currentUser.fitnessLevel}</h4>
                    <p className="text-stone-grey">Fitness Level</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-deep-sky-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Connect & Follow
                  </button>
                  <button className="bg-lime-green hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Send Message
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-grey rounded-2xl shadow-2xl p-8 border border-slate-600 text-center">
                <h2 className="text-2xl font-bold text-light-grey mb-4">No profiles available</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-lime-green hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
                >
                  <Plus className="h-4 w-4 inline mr-2" />
                  Add Your First Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-slate-grey rounded-xl border border-slate-600">
          <p className="text-stone-grey text-lg">
            Join our amazing fitness community and connect with like-minded individuals! 🌟
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
        .bg-lime-green { background-color: #32CD32; }
        .border-slate-600 { border-color: #475569; }
        .border-deep-sky-blue { border-color: #00BFFF; }
        .bg-slate-600 { background-color: #475569; }
        .bg-slate-500 { background-color: #64748b; }
      `}</style>
    </div>
  );
};

export default ProfilePage;