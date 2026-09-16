import React, { useState } from 'react';
import { Layers, Compass, Crosshair, Plus, Minus, Maximize } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function FloatingControls() {
  const { 
    mapZoom, setMapZoom, 
    mapLayer, setMapLayer,
    userLocation, setUserLocation,
    setMapCenter
  } = useAppContext();

  const [isLayersOpen, setIsLayersOpen] = useState(false);

  const handleZoomIn = () => setMapZoom(Math.min(mapZoom + 1, 18));
  const handleZoomOut = () => setMapZoom(Math.max(mapZoom - 1, 3));

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation([lat, lng]);
          setMapCenter([lat, lng]);
          setMapZoom(15);
        },
        (error) => {
          alert('Unable to retrieve your location. Please check your browser permissions.');
          console.error(error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="absolute right-4 bottom-20 md:bottom-8 flex flex-col gap-3 z-[400]">
      
      {/* Layers Control */}
      <div className="relative">
        {isLayersOpen && (
          <div className="absolute right-full mr-3 bottom-0 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-3 w-48 flex flex-col gap-2 border border-gray-100 dark:border-slate-700">
            <div className="font-semibold text-gray-800 dark:text-gray-200 mb-1 text-sm">Map Type</div>
            <button 
              onClick={() => { setMapLayer('standard'); setIsLayersOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${mapLayer === 'standard' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
            >
              Standard
            </button>
            <button 
              onClick={() => { setMapLayer('satellite'); setIsLayersOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${mapLayer === 'satellite' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
            >
              Satellite
            </button>
            <button 
              onClick={() => { setMapLayer('terrain'); setIsLayersOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${mapLayer === 'terrain' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
            >
              Terrain
            </button>
          </div>
        )}
        <button 
          onClick={() => setIsLayersOpen(!isLayersOpen)}
          className="bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors border border-gray-100 dark:border-slate-700"
          title="Map Layers"
        >
          <Layers size={20} />
        </button>
      </div>

      <button 
        onClick={handleMyLocation}
        className="bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 transition-colors border border-gray-100 dark:border-slate-700"
        title="My Location"
      >
        <Crosshair size={20} />
      </button>
      
      <button 
        className="bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors border border-gray-100 dark:border-slate-700 md:hidden"
        title="Compass"
      >
        <Compass size={20} />
      </button>

      {/* Zoom Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md flex flex-col overflow-hidden border border-gray-100 dark:border-slate-700">
        <button 
          onClick={handleZoomIn}
          className="p-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors border-b border-gray-100 dark:border-slate-700"
          title="Zoom In"
        >
          <Plus size={20} />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors"
          title="Zoom Out"
        >
          <Minus size={20} />
        </button>
      </div>

      <button 
        onClick={handleFullScreen}
        className="hidden md:block bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors border border-gray-100 dark:border-slate-700 mt-2"
        title="Full Screen"
      >
        <Maximize size={20} />
      </button>

    </div>
  );
}
