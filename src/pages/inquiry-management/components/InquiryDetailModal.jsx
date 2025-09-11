import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import AppIcon from '../../../components/AppIcon';
import { formatCurrency } from '../../../utils/currency';

const InquiryDetailModal = ({ inquiry, onClose, onAction }) => {
  const [response, setResponse] = useState('');

  if (!inquiry) return null;

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    })?.format(price);
  };

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

  const responseTemplates = [
    "Thank you for your interest in this property. I\'d be happy to schedule a viewing for you.",
    "I\'ve received your application and will review it shortly. I\'ll get back to you within 24 hours.",
    "The property is currently available. Here are the details you requested...",
    "Thank you for reaching out. Let me answer your questions about this property."
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Inquiry Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Inquiry Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={inquiry?.tenant?.avatar}
                alt={inquiry?.tenant?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-foreground">{inquiry?.tenant?.name}</h3>
                <p className="text-sm text-muted-foreground">{inquiry?.tenant?.email}</p>
                <p className="text-sm text-muted-foreground">{inquiry?.tenant?.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(inquiry?.status)}
              <span className="text-sm text-muted-foreground">
                {formatTimestamp(inquiry?.timestamp)}
              </span>
            </div>
          </div>

          {/* Property Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <img
                src={inquiry?.property?.image}
                alt={inquiry?.property?.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground">{inquiry?.property?.title}</h4>
                <p className="text-sm text-muted-foreground flex items-center">
                  <AppIcon name="MapPin" size={14} className="mr-1" />
                  {inquiry?.property?.location}
                </p>
                <p className="text-lg font-bold text-primary">
                  {formatPrice(inquiry?.property?.price)}/month
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Message</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-foreground whitespace-pre-wrap">{inquiry?.message}</p>
            </div>
          </div>

          {/* Inquiry Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Inquiry Type</h4>
              <p className="text-foreground capitalize">{inquiry?.inquiryType}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Priority</h4>
              <p className="text-foreground capitalize">{inquiry?.priority}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Source</h4>
              <p className="text-foreground capitalize">{inquiry?.source}</p>
            </div>
            {inquiry?.responseTime && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Response Time</h4>
                <p className="text-green-600">{inquiry?.responseTime}</p>
              </div>
            )}
          </div>

          {/* Response Section */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Quick Response</h4>
            
            {/* Response Templates */}
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-2">Templates:</p>
              <div className="flex flex-wrap gap-2">
                {responseTemplates?.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setResponse(template)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-left"
                  >
                    {template?.substring(0, 30)}...
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={response}
              onChange={(e) => setResponse(e?.target?.value)}
              placeholder="Type your response here..."
              rows={4}
              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between space-x-3 pt-4 border-t border-border">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                onClick={() => onAction(inquiry, 'schedule-viewing')}
                iconName="Calendar"
                iconSize={16}
              >
                Schedule Viewing
              </Button>
              <Button
                variant="ghost"
                onClick={() => onAction(inquiry, 'call')}
                iconName="Phone"
                iconSize={16}
              >
                Call Tenant
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                onClick={() => onAction(inquiry, 'mark-resolved')}
              >
                Mark Resolved
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  onAction(inquiry, 'send-response', response);
                  onClose();
                }}
                disabled={!response?.trim()}
                iconName="Send"
                iconPosition="right"
              >
                Send Response
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetailModal;
