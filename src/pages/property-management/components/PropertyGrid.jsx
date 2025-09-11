import React from 'react';
import Button from '../../../components/ui/Button';
import AppIcon from '../../../components/AppIcon';
import { formatCurrency } from '../../../utils/currency';

const PropertyGrid = ({ properties, selectedProperties, onPropertySelect, onPropertyAction, activeTab }) => {
  
  const getStatusBadge = (status) => {
    const badges = {
      active: { label: 'Active', color: 'bg-green-100 text-green-800' },
      draft: { label: 'Draft', color: 'bg-yellow-100 text-yellow-800' },
      archived: { label: 'Archived', color: 'bg-gray-100 text-gray-800' }
    };
    
    const badge = badges?.[status] || badges?.active;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge?.color}`}>
        {badge?.label}
      </span>
    );
  };

  import { formatCurrency } from '../../../utils/currency';

  const formatPrice = (price, type) => {
    return formatCurrency(price, { monthly: type !== 'sale' });
  };

  const getActionButtons = (property) => {
    switch (activeTab) {
      case 'active':
        return (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPropertyAction(property, 'edit')}
              iconName="Edit"
              iconSize={14}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPropertyAction(property, 'analytics')}
              iconName="BarChart3"
              iconSize={14}
            >
              Analytics
            </Button>
          </>
        );
      case 'draft':
        return (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPropertyAction(property, 'complete')}
              iconName="CheckCircle"
              iconSize={14}
            >
              Complete
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPropertyAction(property, 'edit')}
              iconName="Edit"
              iconSize={14}
            >
              Edit
            </Button>
          </>
        );
      case 'archived':
        return (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPropertyAction(property, 'restore')}
              iconName="RotateCcw"
              iconSize={14}
            >
              Restore
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPropertyAction(property, 'delete')}
              iconName="Trash2"
              iconSize={14}
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties?.map((property) => (
        <div key={property?.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          {/* Property Image */}
          <div className="relative">
            <img
              src={property?.image}
              alt={property?.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-3 left-3">
              {getStatusBadge(property?.status)}
            </div>
            <div className="absolute top-3 right-3">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedProperties?.includes(property?.id)}
                  onChange={(e) => onPropertySelect(property?.id, e?.target?.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded bg-white"
                />
              </label>
            </div>
          </div>

          {/* Property Details */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground truncate">{property?.title}</h3>
              <span className="text-lg font-bold text-primary ml-2">
                {formatPrice(property?.price, property?.type)}
              </span>
            </div>

            <p className="text-muted-foreground text-sm mb-3 flex items-center">
              <AppIcon name="MapPin" size={14} className="mr-1" />
              {property?.location}
            </p>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <AppIcon name="Bed" size={14} className="mr-1" />
                {property?.bedrooms || 0} bed
              </div>
              <div className="flex items-center">
                <AppIcon name="Bath" size={14} className="mr-1" />
                {property?.bathrooms} bath
              </div>
              <div className="flex items-center">
                <AppIcon name="Square" size={14} className="mr-1" />
                {property?.area?.toLocaleString()} sq ft
              </div>
            </div>

            {/* Performance Metrics */}
            {activeTab === 'active' && property?.performance && (
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 p-2 bg-gray-50 rounded">
                <div className="text-center">
                  <div className="font-medium text-foreground">{property?.views}</div>
                  <div className="text-xs">Views</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-foreground">{property?.inquiries}</div>
                  <div className="text-xs">Inquiries</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-foreground">{property?.favorites}</div>
                  <div className="text-xs">Favorites</div>
                </div>
              </div>
            )}

            {/* Draft Status */}
            {activeTab === 'draft' && property?.draftStatus && (
              <div className="mb-4">
                <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                  ⚠️ {property?.draftStatus}
                </div>
              </div>
            )}

            {/* Archive Info */}
            {activeTab === 'archived' && (
              <div className="mb-4">
                <div className="text-sm text-gray-600">
                  <div>Archived: {new Date(property?.archivedDate)?.toLocaleDateString()}</div>
                  {property?.archivedReason && (
                    <div className="text-xs mt-1">Reason: {property?.archivedReason}</div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2">
              {getActionButtons(property)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;
