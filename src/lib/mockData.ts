import { Place } from '../types';

export const mockPlaces: Place[] = [
  {
    id: 'p1',
    name: 'Central Park Cafe',
    lat: 40.7812,
    lng: -73.9665,
    address: '123 Park Ave, New York, NY 10028',
    category: 'Cafes',
    rating: 4.5,
    openingHours: 'Open ⋅ Closes 8 PM',
    phone: '(555) 123-4567',
    website: 'https://example.com/centralparkcafe',
  },
  {
    id: 'p2',
    name: 'Grand Hotel',
    lat: 40.7644,
    lng: -73.9731,
    address: '456 Grand St, New York, NY 10019',
    category: 'Hotels',
    rating: 4.8,
    openingHours: 'Open 24 hours',
    phone: '(555) 987-6543',
    website: 'https://example.com/grandhotel',
  },
  {
    id: 'p3',
    name: 'Downtown Gas Station',
    lat: 40.7505,
    lng: -73.9934,
    address: '789 Downtown Ave, New York, NY 10001',
    category: 'Gas Stations',
    rating: 3.9,
    openingHours: 'Open 24 hours',
    phone: '(555) 555-5555',
  },
  {
    id: 'p4',
    name: 'City General Hospital',
    lat: 40.7420,
    lng: -73.9850,
    address: '321 Health Way, New York, NY 10016',
    category: 'Hospitals',
    rating: 4.2,
    openingHours: 'Open 24 hours',
    phone: '(555) 111-2222',
    website: 'https://example.com/cityhospital',
  },
  {
    id: 'p5',
    name: 'Gourmet Burger Kitchen',
    lat: 40.7300,
    lng: -73.9950,
    address: '88 Burger Ln, New York, NY 10012',
    category: 'Restaurants',
    rating: 4.6,
    openingHours: 'Open ⋅ Closes 11 PM',
    phone: '(555) 444-3333',
    website: 'https://example.com/gbk',
  },
  {
    id: 'p6',
    name: 'The Tech Mall',
    lat: 40.7550,
    lng: -73.9800,
    address: '500 Tech Blvd, New York, NY 10036',
    category: 'Shopping',
    rating: 4.4,
    openingHours: 'Open ⋅ Closes 9 PM',
    phone: '(555) 777-8888',
    website: 'https://example.com/techmall',
  },
];

// Helper to calculate distance in miles
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Radius of the earth in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in miles
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Generate some dynamic mock places based on center
export function getNearbyPlaces(lat: number, lng: number, category?: string): Place[] {
  // Return some generated places around the center
  const categories = category ? [category] : ['Restaurants', 'Hotels', 'Gas Stations', 'Hospitals', 'Shopping', 'Cafes', 'Attractions', 'Parking'];
  
  const places: Place[] = [];
  const count = category ? 5 : 12;
  
  for (let i = 0; i < count; i++) {
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lngOffset = (Math.random() - 0.5) * 0.05;
    const cat = category || categories[Math.floor(Math.random() * categories.length)];
    
    const p: Place = {
      id: `generated_${lat}_${lng}_${i}`,
      name: `Sample ${cat.slice(0, -1)} ${i + 1}`,
      lat: lat + latOffset,
      lng: lng + lngOffset,
      address: `${Math.floor(Math.random() * 900) + 100} Main St, City`,
      category: cat,
      rating: Number((Math.random() * 2 + 3).toFixed(1)),
      openingHours: 'Open ⋅ Closes 10 PM',
      phone: '(555) 123-4567',
    };
    places.push(p);
  }
  
  return places.sort((a, b) => {
    return calculateDistance(lat, lng, a.lat, a.lng) - calculateDistance(lat, lng, b.lat, b.lng);
  });
}
