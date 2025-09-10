import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PropertyDetails from './pages/property-details';
import LoginPage from './pages/login';
import PropertySearch from './pages/property-search';
import LandlordDashboard from './pages/landlord-dashboard';
import LandlordActivity from './pages/landlord-dashboard/activity';
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
import BulkEdit from './pages/bulk-edit';
import ExportPage from './pages/export';
import Reports from './pages/reports';
import Splash from './pages/Splash';
import ProtectedRoute from './components/ProtectedRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Root shows splash then login */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Public pages */}
        <Route path="/property-search" element={<PropertySearch />} />
        <Route path="/property-details" element={<PropertyDetails />} />

        {/* Protected: Landlord only */}
        <Route path="/landlord-dashboard" element={<ProtectedRoute allowedRole="landlord"><LandlordDashboard /></ProtectedRoute>} />
        <Route path="/landlord-dashboard/activity" element={<ProtectedRoute allowedRole="landlord"><LandlordActivity /></ProtectedRoute>} />
        <Route path="/property-management" element={<ProtectedRoute allowedRole="landlord"><PropertyManagement /></ProtectedRoute>} />
        <Route path="/bulk-edit" element={<ProtectedRoute allowedRole="landlord"><BulkEdit /></ProtectedRoute>} />

        {/* Protected: Tenant only */}
        <Route path="/tenant-dashboard" element={<ProtectedRoute allowedRole="tenant"><TenantDashboard /></ProtectedRoute>} />

        {/* Shared protected pages (require auth but any role) */}
        <Route path="/properties" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
        <Route path="/export" element={<ProtectedRoute><ExportPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute><ApplicationTracking /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
