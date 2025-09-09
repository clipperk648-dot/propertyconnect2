import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ApplicationDetailsModal = ({ application, onClose, onUploadDocuments }) => {
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

  const statusConfig = getStatusConfig(application?.status);

  const handleViewProperty = () => {
    navigate(`/property-details?id=${application?.propertyId}`);
    onClose();
  };

  const handleContactLandlord = () => {
    navigate(`/messages?landlord=${application?.landlordName}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <Image
                src={application?.propertyImage}
                alt={application?.propertyTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{application?.propertyTitle}</h3>
              <p className="text-sm text-muted-foreground flex items-center">
                <Icon name="MapPin" size={14} className="mr-1" />
                {application?.propertyAddress}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status and Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-foreground">Application Status</h4>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusConfig?.color} flex items-center space-x-2`}>
                <Icon name={statusConfig?.icon} size={16} />
                <span>{statusConfig?.label}</span>
              </span>
            </div>

            {/* Status Timeline */}
            <div className="space-y-4">
              {application?.statusHistory?.map((entry, index) => {
                const entryStatusConfig = getStatusConfig(entry?.status);
                const isLast = index === application?.statusHistory?.length - 1;

                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${entryStatusConfig?.color}`}>
                        <Icon name={entryStatusConfig?.icon} size={16} />
                      </div>
                      {!isLast && <div className="w-px h-12 bg-border mt-2" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{entryStatusConfig?.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry?.date)?.toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{entry?.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Application Information */}
            <div className="space-y-6">
              <div>
                <h5 className="font-semibold text-foreground mb-4">Application Details</h5>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Application ID:</span>
                    <span className="font-medium text-foreground">APP-{application?.id?.toString()?.padStart(6, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Submitted:</span>
                    <span className="font-medium text-foreground">
                      {new Date(application?.submittedDate)?.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Rent:</span>
                    <span className="font-medium text-foreground">${application?.monthlyRent?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lease Start:</span>
                    <span className="font-medium text-foreground">
                      {new Date(application?.leaseStart)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Landlord Information */}
              <div>
                <h5 className="font-semibold text-foreground mb-4">Landlord Contact</h5>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium text-foreground">{application?.landlordName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground">{application?.landlordEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium text-foreground">{application?.landlordPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="space-y-6">
              {/* Uploaded Documents */}
              {application?.uploadedDocuments?.length > 0 && (
                <div>
                  <h5 className="font-semibold text-foreground mb-4">Uploaded Documents</h5>
                  <div className="space-y-2">
                    {application?.uploadedDocuments?.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={16} className="text-success" />
                          <span className="text-sm font-medium text-foreground">{doc}</span>
                        </div>
                        <Button variant="ghost" size="sm" iconName="Download" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Documents */}
              {application?.requiredDocuments?.length > 0 && (
                <div>
                  <h5 className="font-semibold text-foreground mb-4">Required Documents</h5>
                  <div className="space-y-2">
                    {application?.requiredDocuments?.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-warning/5 border border-warning/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Icon name="AlertCircle" size={16} className="text-warning" />
                          <span className="text-sm font-medium text-foreground">{doc}</span>
                        </div>
                        <span className="text-xs text-warning font-medium">Required</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          {application?.nextSteps && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h5 className="font-medium text-foreground mb-2 flex items-center">
                <Icon name="ArrowRight" size={16} className="mr-2" />
                Next Steps
              </h5>
              <p className="text-sm text-foreground">{application?.nextSteps}</p>
            </div>
          )}

          {/* Decline Reason */}
          {application?.status === 'declined' && application?.declineReason && (
            <div className="mt-6 p-4 bg-error/5 border border-error/20 rounded-lg">
              <h5 className="font-medium text-foreground mb-2 flex items-center">
                <Icon name="XCircle" size={16} className="mr-2 text-error" />
                Decline Reason
              </h5>
              <p className="text-sm text-foreground">{application?.declineReason}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date(application?.lastUpdated)?.toLocaleDateString()}
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleViewProperty} iconName="Eye" iconPosition="left">
              View Property
            </Button>
            
            <Button variant="outline" onClick={handleContactLandlord} iconName="MessageCircle" iconPosition="left">
              Contact Landlord
            </Button>

            {application?.requiredDocuments?.length > 0 && (
              <Button onClick={onUploadDocuments} iconName="Upload" iconPosition="left">
                Upload Documents
              </Button>
            )}

            {application?.status === 'approved' && (
              <Button 
                onClick={() => {
                  navigate(`/lease-signing?application=${application?.id}`);
                  onClose();
                }}
                iconName="FileSignature" 
                iconPosition="left"
              >
                Sign Lease
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;