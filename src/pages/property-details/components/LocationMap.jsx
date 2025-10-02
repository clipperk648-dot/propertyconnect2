import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LocationMap = ({ location = {} }) => {
  const mockLocation = {
    address: location?.address || String(location || ''),
    city: location?.city || '',
    state: location?.state || '',
    zipCode: location?.zipCode || '',
    lat: location?.lat,
    lng: location?.lng,
    walkScore: 0,
    transitScore: 0,
    bikeScore: 0,
    nearbyPlaces: Array.isArray(location?.nearbyPlaces) ? location.nearbyPlaces : [],
  };

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);
  const mapTimerRef = useRef(null);

  useEffect(() => {
    mapTimerRef.current = setTimeout(() => { if (!mapLoaded) setMapFailed(true); }, 7000);
    return () => clearTimeout(mapTimerRef.current);
  }, [mapLoaded]);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Limited';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden elevation-1">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground mb-2">Location & Neighborhood</h2>
        <div className="flex items-center text-muted-foreground">
          <Icon name="MapPin" size={18} className="mr-2" />
          <span>
            {mockLocation?.address}, {mockLocation?.city}, {mockLocation?.state} {mockLocation?.zipCode}
          </span>
        </div>
      </div>
      {/* Map */}
      <div className="h-64 bg-muted relative">
        {!mapFailed ? (
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Property Location"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mockLocation?.lat},${mockLocation?.lng}&z=14&output=embed`}
            className="border-0"
            onLoad={() => { clearTimeout(mapTimerRef.current); setMapLoaded(true); }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4 text-center">
            <div>
              <div className="text-lg font-semibold mb-2">Map unavailable</div>
              <p className="text-sm text-muted-foreground mb-3">We couldn't load the map. Open it in Google Maps instead.</p>
              <a href={`https://www.google.com/maps?q=${mockLocation?.lat},${mockLocation?.lng}&z=14`} target="_blank" rel="noreferrer" className="inline-block">
                <button className="px-4 py-2 rounded bg-primary text-primary-foreground">Open in Google Maps</button>
              </a>
            </div>
          </div>
        )}
      </div>
      {/* Scores */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Walkability Scores</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(mockLocation?.walkScore)}`}>
              {mockLocation?.walkScore}
            </div>
            <div className="text-sm text-muted-foreground mb-1">Walk Score</div>
            <div className={`text-xs font-medium ${getScoreColor(mockLocation?.walkScore)}`}>
              {getScoreLabel(mockLocation?.walkScore)}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(mockLocation?.transitScore)}`}>
              {mockLocation?.transitScore}
            </div>
            <div className="text-sm text-muted-foreground mb-1">Transit Score</div>
            <div className={`text-xs font-medium ${getScoreColor(mockLocation?.transitScore)}`}>
              {getScoreLabel(mockLocation?.transitScore)}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(mockLocation?.bikeScore)}`}>
              {mockLocation?.bikeScore}
            </div>
            <div className="text-sm text-muted-foreground mb-1">Bike Score</div>
            <div className={`text-xs font-medium ${getScoreColor(mockLocation?.bikeScore)}`}>
              {getScoreLabel(mockLocation?.bikeScore)}
            </div>
          </div>
        </div>
      </div>
      {/* Nearby Places */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">What's Nearby</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {mockLocation?.nearbyPlaces?.map((place, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={place?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">{place?.name}</div>
                <div className="text-xs text-muted-foreground">{place?.distance}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
