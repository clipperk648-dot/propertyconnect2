import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import SearchFilters from './components/SearchFilters';
import SearchHeader from './components/SearchHeader';
import PropertyGrid from './components/PropertyGrid';
import MapView from './components/MapView';
import Button from '../../components/ui/Button';


const PropertySearch = () => {
  const location = useLocation();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMapProperty, setSelectedMapProperty] = useState(null);
  const [savedProperties, setSavedProperties] = useState([]);

  // Read basic user info from session
  const currentUser = {
    name: localStorage.getItem('userEmail') || 'User',
    email: localStorage.getItem('userEmail') || '',
    avatar: '',
    role: localStorage.getItem('userRole') || 'tenant'
  };

  // Initial filters state
  const [filters, setFilters] = useState({
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
  });


  const [filteredProperties, setFilteredProperties] = useState([]);

  // Fetch properties from API when filters change
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters?.location) params.set('city', filters.location);
        if (filters?.propertyType && filters?.propertyType !== 'all') params.set('type', filters.propertyType);
        const res = await fetch(`/.netlify/functions/properties?${params.toString()}`, { signal: controller.signal });
        const json = await res.json();
        let items = Array.isArray(json?.items) ? json.items : [];
        // normalize records created by landlord UI
        items = items.map((p) => ({
          ...p,
          id: p.id || p._id,
          location: p.location || p.city || '',
          type: p.type || p.propertyType || 'selfcon',
          status: p.status === 'active' ? 'available' : (p.status || 'available'),
          images: Array.isArray(p.images) ? p.images : (p.image ? [p.image] : []),
          bedrooms: p.bedrooms ?? p.beds ?? 0,
          bathrooms: p.bathrooms ?? p.baths ?? 0,
          sqft: p.sqft ?? p.area ?? 0,
        }));
        if (filters?.minPrice) items = items.filter(p => Number(p.price) >= Number(filters.minPrice));
        if (filters?.maxPrice) items = items.filter(p => Number(p.price) <= Number(filters.maxPrice));
        if (filters?.bedrooms && filters.bedrooms !== 'any') items = items.filter(p => Number(p.bedrooms ?? 0) >= Number(filters.bedrooms));
        if (filters?.bathrooms && filters.bathrooms !== 'any') items = items.filter(p => Number(p.bathrooms ?? 0) >= Number(filters.bathrooms));
        if (filters?.minSqft) items = items.filter(p => Number(p.sqft ?? 0) >= Number(filters.minSqft));
        if (filters?.maxSqft) items = items.filter(p => Number(p.sqft ?? 0) <= Number(filters.maxSqft));
        setFilteredProperties(items);
      } catch (e) {
        if (e.name !== 'AbortError') setFilteredProperties([]);
      } finally {
        setIsLoading(false);
      }
    }
    load();
    return () => controller.abort();

    // client-side filtering logic removed
    if (filters?.location) {
      filtered = filtered?.filter(property =>
        property?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }

    // Property type filter
    if (filters?.propertyType && filters?.propertyType !== 'all') {
      filtered = filtered?.filter(property =>
        property?.type === filters?.propertyType
      );
    }

    // Price range filter
    if (filters?.minPrice) {
      filtered = filtered?.filter(property =>
        property?.price >= parseInt(filters?.minPrice)
      );
    }
    if (filters?.maxPrice) {
      filtered = filtered?.filter(property =>
        property?.price <= parseInt(filters?.maxPrice)
      );
    }

    // Bedroom filter
    if (filters?.bedrooms && filters?.bedrooms !== 'any') {
      filtered = filtered?.filter(property =>
        property?.bedrooms >= parseInt(filters?.bedrooms)
      );
    }

    // Bathroom filter
    if (filters?.bathrooms && filters?.bathrooms !== 'any') {
      filtered = filtered?.filter(property =>
        property?.bathrooms >= parseInt(filters?.bathrooms)
      );
    }

    // Square footage filter
    if (filters?.minSqft) {
      filtered = filtered?.filter(property =>
        property?.sqft >= parseInt(filters?.minSqft)
      );
    }
    if (filters?.maxSqft) {
      filtered = filtered?.filter(property =>
        property?.sqft <= parseInt(filters?.maxSqft)
      );
    }

    // Amenities filter
    if (filters?.amenities && filters?.amenities?.length > 0) {
      filtered = filtered?.filter(property =>
        filters?.amenities?.some(amenity =>
          property?.amenities?.some(propAmenity =>
            propAmenity?.toLowerCase()?.includes(amenity?.toLowerCase())
          )
        )
      );
    }

    // no-op; results are set from API response
  }, [filters]);

  // Sort properties
  useEffect(() => {
    setFilteredProperties(prev => {
      const sorted = [...prev];
      switch (sortBy) {
        case 'price-low':
          sorted.sort((a, b) => Number(a?.price ?? 0) - Number(b?.price ?? 0));
          break;
        case 'price-high':
          sorted.sort((a, b) => Number(b?.price ?? 0) - Number(a?.price ?? 0));
          break;
        case 'newest':
          sorted.sort((a, b) => Number(b?._id?.toString().slice(-6)) - Number(a?._id?.toString().slice(-6)));
          break;
        case 'oldest':
          sorted.sort((a, b) => Number(a?._id?.toString().slice(-6)) - Number(b?._id?.toString().slice(-6)));
          break;
        default:
          break;
      }
      return sorted;
    });
  }, [sortBy]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSaveProperty = (propertyId) => {
    setSavedProperties(prev =>
      prev?.includes(propertyId)
        ? prev?.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleContactProperty = (property) => {
    console.log('Contacting property:', property);
    // Navigate to messages or open contact modal
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Handle logout logic
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />
      {/* Main Content */}
      <div className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with User Actions */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Find Your Perfect Property</h1>
              <p className="text-muted-foreground mt-2">
                Discover amazing properties that match your lifestyle
              </p>
            </div>
          </div>

          {/* Breadcrumb */}
          <BreadcrumbTrail userRole="tenant" />

          {/* Layout Container */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="lg:w-80 flex-shrink-0">
              <SearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isOpen={isFiltersOpen}
                onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
                resultCount={filteredProperties?.length}
              />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Search Header */}
              <SearchHeader
                resultCount={filteredProperties?.length}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                searchQuery={filters?.location}
                isLoading={isLoading}
              />

              {/* Content Based on View Mode */}
              {viewMode === 'map' ? (
                <MapView
                  properties={filteredProperties}
                  onPropertySelect={setSelectedMapProperty}
                  selectedProperty={selectedMapProperty}
                />
              ) : (
                <PropertyGrid
                  properties={filteredProperties}
                  viewMode={viewMode}
                  onSave={handleSaveProperty}
                  onContact={handleContactProperty}
                  savedProperties={savedProperties}
                  isLoading={isLoading}
                  onLoadMore={() => {
                    console.log('Load more properties...');
                    // Handle load more logic
                  }}
                />
              )}

              {/* Load More Button */}
              {filteredProperties?.length > 0 && !isLoading && (
                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="ChevronDown"
                    iconPosition="right"
                  >
                    Load More Properties
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Floating Action Button - Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsFiltersOpen(true)}
          className="w-14 h-14 rounded-full elevation-3"
          iconName="Filter"
        />
      </div>
      <MobileAppFooter userRole={currentUser.role} showOnDesktop />
    </div>
  );
};

export default PropertySearch;
