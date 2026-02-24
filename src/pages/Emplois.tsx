import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, Building2, Briefcase, GraduationCap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const categories = [
  "Tous",
  "Emplois",
  "Stages",
  "Concours publics",
  "Formations",
];

const jobs = [
  {
    id: 1,
    title: "Développeur Web Full-Stack",
    company: "Tech Solutions CI",
    type: "CDI",
    location: "Abidjan, Cocody",
    salary: "400 000 - 600 000 FCFA",
    deadline: "15 Jan 2025",
    category: "Emplois",
    logo: "TS",
    tags: ["React", "Node.js", "3+ ans"],
  },
  {
    id: 2,
    title: "Concours Fonction Publique - Catégorie A",
    company: "Ministère de la Fonction Publique",
    type: "Concours",
    location: "National",
    salary: null,
    deadline: "28 Fév 2025",
    category: "Concours publics",
    logo: "FP",
    tags: ["BAC+4", "Administratif", "30 postes"],
  },
  {
    id: 3,
    title: "Stage Marketing Digital",
    company: "Agence Pub Abidjan",
    type: "Stage",
    location: "Abidjan, Plateau",
    salary: "100 000 FCFA/mois",
    deadline: "20 Jan 2025",
    category: "Stages",
    logo: "AP",
    tags: ["6 mois", "Community Management", "SEO"],
  },
  {
    id: 4,
    title: "Commercial Terrain",
    company: "Orange Côte d'Ivoire",
    type: "CDD",
    location: "Bouaké",
    salary: "250 000 - 350 000 FCFA",
    deadline: "10 Jan 2025",
    category: "Emplois",
    logo: "OC",
    tags: ["Vente", "Télécommunications", "Mobilité"],
  },
  {
    id: 5,
    title: "Formation Excel Avancé",
    company: "Institut Formation Pro",
    type: "Formation",
    location: "En ligne",
    salary: "50 000 FCFA",
    deadline: "Inscription ouverte",
    category: "Formations",
    logo: "IF",
    tags: ["3 semaines", "Certificat", "En ligne"],
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "CDI":
      return "bg-green-100 text-green-700";
    case "CDD":
      return "bg-blue-100 text-blue-700";
    case "Stage":
      return "bg-purple-100 text-purple-700";
    case "Concours":
      return "bg-orange-100 text-orange-700";
    case "Formation":
      return "bg-pink-100 text-pink-700";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function Emplois() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = selectedCategory === "Tous" 
    ? jobs 
    : jobs.filter(job => job.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-bara-earth-dark via-bara-earth to-bara-earth-light pt-32 md:pt-36 pb-16 md:pb-20 mb-8 md:mb-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 md:mb-8">
                Emplois &{" "}
                <span className="text-secondary">Concours</span>
              </h1>
              
              {/* Subtitle with border */}
              <div className="inline-block border-2 border-primary/50 rounded-2xl px-6 py-4 mb-8">
                <p className="text-base md:text-lg text-white/90">
                  Trouvez votre prochaine opportunité professionnelle
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="flex flex-col gap-4 max-w-2xl mx-auto px-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher un emploi, un concours..."
                    className="pl-12 h-14 bg-card border-0 shadow-lg rounded-xl w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="hero" size="lg" className="h-14 w-full rounded-xl">
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

          {/* Results */}
          <p className="text-muted-foreground mb-6">
            <span className="font-semibold text-foreground">{filteredJobs.length}</span> offres disponibles
          </p>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 shadow-soft hover:shadow-card transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Logo */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg font-bold text-primary-foreground flex-shrink-0">
                    {job.logo}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-display font-semibold text-foreground text-lg">
                        {job.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                        {job.type}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{job.company}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.salary}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {job.deadline}
                      </div>
                    </div>
                  </div>

                  {/* Tags & Action */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="cta" size="sm">
                      Postuler
                    </Button>
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
