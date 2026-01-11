import { MessageSquare, Bot, Wrench, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Le locataire signale",
    description: "Via WhatsApp, SMS ou formulaire web, le locataire déclare son problème en quelques clics.",
    color: "primary",
  },
  {
    icon: Bot,
    number: "02",
    title: "L'IA qualifie",
    description: "Notre agent IA Agentova analyse, qualifie et priorise automatiquement la demande.",
    color: "info",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Le prestataire intervient",
    description: "Le bon prestataire est automatiquement assigné et notifié pour intervention rapide.",
    color: "warning",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Suivi et satisfaction",
    description: "Traçabilité complète, relances automatiques et enquête de satisfaction.",
    color: "success",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Comment ça marche
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-6">
            Un workflow simple et efficace
          </h2>
          <p className="text-lg text-muted-foreground">
            De la déclaration à la résolution, LogisConnect automatise chaque étape 
            pour une gestion sans friction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border -translate-y-1/2 z-0" />
              )}

              <Card variant="elevated" className="relative z-10 h-full bg-card hover:-translate-y-2 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <div className="relative inline-flex mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-${step.color}/10 flex items-center justify-center`}>
                      <step.icon className={`h-8 w-8 text-${step.color}`} />
                    </div>
                    <span className="absolute -top-2 -right-2 text-xs font-bold bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
