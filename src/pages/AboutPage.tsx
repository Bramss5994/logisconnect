import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Target, 
  Heart, 
  Lightbulb, 
  Users, 
  Bot,
  Award,
  ArrowRight,
  CheckCircle2,
  Building2,
  MapPin
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation responsable",
    description: "Nous développons des solutions IA supervisées qui augmentent l'humain sans le remplacer."
  },
  {
    icon: Heart,
    title: "Engagement social",
    description: "Nous croyons que la technologie doit être au service du logement social et de ses locataires."
  },
  {
    icon: Users,
    title: "Proximité client",
    description: "Nous travaillons main dans la main avec les bailleurs pour comprendre leurs réalités terrain."
  },
  {
    icon: Award,
    title: "Excellence opérationnelle",
    description: "Nous visons l'excellence dans chaque détail pour garantir la fiabilité de nos solutions."
  }
];

const expertise = [
  "10+ ans d'expérience dans le logement social",
  "Connaissance approfondie des processus bailleurs",
  "Expertise technique en IA et automatisation",
  "Compréhension des enjeux réglementaires"
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                À propos de LogisConnect
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Notre Vision & Mission
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Transformer la gestion locative grâce à l'intelligence artificielle 
                au service des bailleurs sociaux et de leurs locataires.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  <Target className="h-4 w-4" />
                  Notre vision
                </div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  Un logement social plus humain grâce à la technologie
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Nous croyons que la technologie, bien utilisée, peut libérer du temps pour ce qui compte vraiment : 
                  la relation humaine entre les bailleurs et leurs locataires.
                </p>
                <p className="text-muted-foreground">
                  En automatisant les tâches répétitives et en simplifiant les processus, LogisConnect permet 
                  aux équipes de gestion locative de se concentrer sur l'accompagnement des locataires, 
                  la résolution de situations complexes et l'amélioration continue du service.
                </p>
              </div>
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium mb-4">
                  <Heart className="h-4 w-4" />
                  Notre mission
                </div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  Simplifier. Automatiser. Satisfaire.
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Notre mission est de fournir aux bailleurs sociaux une solution clé en main qui :
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                    <span className="text-muted-foreground">Simplifie le quotidien des équipes de gestion locative</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                    <span className="text-muted-foreground">Automatise le traitement des demandes sans perte de qualité</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-1" />
                    <span className="text-muted-foreground">Améliore la satisfaction des locataires grâce à la transparence</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Nos valeurs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des principes fondamentaux qui guident chacune de nos décisions.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={value.title} className="p-6 text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-0">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team / Expertise */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  <Bot className="h-4 w-4" />
                  Notre approche
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Une équipe d'agents IA supervisés par des experts
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  LogisConnect n'est pas une simple solution technique. C'est une équipe d'agents 
                  IA spécialisés, entraînés sur les spécificités du logement social et supervisés 
                  par des experts métier.
                </p>
                <p className="text-muted-foreground mb-6">
                  Chaque agent IA est conçu pour une tâche précise : qualification des demandes, 
                  assignation des prestataires, communication avec les locataires, génération de rapports. 
                  Ensemble, ils forment une équipe virtuelle au service de vos équipes humaines.
                </p>
              </div>
              
              <Card className="p-8">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Notre expertise</h3>
                  <ul className="space-y-4">
                    {expertise.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        </div>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Ambition */}
        <section className="py-20 gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <MapPin className="h-12 w-12 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ambition nationale
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Notre ambition est de devenir le partenaire de référence des bailleurs sociaux français 
                dans leur transformation digitale, en apportant une solution simple, efficace et humaine.
              </p>
              <Button variant="glass" size="xl" asChild>
                <Link to="/demo" className="gap-2">
                  Rejoindre le mouvement
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quality Commitment */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                  Engagement qualité
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6">
                  <div className="text-4xl font-display font-bold text-primary mb-2">99,5%</div>
                  <div className="text-muted-foreground">Disponibilité garantie</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-display font-bold text-primary mb-2">48h</div>
                  <div className="text-muted-foreground">Déploiement</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-display font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">Made in France</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
