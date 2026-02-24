import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapboxDeliveryTracker } from "@/components/maps/MapboxDeliveryTracker";
import { useDeliveryTracking, DeliveryStatus } from "@/hooks/useDeliveryTracking";

// Demo data for testing without real delivery
const demoDelivery = {
  id: 'demo-delivery-001',
  orderId: 'CMD-2024-001234',
  status: 'in_transit' as DeliveryStatus,
  driverName: 'Konan Jean-Baptiste',
  driverPhone: '+225 07 00 00 00',
  pickupPosition: { latitude: 5.3364, longitude: -4.0267 }, // Cocody
  destinationPosition: { latitude: 5.3600, longitude: -4.0083 }, // Angré
  driverPosition: { latitude: 5.3450, longitude: -4.0150 },
  eta: 12,
};

export default function SuiviLivraison() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [trackingCode, setTrackingCode] = useState(id || '');
  const [isDemo, setIsDemo] = useState(!id);
  const [demoDriverPosition, setDemoDriverPosition] = useState(demoDelivery.driverPosition);
  const [demoStatus, setDemoStatus] = useState<DeliveryStatus>(demoDelivery.status);
  const [demoEta, setDemoEta] = useState(demoDelivery.eta);
  
  // Real delivery tracking hook
  const { delivery, loading, error } = useDeliveryTracking(id || '');

  // Simulate driver movement in demo mode
  useEffect(() => {
    if (!isDemo) return;

    const interval = setInterval(() => {
      setDemoDriverPosition(prev => {
        // Move driver towards destination
        const targetLat = demoDelivery.destinationPosition.latitude;
        const targetLng = demoDelivery.destinationPosition.longitude;
        
        const newLat = prev.latitude + (targetLat - prev.latitude) * 0.05;
        const newLng = prev.longitude + (targetLng - prev.longitude) * 0.05;
        
        // Update ETA
        const distance = Math.sqrt(
          Math.pow(targetLat - newLat, 2) + Math.pow(targetLng - newLng, 2)
        );
        const newEta = Math.max(1, Math.round(distance * 500));
        setDemoEta(newEta);
        
        // Update status if arriving
        if (distance < 0.001) {
          setDemoStatus('delivered');
          clearInterval(interval);
        }
        
        return { latitude: newLat, longitude: newLng };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isDemo]);

  const handleTrack = () => {
    if (trackingCode.trim()) {
      if (trackingCode.toLowerCase() === 'demo') {
        setIsDemo(true);
      } else {
        navigate(`/suivi-livraison/${trackingCode.trim()}`);
      }
    }
  };

  const handleCall = () => {
    const phone = isDemo ? demoDelivery.driverPhone : delivery?.driver_id;
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    }
  };

  // Determine which data to use
  const currentDelivery = isDemo ? {
    status: demoStatus,
    driverPosition: demoDriverPosition,
    pickupPosition: demoDelivery.pickupPosition,
    destinationPosition: demoDelivery.destinationPosition,
    eta: demoEta,
    driverName: demoDelivery.driverName,
    orderId: demoDelivery.orderId,
  } : delivery ? {
    status: delivery.status,
    driverPosition: delivery.current_latitude && delivery.current_longitude
      ? { latitude: delivery.current_latitude, longitude: delivery.current_longitude }
      : null,
    pickupPosition: { latitude: delivery.pickup_latitude, longitude: delivery.pickup_longitude },
    destinationPosition: { latitude: delivery.delivery_latitude, longitude: delivery.delivery_longitude },
    eta: 15, // Calculate from distance
    driverName: 'Livreur',
    orderId: delivery.order_id,
  } : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 gap-2"
            onClick={() => navigate('/livraison')}
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Suivi de <span className="text-primary">livraison</span>
            </h1>
            <p className="text-muted-foreground">
              Suivez votre commande en temps réel sur la carte
            </p>
          </motion.div>

          {/* Tracking Input (if no ID) */}
          {!id && !isDemo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Entrez votre code de suivi
                </h2>
                <div className="flex gap-3">
                  <Input
                    placeholder="Ex: CMD-2024-001234 ou 'demo' pour tester"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                    className="flex-1"
                  />
                  <Button onClick={handleTrack} className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Suivre
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Tapez "demo" pour voir une démonstration en temps réel
                </p>
              </Card>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && !isDemo && (
            <Card className="p-12 text-center">
              <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
              <p className="text-muted-foreground">Chargement des informations de livraison...</p>
            </Card>
          )}

          {/* Error State */}
          {error && !isDemo && (
            <Card className="p-12 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Livraison non trouvée</h3>
              <p className="text-muted-foreground mb-4">
                Vérifiez votre code de suivi ou essayez "demo" pour une démonstration
              </p>
              <Button variant="outline" onClick={() => navigate('/suivi-livraison')}>
                Réessayer
              </Button>
            </Card>
          )}

          {/* Delivery Tracker */}
          {currentDelivery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isDemo && (
                <Card className="p-4 mb-6 bg-secondary/10 border-secondary/20">
                  <p className="text-sm text-center">
                    🎮 <strong>Mode démonstration</strong> - Le livreur se déplace automatiquement vers la destination
                  </p>
                </Card>
              )}
              
              <MapboxDeliveryTracker
                deliveryId={id || 'demo'}
                driverPosition={currentDelivery.driverPosition}
                pickupPosition={currentDelivery.pickupPosition}
                destinationPosition={currentDelivery.destinationPosition}
                status={currentDelivery.status}
                eta={currentDelivery.eta}
                driverName={currentDelivery.driverName}
                orderId={currentDelivery.orderId}
                onCall={handleCall}
              />
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
