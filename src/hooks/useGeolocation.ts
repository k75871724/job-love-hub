import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy?: number;
  heading?: number;
  speed?: number;
  timestamp: number;
}

export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watchPosition?: boolean;
  updateInterval?: number;
}

export interface NearbyUser {
  id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  user_type: string;
  distance_km: number;
  last_updated: string;
}

export interface UseGeolocationReturn {
  position: GeolocationPosition | null;
  error: string | null;
  loading: boolean;
  nearbyUsers: NearbyUser[];
  startTracking: () => void;
  stopTracking: () => void;
  updatePosition: (userId: string, userType: string) => Promise<void>;
  findNearby: (radiusKm?: number, userTypeFilter?: string) => Promise<NearbyUser[]>;
  calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
}

const defaultOptions: GeolocationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
  watchPosition: true,
  updateInterval: 5000,
};

export const useGeolocation = (options: GeolocationOptions = {}): UseGeolocationReturn => {
  const mergedOptions = { ...defaultOptions, ...options };
  
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
  
  const watchIdRef = useRef<number | null>(null);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Haversine formula for distance calculation
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  // Success handler for geolocation
  const handleSuccess = useCallback((pos: GeolocationPositionType) => {
    const newPosition: GeolocationPosition = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
      heading: pos.coords.heading ?? undefined,
      speed: pos.coords.speed ?? undefined,
      timestamp: pos.timestamp,
    };
    setPosition(newPosition);
    setError(null);
    setLoading(false);
    console.log('Position updated:', newPosition);
  }, []);

  // Error handler for geolocation
  const handleError = useCallback((err: GeolocationPositionError) => {
    let errorMessage = 'Erreur de géolocalisation inconnue';
    switch (err.code) {
      case err.PERMISSION_DENIED:
        errorMessage = 'Permission de géolocalisation refusée. Veuillez autoriser l\'accès à votre position.';
        break;
      case err.POSITION_UNAVAILABLE:
        errorMessage = 'Position indisponible. Vérifiez que votre GPS est activé.';
        break;
      case err.TIMEOUT:
        errorMessage = 'Délai d\'attente dépassé pour obtenir la position.';
        break;
    }
    setError(errorMessage);
    setLoading(false);
    console.error('Geolocation error:', errorMessage);
  }, []);

  // Start tracking position
  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const geoOptions: PositionOptions = {
      enableHighAccuracy: mergedOptions.enableHighAccuracy,
      timeout: mergedOptions.timeout,
      maximumAge: mergedOptions.maximumAge,
    };

    if (mergedOptions.watchPosition) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        geoOptions
      );
    } else {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, geoOptions);
    }
  }, [mergedOptions, handleSuccess, handleError]);

  // Stop tracking position
  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
      updateIntervalRef.current = null;
    }
  }, []);

  // Update position in database
  const updatePosition = useCallback(async (userId: string, userType: string) => {
    if (!position) return;

    try {
      const { data: existing } = await supabase
        .from('user_positions')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('user_positions')
          .update({
            latitude: position.latitude,
            longitude: position.longitude,
            accuracy: position.accuracy,
            heading: position.heading,
            speed: position.speed,
            is_active: true,
          })
          .eq('user_id', userId);
      } else {
        await supabase
          .from('user_positions')
          .insert({
            user_id: userId,
            latitude: position.latitude,
            longitude: position.longitude,
            accuracy: position.accuracy,
            heading: position.heading,
            speed: position.speed,
            user_type: userType,
            is_active: true,
          });
      }
      console.log('Position saved to database');
    } catch (err) {
      console.error('Error updating position:', err);
    }
  }, [position]);

  // Find nearby users
  const findNearby = useCallback(async (radiusKm: number = 10, userTypeFilter?: string): Promise<NearbyUser[]> => {
    if (!position) return [];

    try {
      const { data, error: dbError } = await supabase.rpc('find_nearby_users', {
        user_lat: position.latitude,
        user_lon: position.longitude,
        radius_km: radiusKm,
        user_type_filter: userTypeFilter || null,
      });

      if (dbError) throw dbError;
      
      const users = (data || []) as NearbyUser[];
      setNearbyUsers(users);
      return users;
    } catch (err) {
      console.error('Error finding nearby users:', err);
      return [];
    }
  }, [position]);

  // Subscribe to realtime position updates
  useEffect(() => {
    if (!position) return;

    const channel = supabase
      .channel('nearby-positions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_positions',
        },
        (payload) => {
          console.log('Position update received:', payload);
          // Refresh nearby users when positions change
          findNearby();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [position, findNearby]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  return {
    position,
    error,
    loading,
    nearbyUsers,
    startTracking,
    stopTracking,
    updatePosition,
    findNearby,
    calculateDistance,
  };
};

// Type for native GeolocationPosition
type GeolocationPositionType = globalThis.GeolocationPosition;
