import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Building2, Copy, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Confirmation = () => {
  const { bailleurSlug, trackingId } = useParams<{ bailleurSlug: string; trackingId: string }>();

  const { data: bailleur } = useQuery({
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

  const copyToClipboard = () => {
    if (trackingId) {
      navigator.clipboard.writeText(trackingId);
      toast.success("Numéro de suivi copié !");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            {bailleur?.logo_url ? (
              <img src={bailleur.logo_url} alt={bailleur.nom} className="h-10 w-auto" />
            ) : (
              <div className="h-10 w-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
            )}
            <div>
              <h1 className="font-semibold">{bailleur?.nom || "Bailleur"}</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-lg mx-auto">
          <CardContent className="py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Demande enregistrée !
            </h2>
            <p className="text-muted-foreground mb-8">
              Votre demande a été transmise avec succès. Vous recevrez une notification dès qu'elle sera prise en charge.
            </p>

            {/* Tracking ID */}
            <div className="bg-muted/50 rounded-xl p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Votre numéro de suivi</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold font-mono text-primary">{trackingId}</span>
                <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Conservez ce numéro pour suivre l'avancement de votre demande
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button asChild size="lg" className="w-full">
                <Link to={`/locataire/${bailleurSlug}/suivi`}>
                  <Search className="h-4 w-4 mr-2" />
                  Suivre ma demande
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to={`/locataire/${bailleurSlug}`}>
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="max-w-lg mx-auto mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Un SMS de confirmation vous sera envoyé prochainement. Vous pouvez également recevoir des mises à jour par WhatsApp ou email selon vos préférences.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Confirmation;
