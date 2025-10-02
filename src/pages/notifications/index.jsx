import React, { useEffect, useState } from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import api from '../../utils/api';
import Icon from '../../components/AppIcon';
import usePolling from '../../utils/usePolling';

const Notifications = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await api.get('/messages');
      const arr = Array.isArray(res?.data?.items) ? res.data.items : [];
      setItems(arr);
      setError('');
    } catch (e) {
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);
  usePolling(load, 5000, []);

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />
      <div className="max-w-4xl mx-auto p-6 mt-20 pb-24">
        <div className="glass-morphism p-6 rounded-lg mb-4">
          <h1 className="text-2xl font-semibold mb-2">Notifications</h1>
          <p className="text-muted-foreground">All your alerts and system messages in one place.</p>
        </div>

        {loading ? (
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Icon name="Loader" size={32} className="animate-spin text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading…</p>
          </div>
        ) : error ? (
          <div className="bg-card border border-error/30 rounded-lg p-6 text-center">
            <p className="text-sm text-error">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((m) => (
              <div key={String(m._id || m.id)} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Icon name="Bell" size={16} className="mt-1 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">
                      {m.title || m.subject || m.type || 'Message'}
                    </div>
                    {m.text || m.content || m.body ? (
                      <div className="text-sm text-muted-foreground mt-1">
                        {m.text || m.content || m.body}
                      </div>
                    ) : null}
                    <div className="text-xs text-muted-foreground mt-1">
                      {m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <MobileAppFooter userRole="tenant" showOnDesktop />
      </div>
    </div>
  );
};

export default Notifications;
