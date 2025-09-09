import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const InquiryFilters = ({ onFilterChange, onSortChange, totalInquiries }) => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    inquiryType: '',
    property: '',
    tenant: ''
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
    const clearedFilters = { status: '', priority: '', inquiryType: '', property: '', tenant: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'responded', label: 'Responded' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const inquiryTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'viewing', label: 'Viewing Request' },
    { value: 'application', label: 'Application' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'purchase', label: 'Purchase Inquiry' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'By Priority' },
    { value: 'property', label: 'By Property' },
    { value: 'tenant', label: 'By Tenant Name' }
  ];

  const hasActiveFilters = filters?.status || filters?.priority || filters?.inquiryType || filters?.property || filters?.tenant;

  return (
    <div className="flex items-center space-x-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowFilters(!showFilters)}
        iconName="Filter"
        iconSize={16}
      >
        Filters {hasActiveFilters && '●'}
      </Button>
      <Select
        value={sortBy}
        onChange={handleSortChange}
        options={sortOptions}
        placeholder="Sort by"
        size="sm"
      />
      <span className="text-sm text-muted-foreground">
        {totalInquiries} inquiries
      </span>
      {/* Filters Dropdown */}
      {showFilters && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-10 p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Status"
                value={filters?.status}
                onChange={(value) => handleFilterChange('status', value)}
                options={statusOptions}
              />
              
              <Select
                label="Priority"
                value={filters?.priority}
                onChange={(value) => handleFilterChange('priority', value)}
                options={priorityOptions}
              />
            </div>
            
            <Select
              label="Inquiry Type"
              value={filters?.inquiryType}
              onChange={(value) => handleFilterChange('inquiryType', value)}
              options={inquiryTypeOptions}
            />
            
            <Input
              label="Property"
              value={filters?.property}
              onChange={(e) => handleFilterChange('property', e?.target?.value)}
              placeholder="Search by property..."
            />
            
            <Input
              label="Tenant Name"
              value={filters?.tenant}
              onChange={(e) => handleFilterChange('tenant', e?.target?.value)}
              placeholder="Search by tenant..."
            />

            <div className="flex justify-between pt-2 border-t border-border">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
              <Button size="sm" onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryFilters;