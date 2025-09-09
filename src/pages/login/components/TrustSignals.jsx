import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'We never share your personal information'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by thousands of property owners and tenants'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-center sm:text-left">
            <div className="flex-shrink-0">
              <Icon 
                name={feature?.icon} 
                size={16} 
                className="text-success" 
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground">
                {feature?.title}
              </p>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;