import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';
import { Package, MapPin, Navigation, Phone, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DeliveryStatus } from '@/hooks/useDeliveryTracking';

interface DeliveryPosition {
  latitude: number;
  longitude: number;
  heading?: number;
}

interface MapboxDeliveryTrackerProps {
  deliveryId: string;
  driverPosition?: DeliveryPosition | null;
  pickupPosition: { latitude: number; longitude: number };
  destinationPosition: { latitude: number; longitude: number };
  status: DeliveryStatus;
  eta?: number;
  driverName?: string;
  driverPhone?: string;
  orderId?: string;
  onCall?: () => void;
  className?: string;
}

const statusConfig: Record<DeliveryStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'En attente de livreur', color: '#eab308', bgColor: 'bg-yellow-500' },
  accepted: { label: 'Livreur en route vers le point de collecte', color: '#3b82f6', bgColor: 'bg-blue-500' },
  picking_up: { label: 'Récupération de votre commande', color: '#8b5cf6', bgColor: 'bg-purple-500' },
  in_transit: { label: 'En route vers vous', color: '#f97316', bgColor: 'bg-orange-500' },
  delivered: { label: 'Livraison effectuée', color: '#22c55e', bgColor: 'bg-green-500' },
  cancelled: { label: 'Livraison annulée', color: '#ef4444', bgColor: 'bg-red-500' },
};

const statusSteps: DeliveryStatus[] = ['pending', 'accepted', 'picking_up', 'in_transit', 'delivered'];

