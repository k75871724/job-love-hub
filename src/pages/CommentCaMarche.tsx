import { motion } from "framer-motion";
import { UserPlus, Search, MessageSquare, Wallet, CheckCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: UserPlus,
    title: "Créez votre compte",
    description: "Inscrivez-vous gratuitement en quelques secondes avec votre email ou téléphone. C'est simple et rapide.",
    color: "bg-primary",
  },
  {
    icon: Search,
    title: "Trouvez un prestataire",
    description: "Parcourez les profils, comparez les avis et trouvez le professionnel idéal pour votre projet.",
    color: "bg-secondary",
  },
  {
    icon: MessageSquare,
    title: "Échangez et négociez",
    description: "Discutez directement avec le prestataire pour définir les détails et le prix de votre projet.",
    color: "bg-bara-mint",
  },
  {
    icon: Wallet,
    title: "Payez en toute sécurité",
    description: "Réglez via Mobile Money (Orange, MTN, Wave). Votre argent est sécurisé jusqu'à validation.",
    color: "bg-bara-coral",
  },
  {
    icon: CheckCircle,
    title: "Validez et notez",
    description: "Une fois satisfait, validez le travail et laissez un avis pour aider la communauté.",
    color: "bg-primary",
  },
];

export default function CommentCaMarche() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
                Comment ça marche ?
              </h1>
              <p className="text-lg text-primary-foreground/80">
                En 5 étapes simples, trouvez le prestataire parfait et réalisez votre projet.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Timeline */}
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-bara-coral hidden md:block" />

                {/* Steps */}
                <div className="space-y-12">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative flex items-start gap-6 md:gap-8"
                    >
                      {/* Step Number & Icon */}
                      <div className="flex-shrink-0 relative z-10">
                        <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center shadow-card`}>
                          <step.icon className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold text-foreground shadow-soft">
                          {index + 1}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-card rounded-xl p-6 shadow-soft border border-border">
                        <h3 className="text-xl font-display font-bold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Prêt à commencer ?
              </h2>
              <p className="text-muted-foreground mb-8">
                Rejoignez des milliers d'utilisateurs qui font confiance à BARA.
              </p>
              <Button variant="default" size="lg" asChild>
                <Link to="/inscription">
                  Créer mon compte gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
