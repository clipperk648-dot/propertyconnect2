import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import ChatWindow from './components/ChatWindow';

const Thread = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const convId = Number(id);
  const [conversations, setConversations] = useState(initialConversations);

  const conversation = conversations.find(c => c.id === convId);

  const handleSend = (message) => {
    setConversations(prev => prev.map(c => c.id === convId ? {
      ...c,
      messages: [...(c.messages || []), message],
      lastMessage: message.text || (message.images?.length ? 'Image' : 'Video'),
      time: 'Now'
    } : c));
  };

  if (!conversation) {
    return (
      <div className="min-h-screen bg-background">
        <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />
        <div className="max-w-7xl mx-auto p-4 mt-20">
          <div className="bg-card border border-border rounded-lg p-6 text-center">Conversation not found. <button className="ml-2 text-blue-600" onClick={() => navigate('/messages')}>Back to conversations</button></div>
        </div>
        <MobileAppFooter userRole="tenant" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />

      <div className="max-w-7xl mx-auto p-4 mt-20">
        <div className="mb-4">
          <button className="text-sm text-blue-600 mb-2" onClick={() => navigate('/messages')}>Back</button>
          <h1 className="text-2xl font-semibold">{conversation.name}</h1>
        </div>

        <ChatWindow conversation={conversation} onSend={handleSend} />
      </div>

      <MobileAppFooter userRole="tenant" />
    </div>
  );
};

export default Thread;
