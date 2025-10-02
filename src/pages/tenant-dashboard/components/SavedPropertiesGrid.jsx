import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { formatCurrency } from '../../../utils/currency';
import api from '../../../utils/api';
import usePolling from '../../../utils/usePolling';
import { mapPropertyDoc } from '../../../utils/mapProperty';

const SavedPropertiesGrid = () => {
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await api.get('/properties?limit=60');
      const items = Array.isArray(res?.data?.items) ? res.data.items : [];
      const mapped = items.map(mapPropertyDoc).filter(Boolean);
      setSavedProperties(mapped);
      setError('');
    } catch (e) {
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);
  usePolling(load, 5000, []);

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

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Loader" size={32} className="animate-spin text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Loading properties…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card rounded-lg border border-error/30 p-8 text-center">
        <p className="text-sm text-error">{error}</p>
      </div>
    );
  }

  if (savedProperties?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Properties</h3>
        <p className="text-muted-foreground mb-4">Once landlords add properties, they will appear here.</p>
        <Button onClick={() => navigate('/property-search')} iconName="Search" iconPosition="left">
          Search Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Latest Properties</h2>
        <span className="text-sm text-muted-foreground">{savedProperties?.length} properties</span>
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
                  title="Remove"
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
                  Added on {new Date(property.savedDate)?.toLocaleDateString()}
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
