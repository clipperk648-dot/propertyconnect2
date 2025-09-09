import React from 'react';
import Button from '../../../components/ui/Button';

const ApplicationFilters = ({ selectedStatus, onStatusChange, applications }) => {
  const getStatusCount = (status) => {
    if (status === 'all') return applications?.length || 0;
    return applications?.filter(app => app?.status === status)?.length || 0;
  };

  const filterOptions = [
    { label: 'All Applications', value: 'all', count: getStatusCount('all') },
    { label: 'Under Review', value: 'under_review', count: getStatusCount('under_review') },
    { label: 'Approved', value: 'approved', count: getStatusCount('approved') },
    { label: 'Documents Required', value: 'pending_documents', count: getStatusCount('pending_documents') },
    { label: 'Declined', value: 'declined', count: getStatusCount('declined') }
  ];

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3">
        {filterOptions?.map((option) => (
          <Button
            key={option?.value}
            variant={selectedStatus === option?.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onStatusChange(option?.value)}
            className="flex items-center space-x-2"
          >
            <span>{option?.label}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              selectedStatus === option?.value 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {option?.count}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ApplicationFilters;