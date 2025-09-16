import React from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import RecentActivity from './components/RecentActivity';

const mockRecentActivities = [
  {
    id: 1,
    type: 'inquiry',
    title: 'New Inquiry Received',
    description: 'Sarah Johnson is interested in viewing Modern Downtown Apartment',
    timestamp: new Date(),
    priority: 'high',
  },
  {
    id: 2,
    type: 'application',
    title: 'Application Submitted',
    description: 'Michael Chen submitted an application',
    timestamp: new Date(),
    priority: 'medium',
  },
];

const LandlordActivity = () => {
  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="landlord" isAuthenticated />
      <div className="pt-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground mb-4">Recent Activity</h1>
          <RecentActivity activities={mockRecentActivities} />
        </div>
      </div>
      <MobileAppFooter userRole="landlord" showOnDesktop />
    </div>
  );
};

export default LandlordActivity;
