import React, { useState } from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Image from '../../components/AppImage';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    role: 'tenant',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfile(prev => ({ ...prev, avatar: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // persist to API or localStorage
    alert('Profile updated');
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole={profile.role} isAuthenticated={true} />

      <div className="max-w-3xl mx-auto p-6 mt-20">
        <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="mb-2">
                <Input label="Full name" value={profile.name} onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))} />
              </div>
              <div>
                <Input label="Email" value={profile.email} onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))} />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Avatar</label>
            <input type="file" accept="image/*" onChange={handleFile} />
          </div>

          <div className="flex justify-end">
            <Button variant="default" onClick={handleSave}>Save profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
