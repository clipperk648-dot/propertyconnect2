import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ properties = [], onPropertySelect, selectedProperty = null }) => {
  const [mapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // New York City

  const PropertyMarker = ({ property, isSelected, onClick }) => (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all ${
        isSelected ? 'z-20 scale-110' : 'z-10 hover:scale-105'
      }`}
      style={{
        left: `${50 + (property?.coordinates?.lng || 0) * 10}%`,
        top: `${50 + (property?.coordinates?.lat || 0) * 10}%`
      }}
      onClick={() => onClick(property)}
    >
      <div className={`px-3 py-2 rounded-lg text-sm font-medium shadow-lg ${
        isSelected 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-card text-foreground border border-border'
      }`}>
        ${property?.price?.toLocaleString()}
      </div>
      <div className={`w-3 h-3 transform rotate-45 mx-auto -mt-1.5 ${
        isSelected ? 'bg-primary' : 'bg-card border-r border-b border-border'
      }`}></div>
    </div>
  );

  const PropertyPopup = ({ property, onClose }) => (
    <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg p-4 elevation-3 z-30">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{property?.title}</h3>
          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
            <Icon name="MapPin" size={14} />
            <span>{property?.location}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          iconName="X"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-foreground">
          ${property?.price?.toLocaleString()}
          {property?.rentType && (
            <span className="text-sm font-normal text-muted-foreground">
              /{property?.rentType}
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
          >
            View
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
          >
            Contact
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative h-96 lg:h-[600px] bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full relative">
        {/* Mock Google Maps iframe */}
        {/** Map iframe with load/fail detection */}
        {!mapFailed ? (
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Property Search Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12&output=embed`}
            className="border-0"
            onLoad={() => { clearTimeout(mapLoadTimerRef.current); setMapLoaded(true); }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-center p-4">
            <div>
              <div className="text-lg font-semibold mb-2">Map unavailable</div>
              <p className="text-sm text-muted-foreground mb-3">We couldn't load the embedded map. You can open it in a new tab.</p>
              <div className="flex justify-center">
                <a
                  href={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="px-4 py-2 rounded bg-primary text-primary-foreground">Open in Google Maps</button>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Property Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            {properties?.map((property) => (
              <div key={property?.id} className="pointer-events-auto">
                <PropertyMarker
                  property={property}
                  isSelected={selectedProperty?.id === property?.id}
                  onClick={onPropertySelect}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="secondary"
          size="icon"
          className="bg-card border border-border"
          iconName="Plus"
        />
        <Button
          variant="secondary"
          size="icon"
          className="bg-card border border-border"
          iconName="Minus"
        />
        <Button
          variant="secondary"
          size="icon"
          className="bg-card border border-border"
          iconName="Maximize"
        />
      </div>
      {/* Property Count Badge */}
      <div className="absolute top-4 left-4 bg-card border border-border rounded-lg px-3 py-2">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            {properties?.length} properties
          </span>
        </div>
      </div>
      {/* Selected Property Popup */}
      {selectedProperty && (
        <PropertyPopup
          property={selectedProperty}
          onClose={() => onPropertySelect(null)}
        />
      )}
      {/* No Properties Message */}
      {properties?.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
          <div className="text-center">
            <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No properties to display
            </h3>
            <p className="text-muted-foreground">
              Adjust your search filters to see properties on the map
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
