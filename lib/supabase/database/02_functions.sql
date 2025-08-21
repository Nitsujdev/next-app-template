-- Datenbank-Funktionen
-- Führe dieses Skript nach den Policies aus

-- Funktion zum Abrufen eines Benutzerprofils mit Auth-Daten
CREATE OR REPLACE FUNCTION get_user_profile(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'profile', to_jsonb(p.*),
    'auth_user', jsonb_build_object(
      'id', au.id,
      'email', au.email,
      'email_confirmed_at', au.email_confirmed_at,
      'phone', au.phone,
      'last_sign_in_at', au.last_sign_in_at,
      'raw_user_meta_data', au.raw_user_meta_data,
      'created_at', au.created_at,
      'updated_at', au.updated_at
    )
  ) INTO result
  FROM auth.users au
  LEFT JOIN public.profile p ON p.user_id = au.id
  WHERE au.id = p_user_id;

  RETURN result;
END;
$$;

-- Funktion zum Aktualisieren eines Benutzerprofils
CREATE OR REPLACE FUNCTION update_user_profile(
  p_user_id UUID,
  p_profile_data JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  updated_profile JSONB;
BEGIN
  -- Aktualisiere das Profil
  UPDATE public.profile 
  SET 
    username = COALESCE(p_profile_data->>'username', username),
    bio = COALESCE(p_profile_data->>'bio', bio),
    settings = COALESCE(p_profile_data->'settings', settings),
    metadata = COALESCE(p_profile_data->'metadata', metadata),
    updated_at = NOW()
  WHERE user_id = p_user_id
  RETURNING to_jsonb(profile.*) INTO updated_profile;

  -- Wenn kein Profil existiert, erstelle eines
  IF updated_profile IS NULL THEN
    INSERT INTO public.profile (
      user_id,
      username,
      bio,
      settings,
      metadata
    ) VALUES (
      p_user_id,
      p_profile_data->>'username',
      p_profile_data->>'bio',
      COALESCE(p_profile_data->'settings', '{}'),
      COALESCE(p_profile_data->'metadata', '{}')
    )
    RETURNING to_jsonb(profile.*) INTO updated_profile;
  END IF;

  -- Gib das aktualisierte Profil zurück
  RETURN updated_profile;
END;
$$;

-- Funktion zum "Soft Delete" eines Benutzerprofils
CREATE OR REPLACE FUNCTION soft_delete_user_profile(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profile 
  SET 
    username = NULL,
    bio = NULL,
    deleted_at = NOW(),
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  RETURN FOUND;
END;
$$;

-- Funktion zum Wiederherstellen eines gelöschten Profils
CREATE OR REPLACE FUNCTION restore_user_profile(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profile 
  SET 
    deleted_at = NULL,
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  RETURN FOUND;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION get_user_profile(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION update_user_profile(UUID, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION soft_delete_user_profile(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION restore_user_profile(UUID) TO authenticated;
