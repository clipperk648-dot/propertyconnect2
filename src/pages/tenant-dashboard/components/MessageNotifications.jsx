import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageNotifications = () => {
  const navigate = useNavigate();
  const [messages] = useState([
    {
      id: 1,
      senderId: 1,
      senderName: "Sarah Johnson",
      senderRole: "Property Owner",
      senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      propertyTitle: "Luxury Condo with View",
      propertyId: 3,
      lastMessage: "Hi! I'd like to schedule a viewing for this weekend. Are you available on Saturday afternoon?",
      timestamp: "2025-01-09T15:30:00Z",
      isRead: false,
      messageCount: 3
    },
    {
      id: 2,
      senderId: 2,
      senderName: "Michael Chen",
      senderRole: "Property Manager",
      senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      propertyTitle: "Modern Downtown Apartment",
      propertyId: 1,
      lastMessage: "Thank you for your interest. I've received your application and will review it within 24 hours.",
      timestamp: "2025-01-09T11:15:00Z",
      isRead: false,
      messageCount: 1
    },
    {
      id: 3,
      senderId: 3,
      senderName: "Emma Rodriguez",
      senderRole: "Landlord",
      senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      propertyTitle: "Cozy Suburban House",
      propertyId: 2,
      lastMessage: "Your application has been approved! Please let me know when you'd like to sign the lease.",
      timestamp: "2025-01-08T14:20:00Z",
      isRead: true,
      messageCount: 5
    },
    {
      id: 4,
      senderId: 4,
      senderName: "David Park",
      senderRole: "Property Owner",
      senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      propertyTitle: "Studio Near University",
      propertyId: 4,
      lastMessage: "The property is still available. Would you like to schedule a virtual tour first?",
      timestamp: "2025-01-08T09:45:00Z",
      isRead: true,
      messageCount: 2
    }
  ]);

  const unreadCount = messages?.filter(message => !message?.isRead)?.length;

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const handleMessageClick = (message) => {
    navigate(`/messages?conversation=${message?.id}`);
  };

  const handleViewAllMessages = () => {
    navigate('/messages');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-foreground">Messages</h2>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewAllMessages}
          iconName="MessageSquare"
          iconPosition="left"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {messages?.slice(0, 4)?.map((message) => (
          <div
            key={message?.id}
            onClick={() => handleMessageClick(message)}
            className={`p-4 rounded-lg border cursor-pointer transition-all hover:elevation-1 ${
              !message?.isRead 
                ? 'border-primary/20 bg-primary/5 hover:bg-primary/10' :'border-border hover:bg-muted/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Image
                  src={message?.senderAvatar}
                  alt={`${message?.senderName} avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {!message?.isRead && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-card"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className={`text-sm font-medium ${!message?.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {message?.senderName}
                    </h4>
                    <p className="text-xs text-muted-foreground">{message?.senderRole}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(message?.timestamp)}
                    </span>
                    {message?.messageCount > 1 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {message?.messageCount} messages
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-2">
                  <p className="text-xs text-primary font-medium">
                    Re: {message?.propertyTitle}
                  </p>
                </div>

                <p className={`text-sm line-clamp-2 ${
                  !message?.isRead ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {message?.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {messages?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground mb-2">No messages yet</p>
          <p className="text-sm text-muted-foreground">
            Messages from property owners will appear here
          </p>
        </div>
      )}
      {messages?.length > 4 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleViewAllMessages}
            className="w-full"
            iconName="ArrowRight"
            iconPosition="right"
          >
            View {messages?.length - 4} more messages
          </Button>
        </div>
      )}
    </div>
  );
};

export default MessageNotifications;