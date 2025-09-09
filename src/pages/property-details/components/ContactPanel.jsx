import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContactPanel = ({ landlord = {}, onSendMessage = () => {}, onScheduleViewing = () => {} }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const mockLandlord = {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    phone: "(555) 123-4567",
    email: "sarah.johnson@propertyconnect.com",
    responseTime: "Usually responds within 2 hours",
    rating: 4.8,
    reviewCount: 127,
    propertiesCount: 15,
    memberSince: "2020",
    ...landlord
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Modern Downtown Apartment',
        text: 'Check out this amazing property!',
        url: window.location?.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(window.location?.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1 sticky top-24">
      {/* Action Buttons */}
      <div className="flex space-x-2 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFavoriteToggle}
          className="flex-1"
          iconName={isFavorited ? "Heart" : "Heart"}
          iconPosition="left"
        >
          {isFavorited ? 'Saved' : 'Save'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          iconName="Share"
          iconPosition="left"
        >
          Share
        </Button>
      </div>
      {/* Landlord Information */}
      <div className="border-b border-border pb-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <Image
              src={mockLandlord?.avatar}
              alt={`${mockLandlord?.name} avatar`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-card rounded-full"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{mockLandlord?.name}</h3>
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="Star" size={16} className="text-warning fill-current" />
              <span className="text-sm font-medium">{mockLandlord?.rating}</span>
              <span className="text-sm text-muted-foreground">({mockLandlord?.reviewCount} reviews)</span>
            </div>
            <p className="text-sm text-muted-foreground">{mockLandlord?.responseTime}</p>
          </div>
        </div>

        {/* Landlord Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">{mockLandlord?.propertiesCount}</div>
            <div className="text-sm text-muted-foreground">Properties</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">{mockLandlord?.memberSince}</div>
            <div className="text-sm text-muted-foreground">Member Since</div>
          </div>
        </div>
      </div>
      {/* Contact Actions */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          onClick={onSendMessage}
          iconName="MessageSquare"
          iconPosition="left"
        >
          Send Message
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={onScheduleViewing}
          iconName="Calendar"
          iconPosition="left"
        >
          Schedule Viewing
        </Button>

        {/* Contact Information */}
        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <Icon name="Phone" size={16} className="text-muted-foreground" />
            <span className="text-foreground">{mockLandlord?.phone}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Icon name="Mail" size={16} className="text-muted-foreground" />
            <span className="text-foreground">{mockLandlord?.email}</span>
          </div>
        </div>
      </div>
      {/* Quick Application */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Quick Application</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Apply now to secure this property faster
          </p>
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="FileText"
            iconPosition="left"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactPanel;