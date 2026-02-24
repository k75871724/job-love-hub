import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Navigation, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useGeolocation, NearbyUser } from '@/hooks/useGeolocation';

interface NearbyProvidersProps {
  userType?: 'freelance' | 'provider' | 'delivery';
  onSelectProvider?: (provider: NearbyUser) => void;
}

export const NearbyProviders = ({ userType, onSelectProvider }: NearbyProvidersProps) => {
  const { position, error, loading, nearbyUsers, startTracking, findNearby } = useGeolocation();
  const [radius, setRadius] = useState([10]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    startTracking();
  }, [startTracking]);

  useEffect(() => {
    if (position) {
      findNearby(radius[0], userType);
    }
  }, [position, radius, userType, findNearby]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await findNearby(radius[0], userType);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center gap-3">
          <motion.div
            className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <span className="text-muted-foreground">Localisation en cours...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-destructive" />
          </div>
          <p className="text-destructive">{error}</p>
          <Button onClick={startTracking} variant="outline">
            Réessayer
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Position Info */}
      {position && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Votre position</p>
                <p className="text-sm text-muted-foreground">
                  {position.latitude.toFixed(4)}, {position.longitude.toFixed(4)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                <RefreshCw className="w-4 h-4" />
              </motion.div>
            </Button>
          </div>
        </Card>
      )}

      {/* Radius Control */}
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Rayon de recherche</span>
            <span className="text-sm text-muted-foreground">{radius[0]} km</span>
          </div>
          <Slider
            value={radius}
            onValueChange={setRadius}
            min={1}
            max={50}
            step={1}
          />
        </div>
      </Card>

      {/* Nearby Users List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            Prestataires à proximité ({nearbyUsers.length})
          </h3>
        </div>

        {nearbyUsers.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">
              Aucun prestataire trouvé dans un rayon de {radius[0]} km
            </p>
          </Card>
        ) : (
          <div className="space-y-2">
            {nearbyUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onSelectProvider?.(user)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white font-bold">
                        {user.user_type.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{user.user_type}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{user.distance_km.toFixed(1)} km</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Actif</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
