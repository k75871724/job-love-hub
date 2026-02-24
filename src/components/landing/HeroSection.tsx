import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Briefcase, MapPin, GraduationCap, Truck, Building2, Wrench, Camera, Code, Paintbrush, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const popularSearches = [
  "Développeur Web",
  "Graphiste",
  "Rédacteur",
  "Photographe",
  "Monteur vidéo",
  "Community Manager",
];

const categories = [
  { name: "Développement", icon: Code, href: "/freelance?cat=dev", color: "from-blue-500 to-blue-600" },
  { name: "Design", icon: Paintbrush, href: "/freelance?cat=design", color: "from-pink-500 to-rose-500" },
  { name: "Rédaction", icon: Briefcase, href: "/freelance?cat=writing", color: "from-purple-500 to-violet-500" },
  { name: "Vidéo", icon: Camera, href: "/freelance?cat=video", color: "from-red-500 to-orange-500" },
  { name: "Musique", icon: Music, href: "/freelance?cat=music", color: "from-green-500 to-emerald-500" },
  { name: "Services locaux", icon: MapPin, href: "/proximite", color: "from-amber-500 to-yellow-500" },
  { name: "Formations", icon: GraduationCap, href: "/repetiteurs", color: "from-cyan-500 to-teal-500" },
  { name: "Livraison", icon: Truck, href: "/livraison", color: "from-indigo-500 to-blue-500" },
];

const trustedBy = [
  "Orange CI",
  "MTN",
  "Wave",
  "Moov Africa",
];

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/freelance?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6"
          >
            Trouvez les{" "}
            <span className="text-primary">freelances parfaits</span>
            <br className="hidden sm:block" /> pour vos projets
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto"
          >
            Des milliers de professionnels qualifiés en Côte d'Ivoire prêts à vous accompagner
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSearch}
            className="relative max-w-2xl mx-auto mb-6"
          >
            <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden">
              <div className="flex-1 flex items-center px-6">
                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                <input
                  type="text"
                  placeholder="Que recherchez-vous aujourd'hui ?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 md:py-5 text-foreground placeholder:text-muted-foreground focus:outline-none text-base md:text-lg"
                />
              </div>
              <Button
                type="submit"
                className="m-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-4 md:py-5 h-auto text-base md:text-lg font-semibold"
              >
                <span className="hidden sm:inline">Rechercher</span>
                <Search className="w-5 h-5 sm:hidden" />
              </Button>
            </div>
          </motion.form>

          {/* Popular Searches */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
          >
            <span className="text-white/60 text-sm">Populaire :</span>
            {popularSearches.map((term) => (
              <Link
                key={term}
                to={`/freelance?q=${encodeURIComponent(term)}`}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full border border-white/20 transition-colors"
              >
                {term}
              </Link>
            ))}
          </motion.div>

          {/* Trusted By */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-white/50 text-sm">Paiement sécurisé via</span>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {trustedBy.map((company) => (
                <span
                  key={company}
                  className="text-white/70 font-semibold text-sm md:text-base"
                >
                  {company}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 md:mt-20"
        >
          <h2 className="text-center text-white/80 text-lg font-medium mb-8">
            Explorez nos catégories populaires
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
              >
                <Link
                  to={category.href}
                  className="group flex flex-col items-center gap-3 p-4 md:p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <span className="text-white text-xs md:text-sm font-medium text-center">
                    {category.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}
