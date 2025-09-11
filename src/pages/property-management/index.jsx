import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Button from '../../components/ui/Button';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import PropertyTabs from './components/PropertyTabs';
import PropertyGrid from './components/PropertyGrid';
import PropertyListItem from './components/PropertyListItem';
import PropertyFilters from './components/PropertyFilters';
import PropertyStats from './components/PropertyStats';
import BulkActions from './components/BulkActions';
import AddPropertyModal from './components/AddPropertyModal';

const PropertyManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentSort, setCurrentSort] = useState('recent');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Mock user data
  const currentUser = {
    name: "David Wilson",
    email: "david.wilson@findmyhome.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "landlord"
  };

  // Mock properties data with different statuses
  const mockProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "Downtown Seattle, WA",
      price: 2800,
      type: "rent",
      status: "active",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      views: 245,
      inquiries: 12,
      favorites: 18,
      dateAdded: "2025-01-05",
      lastUpdated: "2025-01-08",
      performance: { viewsLastWeek: 45, inquiriesLastWeek: 3, favoritesLastWeek: 5 }
    },
    {
      id: 2,
      title: "Luxury Waterfront Condo",
      location: "Bellevue, WA",
      price: 4200,
      type: "rent",
      status: "active",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      views: 189,
      inquiries: 8,
      favorites: 25,
      dateAdded: "2025-01-03",
      lastUpdated: "2025-01-07",
      performance: { viewsLastWeek: 32, inquiriesLastWeek: 2, favoritesLastWeek: 8 }
    },
    {
      id: 3,
      title: "Cozy Studio Near University",
      location: "University District, Seattle",
      price: 1600,
      type: "rent",
      status: "draft",
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      views: 0,
      inquiries: 0,
      favorites: 0,
      dateAdded: "2025-01-08",
      lastUpdated: "2025-01-08",
      draftStatus: "Photos needed"
    },
    {
      id: 4,
      title: "Family House with Garden",
      location: "Redmond, WA",
      price: 3500,
      type: "rent",
      status: "archived",
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      views: 98,
      inquiries: 3,
      favorites: 12,
      dateAdded: "2024-12-28",
      archivedDate: "2025-01-06",
      archivedReason: "Maintenance required"
    },
    {
      id: 5,
      title: "Commercial Office Space",
      location: "Capitol Hill, Seattle",
      price: 5800,
      type: "rent",
      status: "active",
      bedrooms: 0,
      bathrooms: 2,
      area: 1500,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      views: 67,
      inquiries: 4,
      favorites: 6,
      dateAdded: "2025-01-02",
      lastUpdated: "2025-01-05",
      performance: { viewsLastWeek: 15, inquiriesLastWeek: 1, favoritesLastWeek: 2 }
    },
    {
      id: 6,
      title: "Penthouse with City View",
      location: "Belltown, Seattle",
      price: 850000,
      type: "sale",
      status: "active",
      bedrooms: 3,
      bathrooms: 3,
      area: 2500,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      views: 312,
      inquiries: 22,
      favorites: 45,
      dateAdded: "2025-01-01",
      lastUpdated: "2025-01-07",
      performance: { viewsLastWeek: 89, inquiriesLastWeek: 8, favoritesLastWeek: 15 }
    },
    {
      id: 7,
      title: "Suburban Family Home",
      location: "Kirkland, WA",
      price: 2900,
      type: "rent",
      status: "draft",
      bedrooms: 3,
      bathrooms: 2,
      area: 1600,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      views: 0,
      inquiries: 0,
      favorites: 0,
      dateAdded: "2025-01-07",
      lastUpdated: "2025-01-08",
      draftStatus: "Description incomplete"
    },
    {
      id: 8,
      title: "Vintage Loft Downtown",
      location: "Pioneer Square, Seattle",
      price: 3200,
      type: "rent",
      status: "archived",
      bedrooms: 2,
      bathrooms: 1,
      area: 1100,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      views: 156,
      inquiries: 9,
      favorites: 21,
      dateAdded: "2024-12-15",
      archivedDate: "2025-01-04",
      archivedReason: "Rented successfully"
    }
  ];

  // Initialize properties state from mock data
  useEffect(() => {
    if (properties?.length === 0) setProperties(mockProperties);
  }, []);

  // Property statistics derived from current properties
  const propertyStats = {
    total: properties?.length || 0,
    active: (properties || []).filter(p => p?.status === 'active')?.length,
    draft: (properties || []).filter(p => p?.status === 'draft')?.length,
    archived: (properties || []).filter(p => p?.status === 'archived')?.length,
    totalViews: (properties || []).reduce((sum, p) => sum + (p?.views || 0), 0),
    totalInquiries: (properties || []).reduce((sum, p) => sum + (p?.inquiries || 0), 0),
    totalFavorites: (properties || []).reduce((sum, p) => sum + (p?.favorites || 0), 0)
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [activeTab, currentFilters, currentSort, properties]);

  const applyFiltersAndSort = () => {
    let filtered = (properties || [])?.filter(property => {
      // Filter by tab status
      if (activeTab === 'active' && property?.status !== 'active') return false;
      if (activeTab === 'draft' && property?.status !== 'draft') return false;
      if (activeTab === 'archived' && property?.status !== 'archived') return false;

      return true;
    });

    // Apply additional filters
    if (currentFilters?.type) {
      filtered = filtered?.filter(property => property?.type === currentFilters?.type);
    }
    if (currentFilters?.priceRange) {
      const [min, max] = currentFilters?.priceRange?.split('-')?.map(Number);
      if (max) {
        filtered = filtered?.filter(property => property?.price >= min && property?.price <= max);
      } else if (currentFilters?.priceRange?.includes('+')) {
        filtered = filtered?.filter(property => property?.price >= min);
      }
    }
    if (currentFilters?.location) {
      filtered = filtered?.filter(property => 
        property?.location?.toLowerCase()?.includes(currentFilters?.location?.toLowerCase())
      );
    }

    // Apply sorting
    switch (currentSort) {
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'views':
        filtered?.sort((a, b) => b?.views - a?.views);
        break;
      case 'inquiries':
        filtered?.sort((a, b) => b?.inquiries - a?.inquiries);
        break;
      case 'alphabetical':
        filtered?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
      default: // 'recent'
        filtered?.sort((a, b) => new Date(b?.dateAdded) - new Date(a?.dateAdded));
    }

    setFilteredProperties(filtered);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedProperties([]);
  };

  const handlePropertySelect = (propertyId, isSelected) => {
    if (isSelected) {
      setSelectedProperties([...selectedProperties, propertyId]);
    } else {
      setSelectedProperties(selectedProperties?.filter(id => id !== propertyId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedProperties(filteredProperties?.map(p => p?.id));
    } else {
      setSelectedProperties([]);
    }
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for properties:', selectedProperties);
    setSelectedProperties([]);
  };

  const handlePropertyAction = (property, action) => {
    console.log('Property action:', action, 'for property:', property?.id);
  };

  const handleAddProperty = () => {
    console.log('Add new property');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <RoleBasedNavBar userRole="landlord" isAuthenticated={true} />
      {/* Main Content */}
      <div className="pt-16 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Property Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage your property listings and track performance
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="default"
                onClick={handleAddProperty}
                iconName="Plus"
                iconPosition="left"
              >
                Add Property
              </Button>
              <NotificationIndicator />
              <UserProfileDropdown user={currentUser} onLogout={handleLogout} />
            </div>
          </div>

          {/* Breadcrumb */}
          <BreadcrumbTrail 
            userRole="landlord" 
            currentPage="Property Management"
            customBreadcrumbs={[
              { label: 'Dashboard', href: '/landlord-dashboard' },
              { label: 'Property Management', href: '/property-management', current: true }
            ]}
          />

          {/* Property Statistics */}
          <PropertyStats stats={propertyStats} />

          {/* Property Tabs */}
          <PropertyTabs 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            stats={propertyStats}
          />

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  iconName="Grid3X3"
                  iconSize={16}
                />
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  iconName="List"
                  iconSize={16}
                />
              </div>
              
              {selectedProperties?.length > 0 && (
                <BulkActions
                  selectedCount={selectedProperties?.length}
                  onBulkAction={handleBulkAction}
                  activeTab={activeTab}
                />
              )}
            </div>

            <PropertyFilters
              onFilterChange={setCurrentFilters}
              onSortChange={setCurrentSort}
              totalProperties={filteredProperties?.length}
              compact={true}
            />
          </div>

          {/* Properties Content */}
          {filteredProperties?.length > 0 ? (
            <>
              {/* Select All Checkbox */}
              <div className="flex items-center justify-between mb-4 p-4 bg-card border border-border rounded-lg">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedProperties?.length === filteredProperties?.length}
                    onChange={(e) => handleSelectAll(e?.target?.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="text-sm text-foreground">
                    Select all {filteredProperties?.length} properties
                  </span>
                </label>
                <span className="text-sm text-muted-foreground">
                  {selectedProperties?.length} selected
                </span>
              </div>

              {/* Properties Grid/List */}
              {viewMode === 'grid' ? (
                <PropertyGrid
                  properties={filteredProperties}
                  selectedProperties={selectedProperties}
                  onPropertySelect={handlePropertySelect}
                  onPropertyAction={handlePropertyAction}
                  activeTab={activeTab}
                />
              ) : (
                <div className="space-y-4">
                  {filteredProperties?.map((property) => (
                    <PropertyListItem
                      key={property?.id}
                      property={property}
                      isSelected={selectedProperties?.includes(property?.id)}
                      onSelect={(isSelected) => handlePropertySelect(property?.id, isSelected)}
                      onAction={handlePropertyAction}
                      activeTab={activeTab}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <div className="text-muted-foreground mb-4">
                {activeTab === 'active' && "📋"}
                {activeTab === 'draft' && "✏️"}
                {activeTab === 'archived' && "📁"}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No {activeTab} properties found
              </h3>
              <p className="text-muted-foreground mb-6">
                {activeTab === 'active' && "You don't have any active property listings yet."}
                {activeTab === 'draft' && "You don't have any draft properties to complete."}
                {activeTab === 'archived' && "You don't have any archived properties."}
              </p>
              {activeTab !== 'archived' && (
                <Button
                  variant="default"
                  onClick={handleAddProperty}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Your First Property
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Mobile App Footer */}
      <MobileAppFooter userRole="landlord" />
    </div>
  );
};

export default PropertyManagement;
