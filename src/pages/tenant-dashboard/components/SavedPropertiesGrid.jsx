import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { formatCurrency } from '../../../utils/currency';

const SavedPropertiesGrid = () => {
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = useState([
    {
      id: 1,
      title: "Modern Downtown Apartment",
      address: "123 Main Street, Downtown",
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      status: "Available",
      applicationStatus: "Not Applied",
      savedDate: "2025-01-05",
      propertyType: "Apartment"
    },
    {
      id: 2,
      title: "Cozy Suburban House",
      address: "456 Oak Avenue, Suburbs",
      price: 3200,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 1800,
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=400&h=300&fit=crop",
      status: "Available",
      applicationStatus: "Applied",
      savedDate: "2025-01-03",
      propertyType: "House"
    },
    {
      id: 3,
      title: "Luxury Condo with View",
      address: "789 Skyline Drive, Uptown",
      price: 4500,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1400,
      image: "https://images.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg?w=400&h=300&fit=crop",
      status: "Pending",
      applicationStatus: "Under Review",
      savedDate: "2025-01-02",
      propertyType: "Condo"
    },
    {
      id: 4,
      title: "Studio Near University",
      address: "321 College Street, Campus Area",
      price: 1800,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 600,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      status: "Available",
      applicationStatus: "Not Applied",
      savedDate: "2025-01-01",
      propertyType: "Studio"
    }
  ]);

  const handleRemoveFromSaved = (propertyId) => {
    setSavedProperties(prev => prev?.filter(property => property?.id !== propertyId));
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/property-details?id=${propertyId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'text-success bg-success/10';
      case 'Pending':
        return 'text-warning bg-warning/10';
      case 'Rented':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'text-blue-600 bg-blue-50';
      case 'Under Review':
        return 'text-warning bg-warning/10';
      case 'Approved':
        return 'text-success bg-success/10';
      case 'Rejected':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  if (savedProperties?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Saved Properties</h3>
        <p className="text-muted-foreground mb-4">Start saving properties you're interested in to keep track of them here.</p>
        <Button onClick={() => navigate('/property-search')} iconName="Search" iconPosition="left">
          Search Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Saved Properties</h2>
        <span className="text-sm text-muted-foreground">{savedProperties?.length} properties saved</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedProperties?.map((property) => (
          <div key={property?.id} className="bg-card rounded-lg border border-border overflow-hidden elevation-1 hover:elevation-2 transition-all duration-200">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={property?.image}
                alt={property?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => handleRemoveFromSaved(property?.id)}
                  className="p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                  title="Remove from saved"
                >
                  <Icon name="Heart" size={16} className="text-error fill-current" />
                </button>
              </div>
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property?.status)}`}>
                  {property?.status}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{property?.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  {property?.address}
                </p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-primary">{formatCurrency(property?.price, { monthly: true })}</span>
              </div>

              <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Icon name="Bed" size={14} className="mr-1" />
                  {property?.bedrooms} bed
                </div>
                <div className="flex items-center">
                  <Icon name="Bath" size={14} className="mr-1" />
                  {property?.bathrooms} bath
                </div>
                <div className="flex items-center">
                  <Icon name="Square" size={14} className="mr-1" />
                  {property?.sqft} sqft
                </div>
              </div>

              <div className="mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getApplicationStatusColor(property?.applicationStatus)}`}>
                  {property?.applicationStatus}
                </span>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(property?.id)}
                  className="flex-1"
                  iconName="Eye"
                  iconPosition="left"
                >
                  View Details
                </Button>
                {property?.applicationStatus === 'Not Applied' && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleViewDetails(property?.id)}
                    className="flex-1"
                    iconName="FileText"
                    iconPosition="left"
                  >
                    Apply
                  </Button>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Saved on {new Date(property.savedDate)?.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPropertiesGrid;
