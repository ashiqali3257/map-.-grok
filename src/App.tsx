import React, { useState, useEffect } from 'react';
import TopNav from './components/TopNav';
import MapComponent from './components/MapComponent';
import SidePanel from './components/Panels';
import FloatingControls from './components/FloatingControls';
import BottomNav from './components/BottomNav';
import { AppProvider, useAppContext } from './AppContext';
import { Map, Info, Mail, X } from 'lucide-react';

// ==========================================
// CONFIGURATION SECTION
// ==========================================
// To connect the real Google Maps API, provide your key here.
// When integrating, replace Leaflet with @react-google-maps/api
export const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY";
// ==========================================

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen, setCurrentView } = useAppContext();
  
  if (!isSidebarOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-[1000] md:hidden backdrop-blur-sm"
        onClick={() => setIsSidebarOpen(false)}
      />
      <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 shadow-2xl z-[1001] transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg">
            <Map size={24} /> PathFinder
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full">
            <X size={20} />
          </button>
        </div>
        <div className="py-2">
          <button 
            onClick={() => { setCurrentView('home'); setIsSidebarOpen(false); }}
            className="w-full text-left px-6 py-3 flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
          >
            <Map size={20} /> Home
          </button>
          <button 
            onClick={() => { setCurrentView('about'); setIsSidebarOpen(false); }}
            className="w-full text-left px-6 py-3 flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
          >
            <Info size={20} /> About PathFinder
          </button>
          <button 
            onClick={() => { setCurrentView('contact'); setIsSidebarOpen(false); }}
            className="w-full text-left px-6 py-3 flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
          >
            <Mail size={20} /> Contact Us
          </button>
        </div>
      </div>
    </>
  );
}

function MainLayout() {
  const { currentView } = useAppContext();
  
  // Determine if the side panel should be shown as a bottom sheet on mobile
  const showPanelOnMobile = currentView !== 'home';
  
  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 dark:bg-slate-950 overflow-hidden font-sans text-slate-900 dark:text-slate-100 transition-colors">
      <TopNav />
      <Sidebar />
      
      <div className="flex-1 flex relative overflow-hidden">
        
        {/* Desktop Side Panel */}
        <div className="hidden md:block h-full z-40 relative">
          <SidePanel />
        </div>
        
        {/* Mobile Bottom Sheet for Panels (except Home) */}
        <div className={`md:hidden absolute left-0 right-0 bottom-0 bg-white dark:bg-slate-900 rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40 transition-transform duration-300 ease-in-out flex flex-col ${showPanelOnMobile ? 'translate-y-0 h-[60%]' : 'translate-y-full h-0'}`}>
          {showPanelOnMobile && (
            <>
              <div className="w-full flex justify-center pt-3 pb-1 shrink-0 bg-white dark:bg-slate-900 rounded-t-2xl">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full"></div>
              </div>
              <div className="flex-1 overflow-hidden">
                <SidePanel />
              </div>
            </>
          )}
        </div>
        
        {/* Map Container */}
        <div className="flex-1 relative h-full bg-blue-50 dark:bg-slate-900">
          <MapComponent />
          <FloatingControls />
        </div>
        
      </div>
      
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
