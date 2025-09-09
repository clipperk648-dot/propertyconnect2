import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SearchHeader = ({ 
  resultCount = 0, 
  sortBy = 'relevance', 
  onSortChange, 
  viewMode = 'grid', 
  onViewModeChange,
  searchQuery = '',
  isLoading = false 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Listed' },
    { value: 'oldest', label: 'Oldest Listed' },
    { value: 'distance', label: 'Distance' }
  ];

  const formatResultCount = (count) => {
    if (count === 0) return 'No properties found';
    if (count === 1) return '1 property found';
    return `${count?.toLocaleString()} properties found`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Results Info */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-muted-foreground">Searching...</span>
              </div>
            ) : (
              <span className="text-sm font-medium text-foreground">
                {formatResultCount(resultCount)}
              </span>
            )}
          </div>
          
          {searchQuery && (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>for</span>
              <span className="font-medium text-foreground">"{searchQuery}"</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="min-w-48">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              placeholder="Sort by"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              iconName="Grid3X3"
              className="px-3"
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              iconName="List"
              className="px-3"
            />
            <Button
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('map')}
              iconName="Map"
              className="px-3"
            />
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              All Properties
            </span>
            <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
              Any Price Range
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;