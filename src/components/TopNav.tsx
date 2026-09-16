import React, { useState } from 'react';
import { Menu, Search, Navigation, MapPin, User, Moon, Sun, X } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { getNearbyPlaces } from '../lib/mockData';

export default function TopNav() {
  const { 
    searchQuery, setSearchQuery, 
    setCurrentView, 
    theme, toggleTheme,
    mapCenter, setSearchResults,
    addRecentSearch,
    isSidebarOpen, setIsSidebarOpen
  } = useAppContext();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery);
      // Mock search results around center
      const results = getNearbyPlaces(mapCenter[0], mapCenter[1]).filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));
      // If none match, just generate some named like the query
      if (results.length === 0) {
        results.push({
          id: 'search_1',
          name: searchQuery,
          lat: mapCenter[0] + 0.01,
          lng: mapCenter[1] + 0.01,
          address: 'Matching Location',
          category: 'Search Result',
        });
      }
      setSearchResults(results);
      setCurrentView('search');
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm z-50 relative">
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <Navigation size={20} className="fill-current" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">PathFinder</span>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="w-full relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Google Maps or enter a location"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-800 border-transparent rounded-full focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all text-gray-900 dark:text-white"
            />
          </form>
        </div>

        {/* Right Actions - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          <button onClick={() => setCurrentView('directions')} className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors" title="Directions">
            <Navigation size={20} />
          </button>
          <button onClick={() => setCurrentView('nearby')} className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors" title="Explore Nearby">
            <MapPin size={20} />
          </button>
          <button onClick={toggleTheme} className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors" title="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors" title="Menu">
            <Menu size={20} />
          </button>
          <button className="ml-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors shadow-md">
            <User size={18} />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600 dark:text-gray-300">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Search - Visible only on small screens */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search locations..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-800 border-transparent rounded-full focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900 dark:text-white"
          />
        </form>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-lg py-2 flex flex-col z-50">
          <button onClick={() => { setCurrentView('directions'); setIsMobileMenuOpen(false); }} className="px-4 py-3 text-left flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">
            <Navigation size={18} /> Directions
          </button>
          <button onClick={() => { setCurrentView('nearby'); setIsMobileMenuOpen(false); }} className="px-4 py-3 text-left flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">
            <MapPin size={18} /> Explore Nearby
          </button>
          <button onClick={() => { setCurrentView('saved'); setIsMobileMenuOpen(false); }} className="px-4 py-3 text-left flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">
            <User size={18} /> Saved Places
          </button>
          <button onClick={() => { setIsSidebarOpen(true); setIsMobileMenuOpen(false); }} className="px-4 py-3 text-left flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">
            <Menu size={18} /> More Menu
          </button>
        </div>
      )}
    </header>
  );
}