export const MapboxDeliveryTracker = ({
  deliveryId,
  driverPosition,
  pickupPosition,
  destinationPosition,
  status,
  eta,
  driverName = 'Livreur',
  driverPhone,
  orderId,
  onCall,
  className,
}: MapboxDeliveryTrackerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const driverMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const pickupMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const destinationMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const routeLayerId = 'delivery-route';
  
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const currentStepIndex = statusSteps.indexOf(status);
  const statusInfo = statusConfig[status];

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const token = localStorage.getItem('mapbox_token') || 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNnJ4Z2VhcjBhMWoya3NjMHdxdnc2NnIifQ.demo-token';

    try {
      mapboxgl.accessToken = token;
      
      // Calculate center between pickup and destination
      const centerLng = (pickupPosition.longitude + destinationPosition.longitude) / 2;
      const centerLat = (pickupPosition.latitude + destinationPosition.latitude) / 2;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [centerLng, centerLat],
        zoom: 13,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        setIsMapReady(true);
        setMapError(null);
        
        // Fit bounds to show both pickup and destination
        const bounds = new mapboxgl.LngLatBounds()
          .extend([pickupPosition.longitude, pickupPosition.latitude])
          .extend([destinationPosition.longitude, destinationPosition.latitude]);
        
        if (driverPosition) {
          bounds.extend([driverPosition.longitude, driverPosition.latitude]);
        }
        
        map.current?.fitBounds(bounds, { padding: 60 });
      });

      map.current.on('error', () => {
        setMapError('Erreur de chargement de la carte');
      });
    } catch (error) {
      setMapError('Impossible d\'initialiser la carte');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add/update pickup marker
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.remove();
    }

    const el = document.createElement('div');
    el.innerHTML = `
      <div style="
        width: 40px;
        height: 40px;
        background: #8b5cf6;
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      </div>
    `;

    pickupMarkerRef.current = new mapboxgl.Marker(el)
      .setLngLat([pickupPosition.longitude, pickupPosition.latitude])
      .setPopup(new mapboxgl.Popup().setHTML('<strong>Point de collecte</strong>'))
      .addTo(map.current);
  }, [pickupPosition, isMapReady]);

  // Add/update destination marker
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.remove();
    }

    const el = document.createElement('div');
    el.innerHTML = `
      <div style="
        width: 40px;
        height: 40px;
        background: #22c55e;
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    `;

    destinationMarkerRef.current = new mapboxgl.Marker(el)
      .setLngLat([destinationPosition.longitude, destinationPosition.latitude])
      .setPopup(new mapboxgl.Popup().setHTML('<strong>Votre adresse</strong>'))
      .addTo(map.current);
  }, [destinationPosition, isMapReady]);

  // Add/update driver marker with real-time position
  useEffect(() => {
    if (!map.current || !isMapReady || !driverPosition) return;

    if (driverMarkerRef.current) {
      driverMarkerRef.current.setLngLat([driverPosition.longitude, driverPosition.latitude]);
    } else {
      const el = document.createElement('div');
      el.className = 'driver-marker';
      el.innerHTML = `
        <div style="
          position: relative;
          width: 48px;
          height: 48px;
        ">
          <div style="
            position: absolute;
            inset: 0;
            background: ${statusInfo.color}40;
            border-radius: 50%;
            animation: pulse 2s infinite;
          "></div>
          <div style="
            position: absolute;
            inset: 6px;
            background: ${statusInfo.color};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px ${statusInfo.color}60;
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <rect x="1" y="3" width="15" height="13"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
        </div>
      `;

      driverMarkerRef.current = new mapboxgl.Marker(el)
        .setLngLat([driverPosition.longitude, driverPosition.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${driverName}</strong><br/><span style="color:#666">${statusInfo.label}</span>`))
        .addTo(map.current);
    }

    // Center on driver if in transit
    if (status === 'in_transit' || status === 'picking_up') {
      map.current.flyTo({
        center: [driverPosition.longitude, driverPosition.latitude],
        zoom: 15,
        duration: 1000,
      });
    }
  }, [driverPosition, isMapReady, status, driverName]);

  // Draw route line
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    const coordinates: [number, number][] = [];
    
    if (status === 'accepted' || status === 'pending') {
      // Show route from driver to pickup
      if (driverPosition) {
        coordinates.push([driverPosition.longitude, driverPosition.latitude]);
      }
      coordinates.push([pickupPosition.longitude, pickupPosition.latitude]);
    } else if (status === 'picking_up' || status === 'in_transit') {
      // Show route from driver to destination
      if (driverPosition) {
        coordinates.push([driverPosition.longitude, driverPosition.latitude]);
      }
      coordinates.push([destinationPosition.longitude, destinationPosition.latitude]);
    }

    if (coordinates.length < 2) return;

    // Remove existing route
    if (map.current.getLayer(routeLayerId)) {
      map.current.removeLayer(routeLayerId);
    }
    if (map.current.getSource(routeLayerId)) {
      map.current.removeSource(routeLayerId);
    }

    // Add new route
    map.current.addSource(routeLayerId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates,
        },
      },
    });

    map.current.addLayer({
      id: routeLayerId,
      type: 'line',
      source: routeLayerId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': statusInfo.color,
        'line-width': 4,
        'line-dasharray': [2, 2],
      },
    });
  }, [driverPosition, pickupPosition, destinationPosition, status, isMapReady]);

  return (
    <div className={`flex flex-col lg:flex-row gap-6 ${className}`}>
      {/* Map Section */}
      <Card className="flex-1 relative overflow-hidden min-h-[400px] lg:min-h-[500px]">
        <div ref={mapContainer} className="absolute inset-0" />
        
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="text-center p-6">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
              <p className="text-sm text-destructive">{mapError}</p>
            </div>
          </div>
        )}

        {/* Driver Info Overlay */}
        {driverPosition && status !== 'pending' && status !== 'delivered' && status !== 'cancelled' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 right-4 z-10"
          >
            <Card className="p-3 bg-background/95 backdrop-blur-sm shadow-lg">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${statusInfo.bgColor} flex items-center justify-center`}>
                  <Navigation className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{driverName}</p>
                  <p className="text-sm text-muted-foreground">{statusInfo.label}</p>
                </div>
                {eta && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{eta}</p>
                    <p className="text-xs text-muted-foreground">min</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* CSS for animations */}
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.3); opacity: 0; }
          }
        `}</style>
      </Card>

      {/* Status Panel */}
      <Card className="lg:w-96 overflow-hidden">
        {/* Header */}
        <div className={`${statusInfo.bgColor} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Suivi de livraison</h3>
              {orderId && (
                <p className="text-sm opacity-90">Commande #{orderId.slice(0, 8)}</p>
              )}
            </div>
            {eta && status !== 'delivered' && status !== 'cancelled' && (
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xl font-bold">{eta} min</span>
                </div>
                <p className="text-xs opacity-90">Arrivée estimée</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="p-4 border-b">
          <div className="space-y-3">
            {statusSteps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const stepInfo = statusConfig[step];
              
              return (
                <motion.div
                  key={step}
                  className="flex items-center gap-3"
                  initial={false}
                  animate={{ opacity: index <= currentStepIndex ? 1 : 0.4 }}
                >
                  <div className="relative">
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        isCompleted
                          ? 'bg-primary border-primary text-primary-foreground'
                          : isCurrent
                          ? `border-current text-current`
                          : 'border-muted bg-muted text-muted-foreground'
                      }`}
                      style={isCurrent ? { borderColor: stepInfo.color, color: stepInfo.color } : {}}
                      animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </motion.div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`absolute left-1/2 top-8 w-0.5 h-6 -translate-x-1/2 ${
                          isCompleted ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className={`font-medium ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {stepInfo.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Locations */}
        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="font-medium">Point de collecte</p>
              <p className="text-sm text-muted-foreground">
                {pickupPosition.latitude.toFixed(4)}, {pickupPosition.longitude.toFixed(4)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="font-medium">Destination</p>
              <p className="text-sm text-muted-foreground">
                {destinationPosition.latitude.toFixed(4)}, {destinationPosition.longitude.toFixed(4)}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t">
          <Button 
            className="w-full gap-2" 
            variant="outline"
            onClick={onCall}
            disabled={status === 'pending' || status === 'delivered' || status === 'cancelled'}
          >
            <Phone className="w-4 h-4" />
            Appeler le livreur
          </Button>
        </div>
      </Card>
    </div>
  );
};
