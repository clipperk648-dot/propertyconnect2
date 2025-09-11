import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';

const initialConversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastMessage: 'Is the unit still available for viewing next week?',
    time: '2h',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    status: 'Online',
    messages: [
      { id: 101, sender: 'Sarah', text: 'Hi — is the unit still available?', time: '10:12 AM' },
      { id: 102, sender: 'You', text: 'Yes, it is. When would you like to view?', time: '10:15 AM' }
    ]
  },
  {
    id: 2,
    name: 'Michael Chen',
    lastMessage: 'I submitted the application — any updates?',
    time: '1d',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    status: 'Offline',
    messages: [
      { id: 201, sender: 'Michael', text: 'I submitted the application — any updates?', time: 'Yesterday' }
    ]
  },
  {
    id: 3,
    name: 'Emma Davis',
    lastMessage: 'Thanks for the quick reply!',
    time: '3d',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    status: 'Online',
    messages: [
      { id: 301, sender: 'Emma', text: 'Thanks for the quick reply!', time: '3 days ago' }
    ]
  }
];

const Messages = () => {
  const location = useLocation();
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    // if navigation provided an openConversationId, open it; otherwise default to first
    const openId = location?.state?.openConversationId;
    if (openId) {
      setActiveId(openId);
    } else if (!activeId) {
      setActiveId(initialConversations?.[0]?.id || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state]);

  const handleSelect = (id) => setActiveId(id);

  const handleSend = (message) => {
    setConversations(prev => prev.map(c => c.id === activeId ? {
      ...c,
      messages: [...(c.messages || []), message],
      lastMessage: message.text || (message.images?.length ? 'Image' : 'Video'),
      time: 'Now'
    } : c));
  };

  const activeConversation = conversations.find(c => c.id === activeId);

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="landlord" isAuthenticated={true} />

      <div className="max-w-7xl mx-auto p-4 mt-20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Messages</h1>
          <div className="text-sm text-muted-foreground">Manage your conversations with tenants</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <ConversationList conversations={conversations} activeId={activeId} onSelect={handleSelect} />
          </div>

          <div className="md:col-span-3">
            <ChatWindow conversation={activeConversation} onSend={handleSend} />
          </div>
        </div>
      </div>

      <MobileAppFooter userRole="landlord" />
    </div>
  );
};

export default Messages;
