import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Package, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDeliveryTracking, DeliveryStatus } from '@/hooks/useDeliveryTracking';

interface DeliveryTrackerProps {
  deliveryId: string;
  onClose?: () => void;
}

const statusLabels: Record<DeliveryStatus, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-yellow-500' },
  accepted: { label: 'Acceptée', color: 'bg-blue-500' },
  picking_up: { label: 'Récupération', color: 'bg-purple-500' },
  in_transit: { label: 'En cours', color: 'bg-orange-500' },
  delivered: { label: 'Livrée', color: 'bg-green-500' },
  cancelled: { label: 'Annulée', color: 'bg-red-500' },
};

const statusSteps: DeliveryStatus[] = ['pending', 'accepted', 'picking_up', 'in_transit', 'delivered'];

export const DeliveryTracker = ({ deliveryId, onClose }: DeliveryTrackerProps) => {
  const { delivery, loading, error, estimateArrival } = useDeliveryTracking(deliveryId);
  const [eta, setEta] = useState<number | null>(null);

  useEffect(() => {
    if (delivery) {
      setEta(estimateArrival());
    }
  }, [delivery, estimateArrival]);

  if (loading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-4 bg-muted rounded w-1/2 mb-4" />
        <div className="h-20 bg-muted rounded mb-4" />
        <div className="h-4 bg-muted rounded w-3/4" />
      </Card>
    );
  }

  if (error || !delivery) {
    return (
      <Card className="p-6">
        <p className="text-destructive text-center">{error || 'Livraison non trouvée'}</p>
      </Card>
    );
  }

  const currentStepIndex = statusSteps.indexOf(delivery.status);
  const statusInfo = statusLabels[delivery.status];

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className={`${statusInfo.color} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Suivi de livraison</h3>
            <p className="text-sm opacity-90">Commande #{delivery.order_id.slice(0, 8)}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold">{statusInfo.label}</span>
            {eta && delivery.status !== 'delivered' && delivery.status !== 'cancelled' && (
              <p className="text-sm opacity-90">~{eta} min restantes</p>
            )}
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step} className="flex items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  } ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {isCompleted && index < currentStepIndex ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </motion.div>
                {index < statusSteps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 ${
                      index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Attente</span>
          <span>Acceptée</span>
          <span>Récup.</span>
          <span>En route</span>
          <span>Livrée</span>
        </div>
      </div>

      {/* Location Info */}
      <div className="p-4 space-y-4">
        {/* Current Position */}
        {delivery.current_latitude && delivery.current_longitude && (
          <motion.div
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="font-medium">Position actuelle du livreur</p>
              <p className="text-sm text-muted-foreground">
                {delivery.current_latitude.toFixed(4)}, {delivery.current_longitude.toFixed(4)}
              </p>
            </div>
          </motion.div>
        )}

        {/* Destination */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">Destination</p>
            <p className="text-sm text-muted-foreground">
              {delivery.delivery_latitude.toFixed(4)}, {delivery.delivery_longitude.toFixed(4)}
            </p>
          </div>
        </div>

        {/* ETA */}
        {eta && delivery.status !== 'delivered' && delivery.status !== 'cancelled' && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">Arrivée estimée</p>
              <p className="text-sm text-muted-foreground">Dans environ {eta} minutes</p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t flex gap-2">
        <Button variant="outline" className="flex-1 gap-2">
          <Phone className="w-4 h-4" />
          Appeler
        </Button>
        {onClose && (
          <Button variant="ghost" onClick={onClose}>
            Fermer
          </Button>
        )}
      </div>
    </Card>
  );
};
