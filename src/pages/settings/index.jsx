import React from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <div className="glass-morphism p-6 rounded-lg">
          <h1 className="text-2xl font-semibold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage account settings, notifications, and preferences.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
