import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import { formatCurrency } from '../../../utils/currency';

const MetricsPanel = ({ metrics }) => {
  const monthlyViewsData = [
    { month: 'Jan', views: 1200, inquiries: 45 },
    { month: 'Feb', views: 1800, inquiries: 62 },
    { month: 'Mar', views: 2100, inquiries: 78 },
    { month: 'Apr', views: 1900, inquiries: 71 },
    { month: 'May', views: 2400, inquiries: 89 },
    { month: 'Jun', views: 2800, inquiries: 95 }
  ];

  const propertyTypeData = [
    { name: 'Apartments', value: 12, color: '#1E40AF' },
    { name: 'Houses', value: 8, color: '#10B981' },
    { name: 'Commercial', value: 3, color: '#F59E0B' },
    { name: 'Condos', value: 5, color: '#EF4444' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(value);
  };

  const MetricCard = ({ title, value, icon, trend, trendValue, color = 'text-primary' }) => (
    <div className="bg-card border border-border rounded-lg p-4 elevation-1">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg bg-primary/10`}>
          <Icon name={icon} size={20} className="text-primary" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend === 'up' ? 'text-success' : 'text-error'}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} className="mr-1" />
            {trendValue}%
          </div>
        )}
      </div>
      <div className="mb-1">
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Properties"
          value={metrics?.totalProperties}
          icon="Building"
          trend="up"
          trendValue="12"
        />
        <MetricCard
          title="Active Inquiries"
          value={metrics?.activeInquiries}
          icon="MessageSquare"
          trend="up"
          trendValue="8"
        />
        <MetricCard
          title="Monthly Views"
          value={metrics?.monthlyViews?.toLocaleString()}
          icon="Eye"
          trend="up"
          trendValue="15"
        />
        <MetricCard
          title="Monthly Revenue"
          value={formatCurrency(metrics?.monthlyRevenue)}
          icon="DollarSign"
          trend="up"
          trendValue="7"
          color="text-success"
        />
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Chart */}
        <div className="bg-card border border-border rounded-lg p-6 elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Monthly Performance</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                <span className="text-muted-foreground">Views</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
                <span className="text-muted-foreground">Inquiries</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyViewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="views" fill="#1E40AF" radius={[2, 2, 0, 0]} />
                <Bar dataKey="inquiries" fill="#10B981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Distribution Chart */}
        <div className="bg-card border border-border rounded-lg p-6 elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Property Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {propertyTypeData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {propertyTypeData?.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">
                  {item?.name} ({item?.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Revenue Trend */}
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Revenue Trend</h3>
          <div className="text-sm text-muted-foreground">Last 6 months</div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyViewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value) => [formatCurrency(value * 50), 'Revenue']}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;
