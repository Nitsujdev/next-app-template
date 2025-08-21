import { BaseEntity } from "./index";

/**
 * Profile Settings Type
 * Flexible Einstellungen für das Benutzerprofil
 */
export interface ProfileSettings {
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    public_profile: boolean;
    show_activity: boolean;
  };
  theme: "light" | "dark" | "system";
  language: string;
}

/**
 * Profile Type Definition
 *
 * Generisches Profil mit flexiblen JSONB Feldern für Erweiterbarkeit
 *
 * Database Schema:
 * ```sql
 * CREATE TABLE profile (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
 *   username TEXT UNIQUE,
 *   bio TEXT,
 *   settings JSONB,
 *   metadata JSONB,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
 * );
 * ```
 */
export interface Profile extends BaseEntity {
  user_id: string;
  username?: string | null;
  bio?: string | null;
  settings?: ProfileSettings;
  metadata?: Record<string, unknown>;
  deleted_at?: string | null;
}

/**
 * Auth User Data
 * Daten aus auth.users Tabelle
 */
export interface AuthUser {
  id: string;
  email: string;
  email_confirmed_at?: string;
  phone?: string;
  last_sign_in_at?: string;
  raw_user_meta_data: {
    name?: string;
    avatar_url?: string;
    [key: string]: unknown;
  };
  created_at: string;
  updated_at: string;
}

/**
 * Combined Profile Data
 * Kombinierte Daten aus auth.users und profile
 */
export interface CombinedProfile {
  profile: Profile | null;
  auth_user: AuthUser;
}

/**
 * Profile Update Type
 * Für partielle Updates
 */
export type ProfileUpdate = Partial<
  Omit<Profile, "id" | "user_id" | "created_at" | "updated_at">
>;

/**
 * Example Profile Data
 */
export const exampleProfile: Profile = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  user_id: "auth-user-id-here",
  username: "johndoe",
  bio: "Full-stack developer passionate about building great user experiences.",
  settings: {
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
    privacy: {
      public_profile: true,
      show_activity: true,
    },
    theme: "system",
    language: "de",
  },
  metadata: {
    // Hier können appspezifische Daten gespeichert werden
    lastActiveProject: "project-123",
    favoriteTheme: "ocean",
  },
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-20T14:45:00Z",
  deleted_at: null,
};
