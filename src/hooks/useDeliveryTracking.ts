import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type DeliveryStatus = 'pending' | 'accepted' | 'picking_up' | 'in_transit' | 'delivered' | 'cancelled';

export interface DeliveryTracking {
  id: string;
  order_id: string;
  driver_id: string;
  customer_id: string;
  pickup_latitude: number;
  pickup_longitude: number;
  delivery_latitude: number;
  delivery_longitude: number;
  current_latitude: number | null;
  current_longitude: number | null;
  status: DeliveryStatus;
  estimated_arrival: string | null;
  actual_arrival: string | null;
  created_at: string;
  updated_at: string;
}

export interface UseDeliveryTrackingReturn {
  delivery: DeliveryTracking | null;
  loading: boolean;
  error: string | null;
  updateDriverPosition: (latitude: number, longitude: number) => Promise<void>;
  updateStatus: (status: DeliveryStatus) => Promise<void>;
  estimateArrival: () => number | null; // Returns minutes
}

export const useDeliveryTracking = (deliveryId: string): UseDeliveryTrackingReturn => {
  const [delivery, setDelivery] = useState<DeliveryTracking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch delivery data
  const fetchDelivery = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: dbError } = await supabase
        .from('delivery_tracking')
        .select('*')
        .eq('id', deliveryId)
        .maybeSingle();

      if (dbError) throw dbError;
      setDelivery(data as DeliveryTracking | null);
      setError(null);
    } catch (err) {
      console.error('Error fetching delivery:', err);
      setError('Erreur lors du chargement de la livraison');
    } finally {
      setLoading(false);
    }
  }, [deliveryId]);

  // Update driver position
  const updateDriverPosition = useCallback(async (latitude: number, longitude: number) => {
    if (!delivery) return;

    try {
      const { error: dbError } = await supabase
        .from('delivery_tracking')
        .update({
          current_latitude: latitude,
          current_longitude: longitude,
        })
        .eq('id', deliveryId);

      if (dbError) throw dbError;
    } catch (err) {
      console.error('Error updating driver position:', err);
      throw err;
    }
  }, [delivery, deliveryId]);

  // Update delivery status
  const updateStatus = useCallback(async (status: DeliveryStatus) => {
    try {
      const updateData: Record<string, unknown> = { status };
      
      if (status === 'delivered') {
        updateData.actual_arrival = new Date().toISOString();
      }

      const { error: dbError } = await supabase
        .from('delivery_tracking')
        .update(updateData)
        .eq('id', deliveryId);

      if (dbError) throw dbError;
    } catch (err) {
      console.error('Error updating status:', err);
      throw err;
    }
  }, [deliveryId]);

  // Estimate arrival time in minutes
  const estimateArrival = useCallback((): number | null => {
    if (!delivery || !delivery.current_latitude || !delivery.current_longitude) {
      return null;
    }

    // Calculate distance to delivery point
    const R = 6371; // Earth's radius in km
    const lat1 = delivery.current_latitude * Math.PI / 180;
    const lat2 = delivery.delivery_latitude * Math.PI / 180;
    const dLat = (delivery.delivery_latitude - delivery.current_latitude) * Math.PI / 180;
    const dLon = (delivery.delivery_longitude - delivery.current_longitude) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // Assume average speed of 30 km/h in urban areas
    const avgSpeedKmh = 30;
    const timeHours = distance / avgSpeedKmh;
    const timeMinutes = Math.round(timeHours * 60);

    return Math.max(1, timeMinutes); // At least 1 minute
  }, [delivery]);

  // Subscribe to realtime updates
  useEffect(() => {
    fetchDelivery();

    const channel = supabase
      .channel(`delivery-${deliveryId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'delivery_tracking',
          filter: `id=eq.${deliveryId}`,
        },
        (payload) => {
          console.log('Delivery update received:', payload);
          setDelivery(payload.new as DeliveryTracking);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [deliveryId, fetchDelivery]);

  return {
    delivery,
    loading,
    error,
    updateDriverPosition,
    updateStatus,
    estimateArrival,
  };
};
