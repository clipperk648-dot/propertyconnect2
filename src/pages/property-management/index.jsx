import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
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
  const [editProperty, setEditProperty] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/properties');
        const json = await res.json();
        const items = Array.isArray(json?.items) ? json.items : [];
        const normalized = items.map((p) => ({
          ...p,
          id: p.id || p._id,
          image: p.image || (Array.isArray(p.images) ? p.images[0] : ''),
          status: p.status || 'active',
          area: p.area || p.sqft || 0,
          type: p.type || p.propertyType || 'rent',
          dateAdded: p.createdAt || new Date().toISOString(),
          views: p.views || 0,
          inquiries: p.inquiries || 0,
          favorites: p.favorites || 0,
        }));
        setProperties(normalized);
      } catch {
        setProperties([]);
      }
    })();
  }, []);

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
      if (activeTab === 'active' && property?.status !== 'active') return false;
      if (activeTab === 'draft' && property?.status !== 'draft') return false;
      if (activeTab === 'archived' && property?.status !== 'archived') return false;
      return true;
    });

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
        (property?.location || '')?.toLowerCase()?.includes(currentFilters?.location?.toLowerCase())
      );
    }

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
      default:
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

  const handlePropertyAction = async (property, action) => {
    // basic client-side actions: edit opens modal, analytics navigates, archive updates status
    switch (action) {
      case 'edit':
        setEditProperty(property);
        setIsAddOpen(true);
        break;
      case 'analytics':
        // navigate to property details page and request analytics view
        navigate('/property-details', { state: { propertyId: property?.id || property?._id, focus: 'analytics' } });
        break;
      case 'archive':
        try {
          // update locally immediately
          setProperties(prev => prev.map(p => p?.id === property?.id ? { ...p, status: 'archived' } : p));
          // persist to API (best effort)
          await fetch('/api/properties', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: property?.id || property?._id, status: 'archived' }),
          });
        } catch (e) {
          console.error('Failed to archive property', e);
        }
        break;
      case 'restore':
        try {
          setProperties(prev => prev.map(p => p?.id === property?.id ? { ...p, status: 'active' } : p));
          await fetch('/api/properties', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: property?.id || property?._id, status: 'active' }),
          });
        } catch (e) { console.error(e); }
        break;
      case 'delete':
        try {
          setProperties(prev => prev.filter(p => p?.id !== property?.id));
          // best effort delete request (not supported server-side yet)
          await fetch(`/api/properties`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: property?.id || property?._id }) });
        } catch (e) { console.error(e); }
        break;
      default:
        console.log('Property action:', action, 'for property:', property?.id);
    }
  };

  const handleAddProperty = () => {
    setEditProperty(null);
    setIsAddOpen(true);
  };

  const handleAddPropertySubmit = (newProperty) => {
    // if editing, replace existing property else prepend
    setProperties(prev => {
      const exists = prev?.some(p => p?.id === newProperty?.id);
      if (exists) return prev.map(p => p?.id === newProperty?.id ? newProperty : p);
      return [newProperty, ...(prev || [])];
    });
    setActiveTab('active');
    setSelectedProperties([]);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="landlord" isAuthenticated={true} />
      <div className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
            </div>
          </div>

          <BreadcrumbTrail 
            userRole="landlord" 
            currentPage="Property Management"
            customBreadcrumbs={[
              { label: 'Dashboard', href: '/landlord-dashboard' },
              { label: 'Property Management', href: '/property-management', current: true }
            ]}
          />

          <PropertyStats stats={propertyStats} />

          <PropertyTabs 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            stats={propertyStats}
          />

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

          {filteredProperties?.length > 0 ? (
            <>
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
                {activeTab === 'active' && '📋'}
                {activeTab === 'draft' && '✏️'}
                {activeTab === 'archived' && '📁'}
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
      <MobileAppFooter userRole="landlord" showOnDesktop />

      <AddPropertyModal
        open={isAddOpen}
        initial={editProperty}
        onClose={() => { setIsAddOpen(false); setEditProperty(null); }}
        onAdd={(p) => handleAddPropertySubmit(p)}
      />
    </div>
  );
};

export default PropertyManagement;
