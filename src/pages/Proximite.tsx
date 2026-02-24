import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Clock, Phone, Check, Filter, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapboxMap } from "@/components/maps";
import { useGeolocation, NearbyUser } from "@/hooks/useGeolocation";
const categories = [
  { id: "all", name: "Tous", icon: "🔧" },
  { id: "electricien", name: "Électricien", icon: "⚡" },
  { id: "plombier", name: "Plombier", icon: "🔧" },
  { id: "coiffure", name: "Coiffure", icon: "💇" },
  { id: "menage", name: "Ménage", icon: "🧹" },
  { id: "jardinage", name: "Jardinage", icon: "🌱" },
  { id: "demenagement", name: "Déménagement", icon: "📦" },
  { id: "mecanique", name: "Mécanique", icon: "🚗" },
  { id: "peinture", name: "Peinture", icon: "🎨" },
];

const providers = [
  {
    id: 1,
    name: "Konan Serge",
    service: "Électricien professionnel",
    avatar: "KS",
    rating: 4.9,
    reviews: 234,
    location: "Cocody, Angré",
    distance: "2.3 km",
    price: "5 000 - 15 000",
    available: true,
    verified: true,
    responseTime: "< 30 min",
    completedJobs: 456,
  },
  {
    id: 2,
    name: "Brou Clarisse",
    service: "Coiffeuse à domicile",
    avatar: "BC",
    rating: 5.0,
    reviews: 189,
    location: "Marcory, Zone 4",
    distance: "1.8 km",
    price: "3 000 - 25 000",
    available: true,
    verified: true,
    responseTime: "< 1h",
    completedJobs: 312,
  },
  {
    id: 3,
    name: "Yao Michel",
    service: "Plombier urgentiste",
    avatar: "YM",
    rating: 4.8,
    reviews: 167,
    location: "Yopougon, Selmer",
    distance: "4.5 km",
    price: "7 500 - 50 000",
    available: true,
    verified: true,
    responseTime: "< 45 min",
    completedJobs: 289,
  },
  {
    id: 4,
    name: "Diomandé Awa",
    service: "Femme de ménage",
    avatar: "DA",
    rating: 4.9,
    reviews: 456,
    location: "Plateau, Centre",
    distance: "3.2 km",
    price: "10 000 - 20 000",
    available: false,
    verified: true,
    responseTime: "< 2h",
    completedJobs: 678,
  },
  {
    id: 5,
    name: "Touré Adama",
    service: "Jardinier paysagiste",
    avatar: "TA",
    rating: 4.7,
    reviews: 98,
    location: "Riviera Palmeraie",
    distance: "5.1 km",
    price: "15 000 - 75 000",
    available: true,
    verified: true,
    responseTime: "< 1h",
    completedJobs: 145,
  },
  {
    id: 6,
    name: "Coulibaly Moussa",
    service: "Mécanicien automobile",
    avatar: "CM",
    rating: 4.8,
    reviews: 312,
    location: "Adjamé, Liberté",
    distance: "3.8 km",
    price: "5 000 - 100 000",
    available: true,
    verified: true,
    responseTime: "< 30 min",
    completedJobs: 523,
  },
];

export default function Proximite() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { position, error, loading, nearbyUsers, startTracking, findNearby, calculateDistance } = useGeolocation();
  const [isTracking, setIsTracking] = useState(false);

  const handleStartTracking = () => {
    startTracking();
    setIsTracking(true);
  };

  useEffect(() => {
    if (position && isTracking) {
      findNearby(10, 'provider');
    }
  }, [position, isTracking, findNearby]);

  // Calculate distance from user position for each provider
  const getProviderDistance = (providerIndex: number) => {
    if (!position) return providers[providerIndex].distance;
    // Use nearby users if available, otherwise show mock distance
    const nearby = nearbyUsers[providerIndex];
    if (nearby) {
      return `${nearby.distance_km.toFixed(1)} km`;
    }
    return providers[providerIndex].distance;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16 mb-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
                Services de{" "}
                <span className="text-secondary">proximité</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Trouvez des professionnels qualifiés près de chez vous
              </p>
              
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Votre quartier ou adresse..."
                    className="pl-12 h-14 bg-card border-0 shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="hero" size="lg" className="h-14">
                  <Search className="w-5 h-5 mr-2" />
                  Rechercher
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Categories Scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-secondary text-secondary-foreground shadow-md"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Map + Results */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Interactive Mapbox Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24"
            >
              <MapboxMap
                nearbyUsers={nearbyUsers}
                userPosition={position}
                showUserPosition={isTracking}
                onMarkerClick={(user) => console.log('Selected provider:', user)}
                className="h-[400px] lg:h-[600px]"
              />
              
              {!isTracking && (
                <div className="mt-4 text-center">
                  <Button onClick={handleStartTracking} className="gap-2">
                    <Navigation className="w-4 h-4" />
                    Activer la géolocalisation
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Pour voir les prestataires près de vous en temps réel
                  </p>
                </div>
              )}
            </motion.div>

            {/* Providers List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{providers.length}</span> prestataires trouvés
                </p>
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>

              {providers.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border p-5 shadow-soft hover:shadow-card transition-all"
                >
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg font-bold text-primary-foreground">
                        {provider.avatar}
                      </div>
                      {provider.available && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-card" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{provider.name}</h3>
                        {provider.verified && (
                          <Check className="w-4 h-4 text-secondary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{provider.service}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-secondary fill-secondary" />
                          <span className="font-medium">{provider.rating}</span>
                          <span className="text-muted-foreground">({provider.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {provider.distance}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {provider.responseTime}
                        </div>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm text-muted-foreground mb-1">À partir de</p>
                      <p className="font-bold text-secondary">{provider.price} FCFA</p>
                      <Button variant="cta" size="sm" className="mt-3">
                        <Phone className="w-4 h-4 mr-1" />
                        Contacter
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
