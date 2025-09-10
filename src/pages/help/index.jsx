import React from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';

const Help = () => {
  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <div className="glass-morphism p-6 rounded-lg">
          <h1 className="text-2xl font-semibold mb-2">Help Center</h1>
          <p className="text-muted-foreground">Find guides, FAQs, and contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
