import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ApplicationTracker = () => {
  const navigate = useNavigate();
  
  // Simplified data for dashboard display
  const [recentApplications] = useState([
    {
      id: 1,
      propertyId: 2,
      propertyTitle: "Cozy Suburban House",
      propertyAddress: "456 Oak Avenue, Suburbs",
      propertyImage: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=400&h=300&fit=crop",
      status: "approved",
      submittedDate: "2025-01-05",
      lastUpdated: "2025-01-08"
    },
    {
      id: 2,
      propertyId: 3,
      propertyTitle: "Luxury Condo with View",
      propertyAddress: "789 Skyline Drive, Uptown",
      propertyImage: "https://images.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg?w=400&h=300&fit=crop",
      status: "under_review",
      submittedDate: "2025-01-07",
      lastUpdated: "2025-01-08"
    },
    {
      id: 3,
      propertyId: 1,
      propertyTitle: "Modern Downtown Apartment",
      propertyAddress: "123 Main Street, Downtown",
      propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      status: "pending_documents",
      submittedDate: "2025-01-08",
      lastUpdated: "2025-01-09"
    }
  ]);

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