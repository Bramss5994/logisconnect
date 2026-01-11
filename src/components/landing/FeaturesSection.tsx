import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  MessageCircle, 
  BarChart3, 
  Shield,
  Zap,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard centralisé",
    description: "Vue d'ensemble en temps réel de toutes les demandes, interventions et statistiques.",
  },
  {
    icon: MessageCircle,
    title: "Communication multicanal",
    description: "WhatsApp, SMS, email et formulaire web intégrés pour une communication fluide.",
  },
  {
    icon: Zap,
    title: "Automatisation intelligente",
    description: "Qualification, priorisation et routage automatique des demandes.",
  },
  {
    icon: Wrench,
    title: "Gestion prestataires",
    description: "Carnet d'adresses, assignation automatique et suivi des interventions.",
  },
  {
    icon: Clock,
    title: "Relances automatiques",
    description: "Notifications et rappels automatisés pour ne jamais oublier une demande.",
  },
  {
    icon: BarChart3,
    title: "Reporting avancé",
    description: "Tableaux de bord, analyses IA et exports pour piloter votre activité.",
  },
  {
    icon: Users,
    title: "Multi-utilisateurs",
    description: "Gestion des rôles et permissions pour toute votre équipe.",
  },
  {
    icon: Shield,
    title: "Sécurité & RGPD",
    description: "Données hébergées en France, conformité RGPD garantie.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Fonctionnalités
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-6">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-lg text-muted-foreground">
            Une plateforme complète pour digitaliser et automatiser la gestion 
            de vos demandes locataires.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:-translate-y-2 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
