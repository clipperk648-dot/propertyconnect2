import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import PropertyCard from './components/PropertyCard';
import MetricsPanel from './components/MetricsPanel';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';

import Button from '../../components/ui/Button';

import MobileAppFooter from '../../components/ui/MobileAppFooter';
import AppIcon from '../../components/AppIcon';

const LandlordDashboard = () => {
  const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentSort, setCurrentSort] = useState('recent');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Mock user data
  const currentUser = {
    name: "David Wilson",
    email: "david.wilson@findmyhome.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "landlord"
  };

  // Mock properties data
  const mockProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "Downtown Seattle, WA",
      price: 2800,
      type: "rent",
      status: "available",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      views: 245,
      inquiries: 12,
      favorites: 18,
      dateAdded: "2025-01-05"
    },
    {
      id: 2,
      title: "Luxury Waterfront Condo",
      location: "Bellevue, WA",
      price: 4200,
      type: "rent",
      status: "rented",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      views: 189,
      inquiries: 8,
      favorites: 25,
      dateAdded: "2025-01-03"
    },
    {
      id: 3,
      title: "Cozy Studio Near University",
      location: "University District, Seattle",
      price: 1600,
      type: "rent",
      status: "available",
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      views: 156,
      inquiries: 15,
      favorites: 9,
      dateAdded: "2025-01-08"
    },
    {
      id: 4,
      title: "Family House with Garden",
      location: "Redmond, WA",
      price: 3500,
      type: "rent",
      status: "maintenance",
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      views: 98,
      inquiries: 3,
      favorites: 12,
      dateAdded: "2024-12-28"
    },
    {
      id: 5,
      title: "Commercial Office Space",
      location: "Capitol Hill, Seattle",
      price: 5800,
      type: "rent",
      status: "available",
      bedrooms: 0,
      bathrooms: 2,
      area: 1500,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      views: 67,
      inquiries: 4,
      favorites: 6,
      dateAdded: "2025-01-02"
    },
    {
      id: 6,
      title: "Penthouse with City View",
      location: "Belltown, Seattle",
      price: 850000,
      type: "sale",
      status: "available",
      bedrooms: 3,
      bathrooms: 3,
      area: 2500,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      views: 312,
      inquiries: 22,
      favorites: 45,
      dateAdded: "2025-01-01"
    }
  ];

  // Mock metrics data
  const dashboardMetrics = {
    totalProperties: 28,
    activeInquiries: 47,
    monthlyViews: 2847,
    monthlyRevenue: 45600,
    todayViews: 89,
    todayInquiries: 7,
    todayApplications: 3
  };

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "inquiry",
      title: "New Inquiry Received",
      description: "Sarah Johnson is interested in viewing the Modern Downtown Apartment",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      priority: "high",
      actionRequired: true,
      property: {
        title: "Modern Downtown Apartment",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop"
      },
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      }
    },
    {
      id: 2,
      type: "application",
      title: "Application Submitted",
      description: "Michael Chen submitted rental application for Luxury Waterfront Condo",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: "medium",
      actionRequired: true,
      property: {
        title: "Luxury Waterfront Condo",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop"
      },
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      }
    },
    {
      id: 3,
      type: "view",
      title: "High Property Views",
      description: "Penthouse with City View received 45 views today",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      priority: "low",
      property: {
        title: "Penthouse with City View",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=100&fit=crop"
      }
    },
    {
      id: 4,
      type: "message",
      title: "New Message",
      description: "Emma Davis sent a message about the Cozy Studio Near University",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      priority: "medium",
      user: {
        name: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      }
    },
    {
      id: 5,
      type: "favorite",
      title: "Property Favorited",
      description: "3 users added Family House with Garden to their favorites",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      priority: "low",
      property: {
        title: "Family House with Garden",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=100&h=100&fit=crop"
      }
    }
  ];

  useEffect(() => {
    applyFiltersAndSort();
  }, [currentFilters, currentSort]);

  const applyFiltersAndSort = () => {
    let filtered = [...mockProperties];

    // Apply filters
    if (currentFilters?.status) {
      filtered = filtered?.filter(property => property?.status === currentFilters?.status);
    }
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
        filtered?.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }

    setFilteredProperties(filtered);
  };

  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
  };

  const handleSortChange = (sortBy) => {
    setCurrentSort(sortBy);
  };

  const handleAddProperty = () => {
    navigate('/property-management');
  };

  const handleViewInquiries = () => {
    navigate('/inquiry-management');
  };

  const handleEditProperty = (property) => {
    navigate('/property-management');
  };

  const handleStatusChange = (property) => {
    navigate('/property-management');
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
              <h1 className="text-3xl font-bold text-foreground">Landlord Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your properties and track performance
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationIndicator />
              <UserProfileDropdown user={currentUser} onLogout={handleLogout} />
            </div>
          </div>

          {/* Breadcrumb */}
          <BreadcrumbTrail userRole="landlord" />

          {/* Quick Actions */}
          <QuickActions
            onAddProperty={handleAddProperty}
            onViewInquiries={handleViewInquiries}
            metrics={dashboardMetrics}
          />

          {/* Metrics Panel */}
          <div className="mb-8">
            <MetricsPanel metrics={dashboardMetrics} />
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div 
              onClick={() => navigate('/property-management')}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <AppIcon name="Home" size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Property Management</h3>
                  <p className="text-muted-foreground text-sm">Manage listings, photos, and pricing</p>
                  <p className="text-sm font-medium text-blue-600 mt-1">
                    {mockProperties?.length} properties →
                  </p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => navigate('/inquiry-management')}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <AppIcon name="MessageSquare" size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Inquiry Management</h3>
                  <p className="text-muted-foreground text-sm">Handle tenant inquiries and communication</p>
                  <p className="text-sm font-medium text-green-600 mt-1">
                    {dashboardMetrics?.activeInquiries} active inquiries →
                  </p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => console.log('Navigate to analytics')}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <AppIcon name="BarChart3" size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Analytics & Reports</h3>
                  <p className="text-muted-foreground text-sm">Track performance and metrics</p>
                  <p className="text-sm font-medium text-purple-600 mt-1">
                    {dashboardMetrics?.monthlyViews?.toLocaleString()} views this month →
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Properties Preview */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Recent Properties</h2>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/property-management')}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  View All
                </Button>
              </div>

              {/* Show only first 4 properties as preview */}
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {filteredProperties?.slice(0, 4)?.map((property) => (
                  <PropertyCard
                    key={property?.id}
                    property={property}
                    onEdit={handleEditProperty}
                    onViewDetails={() => navigate('/property-details', { state: { propertyId: property?.id } })}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>

              {filteredProperties?.length > 4 && (
                <div className="text-center mt-6">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/property-management')}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    View {filteredProperties?.length - 4} More Properties
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <RecentActivity activities={recentActivities} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile App Footer */}
      <MobileAppFooter userRole="landlord" />
    </div>
  );
};

export default LandlordDashboard;
