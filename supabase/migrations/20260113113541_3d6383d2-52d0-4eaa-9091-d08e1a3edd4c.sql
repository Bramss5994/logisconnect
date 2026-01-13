-- Supprimer la politique RLS trop permissive "Anyone can update demandes"
DROP POLICY IF EXISTS "Anyone can update demandes" ON public.demandes;

-- Supprimer aussi la politique "Anyone can create demande_updates" qui est également trop permissive
DROP POLICY IF EXISTS "Anyone can create demande_updates" ON public.demande_updates;

-- Supprimer "Anyone can view demande_updates" aussi
DROP POLICY IF EXISTS "Anyone can view demande_updates" ON public.demande_updates;

-- Supprimer "Anyone can view demandes by tracking_id" - l'accès sera via RPC sécurisée
DROP POLICY IF EXISTS "Anyone can view demandes by tracking_id" ON public.demandes;