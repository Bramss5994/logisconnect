import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/Logo";

const CTASection = () => {
  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card variant="elevated" className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Left side - Info */}
                <div className="p-8 md:p-12 gradient-hero text-primary-foreground">
                  <Logo size="lg" variant="icon" />
                  <h3 className="text-2xl md:text-3xl font-display font-bold mt-6 mb-4">
                    Prêt à transformer votre gestion locative ?
                  </h3>
                  <p className="text-primary-foreground/80 mb-8">
                    Demandez une démonstration personnalisée et découvrez comment 
                    LogisConnect peut simplifier votre quotidien.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-primary-foreground/70">Email</div>
                        <div className="font-medium">contact@logisconnect.fr</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-primary-foreground/70">Téléphone</div>
                        <div className="font-medium">01 23 45 67 89</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Form */}
                <div className="p-8 md:p-12">
                  <h4 className="text-xl font-display font-semibold mb-6">
                    Demander une démonstration
                  </h4>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Prénom</label>
                        <Input placeholder="Jean" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Nom</label>
                        <Input placeholder="Dupont" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email professionnel</label>
                      <Input type="email" placeholder="jean.dupont@bailleur.fr" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Organisme</label>
                      <Input placeholder="Nom de votre organisme" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nombre de logements</label>
                      <Input type="number" placeholder="1000" />
                    </div>
                    <Button variant="hero" size="lg" className="w-full gap-2">
                      Envoyer ma demande
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                    </p>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
