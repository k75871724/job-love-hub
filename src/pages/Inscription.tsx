import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Phone, User, Briefcase, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const userTypes = [
  {
    id: "client",
    title: "Client",
    description: "Je cherche des services ou des prestataires",
    icon: User,
  },
  {
    id: "freelance",
    title: "Freelance",
    description: "Je propose des services digitaux",
    icon: Briefcase,
  },
  {
    id: "prestataire",
    title: "Prestataire local",
    description: "Je propose des services de proximité",
    icon: MapPin,
  },
];

export default function Inscription() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration data:", { ...formData, userType: selectedType });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Créez votre compte <span className="text-secondary">BARA</span>
              </h1>
              <p className="text-muted-foreground">
                Rejoignez la communauté et accédez à des milliers de services
              </p>
            </motion.div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-10">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step >= s
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  <span className={`hidden sm:inline text-sm ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                    {s === 1 ? "Type de compte" : "Informations"}
                  </span>
                  {s < 2 && <div className="w-12 h-0.5 bg-muted" />}
                </div>
              ))}
            </div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl shadow-card border border-border p-8"
            >
              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  /* Step 1: Choose User Type */
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">
                      Je suis un(e)...
                    </Label>
                    <div className="grid gap-4">
                      {userTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type.id)}
                          className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                            selectedType === type.id
                              ? "border-secondary bg-secondary/5"
                              : "border-border hover:border-secondary/50"
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              selectedType === type.id
                                ? "bg-secondary text-secondary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <type.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{type.title}</p>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                          {selectedType === type.id && (
                            <Check className="w-5 h-5 text-secondary" />
                          )}
                        </button>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="cta"
                      size="lg"
                      className="w-full mt-6"
                      disabled={!selectedType}
                      onClick={() => setStep(2)}
                    >
                      Continuer
                    </Button>
                  </div>
                ) : (
                  /* Step 2: Personal Information */
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="fullName">Nom complet</Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="Kouamé Yao"
                          className="pl-10"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="kouame@example.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+225 07 00 00 00 00"
                          className="pl-10"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password">Mot de passe</Label>
                      <div className="relative mt-2">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <div className="relative mt-2">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={() => setStep(1)}
                      >
                        Retour
                      </Button>
                      <Button type="submit" variant="cta" size="lg" className="flex-1">
                        Créer mon compte
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">ou</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full" size="lg">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continuer avec Google
                </Button>
              </div>

              {/* Login Link */}
              <p className="text-center text-muted-foreground mt-8">
                Déjà inscrit ?{" "}
                <Link to="/connexion" className="text-secondary font-semibold hover:underline">
                  Se connecter
                </Link>
              </p>
            </motion.div>

            {/* Terms */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              En créant un compte, vous acceptez nos{" "}
              <Link to="/conditions" className="text-secondary hover:underline">
                Conditions d'utilisation
              </Link>{" "}
              et notre{" "}
              <Link to="/confidentialite" className="text-secondary hover:underline">
                Politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
