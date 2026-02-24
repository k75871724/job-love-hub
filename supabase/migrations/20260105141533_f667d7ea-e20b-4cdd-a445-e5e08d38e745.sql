-- Table pour stocker les positions des utilisateurs/prestataires
CREATE TABLE public.user_positions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  accuracy DOUBLE PRECISION,
  heading DOUBLE PRECISION,
  speed DOUBLE PRECISION,
  user_type TEXT NOT NULL DEFAULT 'user' CHECK (user_type IN ('user', 'freelance', 'provider', 'delivery')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour le suivi des livraisons en temps réel
CREATE TABLE public.delivery_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL,
  driver_id UUID NOT NULL,
  customer_id UUID NOT NULL,
  pickup_latitude DOUBLE PRECISION NOT NULL,
  pickup_longitude DOUBLE PRECISION NOT NULL,
  delivery_latitude DOUBLE PRECISION NOT NULL,
  delivery_longitude DOUBLE PRECISION NOT NULL,
  current_latitude DOUBLE PRECISION,
  current_longitude DOUBLE PRECISION,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'picking_up', 'in_transit', 'delivered', 'cancelled')),
  estimated_arrival TIMESTAMP WITH TIME ZONE,
  actual_arrival TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les zones géographiques de recherche
CREATE TABLE public.search_zones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  center_latitude DOUBLE PRECISION NOT NULL,
  center_longitude DOUBLE PRECISION NOT NULL,
  radius_km DOUBLE PRECISION NOT NULL DEFAULT 10,
  polygon JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_zones ENABLE ROW LEVEL SECURITY;

-- Policies pour user_positions
CREATE POLICY "Users can view nearby active positions" ON public.user_positions
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can insert their own position" ON public.user_positions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own position" ON public.user_positions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own position" ON public.user_positions
  FOR DELETE USING (auth.uid() = user_id);

-- Policies pour delivery_tracking
CREATE POLICY "Customers can view their deliveries" ON public.delivery_tracking
  FOR SELECT USING (auth.uid() = customer_id OR auth.uid() = driver_id);

CREATE POLICY "Drivers can update their deliveries" ON public.delivery_tracking
  FOR UPDATE USING (auth.uid() = driver_id);

CREATE POLICY "Authenticated users can create deliveries" ON public.delivery_tracking
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Policies pour search_zones (public read)
CREATE POLICY "Anyone can view search zones" ON public.search_zones
  FOR SELECT USING (true);

-- Enable realtime for tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_positions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.delivery_tracking;

-- Function to calculate distance between two points (Haversine formula)
CREATE OR REPLACE FUNCTION public.calculate_distance(
  lat1 DOUBLE PRECISION,
  lon1 DOUBLE PRECISION,
  lat2 DOUBLE PRECISION,
  lon2 DOUBLE PRECISION
) RETURNS DOUBLE PRECISION AS $$
DECLARE
  R DOUBLE PRECISION := 6371; -- Earth's radius in km
  dLat DOUBLE PRECISION;
  dLon DOUBLE PRECISION;
  a DOUBLE PRECISION;
  c DOUBLE PRECISION;
BEGIN
  dLat := radians(lat2 - lat1);
  dLon := radians(lon2 - lon1);
  a := sin(dLat/2) * sin(dLat/2) + cos(radians(lat1)) * cos(radians(lat2)) * sin(dLon/2) * sin(dLon/2);
  c := 2 * atan2(sqrt(a), sqrt(1-a));
  RETURN R * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE SET search_path = public;

-- Function to find nearby users
CREATE OR REPLACE FUNCTION public.find_nearby_users(
  user_lat DOUBLE PRECISION,
  user_lon DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 10,
  user_type_filter TEXT DEFAULT NULL
) RETURNS TABLE (
  id UUID,
  user_id UUID,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  user_type TEXT,
  distance_km DOUBLE PRECISION,
  last_updated TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    up.id,
    up.user_id,
    up.latitude,
    up.longitude,
    up.user_type,
    public.calculate_distance(user_lat, user_lon, up.latitude, up.longitude) as distance_km,
    up.last_updated
  FROM public.user_positions up
  WHERE up.is_active = true
    AND (user_type_filter IS NULL OR up.user_type = user_type_filter)
    AND public.calculate_distance(user_lat, user_lon, up.latitude, up.longitude) <= radius_km
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql STABLE SET search_path = public;

-- Trigger to update last_updated
CREATE OR REPLACE FUNCTION public.update_position_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_user_positions_timestamp
  BEFORE UPDATE ON public.user_positions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_position_timestamp();

CREATE TRIGGER update_delivery_tracking_timestamp
  BEFORE UPDATE ON public.delivery_tracking
  FOR EACH ROW
  EXECUTE FUNCTION public.update_position_timestamp();