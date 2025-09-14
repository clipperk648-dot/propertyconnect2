import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle,
  resultCount = 0 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'selfcon', label: 'Selfcon' },
    { value: 'single-room', label: 'Single room' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'hostel', label: 'Hostel' },
    { value: 'shop', label: 'Shop' },
    { value: 'store', label: 'Store' }
  ];

  const bedroomOptions = [
    { value: 'any', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' }
  ];

  const bathroomOptions = [
    { value: 'any', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' }
  ];

  const amenities = [
    { id: 'parking', label: 'Parking' },
    { id: 'gym', label: 'Gym/Fitness Center' },
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'laundry', label: 'Laundry' },
    { id: 'petFriendly', label: 'Pet Friendly' },
    { id: 'airConditioning', label: 'Air Conditioning' },
    { id: 'balcony', label: 'Balcony/Patio' },
    { id: 'dishwasher', label: 'Dishwasher' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleAmenityChange = (amenityId, checked) => {
    const currentAmenities = localFilters?.amenities || [];
    const updatedAmenities = checked
      ? [...currentAmenities, amenityId]
      : currentAmenities?.filter(id => id !== amenityId);
    
    handleFilterChange('amenities', updatedAmenities);
  };

  const handleReset = () => {
    const resetFilters = {
      location: '',
      propertyType: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'any',
      bathrooms: 'any',
      minSqft: '',
      maxSqft: '',
      amenities: [],
      petPolicy: 'any',
      availableFrom: ''
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Location Search */}
      <div>
        <Input
          label="Location"
          type="text"
          placeholder="City, neighborhood, or ZIP code"
          value={localFilters?.location || ''}
          onChange={(e) => handleFilterChange('location', e?.target?.value)}
          className="w-full"
        />
      </div>

      {/* Property Type */}
      <div>
        <Select
          label="Property Type"
          options={propertyTypes}
          value={localFilters?.propertyType || 'all'}
          onChange={(value) => handleFilterChange('propertyType', value)}
        />
      </div>

      {/* Price Range */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Min Price"
          type="number"
          placeholder="₦0"
          value={localFilters?.minPrice || ''}
          onChange={(e) => handleFilterChange('minPrice', e?.target?.value)}
        />
        <Input
          label="Max Price"
          type="number"
          placeholder="No max"
          value={localFilters?.maxPrice || ''}
          onChange={(e) => handleFilterChange('maxPrice', e?.target?.value)}
        />
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Bedrooms"
          options={bedroomOptions}
          value={localFilters?.bedrooms || 'any'}
          onChange={(value) => handleFilterChange('bedrooms', value)}
        />
        <Select
          label="Bathrooms"
          options={bathroomOptions}
          value={localFilters?.bathrooms || 'any'}
          onChange={(value) => handleFilterChange('bathrooms', value)}
        />
      </div>

      {/* Square Footage */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Min Sq Ft"
          type="number"
          placeholder="Any"
          value={localFilters?.minSqft || ''}
          onChange={(e) => handleFilterChange('minSqft', e?.target?.value)}
        />
        <Input
          label="Max Sq Ft"
          type="number"
          placeholder="Any"
          value={localFilters?.maxSqft || ''}
          onChange={(e) => handleFilterChange('maxSqft', e?.target?.value)}
        />
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Amenities
        </label>
        <div className="grid grid-cols-2 gap-2">
          {amenities?.map((amenity) => (
            <Checkbox
              key={amenity?.id}
              label={amenity?.label}
              checked={(localFilters?.amenities || [])?.includes(amenity?.id)}
              onChange={(e) => handleAmenityChange(amenity?.id, e?.target?.checked)}
            />
          ))}
        </div>
      </div>

      {/* Available From */}
      <div>
        <Input
          label="Available From"
          type="date"
          value={localFilters?.availableFrom || ''}
          onChange={(e) => handleFilterChange('availableFrom', e?.target?.value)}
        />
      </div>

      {/* Reset Button */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={handleReset}
          fullWidth
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          className="w-full"
        >
          Filters {resultCount > 0 && `(${resultCount} results)`}
        </Button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          {resultCount > 0 && (
            <span className="text-sm text-muted-foreground">
              {resultCount} results
            </span>
          )}
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                iconName="X"
              />
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <FilterContent />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-card">
              <Button
                variant="default"
                onClick={onToggle}
                fullWidth
              >
                Show {resultCount} Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchFilters;
