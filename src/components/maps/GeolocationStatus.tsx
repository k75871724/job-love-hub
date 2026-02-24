import { motion } from 'framer-motion';
import { MapPin, Wifi, WifiOff, Navigation, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GeolocationStatusProps {
  isActive: boolean;
  accuracy?: number;
  lastUpdate?: Date;
  error?: string | null;
  className?: string;
}

export const GeolocationStatus = ({
  isActive,
  accuracy,
  lastUpdate,
  error,
  className,
}: GeolocationStatusProps) => {
  const getAccuracyLevel = () => {
    if (!accuracy) return 'unknown';
    if (accuracy < 10) return 'high';
    if (accuracy < 50) return 'medium';
    return 'low';
  };

  const accuracyLevel = getAccuracyLevel();
  
  const accuracyConfig = {
    high: { label: 'Précision élevée', color: 'text-green-500', bars: 3 },
    medium: { label: 'Précision moyenne', color: 'text-yellow-500', bars: 2 },
    low: { label: 'Précision faible', color: 'text-red-500', bars: 1 },
    unknown: { label: 'Inconnue', color: 'text-muted-foreground', bars: 0 },
  };

  const config = accuracyConfig[accuracyLevel];

  if (error) {
    return (
      <div className={cn('flex items-center gap-2 px-3 py-2 rounded-full bg-destructive/10', className)}>
        <AlertTriangle className="w-4 h-4 text-destructive" />
        <span className="text-sm text-destructive">{error}</span>
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        'flex items-center gap-3 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm shadow-sm border',
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Connection Status */}
      <div className="flex items-center gap-1.5">
        {isActive ? (
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Navigation className="w-4 h-4 text-primary" />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        ) : (
          <WifiOff className="w-4 h-4 text-muted-foreground" />
        )}
        <span className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
          {isActive ? 'GPS actif' : 'GPS inactif'}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-border" />

      {/* Accuracy Indicator */}
      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-0.5">
          {[1, 2, 3].map((bar) => (
            <motion.div
              key={bar}
              className={cn(
                'w-1 rounded-full',
                bar <= config.bars ? config.color.replace('text-', 'bg-') : 'bg-muted'
              )}
              style={{ height: `${bar * 4 + 4}px` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: bar * 0.1 }}
            />
          ))}
        </div>
        <span className={`text-xs ${config.color}`}>
          {accuracy ? `±${Math.round(accuracy)}m` : config.label}
        </span>
      </div>

      {/* Last Update */}
      {lastUpdate && (
        <>
          <div className="w-px h-4 bg-border" />
          <span className="text-xs text-muted-foreground">
            Màj: {lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </>
      )}
    </motion.div>
  );
};
