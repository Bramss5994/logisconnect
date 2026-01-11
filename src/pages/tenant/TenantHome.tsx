import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search, Building2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const TenantHome = () => {
  const { bailleurSlug } = useParams<{ bailleurSlug: string }>();

  const { data: bailleur, isLoading } = useQuery({
    queryKey: ["bailleur", bailleurSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bailleurs")
        .select("*")
        .eq("slug", bailleurSlug)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            {bailleur?.logo_url ? (
              <img src={bailleur.logo_url} alt={bailleur.nom} className="h-12 w-auto" />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold">{bailleur?.nom || "Bailleur"}</h1>
              <p className="text-sm text-primary-foreground/80">Portail Locataire</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Portail Locataire LogisConnect
          </h2>
          <p className="text-lg text-muted-foreground">
            Déclarez un problème en quelques secondes et suivez son avancement en temps réel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Déclarer un problème */}
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Déclarer un problème
              </h3>
              <p className="text-muted-foreground mb-6">
                Signalez un problème dans votre logement rapidement et facilement.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link to={`/locataire/${bailleurSlug}/declarer`}>
                  Déclarer un problème
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Suivre ma demande */}
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-success/50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors">
                <Search className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Suivre ma demande
              </h3>
              <p className="text-muted-foreground mb-6">
                Consultez l'avancement de votre demande en temps réel.
              </p>
              <Button asChild variant="outline" size="lg" className="w-full border-success text-success hover:bg-success hover:text-success-foreground">
                <Link to={`/locataire/${bailleurSlug}/suivi`}>
                  Suivre ma demande
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <div className="bg-muted/50 rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-2">Comment ça marche ?</h4>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-2">1</div>
                <p className="text-sm text-muted-foreground">Décrivez votre problème</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-2">2</div>
                <p className="text-sm text-muted-foreground">Recevez une confirmation</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-2">3</div>
                <p className="text-sm text-muted-foreground">Suivez l'avancement</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>Propulsé par LogisConnect</p>
      </footer>
    </div>
  );
};

export default TenantHome;
