import { TrendingUp, Heart, Clock, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Clock,
    title: "Gain de temps",
    description: "Automatisation du traitement des demandes pour libérer du temps à vos équipes.",
  },
  {
    icon: Heart,
    title: "Satisfaction locataires",
    description: "Communication proactive et suivi transparent pour des locataires satisfaits.",
  },
  {
    icon: PiggyBank,
    title: "Optimisation des coûts",
    description: "Réduction des coûts de gestion grâce à l'automatisation des processus.",
  },
  {
    icon: TrendingUp,
    title: "Productivité accrue",
    description: "Augmentation de la capacité de traitement de votre équipe.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-24 gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary-foreground/80 uppercase tracking-wider">
            Avantages
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-6">
            Des résultats concrets pour les bailleurs
          </h2>
          <p className="text-lg text-primary-foreground/80">
            LogisConnect transforme la relation bailleur-locataire et optimise 
            chaque aspect de la gestion des demandes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 animate-slide-up hover:bg-white/10 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex w-16 h-16 rounded-2xl bg-white/10 items-center justify-center mb-6">
                <benefit.icon className="h-8 w-8" />
              </div>
              <div className="text-lg font-semibold mb-2">{benefit.title}</div>
              <p className="text-sm text-primary-foreground/70">
                {benefit.description}
              </p>
              <p className="text-sm text-primary-foreground/70">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="glass" size="xl" asChild>
            <Link to="/demo">
              Découvrir LogisConnect
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
