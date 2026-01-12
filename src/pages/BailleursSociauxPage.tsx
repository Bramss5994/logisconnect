import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Users, 
  MapPin, 
  Wrench, 
  Heart, 
  FileText, 
  Shield, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  Zap,
  RefreshCw
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Découpage par quartier",
    description: "Affectez automatiquement les demandes selon la localisation géographique et les secteurs de vos équipes."
  },
  {
    icon: Wrench,
    title: "Gestion des prestataires",
    description: "Assignez les bons prestataires selon le type d'intervention, la disponibilité et la zone géographique."
  },
  {
    icon: Heart,
    title: "Locataires fragiles",
    description: "Identifiez et priorisez les demandes des locataires en situation de fragilité pour un accompagnement adapté."
  },
  {
    icon: FileText,
    title: "Traçabilité complète",
    description: "Historique détaillé de chaque demande : dates, actions, intervenants, délais, communications."
  },
  {
    icon: Shield,
    title: "Conformité réglementaire",
    description: "Respectez les obligations légales du logement social avec des processus audités et documentés."
  },
  {
    icon: Clock,
    title: "Déploiement en 48h",
    description: "Mise en service rapide sans perturbation de vos activités ni formation complexe."
  }
];

const compatibleSystems = [
  "Aareon",
  "ULIS",
  "IKOS",
  "Imowell",
  "Sopra",
  "Cassiopae"
];

const operationalBenefits = [
  {
    metric: "-60%",
    label: "d'appels entrants",
    description: "Les locataires suivent leur demande en autonomie"
  },
  {
    metric: "-40%",
    label: "de délais d'intervention",
    description: "Assignation automatique et suivi proactif"
  },
  {
    metric: "-80%",
    label: "de litiges",
    description: "Traçabilité complète et communication transparente"
  },
  {
    metric: "+100%",
    label: "de traçabilité",
    description: "Chaque action est documentée et archivée"
  }
];

const BailleursSociauxPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                Solution dédiée au logement social
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                LogisConnect pour les Bailleurs Sociaux
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Une solution conçue spécifiquement pour répondre aux enjeux du logement social : 
                volume de demandes, diversité des locataires, exigences réglementaires.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glass" size="xl" asChild>
                  <Link to="/demo" className="gap-2">
                    Demander une démonstration
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Fonctionnalités adaptées au logement social
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Chaque fonctionnalité a été pensée pour les contraintes et les besoins spécifiques des bailleurs sociaux.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={feature.title} variant="elevated" className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium mb-4">
                  <RefreshCw className="h-4 w-4" />
                  Intégration simple
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Aucun changement de SI requis
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  LogisConnect s'intègre à votre environnement existant via des exports simples. 
                  Pas de projet informatique complexe, pas de migration de données.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    Export CSV automatique vers votre ERP
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    API REST disponible pour les intégrations avancées
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    Synchronisation progressive et non intrusive
                  </li>
                </ul>
              </div>
              <div className="bg-background rounded-2xl p-8 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Compatible avec vos outils</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {compatibleSystems.map((system) => (
                    <div key={system} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="font-medium text-foreground">{system}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Benefits */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Avantages opérationnels concrets
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des résultats mesurables dès les premières semaines de déploiement.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {operationalBenefits.map((benefit, index) => (
                <Card key={benefit.label} className="text-center p-6 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-0">
                    <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                      {benefit.metric}
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2">
                      {benefit.label}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Deployment CTA */}
        <section className="py-20 gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Zap className="h-16 w-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Déploiement en 48 heures
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Pas de projet informatique long et coûteux. LogisConnect est opérationnel 
                en 48 heures avec un accompagnement dédié.
              </p>
              <Button variant="glass" size="xl" asChild>
                <Link to="/demo" className="gap-2">
                  Planifier le déploiement
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BailleursSociauxPage;
