-- Recréer la fonction RPC sécurisée pour que les locataires puissent consulter leurs demandes
-- Cette fonction permet l'accès uniquement avec un tracking_id valide
CREATE OR REPLACE FUNCTION public.get_demande_by_tracking(p_tracking_id TEXT)
RETURNS TABLE (
    id UUID,
    tracking_id TEXT,
    bailleur_id UUID,
    nom TEXT,
    prenom TEXT,
    adresse TEXT,
    logement TEXT,
    telephone TEXT,
    email TEXT,
    type_probleme TEXT,
    description TEXT,
    media_urls TEXT[],
    statut TEXT,
    urgence TEXT,
    categorie_ia TEXT,
    suggestions_ia TEXT[],
    historique JSONB[],
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Validation du tracking_id
    IF p_tracking_id IS NULL OR LENGTH(TRIM(p_tracking_id)) < 5 THEN
        RAISE EXCEPTION 'Invalid tracking ID';
    END IF;
    
    RETURN QUERY
    SELECT 
        d.id,
        d.tracking_id,
        d.bailleur_id,
        d.nom,
        d.prenom,
        d.adresse,
        d.logement,
        d.telephone,
        d.email,
        d.type_probleme::TEXT,
        d.description,
        d.media_urls,
        d.statut::TEXT,
        d.urgence::TEXT,
        d.categorie_ia,
        d.suggestions_ia,
        d.historique,
        d.created_at,
        d.updated_at
    FROM public.demandes d
    WHERE d.tracking_id = UPPER(TRIM(p_tracking_id));
END;
$$;

-- Fonction RPC pour ajouter une mise à jour à une demande (via tracking_id)
CREATE OR REPLACE FUNCTION public.add_demande_update(
    p_tracking_id TEXT,
    p_message TEXT,
    p_media_url TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_demande_id UUID;
BEGIN
    -- Validation du tracking_id
    IF p_tracking_id IS NULL OR LENGTH(TRIM(p_tracking_id)) < 5 THEN
        RAISE EXCEPTION 'Invalid tracking ID';
    END IF;
    
    -- Trouver la demande
    SELECT id INTO v_demande_id
    FROM public.demandes
    WHERE tracking_id = UPPER(TRIM(p_tracking_id));
    
    IF v_demande_id IS NULL THEN
        RAISE EXCEPTION 'Demande not found';
    END IF;
    
    -- Ajouter l'update dans l'historique de la demande
    UPDATE public.demandes
    SET historique = COALESCE(historique, ARRAY[]::JSONB[]) || 
        jsonb_build_object(
            'type', 'tenant_update',
            'message', p_message,
            'media_url', p_media_url,
            'created_at', NOW()
        )::JSONB,
        updated_at = NOW()
    WHERE id = v_demande_id;
    
    RETURN TRUE;
END;
$$;

-- Accorder les permissions d'exécution aux utilisateurs anonymes
GRANT EXECUTE ON FUNCTION public.get_demande_by_tracking(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.add_demande_update(TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.get_demande_by_tracking(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_demande_update(TEXT, TEXT, TEXT) TO authenticated;