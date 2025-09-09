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
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;