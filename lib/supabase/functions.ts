import { createClient } from "./client";
import { Profile, ProfileUpdate, CombinedProfile } from "@/lib/types/profile";

/**
 * Supabase RPC Functions
 * Diese Funktionen rufen die Datenbank-RPCs auf
 */

/**
 * Benutzerprofil mit Auth-Daten abrufen
 */
export async function getUserProfileWithAuth(
  userId: string
): Promise<CombinedProfile> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_user_profile", {
    p_user_id: userId,
  });

  if (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }

  return data;
}

/**
 * Benutzerprofil aktualisieren
 */
export async function updateUserProfile(
  userId: string,
  updates: ProfileUpdate
): Promise<Profile> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("update_user_profile", {
    p_user_id: userId,
    p_profile_data: updates,
  });

  if (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }

  return data;
}

/**
 * Benutzerprofil "soft" löschen
 */
export async function softDeleteUserProfile(userId: string): Promise<boolean> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("soft_delete_user_profile", {
    p_user_id: userId,
  });

  if (error) {
    console.error("Error soft deleting user profile:", error);
    throw error;
  }

  return data;
}

/**
 * Gelöschtes Benutzerprofil wiederherstellen
 */
export async function restoreUserProfile(userId: string): Promise<boolean> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("restore_user_profile", {
    p_user_id: userId,
  });

  if (error) {
    console.error("Error restoring user profile:", error);
    throw error;
  }

  return data;
}
