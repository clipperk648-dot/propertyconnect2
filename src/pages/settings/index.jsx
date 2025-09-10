import React, { useState } from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    receiveEmails: true,
    receiveSMS: false
  });

  const handleChange = (key, value) => setProfile(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    // In a real app, persist settings to API
    alert('Settings saved');
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />

      <div className="max-w-3xl mx-auto p-6 mt-20">
        <h1 className="text-2xl font-semibold mb-4">Settings</h1>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <section>
            <h3 className="text-lg font-medium mb-3">Account</h3>
            <div className="grid grid-cols-1 gap-3">
              <Input label="Full name" value={profile.name} onChange={(e) => handleChange('name', e.target.value)} />
              <Input label="Email" value={profile.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-3">Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <Input type="checkbox" checked={profile.receiveEmails} onChange={(e) => handleChange('receiveEmails', e.target.checked)} />
                <span className="text-sm">Receive marketing emails</span>
              </label>

              <label className="flex items-center space-x-3">
                <Input type="checkbox" checked={profile.receiveSMS} onChange={(e) => handleChange('receiveSMS', e.target.checked)} />
                <span className="text-sm">Receive SMS updates</span>
              </label>
            </div>
          </section>

          <div className="flex items-center justify-end">
            <Button variant="default" onClick={handleSave}>Save settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
