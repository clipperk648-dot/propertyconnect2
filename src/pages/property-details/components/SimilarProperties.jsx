import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SimilarProperties = ({ properties = [] }) => {
  const navigate = useNavigate();

  const mockProperties = properties?.length > 0 ? properties : [
    {
      id: 1,
      title: "Luxury High-Rise Apartment",
      price: 2800,
      priceType: "month",
      location: "Downtown District",
      bedrooms: 2,
      bathrooms: 2,
      area: 1350,
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Modern Studio Loft",
      price: 1900,
      priceType: "month",
      location: "Arts District",
      bedrooms: 1,
      bathrooms: 1,
      area: 850,
      image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=400&h=300&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Spacious Family Home",
      price: 3200,
      priceType: "month",
      location: "Suburban Area",
      bedrooms: 3,
      bathrooms: 2.5,
      area: 1800,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Cozy Garden Apartment",
      price: 2200,
      priceType: "month",
      location: "Green Valley",
      bedrooms: 2,
      bathrooms: 1,
      area: 1100,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      featured: true
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const handlePropertyClick = (propertyId) => {
    // In a real app, this would navigate to the specific property details
    navigate(`/property-details?id=${propertyId}`);
  };

  const handleViewAll = () => {
    navigate('/property-search');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Similar Properties</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      {/* Properties Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {mockProperties?.map((property) => (
          <div
            key={property?.id}
            className="group cursor-pointer"
            onClick={() => handlePropertyClick(property?.id)}
          >
            <div className="bg-muted/50 rounded-lg overflow-hidden hover:elevation-2 transition-all duration-300">
              {/* Property Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={property?.image}
                  alt={property?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {property?.featured && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-smooth">
                  <Icon name="Heart" size={16} className="text-muted-foreground" />
                </button>
              </div>

              {/* Property Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {property?.title}
                  </h3>
                  <div className="text-lg font-bold text-primary ml-2">
                    {formatPrice(property?.price)}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{property?.priceType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-muted-foreground mb-3">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  <span className="text-sm">{property?.location}</span>
                </div>

                {/* Property Features */}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Bed" size={14} />
                    <span>{property?.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Bath" size={14} />
                    <span>{property?.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Square" size={14} />
                    <span>{property?.area?.toLocaleString()} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Call to Action */}
      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-muted-foreground mb-4">
          Can't find what you're looking for?
        </p>
        <Button
          variant="outline"
          onClick={handleViewAll}
          iconName="Search"
          iconPosition="left"
        >
          Browse All Properties
        </Button>
      </div>
    </div>
  );
};

export default SimilarProperties;