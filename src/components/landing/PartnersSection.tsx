import { motion } from "framer-motion";

import orangeLogo from "@/assets/partners/orange.svg";
import mtnMomoLogo from "@/assets/partners/mtn-momo.svg";
import waveLogo from "@/assets/partners/wave.png";
import moovLogo from "@/assets/partners/moov.svg";

type Partner = {
  name: string;
  logoSrc?: string;
  logoAlt?: string;
};

const partners: Partner[] = [
  {
    name: "Orange Money",
    logoSrc: orangeLogo,
    logoAlt: "Logo Orange Money",
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
    logoSrc: moovLogo,
    logoAlt: "Logo Moov Money",
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
      className="h-8 w-auto max-w-[160px] object-contain"
    />
  );
}

export function PartnersSection() {
  return (
    <section className="relative overflow-hidden py-20 border-y border-border bg-mesh">
      <div className="absolute inset-0 pattern-dots opacity-60" aria-hidden="true" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display text-foreground">
            Paiement sécurisé via
          </h2>
          <p className="mt-3 text-muted-foreground font-medium max-w-2xl mx-auto">
            Vos transactions sont traitées via des partenaires Mobile Money reconnus.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass rounded-3xl p-6 md:p-8 shadow-card"
        >
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index }}
                className="hover-lift flex items-center justify-center px-6 py-4 rounded-2xl bg-card/70 border border-border/70 shadow-soft"
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
