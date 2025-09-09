import React from 'react';
import AppIcon from '../../../components/AppIcon';

const PropertyStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Properties',
      value: stats?.total,
      icon: 'Home',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Active Listings',
      value: stats?.active,
      icon: 'CheckCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Draft Properties',
      value: stats?.draft,
      icon: 'Edit',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Total Views',
      value: stats?.totalViews?.toLocaleString(),
      icon: 'Eye',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Total Inquiries',
      value: stats?.totalInquiries,
      icon: 'MessageCircle',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      label: 'Total Favorites',
      value: stats?.totalFavorites,
      icon: 'Heart',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {statCards?.map((stat) => (
        <div key={stat?.label} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
              <AppIcon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyStats;