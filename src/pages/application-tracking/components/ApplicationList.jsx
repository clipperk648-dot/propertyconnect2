import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { formatCurrency } from '../../../utils/currency';

const ApplicationList = ({ applications, onUploadDocuments, onViewDetails }) => {
  const navigate = useNavigate();

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
      case 'declined':
        return {
          label: 'Declined',
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

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'submitted':
        return 25;
      case 'under_review':
        return 50;
      case 'pending_documents':
        return 40;
      case 'approved':
        return 100;
      case 'declined':
        return 100;
      default:
        return 0;
    }
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/property-details?id=${propertyId}`);
  };

  if (!applications || applications?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Applications Found</h3>
        <p className="text-muted-foreground mb-6">
          You haven't submitted any rental applications yet.
        </p>
        <Button
          onClick={() => navigate('/property-search')}
          iconName="Search"
          iconPosition="left"
        >
          Search Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {applications?.map((application) => {
        const statusConfig = getStatusConfig(application?.status);
        const progressPercentage = getProgressPercentage(application?.status);

        return (
          <div key={application?.id} className="bg-card rounded-lg border border-border p-6 hover:elevation-1 transition-all">
            {/* Application Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={application?.propertyImage}
                    alt={application?.propertyTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {application?.propertyTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center mb-2">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {application?.propertyAddress}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Rent: ${application?.monthlyRent?.toLocaleString()}/month</span>
                    <span>•</span>
                    <span>Start: {new Date(application?.leaseStart)?.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig?.color} flex items-center space-x-2 flex-shrink-0`}>
                <Icon name={statusConfig?.icon} size={16} />
                <span>{statusConfig?.label}</span>
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Application Progress</span>
                <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    application?.status === 'approved' ? 'bg-success' :
                    application?.status === 'declined' ? 'bg-error' : 'bg-primary'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Application Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Landlord</p>
                <p className="text-sm font-medium text-foreground">{application?.landlordName}</p>
                <p className="text-xs text-muted-foreground">{application?.landlordEmail}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Application Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(application?.submittedDate)?.toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(application?.lastUpdated)?.toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Next Steps */}
            {application?.nextSteps && (
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Next Steps</p>
                <p className="text-sm text-foreground">{application?.nextSteps}</p>
              </div>
            )}

            {/* Required Documents */}
            {application?.requiredDocuments?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Missing Documents</p>
                <div className="flex flex-wrap gap-2">
                  {application?.requiredDocuments?.map((doc, index) => (
                    <span key={index} className="px-3 py-1 bg-warning/10 text-warning text-xs rounded-full font-medium">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Uploaded Documents */}
            {application?.uploadedDocuments?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Uploaded Documents</p>
                <div className="flex flex-wrap gap-2">
                  {application?.uploadedDocuments?.map((doc, index) => (
                    <span key={index} className="px-3 py-1 bg-success/10 text-success text-xs rounded-full font-medium flex items-center space-x-1">
                      <Icon name="CheckCircle" size={12} />
                      <span>{doc}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Decline Reason */}
            {application?.status === 'declined' && application?.declineReason && (
              <div className="mb-4 p-3 bg-error/5 border border-error/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Decline Reason</p>
                <p className="text-sm text-foreground">{application?.declineReason}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-border">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewProperty(application?.propertyId)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  View Property
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(application)}
                  iconName="FileText"
                  iconPosition="left"
                >
                  View Details
                </Button>

                {application?.requiredDocuments?.length > 0 && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onUploadDocuments(application)}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Upload Documents
                  </Button>
                )}

                {application?.status === 'approved' && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate(`/lease-signing?application=${application?.id}`)}
                    iconName="FileSignature"
                    iconPosition="left"
                  >
                    Sign Lease
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationList;
