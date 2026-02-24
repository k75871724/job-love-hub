import { motion } from "framer-motion";

const partners = [
  { name: "Orange Money", logo: "🟠" },
  { name: "MTN Mobile Money", logo: "🟡" },
  { name: "Wave", logo: "🌊" },
  { name: "Moov Money", logo: "🔵" },
];

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
          <p className="text-muted-foreground font-medium">
            Paiement sécurisé via
          </p>
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
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border shadow-soft hover:shadow-card transition-shadow"
            >
              <span className="text-2xl">{partner.logo}</span>
              <span className="font-semibold text-foreground">{partner.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
