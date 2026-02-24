import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Smartphone,
    title: "Mobile Money",
    description: "Orange, MTN, Wave",
  },
  {
    icon: Shield,
    title: "100% Sécurisé",
    description: "Paiements protégés",
  },
  {
    icon: Zap,
    title: "Instantané",
    description: "Mise en relation rapide",
  },
];

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary via-secondary to-bara-earth relative overflow-hidden">
      {/* African Pattern */}
      <div className="absolute inset-0 pattern-african opacity-20" />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-32 h-32 rounded-full bg-white/10 blur-3xl"
        animate={{ y: [-20, 20, -20], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[15%] w-40 h-40 rounded-full bg-bara-gold/20 blur-3xl"
        animate={{ y: [20, -20, 20], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bara-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-bara-gold"></span>
            </span>
            <span className="text-sm font-medium text-primary-foreground">
              +1000 nouveaux inscrits cette semaine
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6"
          >
            Prêt à rejoindre la{" "}
            <span className="text-bara-gold">communauté BARA ?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            Que vous soyez client ou prestataire, inscrivez-vous gratuitement 
            et commencez dès aujourd'hui.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 lg:gap-10 mb-10"
          >
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3 text-primary-foreground">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-bara-gold" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">{feature.title}</p>
                  <p className="text-sm text-primary-foreground/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/inscription">
                Créer mon compte gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/contact">
                Contacter l'équipe
              </Link>
            </Button>
          </motion.div>

          {/* Trust Badge */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-primary-foreground/60"
          >
            Inscription gratuite • Aucune carte bancaire requise • Annulation possible à tout moment
          </motion.p>
        </div>
      </div>
    </section>
  );
}
