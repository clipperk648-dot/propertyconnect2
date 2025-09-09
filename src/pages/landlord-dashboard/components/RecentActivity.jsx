import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'inquiry':
        return 'MessageSquare';
      case 'view':
        return 'Eye';
      case 'favorite':
        return 'Heart';
      case 'application':
        return 'FileText';
      case 'message':
        return 'Mail';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'inquiry':
        return 'text-blue-500 bg-blue-50';
      case 'view':
        return 'text-green-500 bg-green-50';
      case 'favorite':
        return 'text-red-500 bg-red-50';
      case 'application':
        return 'text-purple-500 bg-purple-50';
      case 'message':
        return 'text-orange-500 bg-orange-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error text-error-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.length > 0 ? (
          <div className="divide-y divide-border">
            {activities?.map((activity) => (
              <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start space-x-3">
                  {/* Activity Icon */}
                  <div className={`p-2 rounded-full ${getActivityColor(activity?.type)}`}>
                    <Icon name={getActivityIcon(activity?.type)} size={16} />
                  </div>
                  
                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity?.title}
                      </p>
                      {activity?.priority && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(activity?.priority)}`}>
                          {activity?.priority}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {activity?.description}
                    </p>
                    
                    {/* Property Info */}
                    {activity?.property && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 rounded overflow-hidden">
                          <Image
                            src={activity?.property?.image}
                            alt={activity?.property?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground truncate">
                          {activity?.property?.title}
                        </span>
                      </div>
                    )}
                    
                    {/* User Info */}
                    {activity?.user && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <Image
                            src={activity?.user?.avatar}
                            alt={activity?.user?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {activity?.user?.name}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(activity?.timestamp)}
                      </span>
                      
                      {activity?.actionRequired && (
                        <button className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
                          Take Action
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="Activity" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;