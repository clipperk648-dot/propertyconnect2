import React from 'react';
import Icon from '../../../components/AppIcon';

const PropertyInformation = ({ property = {} }) => {
  const mockProperty = {
    title: "Modern Downtown Apartment",
    price: 2500,
    priceType: "month",
    location: {
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001"
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
    ...property
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {mockProperty?.title}
        </h1>
        <div className="flex items-center text-muted-foreground mb-4">
          <Icon name="MapPin" size={18} className="mr-2" />
          <span>
            {mockProperty?.location?.address}, {mockProperty?.location?.city}, {mockProperty?.location?.state} {mockProperty?.location?.zipCode}
          </span>
        </div>
        <div className="text-3xl font-bold text-primary">
          {formatPrice(mockProperty?.price)}
          <span className="text-lg font-normal text-muted-foreground">
            /{mockProperty?.priceType}
          </span>
        </div>
      </div>
      {/* Key Specifications */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Icon name="Bed" size={24} className="mx-auto mb-2 text-primary" />
          <div className="text-lg font-semibold">{mockProperty?.specifications?.bedrooms}</div>
          <div className="text-sm text-muted-foreground">Bedrooms</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Icon name="Bath" size={24} className="mx-auto mb-2 text-primary" />
          <div className="text-lg font-semibold">{mockProperty?.specifications?.bathrooms}</div>
          <div className="text-sm text-muted-foreground">Bathrooms</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Icon name="Square" size={24} className="mx-auto mb-2 text-primary" />
          <div className="text-lg font-semibold">{mockProperty?.specifications?.area?.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Sq Ft</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Icon name="Car" size={24} className="mx-auto mb-2 text-primary" />
          <div className="text-lg font-semibold">{mockProperty?.specifications?.parking}</div>
          <div className="text-sm text-muted-foreground">Parking</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Icon name="Sofa" size={24} className="mx-auto mb-2 text-primary" />
          <div className="text-lg font-semibold">{mockProperty?.specifications?.furnished ? 'Yes' : 'No'}</div>
          <div className="text-sm text-muted-foreground">Furnished</div>
        </div>
      </div>
      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Description</h2>
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {mockProperty?.description}
        </div>
      </div>
      {/* Amenities */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {mockProperty?.amenities?.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Key Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Lease Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Available Date:</span>
              <span className="font-medium">{formatDate(mockProperty?.availabilityDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lease Terms:</span>
              <span className="font-medium">{mockProperty?.leaseTerms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Utilities:</span>
              <span className="font-medium">{mockProperty?.utilities}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Policies</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pet Policy:</span>
              <span className="font-medium">{mockProperty?.petPolicy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Security Deposit:</span>
              <span className="font-medium">{formatPrice(mockProperty?.price)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInformation;