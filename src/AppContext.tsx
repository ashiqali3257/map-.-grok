import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Place, ViewState, Theme, MapLayer, TravelMode } from './types';

interface AppContextProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  mapCenter: [number, number];
  setMapCenter: (center: [number, number]) => void;
  mapZoom: number;
  setMapZoom: (zoom: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Place[];
  setSearchResults: (results: Place[]) => void;
  selectedPlace: Place | null;
  setSelectedPlace: (place: Place | null) => void;
  savedPlaces: Place[];
  toggleSavedPlace: (place: Place) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  theme: Theme;
  toggleTheme: () => void;
  userLocation: [number, number] | null;
  setUserLocation: (location: [number, number] | null) => void;
  directionsMode: TravelMode;
  setDirectionsMode: (mode: TravelMode) => void;
  mapLayer: MapLayer;
  setMapLayer: (layer: MapLayer) => void;
  fromLocation: string;
  setFromLocation: (loc: string) => void;
  toLocation: string;
  setToLocation: (loc: string) => void;
  directionsRoute: { path: [number, number][], distance: string, duration: string, steps: string[] } | null;
  setDirectionsRoute: (route: any) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7812, -73.9665]); // Default NYC
  const [mapZoom, setMapZoom] = useState<number>(13);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  const [savedPlaces, setSavedPlaces] = useState<Place[]>(() => {
    const saved = localStorage.getItem('pathfinder_saved_places');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const recent = localStorage.getItem('pathfinder_recent_searches');
    return recent ? JSON.parse(recent) : [];
  });
  
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('pathfinder_theme');
    return (savedTheme as Theme) || 'light';
  });
  
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [directionsMode, setDirectionsMode] = useState<TravelMode>('driving');
  const [mapLayer, setMapLayer] = useState<MapLayer>('standard');
  const [fromLocation, setFromLocation] = useState<string>('My Location');
  const [toLocation, setToLocation] = useState<string>('');
  const [directionsRoute, setDirectionsRoute] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('pathfinder_saved_places', JSON.stringify(savedPlaces));
  }, [savedPlaces]);

  useEffect(() => {
    localStorage.setItem('pathfinder_recent_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem('pathfinder_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleSavedPlace = (place: Place) => {
    setSavedPlaces(prev => {
      const isSaved = prev.some(p => p.id === place.id);
      if (isSaved) {
        return prev.filter(p => p.id !== place.id);
      } else {
        return [...prev, place];
      }
    });
  };

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 10);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{
      currentView, setCurrentView,
      mapCenter, setMapCenter,
      mapZoom, setMapZoom,
      searchQuery, setSearchQuery,
      searchResults, setSearchResults,
      selectedPlace, setSelectedPlace,
      savedPlaces, toggleSavedPlace,
      recentSearches, addRecentSearch, clearRecentSearches,
      theme, toggleTheme,
      userLocation, setUserLocation,
      directionsMode, setDirectionsMode,
      mapLayer, setMapLayer,
      fromLocation, setFromLocation,
      toLocation, setToLocation,
      directionsRoute, setDirectionsRoute,
      isSidebarOpen, setIsSidebarOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
