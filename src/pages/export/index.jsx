import React from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import Button from '../../components/ui/Button';

const ExportPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="landlord" isAuthenticated />
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <h1 className="text-2xl font-semibold mb-4">Export Data</h1>
        <div className="glass-morphism p-6 rounded-lg">
          <p className="text-muted-foreground mb-4">Export your property and inquiry data to CSV or JSON for reporting and backups.</p>
          <div className="flex space-x-2">
            <Button variant="default">Export CSV</Button>
            <Button variant="outline">Export JSON</Button>
          </div>
        </div>
      </div>
      <MobileAppFooter userRole="landlord" />
    </div>
  );
};

export default ExportPage;
