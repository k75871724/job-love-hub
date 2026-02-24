import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Kouamé Yao",
    role: "Entrepreneur",
    location: "Abidjan, Cocody",
    avatar: "KY",
    rating: 5,
    text: "BARA m'a permis de trouver un développeur freelance excellent pour mon application mobile. Le processus était simple et le paiement via Orange Money très pratique.",
  },
  {
    name: "Fatou Diallo",
    role: "Freelance Designer",
    location: "Abidjan, Marcory",
    avatar: "FD",
    rating: 5,
    text: "En tant que designer freelance, BARA m'a ouvert de nombreuses opportunités. Je reçois des missions régulières et les paiements sont toujours à temps.",
  },
  {
    name: "Adjoua Koffi",
    role: "Mère de famille",
    location: "Abidjan, Yopougon",
    avatar: "AK",
    rating: 5,
    text: "J'ai trouvé un excellent répétiteur pour mes enfants grâce à BARA. Il vient à domicile et les notes ont vraiment progressé. Je recommande !",
  },
  {
    name: "Ibrahim Touré",
    role: "Propriétaire restaurant",
    location: "Abidjan, Plateau",
    avatar: "IT",
    rating: 5,
    text: "Le service de livraison BARA est fiable et rapide. Mes clients sont satisfaits et je peux me concentrer sur la cuisine. Excellent partenariat !",
  },
  {
    name: "Marie-Claire Aka",
    role: "Étudiante",
    location: "Bouaké",
    avatar: "MA",
    rating: 5,
    text: "BARA m'a aidée à trouver un stage grâce à la section Emplois. L'interface est intuitive et j'ai pu postuler facilement depuis mon téléphone.",
  },
  {
    name: "Sékou Bamba",
    role: "Électricien",
    location: "Abidjan, Abobo",
    avatar: "SB",
    rating: 5,
    text: "Depuis que je suis sur BARA, j'ai plus de clients que jamais. La géolocalisation m'aide à trouver des missions près de chez moi. Génial !",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
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
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Ce que disent{" "}
            <span className="text-gradient">nos utilisateurs</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Des milliers d'Ivoiriens font confiance à BARA pour leurs besoins quotidiens.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border relative group hover:shadow-card transition-shadow"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-muted/30 group-hover:text-primary/30 transition-colors" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
