import React from 'react';
import PropertyCard from './PropertyCard';
import Icon from '../../../components/AppIcon';

const PropertyGrid = ({ 
  properties = [], 
  viewMode = 'grid', 
  onSave, 
  onContact, 
  savedProperties = [],
  isLoading = false,
  hasMore = false,
  onLoadMore
}) => {
  const isPropertySaved = (propertyId) => {
    return savedProperties?.includes(propertyId);
  };

  const LoadingSkeleton = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-muted"></div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-muted rounded w-24"></div>
          <div className="h-4 bg-muted rounded w-16"></div>
        </div>
        <div className="h-5 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="flex space-x-4">
          <div className="h-4 bg-muted rounded w-16"></div>
          <div className="h-4 bg-muted rounded w-16"></div>
          <div className="h-4 bg-muted rounded w-16"></div>
        </div>
        <div className="flex space-x-2 pt-2">
          <div className="h-8 bg-muted rounded flex-1"></div>
          <div className="h-8 bg-muted rounded flex-1"></div>
        </div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name="Search" size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No properties found
      </h3>
      <p className="text-muted-foreground max-w-md">
        Try adjusting your search criteria or filters to find more properties that match your needs.
      </p>
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {isLoading && properties?.length === 0 ? (
          Array.from({ length: 6 })?.map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
              <div className="flex">
                <div className="w-64 h-48 bg-muted flex-shrink-0"></div>
                <div className="flex-1 p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="h-6 bg-muted rounded w-32"></div>
                      <div className="h-5 bg-muted rounded w-48"></div>
                      <div className="h-4 bg-muted rounded w-36"></div>
                    </div>
                    <div className="h-4 bg-muted rounded w-20"></div>
                  </div>
                  <div className="flex space-x-6">
                    <div className="h-4 bg-muted rounded w-16"></div>
                    <div className="h-4 bg-muted rounded w-16"></div>
                    <div className="h-4 bg-muted rounded w-20"></div>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <div className="h-8 bg-muted rounded w-24"></div>
                    <div className="h-8 bg-muted rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : properties?.length === 0 ? (
          <EmptyState />
        ) : (
          properties?.map((property) => (
            <div key={property?.id} className="bg-card border border-border rounded-lg overflow-hidden">
              <PropertyCard
                property={property}
                onSave={onSave}
                onContact={onContact}
                isSaved={isPropertySaved(property?.id)}
              />
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {isLoading && properties?.length === 0 ? (
        Array.from({ length: 9 })?.map((_, index) => (
          <LoadingSkeleton key={index} />
        ))
      ) : properties?.length === 0 ? (
        <EmptyState />
      ) : (
        properties?.map((property) => (
          <PropertyCard
            key={property?.id}
            property={property}
            onSave={onSave}
            onContact={onContact}
            isSaved={isPropertySaved(property?.id)}
          />
        ))
      )}
      {/* Load More Loading Skeletons */}
      {isLoading && properties?.length > 0 && (
        Array.from({ length: 3 })?.map((_, index) => (
          <LoadingSkeleton key={`loading-${index}`} />
        ))
      )}
    </div>
  );
};

export default PropertyGrid;