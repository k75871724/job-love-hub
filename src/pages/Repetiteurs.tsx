import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MapPin, Clock, Check, GraduationCap, Video, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const categories = [
  "Tous",
  "Mathématiques",
  "Français",
  "Anglais",
  "Sciences",
  "Informatique",
  "Musique",
];

const tutors = [
  {
    id: 1,
    name: "Prof. Yao Serge",
    subject: "Mathématiques & Physique",
    avatar: "YS",
    rating: 4.9,
    reviews: 89,
    location: "Abidjan, Cocody",
    hourlyRate: "5 000",
    experience: "8 ans",
    verified: true,
    online: true,
    inPerson: true,
    students: 156,
  },
  {
    id: 2,
    name: "Mme. Coulibaly Mariam",
    subject: "Français & Littérature",
    avatar: "CM",
    rating: 5.0,
    reviews: 124,
    location: "Abidjan, Plateau",
    hourlyRate: "4 500",
    experience: "12 ans",
    verified: true,
    online: true,
    inPerson: true,
    students: 234,
  },
  {
    id: 3,
    name: "M. Diallo Amadou",
    subject: "Anglais",
    avatar: "DA",
    rating: 4.8,
    reviews: 67,
    location: "Abidjan, Marcory",
    hourlyRate: "4 000",
    experience: "5 ans",
    verified: true,
    online: true,
    inPerson: false,
    students: 98,
  },
  {
    id: 4,
    name: "Prof. Konan Ange",
    subject: "Sciences (SVT, Chimie)",
    avatar: "KA",
    rating: 4.7,
    reviews: 45,
    location: "Bouaké",
    hourlyRate: "3 500",
    experience: "6 ans",
    verified: true,
    online: true,
    inPerson: true,
    students: 67,
  },
];

export default function Repetiteurs() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-bara-forest to-bara-forest/80 py-16 mb-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
                Trouvez votre{" "}
                <span className="text-secondary">répétiteur</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Des enseignants qualifiés pour accompagner votre réussite scolaire
              </p>
              
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher une matière, un enseignant..."
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
          </div>

          {/* Tutors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor, index) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 shadow-soft hover:shadow-card transition-all"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bara-forest to-secondary flex items-center justify-center text-xl font-bold text-primary-foreground">
                      {tutor.avatar}
                    </div>
                    {tutor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-card flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-foreground">
                      {tutor.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{tutor.subject}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-secondary fill-secondary" />
                      <span className="text-sm font-medium">{tutor.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({tutor.reviews} avis)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Modes */}
                <div className="flex gap-2 mb-4">
                  {tutor.online && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                      <Video className="w-3 h-3" />
                      En ligne
                    </span>
                  )}
                  {tutor.inPerson && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                      <Users className="w-3 h-3" />
                      Présentiel
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {tutor.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {tutor.experience}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <GraduationCap className="w-4 h-4" />
                  {tutor.students} élèves accompagnés
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-lg font-bold text-secondary">
                      {tutor.hourlyRate} FCFA
                    </span>
                    <span className="text-sm text-muted-foreground">/heure</span>
                  </div>
                  <Button variant="cta" size="sm">
                    Réserver
                  </Button>
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
