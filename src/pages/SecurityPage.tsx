import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Server, 
  Lock, 
  FileCheck, 
  Eye, 
  Clock,
  Database,
  UserCheck,
  Bot,
  FileText
} from "lucide-react";

const securityFeatures = [
  {
    icon: Server,
    title: "Hébergement en France",
    description: "Toutes les données sont hébergées sur des serveurs localisés en France, garantissant la souveraineté de vos données."
  },
  {
    icon: Lock,
    title: "Chiffrement des données",
    description: "Chiffrement AES-256 pour les données au repos et TLS 1.3 pour les données en transit."
  },
  {
    icon: Database,
    title: "Sauvegardes automatiques",
    description: "Sauvegardes quotidiennes avec rétention de 30 jours et possibilité de restauration à tout moment."
  },
  {
    icon: FileCheck,
    title: "Journalisation complète",
    description: "Chaque action est tracée avec horodatage, utilisateur et détails pour un audit complet."
  },
  {
    icon: Shield,
    title: "Conformité RGPD",
    description: "Respect total du Règlement Général sur la Protection des Données avec DPO désigné."
  },
  {
    icon: Clock,
    title: "Conservation limitée",
    description: "Politique de conservation des données stricte avec suppression automatique selon les durées légales."
  }
];

const commitments = [
  {
    icon: Eye,
    title: "Transparence totale",
    description: "Vous savez exactement quelles données sont collectées, comment elles sont utilisées et qui y a accès."
  },
  {
    icon: UserCheck,
    title: "Données minimales",
    description: "Nous ne collectons que les données strictement nécessaires au fonctionnement du service."
  },
  {
    icon: Bot,
    title: "IA supervisée",
    description: "Nos agents IA sont supervisés par des experts humains pour garantir la qualité et la pertinence des réponses."
  },
  {
    icon: FileText,
    title: "Droit d'accès",
    description: "Vos locataires peuvent exercer leurs droits d'accès, de rectification et de suppression à tout moment."
  }
];

const SecurityPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                Sécurité & Conformité
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Sécurité & RGPD
              </h1>
              <p className="text-xl text-background/80 max-w-2xl mx-auto">
                La protection des données de vos locataires est notre priorité absolue. 
                LogisConnect respecte les plus hauts standards de sécurité et de conformité.
              </p>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Mesures de sécurité
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une infrastructure sécurisée de bout en bout pour protéger vos données.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
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

        {/* RGPD Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Conformité RGPD
                </h2>
                <p className="text-lg text-muted-foreground">
                  LogisConnect est conçu dans le respect total du Règlement Général sur la Protection des Données.
                </p>
              </div>
              
              <div className="bg-background rounded-2xl p-8 border border-border mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Données collectées</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Données locataires</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Nom et prénom</li>
                      <li>• Coordonnées (téléphone, email)</li>
                      <li>• Adresse du logement</li>
                      <li>• Description de la demande</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Données techniques</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Logs de connexion</li>
                      <li>• Historique des actions</li>
                      <li>• Métadonnées des fichiers</li>
                      <li>• Aucune donnée sensible stockée</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-2xl p-8 border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-6">Durées de conservation</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-foreground">Demandes en cours</span>
                    <span className="text-muted-foreground">Durée du traitement + 1 an</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-foreground">Demandes clôturées</span>
                    <span className="text-muted-foreground">5 ans (obligation légale)</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-foreground">Logs techniques</span>
                    <span className="text-muted-foreground">1 an</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-foreground">Données de facturation</span>
                    <span className="text-muted-foreground">10 ans (obligation comptable)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Nos engagements
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des principes fondamentaux qui guident notre approche de la sécurité et de la confidentialité.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {commitments.map((commitment, index) => (
                <Card key={commitment.title} className="p-6 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-0 flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                      <commitment.icon className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{commitment.title}</h3>
                      <p className="text-muted-foreground">{commitment.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact DPO */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                Contact DPO
              </h3>
              <p className="text-muted-foreground mb-4">
                Pour toute question relative à la protection de vos données personnelles, 
                vous pouvez contacter notre Délégué à la Protection des Données.
              </p>
              <a 
                href="mailto:dpo@logisconnect.fr" 
                className="text-primary font-medium hover:underline"
              >
                dpo@logisconnect.fr
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SecurityPage;
