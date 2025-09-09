import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onAddProperty, onViewInquiries, metrics }) => {
  const navigate = useNavigate();

  const quickActionItems = [
    {
      title: 'Add New Property',
      description: 'List a new property for rent or sale',
      icon: 'Plus',
      color: 'bg-primary text-primary-foreground',
      action: onAddProperty,
      primary: true
    },
    {
      title: 'View All Inquiries',
      description: `${metrics?.activeInquiries} pending inquiries`,
      icon: 'MessageSquare',
      color: 'bg-blue-500 text-white',
      action: onViewInquiries,
      badge: metrics?.activeInquiries > 0 ? metrics?.activeInquiries : null
    },
    {
      title: 'Property Analytics',
      description: 'View detailed performance metrics',
      icon: 'BarChart3',
      color: 'bg-success text-success-foreground',
      action: () => navigate('/analytics')
    },
    {
      title: 'Messages',
      description: 'Check tenant communications',
      icon: 'Mail',
      color: 'bg-orange-500 text-white',
      action: () => navigate('/messages'),
      badge: 5
    }
  ];

  const shortcutItems = [
    {
      title: 'Bulk Edit Properties',
      icon: 'Edit3',
      action: () => console.log('Bulk edit')
    },
    {
      title: 'Export Data',
      icon: 'Download',
      action: () => console.log('Export data')
    },
    {
      title: 'Property Reports',
      icon: 'FileText',
      action: () => console.log('Generate reports')
    },
    {
      title: 'Settings',
      icon: 'Settings',
      action: () => navigate('/settings')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Primary Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActionItems?.map((item, index) => (
          <button
            key={index}
            onClick={item?.action}
            className={`relative p-4 rounded-lg text-left transition-all duration-200 hover:scale-105 hover:elevation-2 ${
              item?.primary 
                ? 'bg-primary text-primary-foreground elevation-2' 
                : 'bg-card border border-border hover:border-primary/20'
            }`}
          >
            {item?.badge && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {item?.badge > 99 ? '99+' : item?.badge}
              </div>
            )}
            
            <div className={`inline-flex p-2 rounded-lg mb-3 ${
              item?.primary 
                ? 'bg-primary-foreground/20' 
                : item?.color
            }`}>
              <Icon 
                name={item?.icon} 
                size={20} 
                className={item?.primary ? 'text-primary-foreground' : 'text-current'}
              />
            </div>
            
            <h3 className={`font-semibold mb-1 ${
              item?.primary ? 'text-primary-foreground' : 'text-foreground'
            }`}>
              {item?.title}
            </h3>
            
            <p className={`text-sm ${
              item?.primary ? 'text-primary-foreground/80' : 'text-muted-foreground'
            }`}>
              {item?.description}
            </p>
          </button>
        ))}
      </div>
      {/* Secondary Actions */}
      <div className="bg-card border border-border rounded-lg p-4 elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Quick Shortcuts</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {shortcutItems?.map((item, index) => (
            <button
              key={index}
              onClick={item?.action}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="p-2 rounded-lg bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-2">
                <Icon name={item?.icon} size={18} />
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {item?.title}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Actions Summary */}
      <div className="bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-foreground mb-1">Today's Summary</h4>
            <p className="text-sm text-muted-foreground">
              {metrics?.todayViews} property views • {metrics?.todayInquiries} new inquiries • {metrics?.todayApplications} applications
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/analytics')}
              iconName="TrendingUp"
              iconPosition="left"
              iconSize={14}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;