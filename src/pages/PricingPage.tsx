import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingCard from "@/components/pricing/PricingCard";
import PilotOfferCard from "@/components/pricing/PilotOfferCard";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import { Building2, HelpCircle } from "lucide-react";

const pricingPlans = [
  {
    name: "Pack Quartier Essentiel",
    price: "1 200 €",
    description: "L'automatisation intelligente pour démarrer",
    features: [
      "Gestion des demandes locataires",
      "Qualification automatique IA",
      "Suivi + relances automatiques",
      "Tableau de bord",
      "Gestion prestataires",
      "WhatsApp + SMS",
      "1 agent IA dédié",
    ],
    variant: "default" as const,
  },
  {
    name: "Pack Quartier Premium",
    price: "1 800 €",
    description: "La solution complète pour optimiser vos délais",
    features: [
      "Tout le pack Essentiel",
      "3 agents IA (Qualification, Prestataire, Suivi)",
      "Reporting avancé",
      "Analyse IA des délais",
      "Génération automatique de documents",
      "Notifications intelligentes",
      "Support prioritaire",
    ],
    variant: "popular" as const,
    isPopular: true,
  },
  {
    name: "Pack Quartier Excellence",
    price: "2 500 €",
    description: "L'automatisation totale pour les grands quartiers",
    features: [
      "Tout le pack Premium",
      "8 agents IA (automatisation complète)",
      "Téléphonie IA (appels entrants/sortants)",
      "Relances prestataires automatisées",
      "Audit mensuel IA",
      "Personnalisation complète",
      "Intégration SI bailleur",
    ],
    variant: "premium" as const,
  },
];

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/30 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Tarification par quartier
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Nos Offres par Quartier
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Une solution adaptée à chaque périmètre opérationnel. Choisissez le pack qui correspond à vos besoins.
            </p>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={index}
                  name={plan.name}
                  price={plan.price}
                  description={plan.description}
                  features={plan.features}
                  variant={plan.variant}
                  isPopular={plan.isPopular}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pilot Offer Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <PilotOfferCard />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <HelpCircle className="w-4 h-4" />
                Questions fréquentes
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Vous avez des questions ?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Retrouvez les réponses aux questions les plus courantes sur nos offres et notre fonctionnement.
              </p>
            </div>
            <PricingFAQ />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
