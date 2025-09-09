import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const BulkInquiryActions = ({ selectedCount, onBulkAction }) => {
  const [showActions, setShowActions] = useState(false);

  const availableActions = [
    { value: 'mark-read', label: 'Mark as Read', icon: 'Eye' },
    { value: 'mark-unread', label: 'Mark as Unread', icon: 'EyeOff' },
    { value: 'respond', label: 'Send Response', icon: 'Reply' },
    { value: 'archive', label: 'Archive Inquiries', icon: 'Archive' },
    { value: 'export', label: 'Export Data', icon: 'Download' },
    { value: 'delete', label: 'Delete Inquiries', icon: 'Trash2' }
  ];

  return (
    <div className="relative">
      <Button
        variant="default"
        size="sm"
        onClick={() => setShowActions(!showActions)}
        iconName="MoreHorizontal"
        iconSize={16}
      >
        Bulk Actions ({selectedCount})
      </Button>

      {showActions && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-10">
          <div className="p-2">
            <div className="text-sm text-muted-foreground px-3 py-2 border-b border-border">
              {selectedCount} inquiries selected
            </div>
            {availableActions?.map((action) => (
              <button
                key={action?.value}
                onClick={() => {
                  onBulkAction(action?.value);
                  setShowActions(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-50 rounded ${
                  action?.value === 'delete' ? 'text-red-600 hover:text-red-700' : 'text-foreground'
                }`}
              >
                <span>{action?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkInquiryActions;