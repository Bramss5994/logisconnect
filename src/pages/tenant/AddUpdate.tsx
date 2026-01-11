import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Building2, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AddUpdate = () => {
  const { bailleurSlug, trackingId } = useParams<{ bailleurSlug: string; trackingId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const { data: demande } = useQuery({
    queryKey: ["demande", trackingId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("demandes")
        .select("*")
        .eq("tracking_id", trackingId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const addUpdate = useMutation({
    mutationFn: async () => {
      if (!demande) throw new Error("Demande not found");
      
      setIsUploading(true);
      let mediaUrl = null;

      // Upload file if any
      if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("demandes-media")
          .upload(fileName, file);
        
        if (uploadError) {
          console.error("Upload error:", uploadError);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from("demandes-media")
            .getPublicUrl(uploadData.path);
          mediaUrl = publicUrl;
        }
      }

      // Create the update
      const { error: updateError } = await supabase
        .from("demande_updates")
        .insert({
          demande_id: demande.id,
          message,
          media_url: mediaUrl,
        });

      if (updateError) throw updateError;

      // Update the demande historique
      const newHistorique = [
        ...(demande.historique as Array<{ date: string; action: string; details?: string }> || []),
        {
          date: new Date().toISOString(),
          action: "Précision ajoutée",
          details: message,
        },
      ];

      const { error: historyError } = await supabase
        .from("demandes")
        .update({ historique: newHistorique })
        .eq("id", demande.id);

      if (historyError) throw historyError;

      setIsUploading(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demande", trackingId] });
      toast.success("Votre précision a été ajoutée !");
      navigate(`/locataire/${bailleurSlug}/suivi`);
    },
    onError: (error) => {
      setIsUploading(false);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      console.error(error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || file) {
      addUpdate.mutate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground hover:bg-primary-foreground/10">
              <Link to={`/locataire/${bailleurSlug}/suivi`}>
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Ajouter une précision</CardTitle>
            <CardDescription>
              Ajoutez des informations complémentaires à votre demande <span className="font-mono font-semibold">{trackingId}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Textarea
                  placeholder="Décrivez les informations supplémentaires..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>

              {/* Upload fichier */}
              <div>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-4 pb-4">
                    <Upload className="w-6 h-6 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Ajouter une photo</span> (optionnel)
                    </p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                </label>
                {file && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded px-3 py-2">
                    <span className="truncate">{file.name}</span>
                    <span className="text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={(!message.trim() && !file) || addUpdate.isPending || isUploading}
              >
                {addUpdate.isPending || isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddUpdate;
