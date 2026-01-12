import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Bot, 
  Wrench, 
  Users, 
  Bell, 
  FileText, 
  Archive,
  ArrowRight,
  CheckCircle2,
  Play,
  Phone,
  Mail
} from "lucide-react";

const demoScenario = [
  {
    step: 1,
    icon: MessageSquare,
    title: "Déclaration via WhatsApp",
    description: "Un locataire signale une fuite d'eau via WhatsApp. Il envoie une photo et décrit le problème en quelques mots.",
    color: "bg-success"
  },
  {
    step: 2,
    icon: Bot,
    title: "Qualification IA",
    description: "L'agent IA analyse la demande, identifie le type de problème (plomberie), évalue l'urgence et extrait les informations clés.",
    color: "bg-primary"
  },
  {
    step: 3,
    icon: Wrench,
    title: "Assignation prestataire",
    description: "Le système sélectionne automatiquement le plombier disponible dans le secteur et lui transmet la demande.",
    color: "bg-warning"
  },
  {
    step: 4,
    icon: Users,
    title: "Suivi bailleur",
    description: "L'équipe de gestion locative voit la demande dans son tableau de bord avec toutes les informations et l'historique.",
    color: "bg-info"
  },
  {
    step: 5,
    icon: Bell,
    title: "Information locataire",
    description: "Le locataire reçoit automatiquement un SMS avec la confirmation de prise en charge et le créneau d'intervention.",
    color: "bg-success"
  },
  {
    step: 6,
    icon: FileText,
    title: "Rapport automatique",
    description: "Une fois l'intervention terminée, un rapport est généré avec les détails, photos et signature du prestataire.",
    color: "bg-primary"
  },
  {
    step: 7,
    icon: Archive,
    title: "Archivage & traçabilité",
    description: "Toutes les informations sont archivées avec horodatage pour une traçabilité complète et auditable.",
    color: "bg-muted"
  }
];

const DemoPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Play className="h-4 w-4" />
                Démonstration
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Découvrez LogisConnect en action
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Suivez le parcours d'une demande locataire de A à Z et découvrez comment 
                LogisConnect automatise et simplifie chaque étape.
              </p>
            </div>
          </div>
        </section>

        {/* Demo Scenario */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Scénario de démonstration
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une fuite d'eau signalée par un locataire : découvrez comment LogisConnect 
                gère automatiquement chaque étape.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
                
                <div className="space-y-8">
                  {demoScenario.map((item, index) => (
                    <div 
                      key={item.step} 
                      className="relative flex gap-6 animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Step indicator */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center shadow-lg`}>
                          <item.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <Card className="flex-1 p-6">
                        <CardContent className="p-0">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                              Étape {item.step}
                            </span>
                            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits Recap */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6">
                  <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-3" />
                  <div className="font-semibold text-foreground mb-1">Zéro ressaisie</div>
                  <p className="text-sm text-muted-foreground">Les informations sont captées et transmises automatiquement</p>
                </div>
                <div className="p-6">
                  <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-3" />
                  <div className="font-semibold text-foreground mb-1">Temps réel</div>
                  <p className="text-sm text-muted-foreground">Chaque partie prenante est informée instantanément</p>
                </div>
                <div className="p-6">
                  <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-3" />
                  <div className="font-semibold text-foreground mb-1">100% traçable</div>
                  <p className="text-sm text-muted-foreground">Historique complet pour audit et amélioration continue</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-0 overflow-hidden">
                <div className="grid md:grid-cols-2">
                  {/* Info */}
                  <div className="p-8 md:p-12 gradient-hero text-primary-foreground">
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
                      Demander une démonstration personnalisée
                    </h2>
                    <p className="text-primary-foreground/80 mb-8">
                      Nos experts vous présentent LogisConnect adapté à votre contexte 
                      et répondent à toutes vos questions.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5" />
                        <span>01 23 45 67 89</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5" />
                        <span>demo@logisconnect.fr</span>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-white/20">
                      <p className="text-sm text-primary-foreground/70">
                        Démonstration gratuite • Sans engagement • 30 minutes
                      </p>
                    </div>
                  </div>
                  
                  {/* Form */}
                  <div className="p-8 md:p-12">
                    <form className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Prénom
                          </label>
                          <Input placeholder="Jean" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Nom
                          </label>
                          <Input placeholder="Dupont" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email professionnel
                        </label>
                        <Input type="email" placeholder="jean.dupont@bailleur.fr" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Organisme
                        </label>
                        <Input placeholder="Nom de votre organisme" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Nombre de logements gérés
                        </label>
                        <Input placeholder="Ex: 5000" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message (optionnel)
                        </label>
                        <Textarea placeholder="Décrivez vos besoins ou questions..." rows={3} />
                      </div>
                      
                      <Button variant="hero" size="lg" className="w-full gap-2">
                        Demander ma démo
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DemoPage;
