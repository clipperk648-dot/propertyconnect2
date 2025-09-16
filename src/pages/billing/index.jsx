import React from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';

const Billing = () => {
  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="landlord" isAuthenticated={true} />
      <div className="max-w-4xl mx-auto p-6 mt-20 pb-24">
        <div className="glass-morphism p-6 rounded-lg">
          <h1 className="text-2xl font-semibold mb-2">Billing</h1>
          <p className="text-muted-foreground">View invoices, update payment methods, and manage subscriptions.</p>
        </div>
        <MobileAppFooter userRole="landlord" showOnDesktop />
      </div>
    </div>
  );
};

export default Billing;
