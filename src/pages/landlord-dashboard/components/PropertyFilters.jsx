import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PropertyFilters = ({ onFilterChange, onSortChange, totalProperties }) => {
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    priceRange: '',
    location: '',
    sortBy: 'recent'
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'rented', label: 'Rented' },
    { value: 'sold', label: 'Sold' },
    { value: 'maintenance', label: 'Under Maintenance' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'studio', label: 'Studio' }
  ];

  const priceRangeOptions = [
    { value: '', label: 'Any Price' },
    { value: '0-1000', label: 'Under $1,000' },
    { value: '1000-2000', label: '$1,000 - $2,000' },
    { value: '2000-3000', label: '$2,000 - $3,000' },
    { value: '3000-5000', label: '$3,000 - $5,000' },
    { value: '5000+', label: 'Above $5,000' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'inquiries', label: 'Most Inquiries' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value) => {
    const newFilters = { ...filters, sortBy: value };
    setFilters(newFilters);
    onSortChange(value);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      status: '',
      type: '',
      priceRange: '',
      location: '',
      sortBy: 'recent'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
    onSortChange('recent');
  };

  const hasActiveFilters = filters?.status || filters?.type || filters?.priceRange || filters?.location;

  return (
    <div className="bg-card border border-border rounded-lg p-4 elevation-1 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Filter Properties</h3>
          <span className="text-sm text-muted-foreground">
            ({totalProperties} properties)
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            iconName={showAdvanced ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            iconSize={14}
          >
            {showAdvanced ? 'Less Filters' : 'More Filters'}
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear All
            </Button>
          )}
        </div>
      </div>
      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Filter by status"
        />
        
        <Select
          label="Property Type"
          options={typeOptions}
          value={filters?.type}
          onChange={(value) => handleFilterChange('type', value)}
          placeholder="Filter by type"
        />
        
        <Select
          label="Price Range"
          options={priceRangeOptions}
          value={filters?.priceRange}
          onChange={(value) => handleFilterChange('priceRange', value)}
          placeholder="Filter by price"
        />
        
        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={handleSortChange}
        />
      </div>
      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Location"
              type="text"
              placeholder="Search by location..."
              value={filters?.location}
              onChange={(e) => handleFilterChange('location', e?.target?.value)}
            />
            
            <Select
              label="Bedrooms"
              options={[
                { value: '', label: 'Any Bedrooms' },
                { value: '1', label: '1 Bedroom' },
                { value: '2', label: '2 Bedrooms' },
                { value: '3', label: '3 Bedrooms' },
                { value: '4+', label: '4+ Bedrooms' }
              ]}
              value={filters?.bedrooms || ''}
              onChange={(value) => handleFilterChange('bedrooms', value)}
            />
            
            <Select
              label="Performance"
              options={[
                { value: '', label: 'All Properties' },
                { value: 'high-views', label: 'High Views (100+)' },
                { value: 'high-inquiries', label: 'High Inquiries (10+)' },
                { value: 'low-performance', label: 'Needs Attention' }
              ]}
              value={filters?.performance || ''}
              onChange={(value) => handleFilterChange('performance', value)}
            />
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {filters?.status && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
                <button
                  onClick={() => handleFilterChange('status', '')}
                  className="ml-1 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.type && (
              <span className="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                Type: {typeOptions?.find(opt => opt?.value === filters?.type)?.label}
                <button
                  onClick={() => handleFilterChange('type', '')}
                  className="ml-1 hover:text-success/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.priceRange && (
              <span className="inline-flex items-center px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                Price: {priceRangeOptions?.find(opt => opt?.value === filters?.priceRange)?.label}
                <button
                  onClick={() => handleFilterChange('priceRange', '')}
                  className="ml-1 hover:text-warning/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.location && (
              <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                Location: {filters?.location}
                <button
                  onClick={() => handleFilterChange('location', '')}
                  className="ml-1 hover:text-accent/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;