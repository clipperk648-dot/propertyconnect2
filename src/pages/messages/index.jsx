import React, { useEffect, useState } from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import ConversationList from './components/ConversationList';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch('/api/messages');
        const json = await res.json();
        if (!ignore) setConversations(Array.isArray(json?.items) ? json.items : []);
      } catch {
        if (!ignore) setConversations([]);
      }
    }
    load();
    return () => { ignore = true; };
  }, []);

  const handleSelect = (id) => {
    // navigate to thread page for the selected conversation
    navigate(`/messages/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />

      <div className="max-w-7xl mx-auto p-4 mt-20 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Messages</h1>
          <div className="text-sm text-muted-foreground">Select a conversation to view and reply</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <ConversationList conversations={conversations} onSelect={handleSelect} />
          </div>

          <div className="md:col-span-3 hidden md:block">
            <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-center h-80">
              <div className="text-center text-muted-foreground">
                <div className="mb-2">Select a conversation to start chatting</div>
                <div className="text-sm">Conversations are private between you and the other party.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileAppFooter userRole="tenant" showOnDesktop />
    </div>
  );
};

export default Messages;
