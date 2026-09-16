import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppContext } from '../AppContext';

// Fix Leaflet's default icon path issues in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconRetinaUrl: iconRetina,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons
const UserIcon = L.divIcon({
  html: `<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Component to handle programmatic map moves
function MapController() {
  const { mapCenter, mapZoom } = useAppContext();
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(mapCenter, mapZoom, { animate: true, duration: 1.5 });
  }, [mapCenter, mapZoom, map]);
  
  return null;
}

export default function MapComponent() {
  const { 
    mapCenter, 
    mapZoom, 
    mapLayer, 
    searchResults, 
    userLocation,
    selectedPlace,
    setSelectedPlace,
    setCurrentView,
    directionsRoute
  } = useAppContext();

  // Define tile layers
  const tiles = {
    standard: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
  };

  const attributions = {
    standard: '&copy; OpenStreetMap contributors',
    satellite: 'Tiles &copy; Esri',
    terrain: '&copy; OpenTopoMap contributors'
  };

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        className="w-full h-full"
        zoomControl={false} // Custom zoom control provided separately or positioned
      >
        <TileLayer
          attribution={attributions[mapLayer]}
          url={tiles[mapLayer]}
        />
        
        <MapController />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={UserIcon}>
            <Popup>
              <div className="font-semibold text-gray-800">My Location</div>
            </Popup>
          </Marker>
        )}

        {/* Search Results / Nearby Markers */}
        {searchResults.map((place) => (
          <Marker 
            key={place.id} 
            position={[place.lat, place.lng]}
            eventHandlers={{
              click: () => {
                setSelectedPlace(place);
                setCurrentView('place_details');
              }
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-gray-900">{place.name}</h3>
                <p className="text-sm text-gray-600">{place.category}</p>
                {place.rating && <div className="text-sm text-yellow-500 font-medium mt-1">★ {place.rating}</div>}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Directions Route Line */}
        {directionsRoute && (
          <Polyline 
            positions={directionsRoute.path} 
            color="#3b82f6" 
            weight={5} 
            opacity={0.8}
          />
        )}
      </MapContainer>
    </div>
  );
}
