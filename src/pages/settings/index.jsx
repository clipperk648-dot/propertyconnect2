import React, { useState } from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' }
];

const timezones = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles' },
  { value: 'America/New_York', label: 'America/New_York' }
];

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    receiveEmails: true,
    receiveSMS: false,
    language: 'en',
    timezone: 'UTC',
    darkMode: false
  });

  const handleChange = (key, value) => setProfile(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    // Persist settings
    alert('Settings saved');
  };

  const toggleDark = () => {
    const enabled = !profile.darkMode;
    setProfile(prev => ({ ...prev, darkMode: enabled }));
    try {
      if (enabled) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />

      <div className="max-w-3xl mx-auto p-6 mt-20 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-muted-foreground">Manage account and application preferences.</p>
          </div>
          <div>
            <Button variant="outline" onClick={() => alert('Manage billing (mock)')}>Billing</Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <section>
            <h3 className="text-lg font-medium mb-3">Account</h3>
            <div className="grid grid-cols-1 gap-3">
              <Input label="Full name" value={profile.name} onChange={(e) => handleChange('name', e.target.value)} />
              <Input label="Email" value={profile.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-3">Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select label="Language" options={languages} value={profile.language} onChange={(v) => handleChange('language', v)} />
              <Select label="Timezone" options={timezones} value={profile.timezone} onChange={(v) => handleChange('timezone', v)} />
              <label className="flex items-center space-x-3">
                <Input type="checkbox" checked={profile.receiveEmails} onChange={(e) => handleChange('receiveEmails', e.target.checked)} />
                <span className="text-sm">Receive promotional emails</span>
              </label>
              <label className="flex items-center space-x-3">
                <Input type="checkbox" checked={profile.receiveSMS} onChange={(e) => handleChange('receiveSMS', e.target.checked)} />
                <span className="text-sm">Receive SMS alerts</span>
              </label>
              <label className="flex items-center space-x-3">
                <Input type="checkbox" checked={profile.darkMode} onChange={toggleDark} />
                <span className="text-sm">Enable dark mode</span>
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
