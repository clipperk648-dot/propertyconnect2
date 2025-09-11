import React, { useMemo, useState } from 'react';
import RoleBasedNavBar from '../../components/ui/RoleBasedNavBar';
import MobileAppFooter from '../../components/ui/MobileAppFooter';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const initialSaved = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    address: "123 Main Street, Downtown",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    status: "Available",
    applicationStatus: "Not Applied",
    savedDate: "2025-01-05",
    propertyType: "Apartment"
  },
  {
    id: 2,
    title: "Cozy Suburban House",
    address: "456 Oak Avenue, Suburbs",
    price: 3200,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1800,
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=800&h=600&fit=crop",
    status: "Available",
    applicationStatus: "Applied",
    savedDate: "2025-01-03",
    propertyType: "House"
  },
  {
    id: 3,
    title: "Luxury Condo with View",
    address: "789 Skyline Drive, Uptown",
    price: 4500,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    image: "https://images.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg?w=800&h=600&fit=crop",
    status: "Pending",
    applicationStatus: "Under Review",
    savedDate: "2025-01-02",
    propertyType: "Condo"
  },
  {
    id: 4,
    title: "Studio Near University",
    address: "321 College Street, Campus Area",
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    status: "Available",
    applicationStatus: "Not Applied",
    savedDate: "2025-01-01",
    propertyType: "Studio"
  }
];

const Favorites = () => {
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = useState(initialSaved);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recent'); // recent, price-asc, price-desc
  const [filterType, setFilterType] = useState('all');
  const [selected, setSelected] = useState(new Set());

  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const removeSelected = () => {
    if (selected.size === 0) return;
    setSavedProperties(prev => prev.filter(p => !selected.has(p.id)));
    setSelected(new Set());
  };

  const clearAll = () => {
    setSavedProperties([]);
    setSelected(new Set());
  };

  const handleRemove = (id) => {
    setSavedProperties(prev => prev.filter(p => p.id !== id));
    setSelected(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = savedProperties.slice();
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.address.toLowerCase().includes(q));
    }
    if (filterType !== 'all') {
      list = list.filter(p => p.propertyType === filterType);
    }
    if (sort === 'price-asc') list.sort((a,b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
    else list.sort((a,b) => new Date(b.savedDate) - new Date(a.savedDate));
    return list;
  }, [savedProperties, query, sort, filterType]);

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavBar userRole="tenant" isAuthenticated={true} />

      <div className="max-w-7xl mx-auto p-6 mt-20"> 
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Favorites</h1>
            <p className="text-sm text-muted-foreground">Saved properties you liked — manage, compare, and act on them.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={() => navigate('/property-search') } iconName="Search">Search</Button>
            <Button variant="outline" onClick={() => { /* export mock */ alert('Exported favorites (mock)'); }}>Export</Button>
            <Button variant="destructive" onClick={clearAll}>Clear All</Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center space-x-3 flex-1">
              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search saved properties by title or address"
                  className="w-full rounded-md border border-border px-3 py-2"
                />
                <div className="absolute right-2 top-2">
                  <Icon name="Search" size={18} className="text-muted-foreground" />
                </div>
              </div>

              <select value={filterType} onChange={e => setFilterType(e.target.value)} className="rounded-md border border-border px-3 py-2">
                <option value="all">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Studio">Studio</option>
              </select>

              <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-md border border-border px-3 py-2">
                <option value="recent">Most Recent</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-sm text-muted-foreground">{filtered.length} results</div>
              <Button variant="outline" onClick={removeSelected} disabled={selected.size === 0}>Remove selected ({selected.size})</Button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Saved Properties</h3>
            <p className="text-muted-foreground mb-4">Start saving properties you're interested in to keep track of them here.</p>
            <Button onClick={() => navigate('/property-search')} iconName="Search" iconPosition="left">Search Properties</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(property => (
              <div key={property.id} className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="p-3 flex items-start">
                  <input type="checkbox" checked={selected.has(property.id)} onChange={() => toggleSelect(property.id)} className="mr-3 mt-2" />
                  <div className="flex-1">
                    <div className="relative h-44 overflow-hidden rounded-md">
                      <Image src={property.image} alt={property.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3">
                        <button onClick={() => handleRemove(property.id)} className="p-2 bg-white rounded-full shadow">
                          <Icon name="Heart" size={16} className="text-error fill-current" />
                        </button>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600">{property.status}</span>
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground line-clamp-1">{property.title}</h3>
                        <div className="text-sm text-muted-foreground">Saved {new Date(property.savedDate).toLocaleDateString()}</div>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center mt-1"><Icon name="MapPin" size={14} className="mr-1" />{property.address}</p>

                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <div className="text-2xl font-bold text-primary">${property.price.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">/month · {property.bedrooms} bd · {property.bathrooms} ba · {property.sqft} sqft</div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/property-details?id=${property.id}`)} iconName="Eye">View</Button>
                          {property.applicationStatus === 'Not Applied' ? (
                            <Button variant="default" size="sm" onClick={() => navigate(`/property-details?id=${property.id}`)} iconName="FileText">Apply</Button>
                          ) : (
                            <span className="text-xs text-muted-foreground">{property.applicationStatus}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MobileAppFooter userRole="tenant" />
    </div>
  );
};

export default Favorites;
