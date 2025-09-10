import React from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import Image from '../../components/AppImage';

const mockConversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastMessage: 'Is the unit still available for viewing next week?',
    time: '2h',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Michael Chen',
    lastMessage: 'I submitted the application — any updates?',
    time: '1d',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Emma Davis',
    lastMessage: 'Thanks for the quick reply!',
    time: '3d',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
];

const Messages = () => {
  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="landlord" isAuthenticated={true} />
      <div className="max-w-3xl mx-auto p-4 mt-20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Messages</h1>
          <div className="text-sm text-muted-foreground">Manage your conversations with tenants</div>
        </div>

        <div className="bg-card border border-border rounded-lg divide-y">
          {mockConversations.map((c) => (
            <button key={c.id} className="w-full text-left p-4 flex items-center space-x-3 hover:bg-muted transition-colors">
              <div className="w-12 h-12 rounded overflow-hidden">
                <Image src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.time}</div>
                </div>
                <div className="text-sm text-muted-foreground truncate">{c.lastMessage}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <MobileAppFooter userRole="landlord" />
    </div>
  );
};

export default Messages;
