import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import PropertyImageGallery from './components/PropertyImageGallery';
import PropertyInformation from './components/PropertyInformation';
import ContactPanel from './components/ContactPanel';
import ContactModal from './components/ContactModal';
import SimilarProperties from './components/SimilarProperties';
import LocationMap from './components/LocationMap';

import Button from '../../components/ui/Button';

const PropertyDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalType, setContactModalType] = useState('message');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('tenant');

  // Mock user data
  const mockUser = {
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: userRole
  };

  // Mock property data
  const mockProperty = {
    id: searchParams?.get('id') || '1',
    title: "Modern Downtown Apartment",
    price: 2500,
    priceType: "month",
    location: {
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      lat: 40.7589,
      lng: -73.9851
    },
    specifications: {
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      furnished: true,
      parking: 1
    },
    amenities: [
      "Air Conditioning",
      "Dishwasher",
      "Gym/Fitness Center",
      "Laundry in Building",
      "Elevator",
      "Balcony",
      "Pet Friendly",
      "Swimming Pool"
    ],
    description: `Experience luxury living in this stunning 2-bedroom, 2-bathroom apartment located in the heart of downtown. This modern unit features floor-to-ceiling windows, hardwood floors throughout, and a spacious open-concept living area perfect for entertaining.\n\nThe gourmet kitchen boasts granite countertops, stainless steel appliances, and ample cabinet space. Both bedrooms offer generous closet space and natural light. The master suite includes an en-suite bathroom with modern fixtures.\n\nBuilding amenities include a fitness center, rooftop terrace, and 24/7 concierge service. Located within walking distance of restaurants, shopping, and public transportation.`,
    availabilityDate: "2025-01-15",
    leaseTerms: "12 months minimum",
    petPolicy: "Cats and small dogs allowed with deposit",
    utilities: "Heat and water included",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        alt: "Modern apartment living room with large windows"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
        alt: "Spacious bedroom with natural lighting"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
        alt: "Modern kitchen with granite countertops"
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop",
        alt: "Elegant bathroom with modern fixtures"
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
        alt: "Balcony with city view"
      }
    ]
  };

  const mockLandlord = {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    phone: "(555) 123-4567",
    email: "sarah.johnson@findmyhome.com",
    responseTime: "Usually responds within 2 hours",
    rating: 4.8,
    reviewCount: 127,
    propertiesCount: 15,
    memberSince: "2020"
  };

  // Custom breadcrumbs for property details
  const customBreadcrumbs = [
    {
      label: userRole === 'landlord' ? 'Landlord Dashboard' : 'Tenant Dashboard',
      path: userRole === 'landlord' ? '/landlord-dashboard' : '/tenant-dashboard',
      icon: 'Home'
    },
    {
      label: 'Property Search',
      path: '/property-search',
      icon: 'Search'
    },
    {
      label: mockProperty?.title,
      path: '/property-details',
      icon: 'Building',
      isLast: true
    }
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleSendMessage = () => {
    setContactModalType('message');
    setIsContactModalOpen(true);
  };

  const handleScheduleViewing = () => {
    setContactModalType('viewing');
    setIsContactModalOpen(true);
  };

  const handleBackToSearch = () => {
    navigate('/property-search');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <RoleBasedNavBar userRole={userRole} isAuthenticated={isAuthenticated} />
      {/* Top Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={handleBackToSearch}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Search
            </Button>
            
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <BreadcrumbTrail customBreadcrumbs={customBreadcrumbs} userRole={userRole} />

          {/* Property Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <PropertyImageGallery images={mockProperty?.images} />

              {/* Property Information */}
              <PropertyInformation property={mockProperty} />

              {/* Location Map */}
              <LocationMap location={mockProperty?.location} />
            </div>

            {/* Right Column - Contact Panel */}
            <div className="lg:col-span-1">
              <ContactPanel
                landlord={mockLandlord}
                onSendMessage={handleSendMessage}
                onScheduleViewing={handleScheduleViewing}
              />
            </div>
          </div>

          {/* Similar Properties */}
          <div className="mt-12">
            <SimilarProperties />
          </div>
        </div>
      </div>
      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        type={contactModalType}
        landlordName={mockLandlord?.name}
      />
    </div>
  );
};

export default PropertyDetails;
