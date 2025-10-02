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
import api from '../../utils/api';

const PropertyDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalType, setContactModalType] = useState('message');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole] = useState('tenant');
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = searchParams.get('id');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) { setLoading(false); return; }
      try {
        const res = await api.get(`/properties?id=${encodeURIComponent(id)}`);
        const item = res?.data?.item || null;
        setProperty(item);
      } catch {
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleSendMessage = () => { setContactModalType('message'); setIsContactModalOpen(true); };
  const handleScheduleViewing = () => { setContactModalType('viewing'); setIsContactModalOpen(true); };
  const handleBackToSearch = () => { navigate('/property-search'); };
  const handleLogout = () => { setIsAuthenticated(false); navigate('/login'); };

  if (!isAuthenticated) { navigate('/login'); return null; }

  const breadcrumbs = [
    { label: userRole === 'landlord' ? 'Landlord Dashboard' : 'Tenant Dashboard', path: userRole === 'landlord' ? '/landlord-dashboard' : '/tenant-dashboard', icon: 'Home' },
    { label: 'Property Search', path: '/property-search', icon: 'Search' },
    { label: property?.title || 'Property', path: '/property-details', icon: 'Building', isLast: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole={userRole} isAuthenticated={isAuthenticated} />
      <div className="fixed top-16 left-0 right-0 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={handleBackToSearch} iconName="ArrowLeft" iconPosition="left">Back to Search</Button>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbTrail customBreadcrumbs={breadcrumbs} userRole={userRole} />

          {loading ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center">Loading…</div>
          ) : !property ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center">Property not found</div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <PropertyImageGallery images={property?.images || (property?.image ? [property.image] : [])} videos={property?.videos || (property?.video ? [property.video] : [])} />
                <PropertyInformation property={property} />
                <LocationMap location={{ address: property?.location || property?.city || '', city: property?.city || '', state: '', zipCode: '', lat: property?.lat, lng: property?.lng }} />
              </div>
              <div className="lg:col-span-1">
                <ContactPanel landlord={{ name: 'Owner', avatar: '', phone: '', email: '' }} onSendMessage={handleSendMessage} onScheduleViewing={handleScheduleViewing} />
              </div>
            </div>
          )}

          <div className="mt-12">
            <SimilarProperties />
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} type={contactModalType} landlordName={'Owner'} />
    </div>
  );
};

export default PropertyDetails;
