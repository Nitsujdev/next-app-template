-- Schema für die Haupttabellen
-- Führe dieses Skript zuerst aus

-- Profile Tabelle für Benutzer
CREATE TABLE IF NOT EXISTS public.profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Basis Profilfelder (erweiterbar)
  username TEXT UNIQUE,
  bio TEXT,
  
  -- Einstellungen als JSONB für Flexibilität
  settings JSONB DEFAULT '{
    "notifications": {
      "email": true,
      "push": true,
      "marketing": false
    },
    "privacy": {
      "public_profile": true,
      "show_activity": true
    },
    "theme": "system",
    "language": "de"
  }'::jsonb,
  
  -- Metadaten
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

-- Aktiviere Row Level Security
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

-- Erstelle einen Index für schnellere Suche
CREATE INDEX IF NOT EXISTS profile_user_id_idx ON public.profile(user_id);
CREATE INDEX IF NOT EXISTS profile_username_idx ON public.profile(username);

-- Trigger für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profile_updated_at
  BEFORE UPDATE ON public.profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
