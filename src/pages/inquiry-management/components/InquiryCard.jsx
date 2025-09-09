import React from 'react';
import Button from '../../../components/ui/Button';
import AppIcon from '../../../components/AppIcon';

const InquiryCard = ({ inquiry, isSelected, onSelect, onAction, viewMode }) => {
  
  const getStatusBadge = (status) => {
    const badges = {
      new: { label: 'New', color: 'bg-red-100 text-red-800' },
      responded: { label: 'Responded', color: 'bg-blue-100 text-blue-800' },
      'follow-up': { label: 'Follow-up', color: 'bg-yellow-100 text-yellow-800' },
      resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800' }
    };
    
    const badge = badges?.[status] || badges?.new;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge?.color}`}>
        {badge?.label}
      </span>
    );
  };

  const getPriorityIndicator = (priority) => {
    const colors = {
      high: 'text-red-500',
      medium: 'text-yellow-500',
      low: 'text-green-500'
    };
    
    return (<div className={`w-3 h-3 rounded-full ${colors?.[priority] || colors?.medium} bg-current`} />);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return 'Less than 1 hour ago';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    })?.format(price);
  };

  const getInquiryTypeIcon = (type) => {
    const icons = {
      viewing: 'Eye',
      application: 'FileText',
      general: 'MessageCircle',
      commercial: 'Building',
      purchase: 'ShoppingCart'
    };
    
    return icons?.[type] || 'MessageCircle';
  };

  if (viewMode === 'list') {
    return (
      <div className={`bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow ${
        !inquiry?.hasRead ? 'border-l-4 border-l-primary' : ''
      }`}>
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

          {/* Tenant Avatar */}
          <div className="flex-shrink-0">
            <img
              src={inquiry?.tenant?.avatar}
              alt={inquiry?.tenant?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          {/* Inquiry Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-foreground">{inquiry?.tenant?.name}</h3>
                {getPriorityIndicator(inquiry?.priority)}
                {getStatusBadge(inquiry?.status)}
              </div>
              <span className="text-sm text-muted-foreground">
                {formatTimestamp(inquiry?.timestamp)}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center">
                <AppIcon name={getInquiryTypeIcon(inquiry?.inquiryType)} size={14} className="mr-1" />
                {inquiry?.inquiryType?.charAt(0)?.toUpperCase() + inquiry?.inquiryType?.slice(1)}
              </div>
              <div className="flex items-center">
                <AppIcon name="MapPin" size={14} className="mr-1" />
                {inquiry?.property?.location}
              </div>
              <div className="font-medium text-primary">
                {formatPrice(inquiry?.property?.price)}/month
              </div>
            </div>

            <p className="text-foreground mb-3 line-clamp-2">
              {inquiry?.message}
            </p>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Property: <span className="font-medium">{inquiry?.property?.title}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAction(inquiry, 'view')}
                  iconName="Eye"
                  iconSize={14}
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAction(inquiry, 'respond')}
                  iconName="Reply"
                  iconSize={14}
                >
                  Respond
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Card view
  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
      !inquiry?.hasRead ? 'border-l-4 border-l-primary' : ''
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => onSelect(e?.target?.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
            </label>
            
            <img
              src={inquiry?.tenant?.avatar}
              alt={inquiry?.tenant?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            
            <div>
              <h3 className="text-lg font-semibold text-foreground">{inquiry?.tenant?.name}</h3>
              <p className="text-sm text-muted-foreground">{inquiry?.tenant?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {getPriorityIndicator(inquiry?.priority)}
            {getStatusBadge(inquiry?.status)}
          </div>
        </div>
      </div>
      {/* Property Info */}
      <div className="p-4 border-b border-border bg-gray-50">
        <div className="flex items-center space-x-3">
          <img
            src={inquiry?.property?.image}
            alt={inquiry?.property?.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{inquiry?.property?.title}</h4>
            <p className="text-sm text-muted-foreground">{inquiry?.property?.location}</p>
          </div>
          <span className="text-lg font-bold text-primary">
            {formatPrice(inquiry?.property?.price)}/month
          </span>
        </div>
      </div>
      {/* Message Content */}
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <AppIcon name={getInquiryTypeIcon(inquiry?.inquiryType)} size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            {inquiry?.inquiryType?.charAt(0)?.toUpperCase() + inquiry?.inquiryType?.slice(1)} Inquiry
          </span>
          <span className="text-sm text-muted-foreground">
            • {formatTimestamp(inquiry?.timestamp)}
          </span>
        </div>

        <p className="text-foreground mb-4 line-clamp-3">
          {inquiry?.message}
        </p>

        {/* Response Time */}
        {inquiry?.responseTime && (
          <div className="text-sm text-green-600 mb-4">
            ✓ Responded in {inquiry?.responseTime}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            From: {inquiry?.source}
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction(inquiry, 'view')}
              iconName="Eye"
              iconSize={14}
            >
              View
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={() => onAction(inquiry, 'respond')}
              iconName="Reply"
              iconSize={14}
            >
              Respond
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryCard;