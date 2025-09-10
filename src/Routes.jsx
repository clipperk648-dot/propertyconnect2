import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PropertyDetails from './pages/property-details';
import LoginPage from './pages/login';
import PropertySearch from './pages/property-search';
import LandlordDashboard from './pages/landlord-dashboard';
import Register from './pages/register';
import TenantDashboard from './pages/tenant-dashboard';
import PropertyManagement from './pages/property-management';
import InquiryManagement from './pages/inquiry-management';
import ApplicationTracking from './pages/application-tracking';
import Properties from './pages/properties';
import Messages from './pages/messages';
import Analytics from './pages/analytics';
import Favorites from './pages/favorites';
import Profile from './pages/profile';
import Settings from './pages/settings';
import Billing from './pages/billing';
import Notifications from './pages/notifications';
import Help from './pages/help';
import Support from './pages/support';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandlordDashboard />} />
        <Route path="/property-details" element={<PropertyDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/property-search" element={<PropertySearch />} />
        <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="/property-management" element={<PropertyManagement />} />
        <Route path="/inquiry-management" element={<InquiryManagement />} />
        <Route path="/application-tracking" element={<ApplicationTracking />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help" element={<Help />} />
        <Route path="/support" element={<Support />} />
        <Route path="/applications" element={<ApplicationTracking />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
