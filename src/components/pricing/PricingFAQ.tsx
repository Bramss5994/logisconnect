import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Comment fonctionne la facturation par quartier ?",
    answer:
      "Chaque quartier correspond à un périmètre opérationnel défini (ensemble de bâtiments, résidences ou zones géographiques). La facturation est mensuelle et basée sur le pack choisi. Vous pouvez ajouter ou retirer des quartiers à tout moment, avec une facturation ajustée au prorata.",
  },
  {
    question: "Quels agents IA sont inclus dans chaque pack ?",
    answer:
      "Le pack Essentiel inclut 1 agent IA dédié à la qualification. Le pack Premium comprend 3 agents (Qualification, Prestataire, Suivi). Le pack Excellence offre 8 agents pour une automatisation complète : Accueil, Qualification, Prestataire, Suivi, Reporting, Documents, Support Interne et Téléphonie IA.",
  },
  {
    question: "Peut-on intégrer nos prestataires existants ?",
    answer:
      "Absolument. LogisConnect s'adapte à votre réseau de prestataires. Vous pouvez importer votre base existante, définir leurs spécialités et zones d'intervention. L'IA apprendra automatiquement à optimiser les assignations selon leurs disponibilités et performances.",
  },
  {
    question: "Comment se déroule l'onboarding ?",
    answer:
      "L'onboarding se fait en 4 étapes : (1) Configuration initiale avec import de vos données, (2) Personnalisation des workflows selon vos processus, (3) Formation de vos équipes (2h en visio), (4) Phase de rodage avec accompagnement dédié pendant 2 semaines. Comptez environ 5 jours ouvrés pour être opérationnel.",
  },
];

const PricingFAQ = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-b border-border/50"
          >
            <AccordionTrigger className="text-left text-base lg:text-lg font-medium text-foreground hover:text-primary py-5">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PricingFAQ;
