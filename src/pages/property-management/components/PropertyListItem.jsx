import React from 'react';
import Button from '../../../components/ui/Button';
import AppIcon from '../../../components/AppIcon';

const PropertyListItem = ({ property, isSelected, onSelect, onAction, activeTab }) => {
  
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
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction(property, 'edit')}
              iconName="Edit"
              iconSize={14}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction(property, 'analytics')}
              iconName="BarChart3"
              iconSize={14}
            >
              Analytics
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction(property, 'archive')}
              iconName="Archive"
              iconSize={14}
            >
              Archive
            </Button>
          </div>
        );
      case 'draft':
        return (
          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => onAction(property, 'complete')}
              iconName="CheckCircle"
              iconSize={14}
            >
              Complete
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction(property, 'edit')}
              iconName="Edit"
              iconSize={14}
            >
              Edit
            </Button>
          </div>
        );
      case 'archived':
        return (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction(property, 'restore')}
              iconName="RotateCcw"
              iconSize={14}
            >
              Restore
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction(property, 'delete')}
              iconName="Trash2"
              iconSize={14}
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(e?.target?.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </label>
        </div>

        {/* Property Image */}
        <div className="flex-shrink-0">
          <img
            src={property?.image}
            alt={property?.title}
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>

        {/* Property Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-foreground">{property?.title}</h3>
                {getStatusBadge(property?.status)}
              </div>
              
              <p className="text-muted-foreground text-sm mb-2 flex items-center">
                <AppIcon name="MapPin" size={14} className="mr-1" />
                {property?.location}
              </p>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
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

              {/* Performance Metrics for Active Properties */}
              {activeTab === 'active' && property?.performance && (
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <AppIcon name="Eye" size={14} className="mr-1" />
                    {property?.views} views
                  </div>
                  <div className="flex items-center">
                    <AppIcon name="MessageCircle" size={14} className="mr-1" />
                    {property?.inquiries} inquiries
                  </div>
                  <div className="flex items-center">
                    <AppIcon name="Heart" size={14} className="mr-1" />
                    {property?.favorites} favorites
                  </div>
                </div>
              )}

              {/* Draft Status */}
              {activeTab === 'draft' && property?.draftStatus && (
                <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded inline-block">
                  ⚠️ {property?.draftStatus}
                </div>
              )}

              {/* Archive Info */}
              {activeTab === 'archived' && (
                <div className="text-sm text-gray-600">
                  <div>Archived: {new Date(property?.archivedDate)?.toLocaleDateString()}</div>
                  {property?.archivedReason && (
                    <div className="text-xs mt-1">Reason: {property?.archivedReason}</div>
                  )}
                </div>
              )}
            </div>

            {/* Price and Actions */}
            <div className="flex flex-col items-end space-y-3">
              <span className="text-lg font-bold text-primary">
                {formatPrice(property?.price, property?.type)}
              </span>
              {getActionButtons(property)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListItem;
