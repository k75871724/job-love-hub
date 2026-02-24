import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  User,
  Settings,
  Briefcase,
  MessageSquare,
  Bell,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Mock data
const mockUser = {
  name: "Kouamé Yao",
  email: "kouame@example.com",
  phone: "+225 07 00 00 00 00",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kouame",
  type: "freelance",
  rating: 4.8,
  reviewCount: 24,
  memberSince: "Janvier 2024",
};

const mockServices = [
  {
    id: 1,
    title: "Développement Web Full-Stack",
    price: "150 000 FCFA",
    status: "active",
    orders: 12,
    rating: 4.9,
  },
  {
    id: 2,
    title: "Design UI/UX Mobile",
    price: "100 000 FCFA",
    status: "active",
    orders: 8,
    rating: 4.7,
  },
  {
    id: 3,
    title: "Formation React.js",
    price: "75 000 FCFA",
    status: "pending",
    orders: 0,
    rating: 0,
  },
];

const mockMessages = [
  {
    id: 1,
    from: "Aminata Diallo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aminata",
    message: "Bonjour, je suis intéressée par votre service de développement...",
    time: "Il y a 2h",
    unread: true,
  },
  {
    id: 2,
    from: "Ibrahim Konaté",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim",
    message: "Merci pour le travail effectué, c'est parfait !",
    time: "Il y a 5h",
    unread: false,
  },
  {
    id: 3,
    from: "Fatou Bamba",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou",
    message: "Pouvez-vous me faire un devis pour un site e-commerce ?",
    time: "Hier",
    unread: true,
  },
];

const mockStats = [
  { label: "Commandes en cours", value: 3, icon: Clock, color: "text-primary" },
  { label: "Commandes terminées", value: 45, icon: CheckCircle, color: "text-secondary" },
  { label: "Revenus ce mois", value: "850K FCFA", icon: Briefcase, color: "text-bara-orange" },
  { label: "Note moyenne", value: "4.8/5", icon: Star, color: "text-yellow-500" },
];

type TabType = "overview" | "services" | "messages" | "settings";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarItems = [
    { id: "overview" as TabType, label: "Vue d'ensemble", icon: User },
    { id: "services" as TabType, label: "Mes services", icon: Briefcase },
    { id: "messages" as TabType, label: "Messages", icon: MessageSquare, badge: 2 },
    { id: "settings" as TabType, label: "Paramètres", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "services":
        return <ServicesTab />;
      case "messages":
        return <MessagesTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <h1 className="text-xl font-display font-bold">Mon Tableau de Bord</h1>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

            {/* Sidebar */}
            <aside
              className={`${
                mobileMenuOpen ? "block" : "hidden"
              } lg:block lg:w-72 shrink-0`}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-2xl border border-border p-6 sticky top-24"
              >
                {/* Profile Summary */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="w-14 h-14 rounded-full bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{mockUser.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{mockUser.email}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{mockUser.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({mockUser.reviewCount} avis)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === item.id
                          ? "bg-secondary text-secondary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>

                {/* Logout */}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all mt-6">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Déconnexion</span>
                </button>
              </motion.div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">{renderContent()}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function OverviewTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Welcome */}
      <div className="bg-gradient-to-r from-bara-dark to-bara-dark/90 rounded-2xl p-6 md:p-8 text-white">
        <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
          Bienvenue, {mockUser.name.split(" ")[0]} ! 👋
        </h1>
        <p className="text-white/80">
          Voici un aperçu de votre activité sur BARA
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Messages récents</CardTitle>
            <Button variant="ghost" size="sm" className="text-secondary">
              Voir tout <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockMessages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
                  msg.unread ? "bg-secondary/5" : "hover:bg-muted"
                }`}
              >
                <img
                  src={msg.avatar}
                  alt={msg.from}
                  className="w-10 h-10 rounded-full bg-muted shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground truncate">{msg.from}</p>
                  {msg.unread && (
                      <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Services */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Mes services actifs</CardTitle>
            <Button variant="ghost" size="sm" className="text-secondary">
              Gérer <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockServices
              .filter((s) => s.status === "active")
              .slice(0, 3)
              .map((service) => (
                <div
                  key={service.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{service.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{service.orders} commandes</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {service.rating}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-secondary shrink-0">{service.price}</p>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

function ServicesTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Mes services</h2>
          <p className="text-muted-foreground">Gérez vos services et leurs paramètres</p>
        </div>
        <Button variant="cta" className="gap-2">
          <Plus className="w-5 h-5" />
          <span>Ajouter un service</span>
        </Button>
      </div>

      <div className="grid gap-4">
        {mockServices.map((service) => (
          <Card key={service.id} className="border-border">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-bara-orange-light flex items-center justify-center shrink-0">
                  <Briefcase className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{service.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        service.status === "active"
                          ? "bg-secondary/20 text-secondary"
                          : "bg-yellow-500/20 text-yellow-600"
                      }`}
                    >
                      {service.status === "active" ? "Actif" : "En attente"}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-secondary">{service.price}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{service.orders} commandes</span>
                    {service.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {service.rating}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:ml-auto">
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}

function MessagesTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Messages</h2>
        <p className="text-muted-foreground">Vos conversations avec les clients</p>
      </div>

      <Card className="border-border">
        <CardContent className="p-0 divide-y divide-border">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-4 p-4 md:p-6 cursor-pointer transition-colors ${
                msg.unread ? "bg-secondary/5" : "hover:bg-muted"
              }`}
            >
              <img
                src={msg.avatar}
                alt={msg.from}
                className="w-12 h-12 rounded-full bg-muted shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{msg.from}</p>
                {msg.unread && (
                      <span className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{msg.time}</span>
                </div>
                <p className="text-muted-foreground mt-1 line-clamp-2">{msg.message}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 hidden sm:block" />
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SettingsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Paramètres</h2>
        <p className="text-muted-foreground">Gérez votre profil et vos préférences</p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <img
              src={mockUser.avatar}
              alt={mockUser.name}
              className="w-20 h-20 rounded-full bg-muted"
            />
            <div>
              <Button variant="outline">Changer la photo</Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nom complet
              </label>
              <input
                type="text"
                defaultValue={mockUser.name}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue={mockUser.email}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                defaultValue={mockUser.phone}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Membre depuis
              </label>
              <input
                type="text"
                defaultValue={mockUser.memberSince}
                disabled
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="cta">Enregistrer les modifications</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Notifications par email</p>
              <p className="text-sm text-muted-foreground">
                Recevez des emails pour les nouvelles commandes
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Notifications push</p>
              <p className="text-sm text-muted-foreground">
                Recevez des notifications sur votre appareil
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
