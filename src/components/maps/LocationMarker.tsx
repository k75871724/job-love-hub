import { motion } from 'framer-motion';
import { MapPin, User, Truck, Briefcase, Wrench } from 'lucide-react';

interface LocationMarkerProps {
  type: 'user' | 'freelance' | 'provider' | 'delivery' | 'destination';
  label?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const markerConfig = {
  user: {
    icon: User,
    color: 'bg-primary',
    pulseColor: 'bg-primary/30',
  },
  freelance: {
    icon: Briefcase,
    color: 'bg-blue-500',
    pulseColor: 'bg-blue-500/30',
  },
  provider: {
    icon: Wrench,
    color: 'bg-green-500',
    pulseColor: 'bg-green-500/30',
  },
  delivery: {
    icon: Truck,
    color: 'bg-orange-500',
    pulseColor: 'bg-orange-500/30',
  },
  destination: {
    icon: MapPin,
    color: 'bg-red-500',
    pulseColor: 'bg-red-500/30',
  },
};

export const LocationMarker = ({ type, label, isActive = true, onClick }: LocationMarkerProps) => {
  const config = markerConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse animation for active markers */}
      {isActive && (
        <motion.div
          className={`absolute inset-0 rounded-full ${config.pulseColor}`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
      
      {/* Marker icon */}
      <div
        className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${config.color} text-white shadow-lg`}
      >
        <Icon className="w-5 h-5" />
      </div>
      
      {/* Label */}
      {label && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-background/90 rounded text-xs font-medium whitespace-nowrap shadow">
          {label}
        </div>
      )}
    </motion.div>
  );
};
