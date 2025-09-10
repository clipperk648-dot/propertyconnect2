import React from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';

const Reports = () => {
  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="landlord" isAuthenticated />
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <h1 className="text-2xl font-semibold mb-4">Reports</h1>
        <div className="glass-morphism p-6 rounded-lg">
          <p className="text-muted-foreground">Generate and view property performance reports, occupancy trends, and revenue analytics.</p>
        </div>
      </div>
      <MobileAppFooter userRole="landlord" />
    </div>
  );
};

export default Reports;
