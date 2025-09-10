import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LocationMap = ({ location = {} }) => {
  const mockLocation = {
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    lat: 40.7589,
    lng: -73.9851,
    walkScore: 95,
    transitScore: 88,
    bikeScore: 72,
    nearbyPlaces: [
      { name: "Central Park", distance: "0.3 miles", type: "park", icon: "Trees" },
      { name: "Whole Foods Market", distance: "0.2 miles", type: "grocery", icon: "ShoppingCart" },
      { name: "Metro Station", distance: "0.1 miles", type: "transit", icon: "Train" },
      { name: "Starbucks Coffee", distance: "0.1 miles", type: "cafe", icon: "Coffee" },
      { name: "24/7 Fitness", distance: "0.4 miles", type: "gym", icon: "Dumbbell" },
      { name: "Roosevelt Hospital", distance: "0.6 miles", type: "hospital", icon: "Heart" }
    ],
    ...location
  };

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
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Property Location"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mockLocation?.lat},${mockLocation?.lng}&z=14&output=embed`}
          className="border-0"
        />
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
