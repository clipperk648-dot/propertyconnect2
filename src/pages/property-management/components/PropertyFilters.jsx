import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const PropertyFilters = ({ onFilterChange, onSortChange, totalProperties, compact = false }) => {
  const [filters, setFilters] = useState({
    type: '',
    priceRange: '',
    location: ''
  });
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value);
  };

  const clearFilters = () => {
    const clearedFilters = { type: '', priceRange: '', location: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'rent', label: 'For Rent' },
    { value: 'sale', label: 'For Sale' }
  ];

  const priceRangeOptions = [
    { value: '', label: 'Any Price' },
    { value: '0-1500', label: '$0 - $1,500' },
    { value: '1500-2500', label: '$1,500 - $2,500' },
    { value: '2500-4000', label: '$2,500 - $4,000' },
    { value: '4000-6000', label: '$4,000 - $6,000' },
    { value: '6000+', label: '$6,000+' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'views', label: 'Most Views' },
    { value: 'inquiries', label: 'Most Inquiries' },
    { value: 'alphabetical', label: 'A to Z' }
  ];

  const hasActiveFilters = filters?.type || filters?.priceRange || filters?.location;

  if (compact) {
    return (
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          iconName="Filter"
          iconSize={16}
        >
          Filters {hasActiveFilters && '(1)'}
        </Button>
        <Select
          value={sortBy}
          onChange={handleSortChange}
          options={sortOptions}
          placeholder="Sort by"
          size="sm"
        />
        <span className="text-sm text-muted-foreground">
          {totalProperties} properties
        </span>
        {/* Filters Dropdown */}
        {showFilters && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-10 p-4">
            <div className="space-y-4">
              <Select
                label="Property Type"
                value={filters?.type}
                onChange={(value) => handleFilterChange('type', value)}
                options={typeOptions}
              />
              
              <Select
                label="Price Range"
                value={filters?.priceRange}
                onChange={(value) => handleFilterChange('priceRange', value)}
                options={priceRangeOptions}
              />
              
              <Input
                label="Location"
                value={filters?.location}
                onChange={(e) => handleFilterChange('location', e?.target?.value)}
                placeholder="Search by location..."
              />

              <div className="flex justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button size="sm" onClick={() => setShowFilters(false)}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Property Type"
            value={filters?.type}
            onChange={(value) => handleFilterChange('type', value)}
            options={typeOptions}
          />
          
          <Select
            label="Price Range"
            value={filters?.priceRange}
            onChange={(value) => handleFilterChange('priceRange', value)}
            options={priceRangeOptions}
          />
          
          <Input
            label="Location"
            value={filters?.location}
            onChange={(e) => handleFilterChange('location', e?.target?.value)}
            placeholder="Search by location..."
          />
        </div>

        <div className="flex items-end space-x-3">
          <Select
            label="Sort By"
            value={sortBy}
            onChange={handleSortChange}
            options={sortOptions}
          />
          
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground">
          Showing {totalProperties} properties
        </span>
        {hasActiveFilters && (
          <span className="text-sm text-primary">
            Filters applied
          </span>
        )}
      </div>
    </div>
  );
};

export default PropertyFilters;