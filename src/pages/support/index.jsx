import React, { useState } from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const initialTickets = [
  { id: 'TCK-001', subject: 'Unable to list property', status: 'Open', created: '2025-01-03' },
  { id: 'TCK-002', subject: 'Billing question', status: 'Closed', created: '2024-12-21' }
];

const Support = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [form, setForm] = useState({ subject: '', message: '', priority: 'normal' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      const id = `TCK-${String(Math.floor(Math.random() * 900) + 100)}`;
      setTickets(prev => [{ id, subject: form.subject, status: 'Open', created: new Date().toISOString().split('T')[0] }, ...prev]);
      setForm({ subject: '', message: '', priority: 'normal' });
      setSending(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />

      <div className="max-w-4xl mx-auto p-6 mt-20 space-y-6 pb-24">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Support</h1>
            <p className="text-muted-foreground">Create a ticket or contact our support team.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium mb-3">Create a support ticket</h3>
            {success && <div className="p-3 bg-success/10 text-success rounded mb-3">Ticket created successfully</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input label="Subject" value={form.subject} onChange={(e) => setForm(prev => ({ ...prev, subject: e.target.value }))} required />
              <Input label="Message" value={form.message} onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))} required />
              <label className="text-sm">Priority</label>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="priority" value="low" checked={form.priority === 'low'} onChange={() => setForm(prev => ({ ...prev, priority: 'low' }))} />
                  <span className="text-sm">Low</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="priority" value="normal" checked={form.priority === 'normal'} onChange={() => setForm(prev => ({ ...prev, priority: 'normal' }))} />
                  <span className="text-sm">Normal</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="priority" value="high" checked={form.priority === 'high'} onChange={() => setForm(prev => ({ ...prev, priority: 'high' }))} />
                  <span className="text-sm">High</span>
                </label>
              </div>

              <div className="flex justify-end">
                <Button variant="default" type="submit" loading={sending}>Send ticket</Button>
              </div>
            </form>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium mb-3">Your tickets</h3>
            <div className="space-y-2">
              {tickets.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">{t.subject}</div>
                    <div className="text-xs text-muted-foreground">{t.id} • {t.created}</div>
                  </div>
                  <div className="text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${t.status === 'Open' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <MobileAppFooter userRole="tenant" showOnDesktop />
      </div>
    </div>
  );
};

export default Support;
