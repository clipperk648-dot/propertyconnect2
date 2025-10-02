import React from 'react';
import React, { useEffect, useState } from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import MetricsPanel from '../landlord-dashboard/components/MetricsPanel';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../utils/currency';

const Analytics = () => {
  const [metrics, setMetrics] = useState({ totalProperties: 0, activeInquiries: 0, monthlyViews: 0, monthlyRevenue: 0 });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/.netlify/functions/properties');
        const json = await res.json();
        const items = Array.isArray(json?.items) ? json.items : [];
        if (!mounted) return;
        const totalProperties = items.length;
        const activeInquiries = items.reduce((acc, p) => acc + (p.inquiries || 0), 0);
        const monthlyViews = items.reduce((acc, p) => acc + (p.views || 0), 0);
        const monthlyRevenue = items.reduce((acc, p) => acc + (p.price || 0), 0);
        setMetrics({ totalProperties, activeInquiries, monthlyViews, monthlyRevenue });
      } catch (e) {
        if (!mounted) return;
        setMetrics({ totalProperties: 0, activeInquiries: 0, monthlyViews: 0, monthlyRevenue: 0 });
      }
    })();
    return () => { mounted = false; };
  }, []);

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
            <Button variant="default" size="sm">Refresh</Button>
          </div>
        </div>

        <MetricsPanel metrics={metrics} />

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Top Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top properties derived from metrics are not shown individually here yet */}
            <div className="p-4 bg-card rounded border border-border">
              <div className="font-medium">Top properties are shown here</div>
              <div className="text-sm text-muted-foreground">Metrics updated from database</div>
            </div>
            <div className="p-4 bg-card rounded border border-border">
              <div className="font-medium">Top properties are shown here</div>
              <div className="text-sm text-muted-foreground">Metrics updated from database</div>
            </div>
            <div className="p-4 bg-card rounded border border-border">
              <div className="font-medium">Top properties are shown here</div>
              <div className="text-sm text-muted-foreground">Metrics updated from database</div>
            </div>
          </div>
        </div>

        <MobileAppFooter userRole="landlord" showOnDesktop />
      </div>
    </div>
  );
};

export default Analytics;
