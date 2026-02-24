import { motion } from "framer-motion";

import orangeLogo from "@/assets/partners/orange.svg";
import mtnMomoLogo from "@/assets/partners/mtn-momo.svg";
import waveLogo from "@/assets/partners/wave.png";
import moovLogo from "@/assets/partners/moov.ico";

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
      className="h-7 w-auto max-w-[140px] object-contain"
    />
  );
}

export function PartnersSection() {
  return (
    <section className="py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-muted-foreground font-medium">Paiement sécurisé via</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-16"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center justify-center px-6 py-3 rounded-xl bg-card border border-border shadow-soft hover:shadow-card transition-shadow"
            >
              <PartnerLogo partner={partner} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
