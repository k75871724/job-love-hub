import { motion } from "framer-motion";
import { Briefcase, MapPin, GraduationCap, Truck, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Briefcase,
    title: "Freelance",
    description: "Développeurs, designers, rédacteurs... Trouvez le talent qu'il vous faut pour vos projets digitaux.",
    color: "from-primary to-bara-orange-light",
    href: "/freelance",
    stats: "5K+ freelances",
  },
  {
    icon: MapPin,
    title: "Services de Proximité",
    description: "Électriciens, plombiers, coiffeurs... Des professionnels vérifiés près de chez vous.",
    color: "from-bara-forest to-bara-forest-light",
    href: "/proximite",
    stats: "8K+ prestataires",
  },
  {
    icon: GraduationCap,
    title: "Répétiteurs & Formations",
    description: "Cours particuliers, formations professionnelles. Apprenez avec les meilleurs enseignants.",
    color: "from-secondary to-bara-gold",
    href: "/repetiteurs",
    stats: "2K+ enseignants",
  },
  {
    icon: Truck,
    title: "Livraison",
    description: "Produits vivriers, repas, colis. Livraison rapide partout à Abidjan et dans les grandes villes.",
    color: "from-bara-earth to-bara-forest",
    href: "/livraison",
    stats: "500+ livreurs",
  },
  {
    icon: Building2,
    title: "Emplois & Concours",
    description: "Offres d'emploi, concours administratifs. Restez informé des opportunités professionnelles.",
    color: "from-primary to-secondary",
    href: "/emplois",
    stats: "1K+ offres actives",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
};

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-african opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Nos Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Une plateforme,{" "}
            <span className="text-gradient">tous vos besoins</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Que vous cherchiez un freelance pour votre projet digital ou un artisan près de chez vous, 
            BARA vous connecte aux meilleurs professionnels de Côte d'Ivoire.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className={`group ${index === 4 ? 'lg:col-span-1 lg:col-start-2' : ''}`}
            >
              <Link 
                to={service.href}
                className="block h-full bg-card rounded-2xl border border-border p-6 lg:p-8 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {service.stats}
                  </span>
                  <div className="flex items-center gap-2 text-secondary font-medium group-hover:gap-3 transition-all">
                    <span>Explorer</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
