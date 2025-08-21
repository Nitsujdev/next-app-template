-- Sicherheitsrichtlinien (Row Level Security)
-- Führe dieses Skript nach dem Schema aus

-- Profile Policies
CREATE POLICY "Benutzer können ihr eigenes Profil lesen"
  ON public.profile
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Benutzer können öffentliche Profile lesen"
  ON public.profile
  FOR SELECT
  USING (
    (settings->'privacy'->>'public_profile')::boolean = true
    OR auth.uid() = user_id
  );

CREATE POLICY "Benutzer können ihr eigenes Profil aktualisieren"
  ON public.profile
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Benutzer können ihr eigenes Profil löschen"
  ON public.profile
  FOR DELETE
  USING (auth.uid() = user_id);

-- Automatische Profilerstellung für neue Benutzer
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profile (user_id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger für neue Auth-Benutzer
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
