import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { formatCurrency } from '../../../utils/currency';

const PropertyCard = ({ property, onSave, onContact, isSaved = false }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/property-details', { state: { propertyId: property?.id } });
  };

  const handleNextImage = (e) => {
    e?.stopPropagation();
    if (property?.images && property?.images?.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === property?.images?.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = (e) => {
    e?.stopPropagation();
    if (property?.images && property?.images?.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property?.images?.length - 1 : prev - 1
      );
    }
  };

  const handleSave = (e) => {
    e?.stopPropagation();
    onSave(property?.id);
  };

  const handleContact = (e) => {
    e?.stopPropagation();
    onContact(property);
  };

  const formatPrice = (price) => formatCurrency(price);

  const getPropertyTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'apartment':
        return 'Building';
      case 'house':
        return 'Home';
      case 'condo':
        return 'Building2';
      case 'townhouse':
        return 'Home';
      case 'studio':
        return 'Square';
      default:
        return 'Building';
    }
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden elevation-1 hover:elevation-2 transition-all duration-300 cursor-pointer group"
      onClick={handleViewDetails}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {property?.images && property?.images?.length > 0 ? (
          <>
            <Image
              src={property?.images?.[currentImageIndex]}
              alt={`${property?.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onLoad={() => setIsImageLoading(false)}
            />
            
            {/* Image Navigation */}
            {property?.images?.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                >
                  <Icon name="ChevronLeft" size={16} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                >
                  <Icon name="ChevronRight" size={16} />
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                  {property?.images?.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Icon name="Image" size={32} className="text-muted-foreground" />
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isSaved 
              ? 'bg-error text-error-foreground' 
              : 'bg-black/50 text-white hover:bg-black/70'
          }`}
        >
          <Icon name="Heart" size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        {/* Property Status Badge */}
        {property?.status && (
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              property?.status === 'available' ?'bg-success text-success-foreground'
                : property?.status === 'pending' ?'bg-warning text-warning-foreground' :'bg-error text-error-foreground'
            }`}>
              {property?.status?.charAt(0)?.toUpperCase() + property?.status?.slice(1)}
            </span>
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="p-4">
        {/* Price and Type */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold text-foreground">
            {formatPrice(property?.price)}
            {property?.rentType && (
              <span className="text-sm font-normal text-muted-foreground">
                /{property?.rentType}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name={getPropertyTypeIcon(property?.type)} size={16} />
            <span className="text-sm capitalize">{property?.type}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {property?.title}
        </h3>

        {/* Location */}
        <div className="flex items-center space-x-1 text-muted-foreground mb-3">
          <Icon name="MapPin" size={14} />
          <span className="text-sm truncate">{property?.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          {property?.bedrooms && (
            <div className="flex items-center space-x-1">
              <Icon name="Bed" size={14} />
              <span>{property?.bedrooms} bed{property?.bedrooms !== 1 ? 's' : ''}</span>
            </div>
          )}
          {property?.bathrooms && (
            <div className="flex items-center space-x-1">
              <Icon name="Bath" size={14} />
              <span>{property?.bathrooms} bath{property?.bathrooms !== 1 ? 's' : ''}</span>
            </div>
          )}
          {property?.sqft && (
            <div className="flex items-center space-x-1">
              <Icon name="Square" size={14} />
              <span>{property?.sqft?.toLocaleString()} sq ft</span>
            </div>
          )}
        </div>

        {/* Amenities */}
        {property?.amenities && property?.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {property?.amenities?.slice(0, 3)?.map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
              >
                {amenity}
              </span>
            ))}
            {property?.amenities?.length > 3 && (
              <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                +{property?.amenities?.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleContact}
            iconName="MessageSquare"
            iconPosition="left"
            className="flex-1"
          >
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
