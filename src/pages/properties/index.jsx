import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import Button from '../../components/ui/Button';
import Image from '../../components/AppImage';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import { formatCurrency } from '../../utils/currency';

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const res = await fetch('/.netlify/functions/properties', { signal: controller.signal });
        const json = await res.json();
        const items = Array.isArray(json?.items) ? json.items : [];
        setProperties(items);
      } catch (e) {
        if (e.name !== 'AbortError') setProperties([]);
      }
    }
    load();
    return () => controller.abort();
  }, []);

  // use shared currency formatter
  const formatCurrencyLocal = (v) => formatCurrency(v);

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="landlord" isAuthenticated={true} />

      <div className="max-w-6xl mx-auto p-6 mt-20 pb-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">My Properties</h1>
            <p className="text-muted-foreground">Manage your listings, photos, pricing and occupancy.</p>
          </div>
          <div>
            <Button variant="default" onClick={() => navigate('/property-management')}>
              + Add Property
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((p) => (
            <div key={p.id} className="bg-card border border-border rounded-lg overflow-hidden flex">
              <div className="w-32 h-32 flex-shrink-0">
                <Image src={p.image || (Array.isArray(p.images) ? p.images[0] : '')} alt={p.title || p.name || 'Property'} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{p.title || p.name || 'Property'}</h3>
                    <p className="text-sm text-muted-foreground">{p.location || [p.city, p.state].filter(Boolean).join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">{formatCurrency(p.price || 0)}{(p.type || 'rent') === 'rent' ? '/mo' : ''}</div>
                    <div className="text-xs text-muted-foreground">{p.status || 'Available'}</div>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigate('/property-details', { state: { propertyId: p.id } })}>
                    View
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/property-management', { state: { editPropertyId: p.id } })}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => setProperties(prev => prev.filter(x => x.id !== p.id))}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <MobileAppFooter userRole="landlord" showOnDesktop />
      </div>
    </div>
  );
};

export default Properties;
