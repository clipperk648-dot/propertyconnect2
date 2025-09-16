import React, { useState } from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const faqs = [
  { q: 'How do I list a property?', a: 'Go to the Properties page and click Add Property to start listing.' },
  { q: 'How do I apply to a property?', a: 'Open the property details and click Apply to submit your application.' },
  { q: 'How do I contact support?', a: 'Use the contact form below or email support@findmyhome.com.' }
];

const Help = () => {
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />

      <div className="max-w-3xl mx-auto p-6 mt-20 pb-24">
        <h1 className="text-2xl font-semibold mb-2">Help Center</h1>
        <p className="text-muted-foreground mb-6">Find guides, FAQs, and contact support.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details key={i} className="group">
                  <summary className="cursor-pointer font-medium">{f.q}</summary>
                  <div className="mt-2 text-sm text-muted-foreground">{f.a}</div>
                </details>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium mb-3">Contact Support</h3>
            {sent ? (
              <div className="p-4 bg-success/10 text-success rounded">Message sent — we will get back to you shortly.</div>
            ) : (
              <form onSubmit={handleSend} className="space-y-3">
                <Input label="Name" value={contact.name} onChange={(e) => setContact(prev => ({ ...prev, name: e.target.value }))} />
                <Input label="Email" value={contact.email} onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))} />
                <Input label="Message" value={contact.message} onChange={(e) => setContact(prev => ({ ...prev, message: e.target.value }))} />
                <div className="flex justify-end">
                  <Button variant="default" type="submit">Send message</Button>
                </div>
              </form>
            )}
          </div>
        </div>

        <MobileAppFooter userRole="tenant" showOnDesktop />
      </div>
    </div>
  );
};

export default Help;
