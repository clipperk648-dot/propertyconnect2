import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = () => {
  const navigate = useNavigate();
  const [activities] = useState([
    {
      id: 1,
      type: 'property_update',
      title: 'Price Reduced',
      description: 'Modern Downtown Apartment price reduced from $2,800 to $2,500',
      propertyId: 1,
      timestamp: '2025-01-09T14:30:00Z',
      icon: 'TrendingDown',
      iconColor: 'text-success',
      actionText: 'View Property'
    },
    {
      id: 2,
      type: 'new_match',
      title: 'New Property Match',
      description: '2 new properties match your "Downtown Apartments" saved search',
      searchId: 1,
      timestamp: '2025-01-09T10:15:00Z',
      icon: 'Search',
      iconColor: 'text-primary',
      actionText: 'View Matches'
    },
    {
      id: 3,
      type: 'application_status',
      title: 'Application Under Review',
      description: 'Your application for Cozy Suburban House is now under review',
      propertyId: 2,
      timestamp: '2025-01-08T16:45:00Z',
      icon: 'FileText',
      iconColor: 'text-warning',
      actionText: 'View Application'
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      description: 'Sarah Johnson sent you a message about Luxury Condo with View',
      messageId: 1,
      timestamp: '2025-01-08T09:20:00Z',
      icon: 'MessageSquare',
      iconColor: 'text-blue-600',
      actionText: 'Read Message'
    },
    {
      id: 5,
      type: 'property_available',
      title: 'Property Now Available',
      description: 'Studio Near University is now available for viewing',
      propertyId: 4,
      timestamp: '2025-01-07T13:10:00Z',
      icon: 'Home',
      iconColor: 'text-success',
      actionText: 'Schedule Tour'
    },
    {
      id: 6,
      type: 'document_request',
      title: 'Documents Requested',
      description: 'Additional documents required for your application',
      applicationId: 2,
      timestamp: '2025-01-07T11:30:00Z',
      icon: 'Upload',
      iconColor: 'text-warning',
      actionText: 'Upload Documents'
    },
    {
      id: 7,
      type: 'tour_reminder',
      title: 'Tour Reminder',
      description: 'Property tour scheduled for tomorrow at 2:00 PM',
      tourId: 1,
      timestamp: '2025-01-06T18:00:00Z',
      icon: 'Calendar',
      iconColor: 'text-primary',
      actionText: 'View Details'
    }
  ]);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const handleActivityAction = (activity) => {
    switch (activity?.type) {
      case 'property_update': case'property_available':
        navigate(`/property-details?id=${activity?.propertyId}`);
        break;
      case 'new_match': navigate('/property-search');
        break;
      case 'application_status': navigate('/applications');
        break;
      case 'message': navigate('/messages');
        break;
      case 'document_request':
        navigate('/applications');
        break;
      case 'tour_reminder': navigate('/applications');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/notifications')}
          iconName="Bell"
          iconPosition="left"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`p-2 rounded-full bg-muted ${activity?.iconColor}`}>
              <Icon name={activity?.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {activity?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {activity?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(activity?.timestamp)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleActivityAction(activity)}
                      className="text-xs h-auto p-1"
                    >
                      {activity?.actionText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;