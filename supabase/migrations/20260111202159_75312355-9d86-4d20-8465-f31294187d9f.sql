-- Create enum for request status
CREATE TYPE public.request_status AS ENUM ('new', 'qualified', 'assigned', 'in_progress', 'done');

-- Create enum for problem type
CREATE TYPE public.problem_type AS ENUM ('plomberie', 'electricite', 'chauffage', 'nuisibles', 'administratif', 'autre');

-- Create enum for urgency level
CREATE TYPE public.urgency_level AS ENUM ('low', 'medium', 'high', 'critical');

-- Create bailleurs table
CREATE TABLE public.bailleurs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create demandes table
CREATE TABLE public.demandes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_id TEXT NOT NULL UNIQUE DEFAULT 'LC-' || UPPER(SUBSTRING(gen_random_uuid()::text FROM 1 FOR 8)),
  bailleur_id UUID REFERENCES public.bailleurs(id),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  adresse TEXT NOT NULL,
  logement TEXT NOT NULL,
  telephone TEXT NOT NULL,
  email TEXT,
  type_probleme public.problem_type NOT NULL,
  description TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  statut public.request_status NOT NULL DEFAULT 'new',
  urgence public.urgency_level DEFAULT 'medium',
  categorie_ia TEXT,
  suggestions_ia TEXT[],
  historique JSONB[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create demande_updates table for tracking updates
CREATE TABLE public.demande_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  demande_id UUID NOT NULL REFERENCES public.demandes(id) ON DELETE CASCADE,
  message TEXT,
  media_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bailleurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demande_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (tenant portal is public)
CREATE POLICY "Anyone can view bailleurs" 
ON public.bailleurs 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create demandes" 
ON public.demandes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view demandes by tracking_id" 
ON public.demandes 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update demandes" 
ON public.demandes 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can create demande_updates" 
ON public.demande_updates 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view demande_updates" 
ON public.demande_updates 
FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_demandes_tracking_id ON public.demandes(tracking_id);
CREATE INDEX idx_demandes_bailleur_id ON public.demandes(bailleur_id);
CREATE INDEX idx_demandes_statut ON public.demandes(statut);
CREATE INDEX idx_bailleurs_slug ON public.bailleurs(slug);
CREATE INDEX idx_demande_updates_demande_id ON public.demande_updates(demande_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_bailleurs_updated_at
BEFORE UPDATE ON public.bailleurs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_demandes_updated_at
BEFORE UPDATE ON public.demandes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert a demo bailleur
INSERT INTO public.bailleurs (nom, slug, logo_url)
VALUES ('Habitat Social', 'habitat-social', NULL);

-- Create storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('demandes-media', 'demandes-media', true);

-- Create storage policies
CREATE POLICY "Anyone can upload media" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'demandes-media');

CREATE POLICY "Anyone can view media" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'demandes-media');