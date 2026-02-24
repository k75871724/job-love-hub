import { motion } from "framer-motion";
import { Lock, ShieldCheck, BadgeCheck } from "lucide-react";

import orangeLogo from "@/assets/partners/orange-official.svg";
import mtnMomoLogo from "@/assets/partners/mtn-momo.svg";
import waveLogo from "@/assets/partners/wave-transparent.png";
import moovMoneyLogo from "@/assets/partners/moov-money-flooz.png";

type Partner = {
  name: string;
  logoSrc?: string;
  logoAlt?: string;
};

const partners: Partner[] = [
  {
    name: "Orange Money",
    logoSrc: orangeLogo,
    logoAlt: "Logo Orange",
  },
  {
    name: "MTN Mobile Money",
    logoSrc: mtnMomoLogo,
    logoAlt: "Logo MTN Mobile Money (MoMo)",
  },
  {
    name: "Wave",
    logoSrc: waveLogo,
    logoAlt: "Logo Wave",
  },
  {
    name: "Moov Money",
    logoSrc: moovMoneyLogo,
    logoAlt: "Logo Moov Money (Flooz)",
  },
];

function PartnerLogo({ partner }: { partner: Partner }) {
  if (!partner.logoSrc) {
    return (
      <span className="text-sm font-semibold text-foreground">
        {partner.name}
      </span>
    );
  }

  return (
    <img
      src={partner.logoSrc}
      alt={partner.logoAlt ?? partner.name}
      loading="lazy"
      decoding="async"
      className="h-9 w-auto max-w-[180px] object-contain"
    />
  );
}

function TrustPill({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Lock;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/60 px-4 py-3 shadow-soft">
      <div className="mt-0.5 rounded-xl border border-border/60 bg-background/60 p-2">
        <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-tight text-foreground">
          {title}
        </p>
        <p className="mt-1 text-sm leading-snug text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export function PartnersSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-background">
      {/* Top wave that follows the Hero bottom wave + border */}
      <div className="absolute top-0 left-0 right-0 -translate-y-px" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[72px] md:h-[88px]"
          preserveAspectRatio="none"
        >
          {/* Fill to match section background */}
          <path
            d="M0 0L60 10C120 20 240 40 360 45C480 50 600 40 720 35C840 30 960 30 1080 35C1200 40 1320 50 1380 55L1440 60V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z"
            fill="hsl(var(--background))"
          />
          {/* Border line that visually connects the two sections */}
          <path
            d="M0 0L60 10C120 20 240 40 360 45C480 50 600 40 720 35C840 30 960 30 1080 35C1200 40 1320 50 1380 55L1440 60"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Ambient background */}
      <div className="absolute inset-0 bg-mesh" aria-hidden="true" />
      <div className="absolute inset-0 pattern-dots opacity-60" aria-hidden="true" />

      <div className="container mx-auto px-4 relative">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 shadow-soft">
            <BadgeCheck className="h-4 w-4 text-foreground" aria-hidden="true" />
            <span className="text-sm font-semibold text-foreground">
              Paiement
            </span>
            <span className="text-sm text-muted-foreground">
              sécurisé & reconnu
            </span>
          </div>

          <h2 className="mt-5 text-3xl md:text-4xl font-display text-foreground">
            Paiement sécurisé via
            <span className="text-gradient"> Mobile Money</span>
          </h2>
          <p className="mt-3 text-muted-foreground font-medium max-w-2xl mx-auto">
            Nous nous appuyons sur des partenaires de paiement largement utilisés en Côte d’Ivoire,
            avec une expérience fluide et des confirmations rapides.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="mt-10 glass rounded-3xl p-6 md:p-8 shadow-card"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TrustPill
              icon={Lock}
              title="Données protégées"
              description="Chiffrement et bonnes pratiques de sécurité de bout en bout."
            />
            <TrustPill
              icon={ShieldCheck}
              title="Anti‑fraude"
              description="Réduction des risques via contrôles et validations de paiement."
            />
            <TrustPill
              icon={BadgeCheck}
              title="Confirmation rapide"
              description="Suivi clair du statut pour éviter les incertitudes côté client."
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * index }}
                className="hover-lift flex items-center justify-center px-7 py-5 rounded-2xl bg-card/70 border border-border/70 shadow-soft"
                aria-label={partner.name}
              >
                <PartnerLogo partner={partner} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
