import { motion } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Gratuit",
    icon: Star,
    price: "0",
    description: "Pour découvrir la plateforme",
    features: [
      "Accès aux profils des prestataires",
      "Messagerie limitée (5/mois)",
      "Filtres de recherche basiques",
      "Support par email",
    ],
    cta: "Commencer gratuitement",
    popular: false,
    variant: "outline" as const,
  },
  {
    name: "Pro",
    icon: Zap,
    price: "5 000",
    description: "Pour les utilisateurs réguliers",
    features: [
      "Tout du plan Gratuit",
      "Messagerie illimitée",
      "Badge vérifié sur profil",
      "Mise en avant dans les résultats",
      "Support prioritaire",
      "Statistiques de profil",
    ],
    cta: "Essayer Pro",
    popular: true,
    variant: "default" as const,
  },
  {
    name: "Business",
    icon: Crown,
    price: "15 000",
    description: "Pour les entreprises",
    features: [
      "Tout du plan Pro",
      "Compte multi-utilisateurs",
      "API d'intégration",
      "Facturation personnalisée",
      "Account manager dédié",
      "Formation personnalisée",
      "SLA garanti",
    ],
    cta: "Contacter les ventes",
    popular: false,
    variant: "outline" as const,
  },
];

const faqs = [
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement.",
  },
  {
    question: "Y a-t-il des frais cachés ?",
    answer: "Non, tous nos tarifs sont transparents. Vous ne payez que l'abonnement choisi, sans frais supplémentaires.",
  },
  {
    question: "Comment fonctionne le paiement ?",
    answer: "Nous acceptons les paiements via Mobile Money (Orange Money, MTN, Wave) et les cartes bancaires.",
  },
  {
    question: "Puis-je essayer avant de m'engager ?",
    answer: "Oui, le plan Gratuit vous permet de découvrir la plateforme sans engagement.",
  },
];

export default function Tarifs() {
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
                Tarifs simples et transparents
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Choisissez le plan qui correspond à vos besoins. Pas de surprise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-card rounded-2xl border p-8 ${
                    plan.popular
                      ? "border-secondary shadow-elevated scale-105"
                      : "border-border shadow-soft"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
                      Populaire
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                      plan.popular ? "bg-secondary/20" : "bg-muted"
                    }`}>
                      <plan.icon className={`w-7 h-7 ${plan.popular ? "text-secondary" : "text-foreground"}`} />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground"> FCFA/mois</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant={plan.variant} className="w-full" asChild>
                    <Link to="/inscription">{plan.cta}</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Questions fréquentes
              </h2>
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
