import React from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="landlord" isAuthenticated={true} />
      <div className="max-w-6xl mx-auto p-6 mt-20">
        <div className="glass-morphism p-6 rounded-lg">
          <h1 className="text-2xl font-semibold mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">Overview of views, inquiries, and revenue trends.</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
