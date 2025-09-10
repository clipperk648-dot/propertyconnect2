import React from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import Button from '../../components/ui/Button';

const BulkEdit = () => {
  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="landlord" isAuthenticated />
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <h1 className="text-2xl font-semibold mb-4">Bulk Edit Properties</h1>
        <div className="glass-morphism p-6 rounded-lg">
          <p className="text-muted-foreground mb-4">Select multiple properties to update prices, status, or other settings in a single action.</p>
          <div className="flex space-x-2">
            <Button variant="default">Select Properties</Button>
            <Button variant="outline">Apply Changes</Button>
          </div>
        </div>
      </div>
      <MobileAppFooter userRole="landlord" />
    </div>
  );
};

export default BulkEdit;
