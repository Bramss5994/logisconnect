import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Phone, 
  Clock, 
  Users, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  Calculator,
  BarChart3
} from "lucide-react";

const keyMetrics = [
  {
    icon: Phone,
    metric: "-40%",
    label: "d'appels entrants",
    description: "Les locataires suivent leurs demandes en autonomie via WhatsApp ou le portail web."
  },
  {
    icon: Clock,
    metric: "-30%",
    label: "de délais d'intervention",
    description: "Qualification automatique et assignation instantanée aux bons prestataires."
  },
  {
    icon: Users,
    metric: "+25%",
    label: "satisfaction locataire",
    description: "Communication proactive et transparence sur l'avancement des demandes."
  },
  {
    icon: FileText,
    metric: "+100%",
    label: "traçabilité",
    description: "Historique complet de chaque demande accessible en un clic."
  }
];

const beforeAfter = {
  before: [
    "Appels téléphoniques répétitifs",
    "Qualification manuelle chronophage",
    "Affectation des prestataires au cas par cas",
    "Suivi Excel ou papier",
    "Relances manuelles oubliées",
    "Reporting fastidieux",
    "Historique incomplet"
  ],
  after: [
    "Déclaration multicanal 24/7",
    "Qualification IA en 10 secondes",
    "Assignation automatique intelligente",
    "Suivi centralisé temps réel",
    "Relances automatiques programmées",
    "Reporting automatique quotidien",
    "Traçabilité complète auditée"
  ]
};

const roiExample = {
  inputs: [
    { label: "Nombre de logements", value: "5 000" },
    { label: "Demandes par mois", value: "500" },
    { label: "Temps moyen par demande (actuel)", value: "15 min" },
    { label: "Coût horaire chargé", value: "35 €" }
  ],
  savings: [
    { label: "Temps économisé par demande", value: "8 min" },
    { label: "Économie mensuelle", value: "2 333 €" },
    { label: "Économie annuelle", value: "28 000 €" },
    { label: "ROI estimé", value: "6 mois", highlight: true }
  ]
};

const ROIPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <TrendingUp className="h-4 w-4" />
                Retour sur investissement
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                ROI & Impact
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Des résultats concrets et mesurables pour votre direction générale. 
                LogisConnect génère un retour sur investissement rapide et significatif.
              </p>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Résultats clés
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des indicateurs de performance mesurés chez nos clients.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyMetrics.map((item, index) => (
                <Card key={item.label} variant="elevated" className="text-center p-6 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-0">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-4xl font-display font-bold text-primary mb-2">
                      {item.metric}
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2">
                      {item.label}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Avant / Après LogisConnect
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une transformation profonde de vos processus de gestion des demandes.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 border-destructive/20 bg-destructive/5">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-sm font-bold">✗</span>
                    Avant
                  </h3>
                  <ul className="space-y-3">
                    {beforeAfter.before.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-destructive"></span>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="p-6 border-success/20 bg-success/5">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center text-sm font-bold">✓</span>
                    Après
                  </h3>
                  <ul className="space-y-3">
                    {beforeAfter.after.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-foreground">
                        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  <Calculator className="h-4 w-4" />
                  Exemple de calcul
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Estimation du ROI
                </h2>
                <p className="text-lg text-muted-foreground">
                  Un exemple concret pour un bailleur de 5 000 logements.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <h3 className="text-lg font-semibold text-foreground mb-6">Hypothèses</h3>
                    <div className="space-y-4">
                      {roiExample.inputs.map((input) => (
                        <div key={input.label} className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-muted-foreground">{input.label}</span>
                          <span className="font-medium text-foreground">{input.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20">
                  <CardContent className="p-0">
                    <h3 className="text-lg font-semibold text-foreground mb-6">Économies estimées</h3>
                    <div className="space-y-4">
                      {roiExample.savings.map((saving) => (
                        <div 
                          key={saving.label} 
                          className={`flex justify-between items-center py-2 border-b border-border ${saving.highlight ? 'bg-primary/10 -mx-2 px-2 rounded-lg' : ''}`}
                        >
                          <span className={saving.highlight ? "font-medium text-foreground" : "text-muted-foreground"}>
                            {saving.label}
                          </span>
                          <span className={`font-bold ${saving.highlight ? 'text-primary text-xl' : 'text-foreground'}`}>
                            {saving.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Organizational Benefits */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Gains organisationnels
                </h2>
                <p className="text-lg text-muted-foreground">
                  Au-delà des économies financières, LogisConnect transforme votre organisation.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <CardContent className="p-0">
                    <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Pilotage amélioré</h3>
                    <p className="text-sm text-muted-foreground">
                      Tableaux de bord en temps réel pour un pilotage éclairé de vos équipes.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="p-6 text-center">
                  <CardContent className="p-0">
                    <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Équipes valorisées</h3>
                    <p className="text-sm text-muted-foreground">
                      Vos collaborateurs se concentrent sur les tâches à forte valeur ajoutée.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="p-6 text-center">
                  <CardContent className="p-0">
                    <TrendingUp className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Scalabilité</h3>
                    <p className="text-sm text-muted-foreground">
                      Gérez plus de demandes sans augmenter vos effectifs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Calculez votre ROI personnalisé
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Demandez une étude personnalisée pour estimer les économies spécifiques 
                à votre organisation.
              </p>
              <Button variant="glass" size="xl" asChild>
                <Link to="/demo" className="gap-2">
                  Obtenir mon estimation
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

export default ROIPage;
