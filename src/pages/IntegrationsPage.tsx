import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Download, 
  Code, 
  Plug, 
  Database, 
  RefreshCw, 
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Webhook
} from "lucide-react";

const integrationMethods = [
  {
    icon: FileSpreadsheet,
    title: "Export CSV",
    description: "Exportez vos données au format CSV pour les intégrer dans vos outils existants.",
    features: [
      "Export manuel ou automatique",
      "Filtrage par date, statut, type",
      "Compatible Excel et tableurs",
      "Historique des exports"
    ]
  },
  {
    icon: Code,
    title: "API REST",
    description: "Une API moderne et documentée pour les intégrations avancées.",
    features: [
      "Authentification sécurisée",
      "Documentation complète",
      "Endpoints CRUD",
      "Webhooks temps réel"
    ]
  },
  {
    icon: Plug,
    title: "Connecteurs futurs",
    description: "Des connecteurs natifs en développement pour les principaux ERP du marché.",
    features: [
      "Aareon (en développement)",
      "ULIS (en développement)", 
      "IKOS (en développement)",
      "Demandes sur mesure"
    ]
  }
];

const compatibleSystems = [
  { name: "Aareon", status: "Compatible via export" },
  { name: "ULIS", status: "Compatible via export" },
  { name: "IKOS", status: "Compatible via export" },
  { name: "Imowell", status: "Compatible via export" },
  { name: "Sopra", status: "Compatible via export" },
  { name: "Cassiopae", status: "Compatible via export" }
];

const IntegrationsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Plug className="h-4 w-4" />
                Intégrations
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Intégrations & Connecteurs
              </h1>
              <p className="text-xl text-background/80 max-w-2xl mx-auto">
                LogisConnect s'intègre facilement à votre environnement existant 
                sans projet informatique complexe.
              </p>
            </div>
          </div>
        </section>

        {/* Integration Methods */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Méthodes d'intégration
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Plusieurs options selon vos besoins et votre maturité technique.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {integrationMethods.map((method, index) => (
                <Card key={method.title} variant="elevated" className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{method.title}</h3>
                    <p className="text-muted-foreground mb-4">{method.description}</p>
                    <ul className="space-y-2">
                      {method.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Non-Intrusive */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium mb-4">
                  <RefreshCw className="h-4 w-4" />
                  Approche progressive
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Intégration non intrusive
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  LogisConnect fonctionne en parallèle de vos systèmes existants. 
                  Vous conservez vos outils actuels et synchronisez les données progressivement.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                    <div>
                      <span className="font-medium text-foreground">Pas de migration de données</span>
                      <p className="text-muted-foreground text-sm">Démarrez avec les nouvelles demandes uniquement</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                    <div>
                      <span className="font-medium text-foreground">Pas de remplacement de SI</span>
                      <p className="text-muted-foreground text-sm">LogisConnect complète votre infrastructure</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                    <div>
                      <span className="font-medium text-foreground">Synchronisation progressive</span>
                      <p className="text-muted-foreground text-sm">Intégrez à votre rythme selon vos priorités</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-background rounded-2xl p-8 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Compatibilité ERP</h3>
                <div className="space-y-3">
                  {compatibleSystems.map((system) => (
                    <div key={system.name} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                      <span className="font-medium text-foreground">{system.name}</span>
                      <span className="text-sm text-success flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        {system.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  API REST & Webhooks
                </h2>
                <p className="text-lg text-muted-foreground">
                  Pour les intégrations avancées, notre API offre un accès complet aux fonctionnalités.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">API REST</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Endpoints pour demandes, prestataires, locataires</li>
                      <li>• Authentification OAuth 2.0</li>
                      <li>• Rate limiting adapté</li>
                      <li>• Documentation Swagger</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Webhook className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">Webhooks</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Notifications en temps réel</li>
                      <li>• Événements : création, mise à jour, clôture</li>
                      <li>• Retry automatique</li>
                      <li>• Signature sécurisée</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Besoin d'une intégration spécifique ?
              </h2>
              <p className="text-muted-foreground mb-6">
                Notre équipe technique peut développer des connecteurs sur mesure 
                pour vos besoins spécifiques.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/demo" className="gap-2">
                  Discuter de vos besoins
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

export default IntegrationsPage;
