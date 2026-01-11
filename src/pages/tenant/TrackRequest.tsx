import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Building2, Clock, CheckCircle2, Wrench, UserCheck, AlertCircle, MessageSquarePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const statusConfig = {
  new: { label: "En attente", color: "bg-yellow-500", icon: Clock },
  qualified: { label: "Qualifiée", color: "bg-blue-500", icon: CheckCircle2 },
  assigned: { label: "Assignée", color: "bg-purple-500", icon: UserCheck },
  in_progress: { label: "En cours", color: "bg-orange-500", icon: Wrench },
  done: { label: "Terminée", color: "bg-green-500", icon: CheckCircle2 },
};

const TrackRequest = () => {
  const { bailleurSlug } = useParams<{ bailleurSlug: string }>();
  const [trackingId, setTrackingId] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

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

  const { data: demande, isLoading, isError } = useQuery({
    queryKey: ["demande", trackingId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("demandes")
        .select("*")
        .eq("tracking_id", trackingId.toUpperCase())
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: searchTriggered && trackingId.length > 0,
  });

  const handleSearch = () => {
    if (trackingId.trim()) {
      setSearchTriggered(true);
    }
  };

  const statusInfo = demande?.statut ? statusConfig[demande.statut as keyof typeof statusConfig] : null;
  const StatusIcon = statusInfo?.icon || AlertCircle;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground hover:bg-primary-foreground/10">
              <Link to={`/locataire/${bailleurSlug}`}>
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
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
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Search Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Suivre ma demande</CardTitle>
              <CardDescription>
                Entrez votre numéro de suivi pour consulter l'avancement de votre demande.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input
                  placeholder="Ex: LC-A1B2C3D4"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value);
                    setSearchTriggered(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={!trackingId.trim()}>
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-pulse text-muted-foreground">Recherche en cours...</div>
            </div>
          )}

          {isError && searchTriggered && (
            <Card className="border-destructive">
              <CardContent className="py-8 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Demande non trouvée</h3>
                <p className="text-muted-foreground">
                  Aucune demande ne correspond au numéro de suivi "{trackingId}".
                  <br />
                  Vérifiez le numéro et réessayez.
                </p>
              </CardContent>
            </Card>
          )}

          {demande && (
            <div className="space-y-6">
              {/* Status Card */}
              <Card>
                <CardContent className="py-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Numéro de suivi</p>
                      <p className="text-xl font-bold font-mono">{demande.tracking_id}</p>
                    </div>
                    <Badge className={`${statusInfo?.color} text-white px-4 py-2 text-sm`}>
                      <StatusIcon className="h-4 w-4 mr-2" />
                      {statusInfo?.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Détails de la demande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Type de problème</p>
                      <p className="font-medium capitalize">{demande.type_probleme}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date de création</p>
                      <p className="font-medium">
                        {format(new Date(demande.created_at), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="font-medium">{demande.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adresse</p>
                    <p className="font-medium">{demande.adresse} - Logement {demande.logement}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Historique</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l-2 border-muted space-y-6">
                    {(demande.historique as Array<{ date: string; action: string; details?: string }>)?.map((event, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary border-2 border-background" />
                        <div>
                          <p className="font-medium text-foreground">{event.action}</p>
                          {event.details && (
                            <p className="text-sm text-muted-foreground">{event.details}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(event.date), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add Update Button */}
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link to={`/locataire/${bailleurSlug}/update/${demande.tracking_id}`}>
                  <MessageSquarePlus className="h-4 w-4 mr-2" />
                  Ajouter une précision
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TrackRequest;
