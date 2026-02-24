import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Star, MapPin, Clock, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const categories = [
  "Tous",
  "Développement Web",
  "Design Graphique",
  "Rédaction",
  "Marketing Digital",
  "Traduction",
  "Comptabilité",
];

const freelancers = [
  {
    id: 1,
    name: "Kouassi Jean-Marc",
    title: "Développeur Full-Stack",
    avatar: "KJ",
    rating: 4.9,
    reviews: 156,
    location: "Abidjan, Cocody",
    hourlyRate: "15 000",
    skills: ["React", "Node.js", "PostgreSQL"],
    verified: true,
    available: true,
    completedJobs: 89,
  },
  {
    id: 2,
    name: "Traoré Aminata",
    title: "UI/UX Designer",
    avatar: "TA",
    rating: 5.0,
    reviews: 98,
    location: "Abidjan, Marcory",
    hourlyRate: "12 000",
    skills: ["Figma", "Adobe XD", "Illustration"],
    verified: true,
    available: true,
    completedJobs: 67,
  },
  {
    id: 3,
    name: "Koné Ibrahim",
    title: "Rédacteur Web SEO",
    avatar: "KI",
    rating: 4.8,
    reviews: 234,
    location: "Bouaké",
    hourlyRate: "8 000",
    skills: ["SEO", "WordPress", "Copywriting"],
    verified: true,
    available: false,
    completedJobs: 145,
  },
  {
    id: 4,
    name: "Diabaté Fatou",
    title: "Community Manager",
    avatar: "DF",
    rating: 4.7,
    reviews: 78,
    location: "Abidjan, Plateau",
    hourlyRate: "10 000",
    skills: ["Social Media", "Canva", "Analytics"],
    verified: true,
    available: true,
    completedJobs: 52,
  },
  {
    id: 5,
    name: "Ouattara Moussa",
    title: "Expert Comptable",
    avatar: "OM",
    rating: 4.9,
    reviews: 112,
    location: "Abidjan, Treichville",
    hourlyRate: "20 000",
    skills: ["Sage", "Excel", "Fiscalité"],
    verified: true,
    available: true,
    completedJobs: 78,
  },
  {
    id: 6,
    name: "Bamba Aïssata",
    title: "Traductrice FR/EN/ES",
    avatar: "BA",
    rating: 5.0,
    reviews: 189,
    location: "Abidjan, Riviera",
    hourlyRate: "7 500",
    skills: ["Anglais", "Espagnol", "Sous-titrage"],
    verified: true,
    available: true,
    completedJobs: 234,
  },
];

export default function Freelance() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

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
                Trouvez les meilleurs{" "}
                <span className="text-secondary">freelances</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Des professionnels qualifiés pour tous vos projets digitaux
              </p>
              
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher un freelance, une compétence..."
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
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
            <button className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-border text-foreground hover:bg-muted flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Plus de filtres
            </button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{freelancers.length}</span> freelances disponibles
            </p>
            <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm">
              <option>Trier par pertinence</option>
              <option>Meilleure note</option>
              <option>Tarif croissant</option>
              <option>Tarif décroissant</option>
            </select>
          </div>

          {/* Freelancers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelancers.map((freelancer, index) => (
              <motion.div
                key={freelancer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 shadow-soft hover:shadow-card transition-all group"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-primary-foreground">
                      {freelancer.avatar}
                    </div>
                    {freelancer.available && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {freelancer.name}
                      </h3>
                      {freelancer.verified && (
                        <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-secondary fill-secondary" />
                      <span className="text-sm font-medium">{freelancer.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({freelancer.reviews} avis)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {freelancer.location}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-lg font-bold text-secondary">
                      {freelancer.hourlyRate} FCFA
                    </span>
                    <span className="text-sm text-muted-foreground">/heure</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/freelance/${freelancer.id}`}>
                      Voir le profil
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Charger plus de freelances
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
