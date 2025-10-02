import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ApplicationTracker = () => {
  const navigate = useNavigate();
  
  // Realtime data will populate when applications exist. No mock data.
  const [recentApplications] = useState([]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved':
        return {
          label: 'Approved',
          color: 'text-success bg-success/10',
          icon: 'CheckCircle'
        };
      case 'under_review':
        return {
          label: 'Under Review',
          color: 'text-warning bg-warning/10',
          icon: 'Clock'
        };
      case 'pending_documents':
        return {
          label: 'Documents Required',
          color: 'text-blue-600 bg-blue-50',
          icon: 'FileText'
        };
      case 'rejected':
        return {
          label: 'Rejected',
          color: 'text-error bg-error/10',
          icon: 'XCircle'
        };
      default:
        return {
          label: 'Submitted',
          color: 'text-muted-foreground bg-muted',
          icon: 'Send'
        };
    }
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/property-details?id=${propertyId}`);
  };

  const handleViewAllApplications = () => {
    navigate('/application-tracking');
  };

  const handleQuickAction = (applicationId) => {
    navigate(`/application-tracking?upload=${applicationId}`);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Applications</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewAllApplications}
          iconName="FileText"
          iconPosition="left"
        >
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {recentApplications?.slice(0, 3)?.map((application) => {
          const statusConfig = getStatusConfig(application?.status);

          return (
            <div key={application?.id} className="border border-border rounded-lg p-4 hover:elevation-1 transition-all">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={application?.propertyImage}
                    alt={application?.propertyTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground mb-1 truncate">
                        {application?.propertyTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {application?.propertyAddress}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.color} flex items-center space-x-1 flex-shrink-0 ml-2`}>
                      <Icon name={statusConfig?.icon} size={12} />
                      <span>{statusConfig?.label}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Updated: {new Date(application.lastUpdated)?.toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewProperty(application?.propertyId)}
                        iconName="Eye"
                      />
                      {application?.status === 'pending_documents' && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleQuickAction(application?.id)}
                          iconName="Upload"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {recentApplications?.length === 0 && (
        <div className="text-center py-6">
          <Icon name="FileText" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground mb-2">No applications submitted yet</p>
          <p className="text-sm text-muted-foreground mb-4">
            Start applying to properties you're interested in
          </p>
          <Button
            onClick={() => navigate('/property-search')}
            iconName="Search"
            iconPosition="left"
          >
            Search Properties
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;
