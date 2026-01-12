import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Server, 
  Bot, 
  Activity, 
  FileText, 
  Bell, 
  Shield,
  Zap,
  RefreshCw,
  CheckCircle2,
  Clock
} from "lucide-react";

const architectureFeatures = [
  {
    icon: Server,
    title: "Architecture simplifiée",
    description: "Une architecture moderne et robuste, conçue pour la fiabilité et la performance sans complexité inutile."
  },
  {
    icon: Bot,
    title: "Agents IA + Fallback",
    description: "Des agents IA intelligents avec basculement automatique vers un traitement manuel en cas de doute."
  },
  {
    icon: Activity,
    title: "Monitoring temps réel",
    description: "Surveillance continue de tous les composants avec alertes automatiques en cas d'anomalie."
  },
  {
    icon: FileText,
    title: "Logs IA complets",
    description: "Traçabilité complète des décisions IA : requête, analyse, décision, justification."
  },
  {
    icon: Bell,
    title: "Relances automatiques",
    description: "Système de relances intelligentes pour les demandes en attente ou les prestataires non réactifs."
  },
  {
    icon: Shield,
    title: "Résilience intégrée",
    description: "Redondance des composants critiques et plan de continuité d'activité."
  }
];

const slaMetrics = [
  { metric: "99,5%", label: "Disponibilité garantie", description: "SLA contractuel" },
  { metric: "< 2s", label: "Temps de réponse", description: "95ème percentile" },
  { metric: "48h", label: "Déploiement", description: "Mise en service complète" },
  { metric: "24/7", label: "Monitoring", description: "Surveillance continue" }
];

const ArchitecturePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Server className="h-4 w-4" />
                Infrastructure & Fiabilité
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Architecture & Fiabilité
              </h1>
              <p className="text-xl text-background/80 max-w-2xl mx-auto">
                Une infrastructure moderne, résiliente et performante pour garantir 
                la continuité de service de vos opérations.
              </p>
            </div>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Architecture technique
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une architecture pensée pour la fiabilité, la sécurité et la performance.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {architectureFeatures.map((feature, index) => (
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

        {/* SLA Section */}
        <section className="py-20 gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Engagements de service
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                Des niveaux de service contractuels pour garantir la qualité.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {slaMetrics.map((item, index) => (
                <div 
                  key={item.label} 
                  className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl md:text-5xl font-display font-bold mb-2">
                    {item.metric}
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    {item.label}
                  </div>
                  <p className="text-sm text-primary-foreground/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Fallback */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium mb-4">
                  <Bot className="h-4 w-4" />
                  Intelligence artificielle
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  IA supervisée avec fallback automatique
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Nos agents IA sont conçus pour maximiser l'automatisation tout en garantissant 
                  la qualité grâce à un système de supervision intelligent.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                    <div>
                      <span className="font-medium text-foreground">Traitement automatique</span>
                      <p className="text-muted-foreground text-sm">Les demandes claires sont qualifiées et assignées automatiquement</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                    <div>
                      <span className="font-medium text-foreground">Escalade intelligente</span>
                      <p className="text-muted-foreground text-sm">Les cas ambigus sont signalés pour validation humaine</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                    <div>
                      <span className="font-medium text-foreground">Apprentissage continu</span>
                      <p className="text-muted-foreground text-sm">L'IA s'améliore grâce aux validations et corrections</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-muted/30 rounded-2xl p-8 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Flux de décision IA</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <div className="font-medium text-foreground">Analyse de la demande</div>
                      <div className="text-sm text-muted-foreground">Classification et extraction d'informations</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <div className="font-medium text-foreground">Score de confiance</div>
                      <div className="text-sm text-muted-foreground">Évaluation de la certitude de l'IA</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                    <div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center text-sm font-bold">✓</div>
                    <div>
                      <div className="font-medium text-foreground">Décision automatique ou escalade</div>
                      <div className="text-sm text-muted-foreground">Traitement ou transfert selon le score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Degraded Mode */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Mode dégradé & Continuité
                </h2>
                <p className="text-lg text-muted-foreground">
                  En cas d'incident, LogisConnect continue de fonctionner avec des fonctionnalités essentielles.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <RefreshCw className="h-5 w-5 text-warning" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">Mode dégradé</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Réception des demandes maintenue</li>
                      <li>• Notifications différées</li>
                      <li>• Traitement manuel possible</li>
                      <li>• Historique préservé</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-success" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">Reprise rapide</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Objectif de reprise : 15 min</li>
                      <li>• Traitement automatique du backlog</li>
                      <li>• Aucune perte de données</li>
                      <li>• Communication proactive</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                Déploiement en 48 heures
              </h3>
              <p className="text-muted-foreground">
                Notre processus de déploiement optimisé permet une mise en service rapide 
                avec configuration personnalisée, import des données existantes et formation des équipes.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArchitecturePage;
