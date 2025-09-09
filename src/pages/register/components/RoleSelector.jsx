import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange, error }) => {
  const roles = [
    {
      id: 'landlord',
      title: 'Property Owner/Landlord',
      description: 'List and manage properties, connect with tenants',
      icon: 'Building2',
      features: ['List Properties', 'Manage Tenants', 'Track Applications', 'Analytics Dashboard']
    },
    {
      id: 'tenant',
      title: 'Buyer/Tenant',
      description: 'Search properties, connect with landlords',
      icon: 'Search',
      features: ['Search Properties', 'Save Favorites', 'Apply Online', 'Message Owners']
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          I am a <span className="text-error">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles?.map((role) => (
            <button
              key={role?.id}
              type="button"
              onClick={() => onRoleChange(role?.id)}
              className={`relative p-6 rounded-lg border-2 text-left transition-all duration-200 ${
                selectedRole === role?.id
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  selectedRole === role?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={role?.icon} size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-base mb-2 ${
                    selectedRole === role?.id ? 'text-primary' : 'text-foreground'
                  }`}>
                    {role?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {role?.description}
                  </p>
                  <ul className="space-y-1">
                    {role?.features?.map((feature, index) => (
                      <li key={index} className="flex items-center text-xs text-muted-foreground">
                        <Icon name="Check" size={12} className="mr-2 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {selectedRole === role?.id && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={16} color="white" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      {error && (
        <p className="text-sm text-error flex items-center">
          <Icon name="AlertCircle" size={16} className="mr-2" />
          {error}
        </p>
      )}
    </div>
  );
};

export default RoleSelector;