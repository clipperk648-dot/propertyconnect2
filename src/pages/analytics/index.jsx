import React from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import MetricsPanel from '../landlord-dashboard/components/MetricsPanel';
import Button from '../../components/ui/Button';

const Analytics = () => {
  // Mock metrics
  const metrics = {
    totalProperties: 28,
    activeInquiries: 14,
    monthlyViews: 18234,
    monthlyRevenue: 45200
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="landlord" isAuthenticated={true} />

      <div className="max-w-7xl mx-auto p-6 mt-20 space-y-6 pb-24">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Analytics & Insights</h1>
            <p className="text-muted-foreground">Understand performance across your portfolio. Use date ranges and export reports for deeper analysis.</p>
          </div>

          <div className="flex items-center space-x-3">
            <select className="rounded border px-3 py-2 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Year to date</option>
            </select>
            <Button variant="outline" size="sm">Export CSV</Button>
            <Button variant="default" size="sm" onClick={() => alert('Refresh (mock)')}>Refresh</Button>
          </div>
        </div>

        <MetricsPanel metrics={metrics} />

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Top Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded border border-border">
              <div className="font-medium">Modern Downtown Apartment</div>
              <div className="text-sm text-muted-foreground">12,345 views • 32 inquiries</div>
            </div>
            <div className="p-4 bg-card rounded border border-border">
              <div className="font-medium">Luxury Waterfront Condo</div>
              <div className="text-sm text-muted-foreground">9,876 views • 18 inquiries</div>
            </div>
            <div className="p-4 bg-card rounded border border-border">
              <div className="font-medium">Penthouse with City View</div>
              <div className="text-sm text-muted-foreground">8,102 views • 14 inquiries</div>
            </div>
          </div>
        </div>

        <MobileAppFooter userRole="landlord" showOnDesktop />
      </div>
    </div>
  );
};

export default Analytics;
