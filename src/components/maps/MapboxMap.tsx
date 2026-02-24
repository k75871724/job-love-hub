import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NearbyUser } from '@/hooks/useGeolocation';
import { MapPin, Settings } from 'lucide-react';

// Default Mapbox token - users can provide their own
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNnJ4Z2VhcjBhMWoya3NjMHdxdnc2NnIifQ.demo-token';

interface MapboxMapProps {
  nearbyUsers?: NearbyUser[];
  userPosition?: { latitude: number; longitude: number } | null;
  showUserPosition?: boolean;
  onMarkerClick?: (user: NearbyUser) => void;
  className?: string;
  mapboxToken?: string;
}

const markerColors: Record<string, string> = {
  user: '#6366f1', // primary
  freelance: '#3b82f6', // blue
  provider: '#22c55e', // green
  delivery: '#f97316', // orange
  destination: '#ef4444', // red
};

export const MapboxMap = ({
  nearbyUsers = [],
  userPosition,
  showUserPosition = true,
  onMarkerClick,
  className,
  mapboxToken,
}: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  
  const [token, setToken] = useState(mapboxToken || localStorage.getItem('mapbox_token') || '');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Default center (Abidjan, Côte d'Ivoire)
  const defaultCenter: [number, number] = [-4.0083, 5.3600];

  const initializeMap = (accessToken: string) => {
    if (!mapContainer.current || map.current) return;

    try {
      mapboxgl.accessToken = accessToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userPosition 
          ? [userPosition.longitude, userPosition.latitude] 
          : defaultCenter,
        zoom: 13,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        setIsMapReady(true);
        setMapError(null);
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError('Erreur de chargement de la carte. Vérifiez votre token Mapbox.');
      });
    } catch (error) {
      console.error('Failed to initialize map:', error);
      setMapError('Impossible d\'initialiser la carte. Token invalide?');
    }
  };

  // Initialize map when token is available
  useEffect(() => {
    const accessToken = token || DEFAULT_MAPBOX_TOKEN;
    
    if (accessToken && !map.current) {
      initializeMap(accessToken);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [token]);

  // Update user position marker
  useEffect(() => {
    if (!map.current || !isMapReady || !userPosition || !showUserPosition) return;

    // Remove existing user marker
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    // Create user marker element
    const el = document.createElement('div');
    el.className = 'user-marker';
    el.innerHTML = `
      <div style="
        width: 20px;
        height: 20px;
        background: ${markerColors.user};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        position: relative;
      ">
        <div style="
          position: absolute;
          inset: -8px;
          border: 2px solid ${markerColors.user};
          border-radius: 50%;
          opacity: 0.3;
          animation: pulse 2s infinite;
        "></div>
      </div>
    `;

    userMarkerRef.current = new mapboxgl.Marker(el)
      .setLngLat([userPosition.longitude, userPosition.latitude])
      .setPopup(new mapboxgl.Popup().setHTML('<strong>Votre position</strong>'))
      .addTo(map.current);

    // Center map on user
    map.current.flyTo({
      center: [userPosition.longitude, userPosition.latitude],
      zoom: 14,
      duration: 1000,
    });
  }, [userPosition, showUserPosition, isMapReady]);

  // Update nearby user markers
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers for nearby users
    nearbyUsers.forEach((user) => {
      const userType = user.user_type as keyof typeof markerColors;
      const color = markerColors[userType] || markerColors.provider;

      const el = document.createElement('div');
      el.className = 'nearby-marker';
      el.style.cssText = `
        width: 36px;
        height: 36px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        transition: transform 0.2s;
      `;
      el.innerHTML = getMarkerIcon(userType);
      
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.1)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });
      el.addEventListener('click', () => {
        onMarkerClick?.(user);
      });

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 8px;">
          <strong>${user.user_type}</strong><br/>
          <span style="color: #666;">Distance: ${user.distance_km.toFixed(1)} km</span>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([user.longitude, user.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [nearbyUsers, isMapReady, onMarkerClick]);

  const handleSaveToken = () => {
    if (token) {
      localStorage.setItem('mapbox_token', token);
      // Reinitialize map with new token
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      setIsMapReady(false);
      initializeMap(token);
    }
    setShowTokenInput(false);
  };

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Error State */}
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
          <div className="text-center p-6">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-destructive mb-4">{mapError}</p>
            <Button onClick={() => setShowTokenInput(true)} variant="outline">
              Configurer le token Mapbox
            </Button>
          </div>
        </div>
      )}

      {/* Token Configuration */}
      {showTokenInput && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm z-30">
          <Card className="p-6 max-w-md mx-4">
            <h3 className="font-semibold mb-2">Configuration Mapbox</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Entrez votre token Mapbox public pour activer la carte interactive.
              <a 
                href="https://account.mapbox.com/access-tokens/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary ml-1 hover:underline"
              >
                Obtenir un token
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="pk.eyJ1Ijoi..."
                className="flex-1"
              />
              <Button onClick={handleSaveToken}>Sauvegarder</Button>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 w-full"
              onClick={() => setShowTokenInput(false)}
            >
              Annuler
            </Button>
          </Card>
        </div>
      )}

      {/* Settings Button */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setShowTokenInput(true)}
          className="shadow-lg"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* CSS for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      {/* Min Height */}
      <div className="min-h-[400px]" />
    </Card>
  );
};

function getMarkerIcon(type: string): string {
  const icons: Record<string, string> = {
    freelance: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    provider: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    delivery: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    destination: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  };
  return icons[type] || icons.provider;
}
