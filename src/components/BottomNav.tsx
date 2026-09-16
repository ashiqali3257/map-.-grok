import React from 'react';
import { Home, Compass, Navigation, Bookmark, User } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function BottomNav() {
  const { currentView, setCurrentView } = useAppContext();

  return (
    <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 flex items-center justify-around pb-safe relative z-[500]">
      <button 
        onClick={() => setCurrentView('home')}
        className={`flex flex-col items-center p-3 w-16 transition-colors ${currentView === 'home' || currentView === 'search' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        <Home size={22} className="mb-1" />
        <span className="text-[10px] font-medium">Home</span>
      </button>
      
      <button 
        onClick={() => setCurrentView('nearby')}
        className={`flex flex-col items-center p-3 w-16 transition-colors ${currentView === 'nearby' || currentView === 'place_details' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        <Compass size={22} className="mb-1" />
        <span className="text-[10px] font-medium">Explore</span>
      </button>
      
      <button 
        onClick={() => setCurrentView('directions')}
        className={`flex flex-col items-center p-3 w-16 transition-colors ${currentView === 'directions' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        <Navigation size={22} className="mb-1" />
        <span className="text-[10px] font-medium">Directions</span>
      </button>
      
      <button 
        onClick={() => setCurrentView('saved')}
        className={`flex flex-col items-center p-3 w-16 transition-colors ${currentView === 'saved' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        <Bookmark size={22} className="mb-1" />
        <span className="text-[10px] font-medium">Saved</span>
      </button>
      
      <button 
        onClick={() => setCurrentView('about')}
        className={`flex flex-col items-center p-3 w-16 transition-colors ${currentView === 'about' || currentView === 'contact' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        <User size={22} className="mb-1" />
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </div>
  );
}
