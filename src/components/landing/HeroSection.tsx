import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      
      {/* Floating shapes */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-success/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      <div className="container mx-auto px-4 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm font-medium text-primary">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              Nouvelle génération de gestion locative
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground">
              Simplifiez la gestion de vos{" "}
              <span className="text-primary">demandes locataires</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              LogisConnect automatise le traitement des demandes, coordonne les prestataires 
              et améliore la satisfaction de vos locataires grâce à l'intelligence artificielle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/demo" className="gap-2">
                  Demander une démonstration
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="gap-2">
                <Play className="h-5 w-5" />
                Voir la vidéo
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-display">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-display">-60%</div>
                <div className="text-sm text-muted-foreground">Délai de traitement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-display">150+</div>
                <div className="text-sm text-muted-foreground">Bailleurs</div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative z-10">
              <img
                src={heroIllustration}
                alt="LogisConnect - Plateforme de gestion locative intelligente"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
