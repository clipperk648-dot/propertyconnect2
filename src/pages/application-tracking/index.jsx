import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import ApplicationStatusOverview from './components/ApplicationStatusOverview';
import ApplicationFilters from './components/ApplicationFilters';
import ApplicationList from './components/ApplicationList';
import DocumentUploadModal from './components/DocumentUploadModal';
import ApplicationDetailsModal from './components/ApplicationDetailsModal';

const ApplicationTracking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  
  // Move applications state declaration before it's used
  const [applications] = useState([
    {
      id: 1,
      propertyId: 2,
      propertyTitle: "Cozy Suburban House",
      propertyAddress: "456 Oak Avenue, Suburbs",
      propertyImage: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=400&h=300&fit=crop",
      landlordName: "Emma Rodriguez",
      landlordEmail: "emma.rodriguez@email.com",
      landlordPhone: "+1 (555) 234-5678",
      status: "approved",
      submittedDate: "2025-01-05",
      lastUpdated: "2025-01-08",
      nextSteps: "Sign lease agreement and submit security deposit",
      requiredDocuments: [],
      uploadedDocuments: ["ID Verification", "Proof of Income", "References"],
      monthlyRent: 2500,
      leaseStart: "2025-02-01",
      statusHistory: [
        { status: "submitted", date: "2025-01-05", description: "Application submitted successfully" },
        { status: "under_review", date: "2025-01-06", description: "Landlord reviewing application" },
        { status: "approved", date: "2025-01-08", description: "Application approved - move to lease signing" }
      ]
    },
    {
      id: 2,
      propertyId: 3,
      propertyTitle: "Luxury Condo with View",
      propertyAddress: "789 Skyline Drive, Uptown",
      propertyImage: "https://images.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg?w=400&h=300&fit=crop",
      landlordName: "Sarah Johnson",
      landlordEmail: "sarah.johnson@email.com",
      landlordPhone: "+1 (555) 345-6789",
      status: "under_review",
      submittedDate: "2025-01-07",
      lastUpdated: "2025-01-08",
      nextSteps: "Waiting for background check completion",
      requiredDocuments: ["Proof of Income", "References"],
      uploadedDocuments: ["ID Verification", "Bank Statements"],
      monthlyRent: 3200,
      leaseStart: "2025-02-15",
      statusHistory: [
        { status: "submitted", date: "2025-01-07", description: "Application submitted successfully" },
        { status: "under_review", date: "2025-01-08", description: "Background check in progress" }
      ]
    },
    {
      id: 3,
      propertyId: 1,
      propertyTitle: "Modern Downtown Apartment",
      propertyAddress: "123 Main Street, Downtown",
      propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      landlordName: "Michael Chen",
      landlordEmail: "michael.chen@email.com",
      landlordPhone: "+1 (555) 456-7890",
      status: "pending_documents",
      submittedDate: "2025-01-08",
      lastUpdated: "2025-01-09",
      nextSteps: "Upload missing documents to complete application",
      requiredDocuments: ["Bank Statements", "Employment Letter", "Photo ID"],
      uploadedDocuments: ["References"],
      monthlyRent: 2800,
      leaseStart: "2025-02-10",
      statusHistory: [
        { status: "submitted", date: "2025-01-08", description: "Application submitted successfully" },
        { status: "pending_documents", date: "2025-01-09", description: "Additional documents requested by landlord" }
      ]
    },
    {
      id: 4,
      propertyId: 4,
      propertyTitle: "Charming Townhouse",
      propertyAddress: "321 Elm Street, Midtown",
      propertyImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      landlordName: "Lisa Williams",
      landlordEmail: "lisa.williams@email.com",
      landlordPhone: "+1 (555) 567-8901",
      status: "declined",
      submittedDate: "2025-01-03",
      lastUpdated: "2025-01-06",
      nextSteps: "Consider other properties that match your criteria",
      requiredDocuments: [],
      uploadedDocuments: ["ID Verification", "Proof of Income", "References", "Bank Statements"],
      monthlyRent: 2400,
      declineReason: "Selected another applicant with higher income",
      statusHistory: [
        { status: "submitted", date: "2025-01-03", description: "Application submitted successfully" },
        { status: "under_review", date: "2025-01-04", description: "Application under review" },
        { status: "declined", date: "2025-01-06", description: "Application declined - landlord selected different applicant" }
      ]
    }
  ]);
  
  const currentUser = {
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'tenant'
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  // Check if there's an upload query parameter
  React.useEffect(() => {
    const uploadId = searchParams?.get('upload');
    if (uploadId) {
      const application = applications?.find(app => app?.id === parseInt(uploadId));
      if (application) {
        setSelectedApplication(application);
        setShowDocumentUpload(true);
      }
    }
  }, [searchParams, applications]);

  const filteredApplications = selectedStatus === 'all' 
    ? applications 
    : applications?.filter(app => app?.status === selectedStatus);

  const handleUploadDocuments = (application) => {
    setSelectedApplication(application);
    setShowDocumentUpload(true);
  };

  const handleViewApplicationDetails = (application) => {
    setSelectedApplication(application);
    setShowApplicationDetails(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />
      
      {/* Header */}
      <div className="bg-card border-b border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Application Tracking</h1>
              <p className="text-sm text-muted-foreground">
                Monitor your rental applications and manage required documents
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationIndicator />
              <UserProfileDropdown user={currentUser} onLogout={handleLogout} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Breadcrumb */}
        <BreadcrumbTrail userRole="tenant" currentPage="Application Tracking" />

        {/* Application Status Overview */}
        <ApplicationStatusOverview applications={applications} />

        {/* Filters */}
        <ApplicationFilters 
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          applications={applications}
        />

        {/* Applications List */}
        <ApplicationList 
          applications={filteredApplications}
          onUploadDocuments={handleUploadDocuments}
          onViewDetails={handleViewApplicationDetails}
        />
      </div>

      {/* Document Upload Modal */}
      {showDocumentUpload && (
        <DocumentUploadModal
          application={selectedApplication}
          onClose={() => {
            setShowDocumentUpload(false);
            setSelectedApplication(null);
          }}
        />
      )}

      {/* Application Details Modal */}
      {showApplicationDetails && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => {
            setShowApplicationDetails(false);
            setSelectedApplication(null);
          }}
          onUploadDocuments={() => {
            setShowApplicationDetails(false);
            setShowDocumentUpload(true);
          }}
        />
      )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">FMH</span>
              </div>
              <span className="text-lg font-semibold text-foreground">Findmyhome</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Findmyhome. All rights reserved.
            </div>
          </div>
        </div>
      {/* Mobile App Footer */}
      <MobileAppFooter userRole="tenant" showOnDesktop />
    </div>
  );
};

export default ApplicationTracking;
