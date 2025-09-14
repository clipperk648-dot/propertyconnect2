import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
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

  // Mock properties data (removed in favor of API fetch)
  const mockProperties = [
    {
      id: 1,
      title: 'Modern Downtown Apartment',
      location: 'Downtown Manhattan, NY',
      price: 3500,
      rentType: 'month',
      type: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'
      ],
      amenities: ['Gym', 'Pool', 'Parking', 'Laundry'],
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: 2,
      title: 'Spacious Family House',
      location: 'Brooklyn Heights, NY',
      price: 4200,
      rentType: 'month',
      type: 'house',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
      ],
      amenities: ['Garden', 'Parking', 'Pet Friendly'],
      coordinates: { lat: 40.6962, lng: -73.9961 }
    },
    {
      id: 3,
      title: 'Luxury Studio Loft',
      location: 'SoHo, NY',
      price: 2800,
      rentType: 'month',
      type: 'studio',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 800,
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop'
      ],
      amenities: ['High Ceilings', 'Exposed Brick', 'Modern Kitchen'],
      coordinates: { lat: 40.7230, lng: -74.0020 }
    },
    {
      id: 4,
      title: 'Cozy Two-Bedroom Condo',
      location: 'Upper East Side, NY',
      price: 3200,
      rentType: 'month',
      type: 'condo',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 1000,
      status: 'pending',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop'
      ],
      amenities: ['Doorman', 'Elevator', 'Central AC'],
      coordinates: { lat: 40.7736, lng: -73.9566 }
    },
    {
      id: 5,
      title: 'Charming Townhouse',
      location: 'Greenwich Village, NY',
      price: 5500,
      rentType: 'month',
      type: 'townhouse',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2200,
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop'
      ],
      amenities: ['Private Garden', 'Fireplace', 'Historic Building'],
      coordinates: { lat: 40.7335, lng: -74.0027 }
    },
    {
      id: 6,
      title: 'Modern High-Rise Apartment',
      location: 'Midtown West, NY',
      price: 3800,
      rentType: 'month',
      type: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop'
      ],
      amenities: ['City Views', 'Concierge', 'Rooftop Deck'],
      coordinates: { lat: 40.7614, lng: -73.9776 }
    },
    {
      id: 7,
      title: 'Bright Corner Unit',
      location: 'Lower East Side, NY',
      price: 2900,
      rentType: 'month',
      type: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 750,
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
      ],
      amenities: ['Natural Light', 'Updated Kitchen', 'Near Subway'],
      coordinates: { lat: 40.7180, lng: -73.9857 }
    },
    {
      id: 8,
      title: 'Penthouse with Terrace',
      location: 'Tribeca, NY',
      price: 8500,
      rentType: 'month',
      type: 'apartment',
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2000,
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
      ],
      amenities: ['Private Terrace', 'Luxury Finishes', 'River Views'],
      coordinates: { lat: 40.7163, lng: -74.0086 }
    },
    {
      id: 9,
      title: 'Classic Pre-War Building',
      location: 'Upper West Side, NY',
      price: 3600,
      rentType: 'month',
      type: 'apartment',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 1300,
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop'
      ],
      amenities: ['High Ceilings', 'Hardwood Floors', 'Near Park'],
      coordinates: { lat: 40.7831, lng: -73.9712 }
    }
  ];

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
        const res = await fetch(`/api/properties?${params.toString()}`, { signal: controller.signal });
        const json = await res.json();
        let items = Array.isArray(json?.items) ? json.items : [];
        if (filters?.minPrice) items = items.filter(p => Number(p.price) >= Number(filters.minPrice));
        if (filters?.maxPrice) items = items.filter(p => Number(p.price) <= Number(filters.maxPrice));
        if (filters?.bedrooms && filters.bedrooms !== 'any') items = items.filter(p => Number(p.beds ?? p.bedrooms ?? 0) >= Number(filters.bedrooms));
        if (filters?.bathrooms && filters.bathrooms !== 'any') items = items.filter(p => Number(p.baths ?? p.bathrooms ?? 0) >= Number(filters.bathrooms));
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
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with User Actions */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Find Your Perfect Property</h1>
              <p className="text-muted-foreground mt-2">
                Discover amazing properties that match your lifestyle
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationIndicator />
              <UserProfileDropdown user={currentUser} onLogout={handleLogout} />
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
    </div>
  );
};

export default PropertySearch;
