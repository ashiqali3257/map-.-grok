export interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  category: string;
  rating?: number;
  openingHours?: string;
  phone?: string;
  website?: string;
  distance?: string; // formatted distance string for display
}

export type ViewState = 'home' | 'search' | 'directions' | 'nearby' | 'saved' | 'about' | 'contact' | 'place_details';
export type Theme = 'light' | 'dark';
export type MapLayer = 'standard' | 'satellite' | 'terrain';
export type TravelMode = 'driving' | 'walking' | 'cycling';
