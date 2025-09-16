import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import ChatWindow from './components/ChatWindow';

const Thread = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const convId = String(id);
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch('/api/messages');
        const json = await res.json();
        const items = Array.isArray(json?.items) ? json.items : [];
        const found = items.find(c => String(c.id) === convId || String(c._id) === convId) || null;
        if (!ignore) setConversation(found);
      } catch {
        if (!ignore) setConversation(null);
      }
    }
    load();
    return () => { ignore = true; };
  }, [convId]);

  const handleSend = (message) => {
    setConversation(prev => {
      if (!prev) return prev;
      const messages = Array.isArray(prev.messages) ? prev.messages : [];
      return {
        ...prev,
        messages: [...messages, message],
        lastMessage: message.text || (message.images?.length ? 'Image' : 'Video'),
        time: 'Now'
      };
    });
  };

  if (!conversation) {
    return (
      <div className="min-h-screen bg-background">
        <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />
        <div className="max-w-7xl mx-auto p-4 mt-20 pb-24">
          <div className="bg-card border border-border rounded-lg p-6 text-center">No conversation selected. <button className="ml-2 text-primary" onClick={() => navigate('/messages')}>Back to conversations</button></div>
        </div>
        <MobileAppFooter userRole="tenant" showOnDesktop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />

      <div className="max-w-7xl mx-auto p-4 mt-20 pb-24">
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
