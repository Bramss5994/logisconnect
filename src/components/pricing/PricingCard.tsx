import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  ctaLink?: string;
  variant?: "default" | "popular" | "premium";
}

const PricingCard = ({
  name,
  price,
  description,
  features,
  isPopular = false,
  ctaText = "Demander une démonstration",
  ctaLink = "/#contact",
  variant = "default",
}: PricingCardProps) => {
  const isPopularCard = variant === "popular" || isPopular;
  const isPremiumCard = variant === "premium";

  return (
    <Card
      className={cn(
        "relative flex flex-col p-6 lg:p-8 transition-all duration-300 hover:shadow-xl",
        isPopularCard && "border-2 border-primary shadow-glow scale-105 z-10",
        isPremiumCard && "border-2 border-secondary bg-gradient-to-br from-card to-accent/20",
        !isPopularCard && !isPremiumCard && "border border-border hover:border-primary/30"
      )}
    >
      {/* Popular Badge */}
      {isPopularCard && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
          <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
          Le plus populaire
        </Badge>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className={cn(
          "text-xl lg:text-2xl font-bold mb-2",
          isPopularCard ? "text-primary" : isPremiumCard ? "text-secondary" : "text-foreground"
        )}>
          {name}
        </h3>
        <div className="flex items-baseline justify-center gap-1 mb-3">
          <span className={cn(
            "text-3xl lg:text-4xl font-bold",
            isPopularCard ? "text-primary" : isPremiumCard ? "text-secondary" : "text-foreground"
          )}>
            {price}
          </span>
          <span className="text-muted-foreground text-sm">/ mois</span>
        </div>
        <p className="text-muted-foreground text-sm lg:text-base">{description}</p>
      </div>

      {/* Features */}
      <ul className="flex-1 space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={cn(
              "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
              isPopularCard ? "bg-primary/10" : isPremiumCard ? "bg-secondary/10" : "bg-muted"
            )}>
              <Check className={cn(
                "w-3 h-3",
                isPopularCard ? "text-primary" : isPremiumCard ? "text-secondary" : "text-foreground"
              )} />
            </div>
            <span className="text-sm lg:text-base text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={isPopularCard ? "hero" : isPremiumCard ? "success" : "outline"}
        size="lg"
        className="w-full"
        asChild
      >
        <Link to={ctaLink}>{ctaText}</Link>
      </Button>
    </Card>
  );
};

export default PricingCard;
