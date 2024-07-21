import React from 'react';
import { getDistance } from 'geolib';

const FilterDistance = () => {
  const locations = [
    { id: 1, coordinates: { latitude: 40.7128, longitude: -74.0060 } },
    { id: 2, coordinates: { latitude: 34.0522, longitude: -118.2437 } },
    // ...more objects
  ];

  const myLocation = { latitude: 37.7749, longitude: -122.4194 };
  const distanceThreshold = 4000; // 4 kilometers in meters

  const filteredLocations = locations.filter(location => {
    const distance = getDistance(myLocation, location.coordinates);
    return distance <= distanceThreshold;
  });

  return (
    <div>
      <h1>Filtered Locations</h1>
      <ul>
        {filteredLocations.map(location => (
          <li key={location.id}>{`ID: ${location.id}, Coordinates: ${location.coordinates.latitude}, ${location.coordinates.longitude}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterDistance;
