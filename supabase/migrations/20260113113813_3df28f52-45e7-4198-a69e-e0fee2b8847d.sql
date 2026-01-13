-- Créer une table pour lier les utilisateurs à leurs bailleurs
CREATE TABLE public.user_bailleurs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    bailleur_id UUID NOT NULL REFERENCES public.bailleurs(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, bailleur_id)
);

-- Activer RLS sur la table user_bailleurs
ALTER TABLE public.user_bailleurs ENABLE ROW LEVEL SECURITY;

-- Politique: les utilisateurs peuvent voir leurs propres associations
CREATE POLICY "Users can view their own bailleur associations"
ON public.user_bailleurs
FOR SELECT
USING (auth.uid() = user_id OR auth.role() = 'service_role');

-- Politique: seul le service_role peut gérer les associations
CREATE POLICY "Only service role can manage user_bailleurs"
ON public.user_bailleurs
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Créer une fonction SECURITY DEFINER pour vérifier l'appartenance à un bailleur
CREATE OR REPLACE FUNCTION public.user_belongs_to_bailleur(p_user_id UUID, p_bailleur_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_bailleurs
        WHERE user_id = p_user_id
          AND bailleur_id = p_bailleur_id
    )
$$;

-- Créer une fonction SECURITY DEFINER pour obtenir les bailleur_ids d'un utilisateur
CREATE OR REPLACE FUNCTION public.get_user_bailleur_ids(p_user_id UUID)
RETURNS SETOF UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT bailleur_id
    FROM public.user_bailleurs
    WHERE user_id = p_user_id
$$;

-- Supprimer l'ancienne politique SELECT sur demandes
DROP POLICY IF EXISTS "Only authenticated can view demandes" ON public.demandes;

-- Nouvelle politique: les utilisateurs authentifiés ne voient que les demandes de leurs bailleurs
CREATE POLICY "Users can view demandes of their bailleurs"
ON public.demandes
FOR SELECT
USING (
    auth.role() = 'service_role'
    OR (
        auth.role() = 'authenticated' 
        AND bailleur_id IN (SELECT public.get_user_bailleur_ids(auth.uid()))
    )
);

-- Mettre à jour la politique UPDATE pour demandes
DROP POLICY IF EXISTS "Only authenticated users can update demandes" ON public.demandes;

CREATE POLICY "Users can update demandes of their bailleurs"
ON public.demandes
FOR UPDATE
USING (
    auth.role() = 'service_role'
    OR (
        auth.role() = 'authenticated' 
        AND bailleur_id IN (SELECT public.get_user_bailleur_ids(auth.uid()))
    )
);

-- Supprimer l'ancienne politique SELECT sur demande_updates
DROP POLICY IF EXISTS "Updates accessible via RPC only" ON public.demande_updates;

-- Nouvelle politique: les utilisateurs ne voient que les updates des demandes de leurs bailleurs
CREATE POLICY "Users can view updates of their bailleurs demandes"
ON public.demande_updates
FOR SELECT
USING (
    auth.role() = 'service_role'
    OR (
        auth.role() = 'authenticated' 
        AND demande_id IN (
            SELECT d.id FROM public.demandes d 
            WHERE d.bailleur_id IN (SELECT public.get_user_bailleur_ids(auth.uid()))
        )
    )
);

-- Mettre à jour la politique INSERT sur demande_updates
DROP POLICY IF EXISTS "Updates created via RPC only" ON public.demande_updates;

CREATE POLICY "Users can create updates for their bailleurs demandes"
ON public.demande_updates
FOR INSERT
WITH CHECK (
    auth.role() = 'service_role'
    OR (
        auth.role() = 'authenticated' 
        AND demande_id IN (
            SELECT d.id FROM public.demandes d 
            WHERE d.bailleur_id IN (SELECT public.get_user_bailleur_ids(auth.uid()))
        )
    )
);