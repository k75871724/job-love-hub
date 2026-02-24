import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, Clock, Truck, ShoppingBag, Utensils, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const categories = [
  { id: "all", name: "Tous", icon: ShoppingBag },
  { id: "food", name: "Restaurants", icon: Utensils },
  { id: "groceries", name: "Produits vivriers", icon: ShoppingBag },
  { id: "delivery", name: "Colis", icon: Truck },
];

const vendors = [
  {
    id: 1,
    name: "Chez Tantie Marie",
    type: "Restaurant",
    image: "🍲",
    rating: 4.8,
    reviews: 234,
    location: "Cocody Angré",
    deliveryTime: "25-35 min",
    deliveryFee: "500",
    tags: ["Ivoirien", "Grillades", "Attieké"],
  },
  {
    id: 2,
    name: "Marché Frais Bio",
    type: "Produits vivriers",
    image: "🥬",
    rating: 4.9,
    reviews: 156,
    location: "Adjamé",
    deliveryTime: "45-60 min",
    deliveryFee: "1 000",
    tags: ["Légumes", "Fruits", "Bio"],
  },
  {
    id: 3,
    name: "Fast Food Abidjan",
    type: "Restaurant",
    image: "🍔",
    rating: 4.5,
    reviews: 567,
    location: "Plateau",
    deliveryTime: "20-30 min",
    deliveryFee: "750",
    tags: ["Burgers", "Poulet", "Frites"],
  },
  {
    id: 4,
    name: "Ferme du Nord",
    type: "Produits vivriers",
    image: "🥚",
    rating: 4.7,
    reviews: 89,
    location: "Bingerville",
    deliveryTime: "60-90 min",
    deliveryFee: "1 500",
    tags: ["Œufs", "Poulet fermier", "Miel"],
  },
];

export default function Livraison() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 py-16 mb-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
                Livraison{" "}
                <span className="text-secondary">express</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Repas, produits vivriers et colis livrés chez vous
              </p>
              
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher un restaurant, un produit..."
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

              {/* Track Order Button */}
              <Button
                variant="hero-outline"
                size="lg"
                className="mt-4"
                onClick={() => navigate('/suivi-livraison')}
              >
                <Package className="w-5 h-5 mr-2" />
                Suivre ma commande
              </Button>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-secondary text-secondary-foreground shadow-md"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                <category.icon className="w-5 h-5" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Vendors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all cursor-pointer"
              >
                {/* Image */}
                <div className="h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-6xl">
                  {vendor.image}
                </div>
                
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        {vendor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{vendor.type}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-secondary fill-secondary" />
                      <span className="text-sm font-medium">{vendor.rating}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vendor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {vendor.deliveryTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      {vendor.deliveryFee} FCFA
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
