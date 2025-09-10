import React from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';

const Properties = () => {
  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="landlord" isAuthenticated={true} />
      <div className="max-w-5xl mx-auto p-6 mt-20">
        <div className="glass-morphism p-6 rounded-lg">
          <h1 className="text-2xl font-semibold mb-2">My Properties</h1>
          <p className="text-muted-foreground">Manage your listings, add photos, and update pricing.</p>
        </div>
      </div>
    </div>
  );
};

export default Properties;
