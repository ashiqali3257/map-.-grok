import React, { useState } from 'react';
import { Search, Navigation, MapPin, Star, Clock, Phone, Globe, Share2, Bookmark, BookmarkCheck, ArrowLeft, Car, Footprints, Bike, Map as MapIcon, Info, Mail, Trash2 } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { getNearbyPlaces } from '../lib/mockData';

export default function SidePanel() {
  const { 
    currentView, setCurrentView,
    searchQuery, setSearchQuery,
    searchResults, setSearchResults,
    selectedPlace, setSelectedPlace,
    savedPlaces, toggleSavedPlace,
    recentSearches, addRecentSearch, clearRecentSearches,
    directionsMode, setDirectionsMode,
    fromLocation, setFromLocation,
    toLocation, setToLocation,
    setDirectionsRoute,
    mapCenter
  } = useAppContext();

  // Handle panel rendering based on currentView
  
  if (currentView === 'home' || currentView === 'contact' || currentView === 'about') {
    return (
      <div className="bg-white dark:bg-slate-900 shadow-xl border-r border-gray-200 dark:border-slate-800 h-full overflow-y-auto w-full md:w-[400px] flex flex-col pointer-events-auto transition-transform duration-300 transform translate-x-0">
        
        {currentView === 'home' && (
          <div className="p-6 flex flex-col h-full">
            <div className="mb-8 mt-4 text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapIcon size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">PathFinder</h1>
              <p className="text-gray-600 dark:text-gray-400">Find Your Way. Explore Anywhere.</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <button onClick={() => setCurrentView('directions')} className="w-full flex items-center p-4 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-100 dark:border-slate-700 shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg mr-4 text-blue-600 dark:text-blue-400"><Navigation size={24} /></div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">Get Directions</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Plan your route</div>
                </div>
              </button>
              
              <button onClick={() => setCurrentView('nearby')} className="w-full flex items-center p-4 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-100 dark:border-slate-700 shadow-sm">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg mr-4 text-green-600 dark:text-green-400"><MapPin size={24} /></div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">Explore Nearby</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Restaurants, hotels, gas...</div>
                </div>
              </button>
              
              <button onClick={() => setCurrentView('saved')} className="w-full flex items-center p-4 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-100 dark:border-slate-700 shadow-sm">
                <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-lg mr-4 text-yellow-600 dark:text-yellow-400"><Bookmark size={24} /></div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">Saved Places</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Your favorite locations</div>
                </div>
              </button>
            </div>
            
            {recentSearches.length > 0 && (
              <div className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Recent Searches</h3>
                  <button onClick={clearRecentSearches} className="text-sm text-red-500 hover:text-red-600 font-medium">Clear</button>
                </div>
                <div className="space-y-2">
                  {recentSearches.slice(0, 3).map((query, i) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        setSearchQuery(query);
                        setSearchResults(getNearbyPlaces(mapCenter[0], mapCenter[1]).filter(p => p.category.toLowerCase().includes(query.toLowerCase()) || p.name.toLowerCase().includes(query.toLowerCase())));
                        setCurrentView('search');
                      }}
                      className="w-full text-left flex items-center px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg text-gray-700 dark:text-gray-300"
                    >
                      <Clock size={16} className="mr-3 text-gray-400" />
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {currentView === 'about' && (
          <div className="p-6">
            <button onClick={() => setCurrentView('home')} className="mb-6 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <ArrowLeft size={20} className="mr-2" /> Back
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About PathFinder</h2>
            <div className="prose dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                PathFinder is a modern navigation and location discovery platform designed to help users search places, explore nearby destinations, and plan routes.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                This application features interactive mapping, real-time geolocation, responsive UI components, and mock directions functionality to demonstrate a polished user experience.
              </p>
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Note</h3>
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  PathFinder is an independent project and is not affiliated with Google or Google Maps. It uses Leaflet and OpenStreetMap for map rendering.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'contact' && (
          <div className="p-6">
            <button onClick={() => setCurrentView('home')} className="mb-6 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <ArrowLeft size={20} className="mr-2" /> Back
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert("Your message has been submitted successfully.");
              setCurrentView('home');
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input required type="text" className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input required type="email" className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input required type="text" className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea required rows={4} className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          </div>
        )}

      </div>
    );
  }

  // Common wrapper for other views
  return (
    <div className="bg-white dark:bg-slate-900 shadow-xl border-r border-gray-200 dark:border-slate-800 h-full overflow-y-auto w-full md:w-[400px] flex flex-col pointer-events-auto">
      
      {currentView === 'search' && (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
            <button onClick={() => setCurrentView('home')} className="p-2 mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <div className="font-semibold text-lg text-gray-900 dark:text-white truncate">Results for "{searchQuery}"</div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {searchResults.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p>No results found.</p>
                <p className="text-sm mt-2">Try searching for a different location or category.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {searchResults.map((place) => (
                  <div 
                    key={place.id}
                    onClick={() => {
                      setSelectedPlace(place);
                      setCurrentView('place_details');
                    }}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-gray-100 dark:hover:border-slate-700 flex items-start gap-4"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400 shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{place.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[240px]">{place.address}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs">
                        {place.rating && <span className="flex items-center text-yellow-600 dark:text-yellow-500 font-medium"><Star size={12} className="fill-current mr-1" /> {place.rating}</span>}
                        <span className="text-gray-500 dark:text-gray-500">{place.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {currentView === 'nearby' && (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
            <button onClick={() => setCurrentView('home')} className="p-2 mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <div className="font-semibold text-lg text-gray-900 dark:text-white">Explore Nearby</div>
          </div>
          
          <div className="p-4 grid grid-cols-2 gap-3">
            {[
              { id: 'restaurants', label: 'Restaurants', icon: '🍴', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
              { id: 'hotels', label: 'Hotels', icon: '🏨', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
              { id: 'gas', label: 'Gas Stations', icon: '⛽', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
              { id: 'hospitals', label: 'Hospitals', icon: '🏥', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
              { id: 'shopping', label: 'Shopping', icon: '🛒', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
              { id: 'cafes', label: 'Cafes', icon: '☕', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
              { id: 'attractions', label: 'Attractions', icon: '🏞️', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' },
              { id: 'parking', label: 'Parking', icon: '🅿️', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' },
            ].map((cat) => (
              <button 
                key={cat.id}
                onClick={() => {
                  setSearchQuery(cat.label);
                  setSearchResults(getNearbyPlaces(mapCenter[0], mapCenter[1], cat.label));
                  setCurrentView('search');
                }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-100 dark:border-slate-700"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${cat.color}`}>
                  {cat.icon}
                </div>
                <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentView === 'place_details' && selectedPlace && (
        <div className="flex flex-col h-full relative">
          <div className="h-48 bg-gray-200 dark:bg-slate-800 relative shrink-0">
            {/* Mock image banner */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img 
              src={`https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80`} 
              alt={selectedPlace.name}
              className="w-full h-full object-cover"
            />
            <button 
              onClick={() => setCurrentView('search')} 
              className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white z-20 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <h2 className="text-2xl font-bold text-white mb-1">{selectedPlace.name}</h2>
              <p className="text-white/90 text-sm">{selectedPlace.category}</p>
            </div>
          </div>
          
          <div className="p-5 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100 dark:border-slate-800">
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg text-gray-900 dark:text-white">{selectedPlace.rating || '4.5'}</span>
                <div className="flex text-yellow-400">
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current opacity-50" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">(128)</span>
              </div>
              <div className="text-sm font-medium text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
                {selectedPlace.openingHours || 'Open now'}
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <button 
                onClick={() => {
                  setToLocation(selectedPlace.name);
                  setCurrentView('directions');
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg flex items-center justify-center font-medium transition-colors"
              >
                <Navigation size={18} className="mr-2" /> Directions
              </button>
              <button 
                onClick={() => toggleSavedPlace(selectedPlace)}
                className="p-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors border border-gray-200 dark:border-slate-700"
                title="Save Place"
              >
                {savedPlaces.some(p => p.id === selectedPlace.id) ? (
                  <BookmarkCheck size={20} className="text-blue-600 dark:text-blue-400" />
                ) : (
                  <Bookmark size={20} />
                )}
              </button>
              <button 
                className="p-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors border border-gray-200 dark:border-slate-700"
                title="Share"
              >
                <Share2 size={20} />
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-gray-400 dark:text-gray-500 shrink-0 mt-0.5" />
                <span>{selectedPlace.address}</span>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={20} className="text-gray-400 dark:text-gray-500 shrink-0 mt-0.5" />
                <span>{selectedPlace.openingHours || 'Monday - Sunday: 9:00 AM - 10:00 PM'}</span>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-gray-400 dark:text-gray-500 shrink-0 mt-0.5" />
                <span>{selectedPlace.phone || '(555) 123-4567'}</span>
              </div>
              <div className="flex items-start gap-4">
                <Globe size={20} className="text-gray-400 dark:text-gray-500 shrink-0 mt-0.5" />
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">{selectedPlace.website || 'website.com'}</a>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {currentView === 'saved' && (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
            <button onClick={() => setCurrentView('home')} className="p-2 mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <div className="font-semibold text-lg text-gray-900 dark:text-white">Saved Places</div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {savedPlaces.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
                <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                  <Bookmark size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No saved places yet</h3>
                <p className="text-sm">Save your favorite places to quickly find them later.</p>
                <button 
                  onClick={() => setCurrentView('search')}
                  className="mt-6 px-6 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  Find places
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {savedPlaces.map((place) => (
                  <div 
                    key={place.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors border border-transparent hover:border-gray-100 dark:hover:border-slate-700 flex items-start justify-between group"
                  >
                    <div 
                      className="flex gap-4 cursor-pointer flex-1"
                      onClick={() => {
                        setSelectedPlace(place);
                        setCurrentView('place_details');
                      }}
                    >
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400 shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{place.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px]">{place.address}</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSavedPlace(place);
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {currentView === 'directions' && (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-slate-900">
          <div className="bg-white dark:bg-slate-800 p-4 shadow-sm z-10">
            <div className="flex items-center mb-4">
              <button onClick={() => setCurrentView('home')} className="p-2 mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
                <ArrowLeft size={20} />
              </button>
              <div className="font-semibold text-lg text-gray-900 dark:text-white">Route Planner</div>
            </div>
            
            <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-lg mb-4">
              <button 
                onClick={() => setDirectionsMode('driving')}
                className={`flex-1 py-1.5 flex justify-center items-center rounded-md text-sm font-medium transition-colors ${directionsMode === 'driving' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-slate-600/50'}`}
              >
                <Car size={18} className="mr-2" /> Driving
              </button>
              <button 
                onClick={() => setDirectionsMode('walking')}
                className={`flex-1 py-1.5 flex justify-center items-center rounded-md text-sm font-medium transition-colors ${directionsMode === 'walking' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-slate-600/50'}`}
              >
                <Footprints size={18} className="mr-2" /> Walking
              </button>
              <button 
                onClick={() => setDirectionsMode('cycling')}
                className={`flex-1 py-1.5 flex justify-center items-center rounded-md text-sm font-medium transition-colors ${directionsMode === 'cycling' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-slate-600/50'}`}
              >
                <Bike size={18} className="mr-2" /> Cycling
              </button>
            </div>

            <div className="relative pl-8 space-y-3">
              {/* Vertical line connector */}
              <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gray-300 dark:bg-slate-600 border-l border-dotted border-gray-400 dark:border-gray-500"></div>
              
              <div className="relative">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-blue-600 bg-white dark:bg-slate-800 z-10"></div>
                <input 
                  type="text" 
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  placeholder="Choose starting point..."
                  className="w-full bg-gray-100 dark:bg-slate-700 border-transparent rounded-lg px-4 py-2 focus:bg-white dark:focus:bg-slate-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white"
                />
              </div>
              <div className="relative">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-500 border-2 border-white dark:border-slate-800 z-10"></div>
                <input 
                  type="text" 
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  placeholder="Choose destination..."
                  className="w-full bg-gray-100 dark:bg-slate-700 border-transparent rounded-lg px-4 py-2 focus:bg-white dark:focus:bg-slate-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white"
                />
              </div>
              
              <button 
                onClick={() => {
                  const temp = fromLocation;
                  setFromLocation(toLocation);
                  setToLocation(temp);
                }}
                className="absolute -left-10 top-1/2 -translate-y-1/2 p-1 bg-white dark:bg-slate-700 rounded-full shadow-sm text-gray-500 hover:text-blue-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 z-20"
                title="Swap locations"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>
              </button>
            </div>

            <button 
              onClick={() => {
                if(fromLocation && toLocation) {
                  // Mock route generation
                  const lat = mapCenter[0];
                  const lng = mapCenter[1];
                  setDirectionsRoute({
                    path: [
                      [lat, lng],
                      [lat + 0.01, lng + 0.01],
                      [lat + 0.015, lng + 0.03],
                      [lat + 0.02, lng + 0.035]
                    ],
                    distance: '3.2 mi',
                    duration: '14 min',
                    steps: [
                      `Head north from ${fromLocation}`,
                      'Turn right onto Main Street',
                      'Continue straight for 2 miles',
                      'Take the exit toward Highway',
                      `Arrive at ${toLocation}`
                    ]
                  });
                }
              }}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors shadow-md"
            >
              Get Directions
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {directionsRoute ? (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-4">
                <div className="flex items-baseline gap-2 mb-4">
                  <h3 className="text-2xl font-bold text-green-600 dark:text-green-500">{directionsRoute.duration}</h3>
                  <span className="text-gray-500 dark:text-gray-400 font-medium">({directionsRoute.distance})</span>
                </div>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                  {directionsRoute.steps.map((step: string, i: number) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-slate-300 dark:bg-slate-600 dark:border-slate-800 text-slate-500 group-[.is-active]:bg-blue-600 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm text-sm text-gray-700 dark:text-gray-300">
                          {step}
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 pb-10">
                <Navigation size={48} className="mb-4 opacity-20" />
                <p>Enter a starting point and</p>
                <p>destination to see route.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
