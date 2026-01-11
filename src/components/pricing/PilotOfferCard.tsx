import { Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const PilotOfferCard = () => {
  return (
    <Card className="relative overflow-hidden border-2 border-dashed border-primary/40 bg-gradient-to-br from-accent/30 via-card to-primary/5">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
              <Rocket className="w-10 h-10 lg:w-12 lg:h-12 text-primary-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Offre spéciale
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Offre Pilote — 1 Quartier
            </h3>
            <div className="flex items-baseline gap-2 justify-center lg:justify-start mb-4">
              <span className="text-3xl lg:text-4xl font-bold text-primary">990 €</span>
              <span className="text-muted-foreground">/ mois pendant 3 mois</span>
            </div>
            <p className="text-muted-foreground text-lg max-w-xl">
              Testez LogisConnect sur un périmètre réduit et mesurez l'impact réel sur vos délais de traitement et la satisfaction locataire.
            </p>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <Button variant="hero" size="lg" className="group" asChild>
              <Link to="/#contact">
                Lancer un pilote
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PilotOfferCard;
