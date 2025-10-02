import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { formatCurrency } from '../../../utils/currency';

const PropertyCard = ({ property, onEdit, onViewDetails, onStatusChange }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success text-success-foreground';
      case 'rented':
        return 'bg-warning text-warning-foreground';
      case 'sold':
        return 'bg-error text-error-foreground';
      case 'maintenance':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const handleViewDetails = () => {
    navigate('/property-details', { state: { propertyId: property?.id } });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden elevation-1 hover:elevation-2 transition-all duration-200">
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property?.image}
          alt={property?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(property?.status)}`}>
            {property?.status?.charAt(0)?.toUpperCase() + property?.status?.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium">
          {property?.type}
        </div>
      </div>
      {/* Property Details */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
            {property?.title}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <Icon name="MapPin" size={14} className="mr-1" />
            {property?.location}
          </p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-bold text-primary">
            {formatPrice(property?.price)}
            <span className="text-sm font-normal text-muted-foreground">
              {property?.type === 'rent' ? '/month' : ''}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Icon name="Bed" size={14} className="mr-1" />
              {property?.bedrooms}
            </span>
            <span className="flex items-center">
              <Icon name="Bath" size={14} className="mr-1" />
              {property?.bathrooms}
            </span>
            <span className="flex items-center">
              <Icon name="Square" size={14} className="mr-1" />
              {property?.area} sq ft
            </span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="flex items-center justify-between mb-4 p-2 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{property?.views}</div>
            <div className="text-xs text-muted-foreground">Views</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{property?.inquiries}</div>
            <div className="text-xs text-muted-foreground">Inquiries</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(property)}
            className="flex-1"
            iconName="Edit"
            iconPosition="left"
            iconSize={14}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onStatusChange(property)}
            iconName="MoreVertical"
            iconSize={14}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
