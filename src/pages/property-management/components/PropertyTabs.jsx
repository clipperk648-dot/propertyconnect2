import React from 'react';

const PropertyTabs = ({ activeTab, onTabChange, stats }) => {
  const tabs = [
    { 
      id: 'active', 
      label: 'Active Listings', 
      count: stats?.active, 
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      id: 'draft', 
      label: 'Draft Properties', 
      count: stats?.draft, 
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    { 
      id: 'archived', 
      label: 'Archived Properties', 
      count: stats?.archived, 
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <div className="border-b border-border mb-6">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
              activeTab === tab?.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
            }`}
          >
            <span>{tab?.label}</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              activeTab === tab?.id 
                ? `${tab?.color} ${tab?.bgColor}`
                : 'text-gray-500 bg-gray-100'
            }`}>
              {tab?.count}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default PropertyTabs;