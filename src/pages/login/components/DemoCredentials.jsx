import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DemoCredentials = ({ onCredentialSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const demoAccounts = [
    {
      role: 'landlord',
      email: 'landlord@findmyhome.com',
      password: 'landlord123',
      label: 'Property Owner Demo',
      description: 'Access landlord dashboard with property management features'
    },
    {
      role: 'tenant',
      email: 'tenant@findmyhome.com',
      password: 'tenant123',
      label: 'Tenant Demo',
      description: 'Access tenant dashboard with property search features'
    }
  ];

  const handleCredentialClick = (account) => {
    if (typeof onCredentialSelect === 'function') {
      onCredentialSelect(account?.email, account?.password);
    }
  };

  return (
    <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
        type="button"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            Demo Credentials
          </span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>
      {isExpanded && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-muted-foreground">
            Use these demo accounts to explore the platform:
          </p>

          {demoAccounts?.map((account) => (
            <div key={account?.role} className="p-3 bg-card rounded border border-border">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {account?.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {account?.description}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Email:</span> {account?.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Password:</span> {account?.password}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCredentialClick(account)}
                  className="ml-3"
                >
                  Use
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DemoCredentials;
