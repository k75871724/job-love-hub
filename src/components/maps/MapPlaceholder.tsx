import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGeolocation, NearbyUser } from '@/hooks/useGeolocation';
import { LocationMarker } from './LocationMarker';
import { GeolocationStatus } from './GeolocationStatus';

interface MapPlaceholderProps {
  nearbyUsers?: NearbyUser[];
  showUserPosition?: boolean;
  onMarkerClick?: (user: NearbyUser) => void;
  className?: string;
}

export const MapPlaceholder = ({
  nearbyUsers = [],
  showUserPosition = true,
  onMarkerClick,
  className,
}: MapPlaceholderProps) => {
  const { position, error, loading, startTracking } = useGeolocation();
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);

  useEffect(() => {
    if (showUserPosition) {
      startTracking();
    }
  }, [showUserPosition, startTracking]);

  // Calculate marker positions relative to center
  const getMarkerPosition = (user: NearbyUser, index: number) => {
    if (!position) return { x: '50%', y: '50%' };
    
    // Simple positioning based on distance and angle
    const angle = (index * 360) / Math.max(nearbyUsers.length, 1);
    const maxRadius = 40; // Max % from center
    const radiusPercent = Math.min((user.distance_km / 10) * maxRadius, maxRadius);
    
    const x = 50 + radiusPercent * Math.cos((angle * Math.PI) / 180);
    const y = 50 + radiusPercent * Math.sin((angle * Math.PI) / 180);
    
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      {/* Map Background (Placeholder) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
        {/* Grid pattern to simulate map */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Decorative circles to simulate map features */}
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-blue-200/30 dark:bg-blue-800/20"
          style={{ top: '20%', left: '10%' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-green-200/30 dark:bg-green-800/20"
          style={{ bottom: '30%', right: '15%' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Status Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <GeolocationStatus
          isActive={!!position && !error}
          accuracy={position?.accuracy}
          lastUpdate={position ? new Date(position.timestamp) : undefined}
          error={error}
        />
      </div>

      {/* User Position Marker (Center) */}
      {position && showUserPosition && (
        <motion.div
          className="absolute z-20"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <LocationMarker type="user" label="Vous" isActive={true} />
        </motion.div>
      )}

      {/* Nearby User Markers */}
      {nearbyUsers.map((user, index) => {
        const pos = getMarkerPosition(user, index);
        const userType = user.user_type as 'freelance' | 'provider' | 'delivery';
        
        return (
          <motion.div
            key={user.id}
            className="absolute z-10"
            style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
          >
            <LocationMarker
              type={userType}
              label={`${user.distance_km.toFixed(1)} km`}
              isActive={true}
              onClick={() => onMarkerClick?.(user)}
            />
          </motion.div>
        );
      })}

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-30">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Localisation en cours...</p>
          </div>
        </div>
      )}

      {/* Mapbox Token Input (for future implementation) */}
      {showTokenInput && (
        <motion.div
          className="absolute bottom-4 left-4 right-4 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4">
            <p className="text-sm mb-2">Entrez votre token Mapbox pour activer la carte interactive:</p>
            <div className="flex gap-2">
              <Input
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="pk.xxxxxxx..."
                className="flex-1"
              />
              <Button onClick={() => setShowTokenInput(false)}>
                Appliquer
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Bottom Info */}
      <div className="absolute bottom-4 right-4 z-10">
        <Button
          variant="secondary"
          size="sm"
          className="gap-2"
          onClick={() => setShowTokenInput(!showTokenInput)}
        >
          <MapPin className="w-4 h-4" />
          Configurer la carte
        </Button>
      </div>

      {/* Min Height */}
      <div className="min-h-[400px]" />
    </Card>
  );
};
