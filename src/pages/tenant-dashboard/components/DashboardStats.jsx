import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      title: 'Saved Properties',
      value: 4,
      change: '+2 this week',
      changeType: 'positive',
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      id: 2,
      title: 'Active Applications',
      value: 3,
      change: '+1 pending',
      changeType: 'neutral',
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 3,
      title: 'Property Views',
      value: 24,
      change: '+8 this week',
      changeType: 'positive',
      icon: 'Eye',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 4,
      title: 'Messages',
      value: 12,
      change: '3 unread',
      changeType: 'attention',
      icon: 'MessageSquare',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      case 'attention':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card rounded-lg border border-border p-6 hover:elevation-1 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{stat?.title}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-foreground">{stat?.value}</span>
            </div>
            <p className={`text-xs font-medium ${getChangeColor(stat?.changeType)}`}>
              {stat?.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;