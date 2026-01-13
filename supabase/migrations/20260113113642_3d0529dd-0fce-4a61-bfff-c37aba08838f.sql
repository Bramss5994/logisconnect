-- Ajouter une politique SELECT pour restreindre l'accès aux demandes aux utilisateurs authentifiés
-- (l'accès public se fait via la fonction RPC sécurisée get_demande_by_tracking)
CREATE POLICY "Only authenticated can view demandes"
ON public.demandes
FOR SELECT
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Ajouter une politique DELETE pour empêcher la suppression par des utilisateurs non autorisés
CREATE POLICY "Only service role can delete demandes"
ON public.demandes
FOR DELETE
USING (auth.role() = 'service_role');