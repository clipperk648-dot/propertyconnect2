import React from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import DashboardStats from './components/DashboardStats';
import QuickActionButtons from './components/QuickActionButtons';
import SavedPropertiesGrid from './components/SavedPropertiesGrid';
import SearchSummaryPanel from './components/SearchSummaryPanel';
import RecentActivityFeed from './components/RecentActivityFeed';
import MessageNotifications from './components/MessageNotifications';
import ApplicationTracker from './components/ApplicationTracker';
import SlideshowBanner from './components/SlideshowBanner';
import MobileAppFooter from '../../components/ui/MobileAppFooter';

const TenantDashboard = () => {
  const currentUser = {
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'tenant'
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('User logged out');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />
      {/* Header */}
      <div className="bg-card border-b border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, {currentUser?.name?.split(' ')?.[0]}!</h1>
              <p className="text-sm text-muted-foreground">
                {new Date()?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationIndicator />
              <UserProfileDropdown user={currentUser} onLogout={handleLogout} />
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        {/* Breadcrumb */}
        <BreadcrumbTrail userRole="tenant" />

        {/* Slideshow Banner */}
        <div className="mb-8">
          <SlideshowBanner />
        </div>

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActionButtons />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Primary Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Saved Properties */}
            <SavedPropertiesGrid />
            
            {/* Search Summary */}
            <SearchSummaryPanel />
          </div>

          {/* Right Column - Secondary Content */}
          <div className="space-y-8">
            {/* Application Tracker */}
            <ApplicationTracker />
            
            {/* Message Notifications */}
            <MessageNotifications />
            
            {/* Recent Activity Feed */}
            <RecentActivityFeed />
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">FMH</span>
              </div>
              <span className="text-lg font-semibold text-foreground">Findmyhome</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Findmyhome. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile App Footer */}
      <MobileAppFooter userRole="tenant" />
    </div>
  );
};

export default TenantDashboard;
