-- Drop ALL existing policies on demandes first
DROP POLICY IF EXISTS "Anyone can create demandes" ON public.demandes;

-- Now create the new policies
-- Keep INSERT public for tenant portal
CREATE POLICY "Tenants can create demandes"
ON public.demandes
FOR INSERT
WITH CHECK (true);

-- Restrict UPDATE to authenticated users or service role
CREATE POLICY "Only authenticated users can update demandes"
ON public.demandes
FOR UPDATE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Create restrictive RLS policies for demande_updates
CREATE POLICY "Updates accessible via RPC only"
ON public.demande_updates
FOR SELECT
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Updates created via RPC only"
ON public.demande_updates
FOR INSERT
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');