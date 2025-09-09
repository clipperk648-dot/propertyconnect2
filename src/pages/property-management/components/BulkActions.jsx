import React, { useState } from 'react';
import Button from '../../../components/ui/Button';


const BulkActions = ({ selectedCount, onBulkAction, activeTab }) => {
  const [showActions, setShowActions] = useState(false);

  const getAvailableActions = () => {
    switch (activeTab) {
      case 'active':
        return [
          { value: 'archive', label: 'Archive Properties', icon: 'Archive' },
          { value: 'duplicate', label: 'Duplicate Properties', icon: 'Copy' },
          { value: 'export', label: 'Export Data', icon: 'Download' },
          { value: 'update-status', label: 'Update Status', icon: 'RefreshCw' }
        ];
      case 'draft':
        return [
          { value: 'complete', label: 'Mark as Complete', icon: 'CheckCircle' },
          { value: 'delete', label: 'Delete Drafts', icon: 'Trash2' },
          { value: 'duplicate', label: 'Duplicate Properties', icon: 'Copy' }
        ];
      case 'archived':
        return [
          { value: 'restore', label: 'Restore Properties', icon: 'RotateCcw' },
          { value: 'delete', label: 'Delete Permanently', icon: 'Trash2' },
          { value: 'export', label: 'Export Data', icon: 'Download' }
        ];
      default:
        return [];
    }
  };

  const availableActions = getAvailableActions();

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
              {selectedCount} properties selected
            </div>
            {availableActions?.map((action) => (
              <button
                key={action?.value}
                onClick={() => {
                  onBulkAction(action?.value);
                  setShowActions(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-gray-50 rounded"
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

export default BulkActions;