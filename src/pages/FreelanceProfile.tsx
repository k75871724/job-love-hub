import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Check, Clock, Briefcase, MessageSquare, ArrowLeft, Share2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

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
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "MongoDB"],
    verified: true,
    available: true,
    completedJobs: 89,
    description: "Développeur passionné avec plus de 5 ans d'expérience dans le développement web. Spécialisé dans les applications React et Node.js.",
    languages: ["Français", "Anglais"],
    responseTime: "Moins de 2h",
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
    skills: ["Figma", "Adobe XD", "Illustration", "Prototypage", "Design System"],
    verified: true,
    available: true,
    completedJobs: 67,
    description: "Designer créative spécialisée dans la création d'expériences utilisateur intuitives et esthétiques.",
    languages: ["Français"],
    responseTime: "Moins de 1h",
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
    skills: ["SEO", "WordPress", "Copywriting", "Content Marketing"],
    verified: true,
    available: false,
    completedJobs: 145,
    description: "Expert en rédaction web optimisée pour le référencement. J'aide les entreprises à améliorer leur visibilité en ligne.",
    languages: ["Français", "Anglais"],
    responseTime: "Moins de 4h",
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
    skills: ["Social Media", "Canva", "Analytics", "Content Creation"],
    verified: true,
    available: true,
    completedJobs: 52,
    description: "Community Manager expérimentée, je gère vos réseaux sociaux et développe votre présence en ligne.",
    languages: ["Français"],
    responseTime: "Moins de 2h",
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
    skills: ["Sage", "Excel", "Fiscalité", "Audit", "Conseil"],
    verified: true,
    available: true,
    completedJobs: 78,
    description: "Expert comptable diplômé avec une expertise en fiscalité ivoirienne et OHADA.",
    languages: ["Français"],
    responseTime: "Moins de 3h",
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
    skills: ["Anglais", "Espagnol", "Sous-titrage", "Localisation"],
    verified: true,
    available: true,
    completedJobs: 234,
    description: "Traductrice professionnelle trilingue avec une spécialisation dans la traduction technique et juridique.",
    languages: ["Français", "Anglais", "Espagnol"],
    responseTime: "Moins de 1h",
  },
];

export default function FreelanceProfile() {
  const { id } = useParams();
  const freelancer = freelancers.find((f) => f.id === Number(id));

  if (!freelancer) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">
              Freelance non trouvé
            </h1>
            <p className="text-muted-foreground mb-8">
              Ce profil n'existe pas ou a été supprimé.
            </p>
            <Button asChild>
              <Link to="/freelance">Retour à la liste</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            to="/freelance"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux freelances
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Profile Header */}
              <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-primary-foreground">
                      {freelancer.avatar}
                    </div>
                    {freelancer.available && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl font-display font-bold text-foreground">
                        {freelancer.name}
                      </h1>
                      {freelancer.verified && (
                        <Check className="w-5 h-5 text-secondary" />
                      )}
                    </div>
                    <p className="text-lg text-muted-foreground mb-3">{freelancer.title}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-secondary fill-secondary" />
                        <span className="font-medium">{freelancer.rating}</span>
                        <span className="text-muted-foreground">({freelancer.reviews} avis)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {freelancer.location}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        {freelancer.completedJobs} missions
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
                <h2 className="text-xl font-display font-bold text-foreground mb-4">À propos</h2>
                <p className="text-muted-foreground">{freelancer.description}</p>
              </div>

              {/* Skills */}
              <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
                <h2 className="text-xl font-display font-bold text-foreground mb-4">Compétences</h2>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-muted rounded-lg text-sm font-medium text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
                <h2 className="text-xl font-display font-bold text-foreground mb-4">Langues</h2>
                <div className="flex flex-wrap gap-2">
                  {freelancer.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Contact Card */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-secondary mb-1">
                    {freelancer.hourlyRate} FCFA
                  </div>
                  <span className="text-muted-foreground">/heure</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Disponibilité</span>
                    <span className={freelancer.available ? "text-green-500" : "text-red-500"}>
                      {freelancer.available ? "Disponible" : "Occupé"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Temps de réponse</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {freelancer.responseTime}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/inscription">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contacter
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
