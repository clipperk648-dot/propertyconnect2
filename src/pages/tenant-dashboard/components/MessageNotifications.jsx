import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import api from '../../../utils/api';
import usePolling from '../../../utils/usePolling';

const MessageNotifications = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get('/messages');
      const arr = Array.isArray(res?.data?.items) ? res.data.items : [];
      const mapped = arr.map((m, i) => ({
        id: String(m._id || i),
        senderName: m.senderName || 'Owner',
        senderRole: m.senderRole || 'Property Owner',
        senderAvatar: m.senderAvatar || '',
        propertyTitle: m.propertyTitle || '',
        propertyId: m.propertyId || '',
        lastMessage: m.text || m.content || m.body || '',
        timestamp: m.createdAt || new Date().toISOString(),
        isRead: !!m.isRead,
        messageCount: Number(m.messageCount || 1),
      }));
      setMessages(mapped);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);
  usePolling(load, 5000, []);

  const unreadCount = messages?.filter(message => !message?.isRead)?.length;

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const t = new Date(timestamp);
    const diff = Math.floor((now - t) / (1000 * 60));
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
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
        <Button variant="outline" size="sm" onClick={handleViewAllMessages} iconName="MessageSquare" iconPosition="left">View All</Button>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground mb-2">No messages yet</p>
          <p className="text-sm text-muted-foreground">Messages from property owners will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.slice(0, 4).map((message) => (
            <div key={message?.id} onClick={() => handleMessageClick(message)} className={`p-4 rounded-lg border cursor-pointer transition-all hover:elevation-1 ${!message?.isRead ? 'border-primary/20 bg-primary/5 hover:bg-primary/10' :'border-border hover:bg-muted/50'}`}>
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Image src={message?.senderAvatar} alt={`${message?.senderName} avatar`} className="w-10 h-10 rounded-full object-cover" />
                  {!message?.isRead && <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-card"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h4 className={`text-sm font-medium ${!message?.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>{message?.senderName}</h4>
                      <p className="text-xs text-muted-foreground">{message?.senderRole}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">{getTimeAgo(message?.timestamp)}</span>
                      {message?.messageCount > 1 && (<p className="text-xs text-muted-foreground mt-1">{message?.messageCount} messages</p>)}
                    </div>
                  </div>
                  <div className="mb-2">
                    <p className="text-xs text-primary font-medium">Re: {message?.propertyTitle}</p>
                  </div>
                  <p className={`text-sm line-clamp-2 ${!message?.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>{message?.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {messages.length > 4 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" onClick={handleViewAllMessages} className="w-full" iconName="ArrowRight" iconPosition="right">
            View {messages.length - 4} more messages
          </Button>
        </div>
      )}
    </div>
  );
};

export default MessageNotifications;
