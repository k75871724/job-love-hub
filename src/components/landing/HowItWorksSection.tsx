import { motion } from "framer-motion";
import { UserPlus, Search, MessageSquare, Wallet, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Créez votre compte",
    description: "Inscrivez-vous gratuitement en quelques secondes avec votre email ou téléphone.",
    color: "bg-bara-forest",
  },
  {
    icon: Search,
    title: "Trouvez un prestataire",
    description: "Parcourez les profils, comparez les avis et trouvez le professionnel idéal.",
    color: "bg-secondary",
  },
  {
    icon: MessageSquare,
    title: "Échangez et négociez",
    description: "Discutez directement avec le prestataire pour définir les détails de votre projet.",
    color: "bg-bara-gold",
  },
  {
    icon: Wallet,
    title: "Payez en toute sécurité",
    description: "Réglez via Mobile Money (Orange, MTN, Wave). Votre argent est sécurisé.",
    color: "bg-bara-earth",
  },
  {
    icon: CheckCircle,
    title: "Validez et notez",
    description: "Une fois satisfait, validez le travail et laissez un avis pour aider la communauté.",
    color: "bg-primary",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Comment ça marche
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Simple, rapide,{" "}
            <span className="text-gradient">efficace</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            En 5 étapes simples, trouvez le prestataire parfait et réalisez votre projet.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-bara-forest via-secondary to-primary hidden md:block" />

          {/* Steps */}
          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 lg:gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Step Number & Icon */}
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center shadow-card`}>
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-current flex items-center justify-center text-sm font-bold text-foreground shadow-soft">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 bg-card rounded-xl p-6 shadow-soft border border-border lg:max-w-md ${
                  index % 2 === 0 ? 'lg:text-left' : 'lg:text-right lg:ml-auto'
                }`}>
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
    </section>
  );
}
