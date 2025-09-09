import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactModal = ({ isOpen, onClose, type = 'message', landlordName = 'Sarah Johnson' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messageTemplates = {
    message: `Hi ${landlordName},\n\nI'm interested in your property listing for the Modern Downtown Apartment. Could you please provide more information about availability and viewing options?\n\nThank you!`,
    viewing: `Hi ${landlordName},\n\nI would like to schedule a viewing for the Modern Downtown Apartment. I'm available on weekdays after 5 PM and weekends. Please let me know what times work best for you.\n\nLooking forward to hearing from you!`
  };

  React.useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        message: messageTemplates?.[type] || messageTemplates?.message
      }));
    }
  }, [isOpen, type, landlordName]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      preferredDate: '',
      preferredTime: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto elevation-3">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {type === 'viewing' ? 'Schedule Viewing' : 'Send Message'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData?.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
          />

          {type === 'viewing' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Preferred Date"
                type="date"
                name="preferredDate"
                value={formData?.preferredDate}
                onChange={handleInputChange}
                min={new Date()?.toISOString()?.split('T')?.[0]}
              />
              <Input
                label="Preferred Time"
                type="time"
                name="preferredTime"
                value={formData?.preferredTime}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData?.message}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none text-sm"
              placeholder="Enter your message..."
              required
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              className="flex-1"
              iconName={type === 'viewing' ? 'Calendar' : 'Send'}
              iconPosition="left"
            >
              {isSubmitting 
                ? 'Sending...' 
                : type === 'viewing' ?'Schedule Viewing' :'Send Message'
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;