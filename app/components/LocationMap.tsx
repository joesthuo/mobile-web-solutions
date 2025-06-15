'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiZoomIn, FiZoomOut, FiCompass, FiMapPin } from 'react-icons/fi';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import Zoom from 'ol/control/Zoom';
import ScaleLine from 'ol/control/ScaleLine';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import 'ol/ol.css';

interface LocationMapProps {
  initialLocation?: {
    lng: number;
    lat: number;
    zoom?: number;
  };
  markerColor?: string;
  className?: string;
}

const DEFAULT_LOCATION = {
  lng: -122.3321,
  lat: 47.6062,
  zoom: 12
};

export default function LocationMap({
  initialLocation = DEFAULT_LOCATION,
  markerColor = '#FF3E4D',
  className = ''
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const [zoom, setZoom] = useState(initialLocation.zoom || DEFAULT_LOCATION.zoom);
  const [isLoading, setIsLoading] = useState(true);
  const [bearing, setBearing] = useState(0);
  const [center, setCenter] = useState({
    lng: initialLocation.lng,
    lat: initialLocation.lat
  });

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    setIsLoading(true);

    // Create marker feature
    const marker = new Feature({
      geometry: new Point(fromLonLat([initialLocation.lng, initialLocation.lat]))
    });

    // Custom marker style
    marker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${encodeURIComponent(markerColor)}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
          scale: 0.75
        })
      })
    );

    // Vector layer for marker
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker]
      })
    });

    // Create map instance with OSM tiles
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([initialLocation.lng, initialLocation.lat]),
        zoom: initialLocation.zoom || DEFAULT_LOCATION.zoom,
        rotation: 0
      }),
      controls: defaultControls().extend([
        new Zoom(),
        new ScaleLine()
      ])
    });

    // Event listeners
    map.on('movestart', () => setIsLoading(true));
    
    map.on('moveend', () => {
      setIsLoading(false);
      const view = map.getView();
      const currentZoom = view.getZoom();
      if (currentZoom) setZoom(Math.floor(currentZoom));
      
      setBearing(view.getRotation() * (180 / Math.PI));
      
      const centerCoords = view.getCenter();
      if (centerCoords) {
        const [lng, lat] = fromLonLat(centerCoords);
        setCenter({ lng, lat });
      }
    });

    // Initial load complete
    setTimeout(() => setIsLoading(false), 500);

    mapInstance.current = map;

    return () => {
      mapInstance.current?.setTarget(undefined);
      mapInstance.current = null;
    };
  }, [initialLocation, markerColor]);

  const handleZoomIn = () => {
    const view = mapInstance.current?.getView();
    if (view) {
      const currentZoom = view.getZoom() || 0;
      view.animate({
        zoom: currentZoom + 1,
        duration: 200
      });
    }
  };

  const handleZoomOut = () => {
    const view = mapInstance.current?.getView();
    if (view) {
      const currentZoom = view.getZoom() || 0;
      view.animate({
        zoom: currentZoom - 1,
        duration: 200
      });
    }
  };

  const resetBearing = () => {
    mapInstance.current?.getView().animate({
      rotation: 0,
      duration: 500
    });
  };

  const flyToInitialLocation = () => {
    const view = mapInstance.current?.getView();
    if (view) {
      view.animate({
        center: fromLonLat([initialLocation.lng, initialLocation.lat]),
        zoom: initialLocation.zoom || DEFAULT_LOCATION.zoom,
        rotation: 0,
        duration: 1500
      });
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-gray-100 ${className}`}>
      {/* Map container */}
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[400px]"
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-4 rounded-lg bg-white/90"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2 mx-auto"></div>
            <p className="text-sm text-gray-700">Loading map...</p>
          </motion.div>
        </div>
      )}

      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-[5]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleZoomIn}
          className="p-2 rounded-lg shadow-md bg-white text-gray-700"
          aria-label="Zoom in"
        >
          <FiZoomIn className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleZoomOut}
          className="p-2 rounded-lg shadow-md bg-white text-gray-700"
          aria-label="Zoom out"
        >
          <FiZoomOut className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetBearing}
          className="p-2 rounded-lg shadow-md bg-white text-gray-700"
          aria-label="Reset bearing"
        >
          <FiCompass className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Location info */}
      <div className="absolute top-4 left-4 p-3 rounded-lg shadow-md z-[5] bg-white/90 text-gray-800">
        <div className="flex items-center space-x-2">
          <FiMapPin className="text-red-500" />
          <div>
            <h3 className="font-semibold text-sm">Current Location</h3>
            <p className="text-xs">
              {center.lat.toFixed(4)}, {center.lng.toFixed(4)} • Zoom: {zoom}
            </p>
          </div>
        </div>
      </div>

      {/* Home button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={flyToInitialLocation}
        className="absolute top-4 right-4 p-2 rounded-lg shadow-md z-[5] bg-white text-gray-700"
        aria-label="Reset to initial location"
      >
        <FiMapPin className="w-5 h-5" />
      </motion.button>
    </div>
  );
}