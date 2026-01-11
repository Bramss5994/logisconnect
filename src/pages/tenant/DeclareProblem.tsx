import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Upload, Loader2, Building2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const problemTypes = [
  { value: "plomberie", label: "Plomberie" },
  { value: "electricite", label: "Électricité" },
  { value: "chauffage", label: "Chauffage" },
  { value: "nuisibles", label: "Nuisibles" },
  { value: "administratif", label: "Administratif" },
  { value: "autre", label: "Autre" },
] as const;

const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  adresse: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  logement: z.string().min(1, "Le numéro de logement est requis"),
  telephone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  type_probleme: z.enum(["plomberie", "electricite", "chauffage", "nuisibles", "administratif", "autre"]),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
});

type FormData = z.infer<typeof formSchema>;

const DeclareProblem = () => {
  const { bailleurSlug } = useParams<{ bailleurSlug: string }>();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      adresse: "",
      logement: "",
      telephone: "",
      email: "",
      type_probleme: "autre",
      description: "",
    },
  });

  const createDemande = useMutation({
    mutationFn: async (data: FormData) => {
      setIsUploading(true);
      
      // Upload files if any
      const mediaUrls: string[] = [];
      for (const file of files) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("demandes-media")
          .upload(fileName, file);
        
        if (uploadError) {
          console.error("Upload error:", uploadError);
          continue;
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from("demandes-media")
          .getPublicUrl(uploadData.path);
        
        mediaUrls.push(publicUrl);
      }

      // Create the demande
      const { data: demande, error } = await supabase
        .from("demandes")
        .insert({
          bailleur_id: bailleur?.id,
          nom: data.nom,
          prenom: data.prenom,
          adresse: data.adresse,
          logement: data.logement,
          telephone: data.telephone,
          email: data.email || null,
          type_probleme: data.type_probleme,
          description: data.description,
          media_urls: mediaUrls,
          historique: [
            {
              date: new Date().toISOString(),
              action: "Demande créée",
              details: "Votre demande a été enregistrée avec succès",
            },
          ],
        })
        .select()
        .single();

      if (error) throw error;
      
      setIsUploading(false);
      return demande;
    },
    onSuccess: (demande) => {
      toast.success("Votre demande a été enregistrée !");
      navigate(`/locataire/${bailleurSlug}/confirmation/${demande.tracking_id}`);
    },
    onError: (error) => {
      setIsUploading(false);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      console.error(error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const onSubmit = (data: FormData) => {
    createDemande.mutate(data);
  };

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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Déclarer un problème</CardTitle>
            <CardDescription>
              Remplissez ce formulaire pour signaler un problème dans votre logement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Informations personnelles */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom *</FormLabel>
                        <FormControl>
                          <Input placeholder="Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom *</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Adresse */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="adresse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse *</FormLabel>
                          <FormControl>
                            <Input placeholder="123 rue de la Paix, 75001 Paris" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="logement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>N° Logement *</FormLabel>
                        <FormControl>
                          <Input placeholder="A-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone *</FormLabel>
                        <FormControl>
                          <Input placeholder="06 12 34 56 78" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (optionnel)</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jean.dupont@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Type de problème */}
                <FormField
                  control={form.control}
                  name="type_probleme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de problème *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type de problème" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {problemTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description du problème *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez votre problème en détail..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Upload fichiers */}
                <div>
                  <FormLabel>Photos / Vidéos (optionnel)</FormLabel>
                  <div className="mt-2">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold">Cliquez pour ajouter</span> ou glissez-déposez
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, MP4 (max. 10MB)</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        multiple 
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    {files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded px-3 py-2">
                            <span className="truncate">{file.name}</span>
                            <span className="text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={createDemande.isPending || isUploading}
                >
                  {createDemande.isPending || isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer ma demande"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DeclareProblem;
