"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState, useCallback } from "react";
import { Profile, ProfileUpdate, CombinedProfile } from "@/lib/types/profile";
import {
  getUserProfileWithAuth,
  updateUserProfile,
  softDeleteUserProfile,
} from "@/lib/supabase/functions";
import { handleError, handleSuccess } from "@/lib/utils/result-handler";

export interface UseUserReturn {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: ProfileUpdate) => Promise<void>;
  deleteProfile: () => Promise<void>;
  // Helper für Benutzerinformationen
  getUsername: () => string;
  getDisplayName: () => string;
  getAvatarUrl: () => string | undefined;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // Profil mit Auth-Daten abrufen
  const fetchProfile = useCallback(
    async (userId: string): Promise<Profile | null> => {
      try {
        const data: CombinedProfile = await getUserProfileWithAuth(userId);
        setProfile(data.profile);
        setError(null);
        return data.profile;
      } catch (err) {
        handleError("Profil laden fehlgeschlagen", err);
        setError("Failed to fetch profile");
        return null;
      }
    },
    []
  );

  // Profil aktualisieren
  const updateProfileData = useCallback(
    async (updates: ProfileUpdate) => {
      if (!user) {
        handleError("Update nicht möglich", "Kein Benutzer angemeldet");
        setError("No user logged in");
        return;
      }

      try {
        setLoading(true);
        const data = await updateUserProfile(user.id, updates);
        setProfile(data);
        setError(null);
        handleSuccess("Profil aktualisiert", "Deine Änderungen wurden gespeichert");
      } catch (err) {
        handleError("Profil aktualisieren fehlgeschlagen", err);
        setError("Failed to update profile");
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // Profil löschen (soft delete)
  const deleteProfileData = useCallback(async () => {
    if (!user) {
      handleError("Löschen nicht möglich", "Kein Benutzer angemeldet");
      setError("No user logged in");
      return;
    }

    try {
      setLoading(true);
      await softDeleteUserProfile(user.id);
      await fetchProfile(user.id);
      handleSuccess("Profil gelöscht", "Dein Profil wurde erfolgreich gelöscht");
    } catch (err) {
      handleError("Profil löschen fehlgeschlagen", err);
      setError("Failed to delete profile");
    } finally {
      setLoading(false);
    }
  }, [user, fetchProfile]);

  // Profil neu laden
  const refreshProfile = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    await fetchProfile(user.id);
    setLoading(false);
  }, [user, fetchProfile]);

  useEffect(() => {
    // Initiale Session abrufen
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          handleError("Session abrufen fehlgeschlagen", sessionError);
          setError(sessionError.message);
          setLoading(false);
          return;
        }

        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        }

        setLoading(false);
      } catch (err) {
        handleError("Session initialisieren fehlgeschlagen", err);
        setError("Failed to get session");
        setLoading(false);
      }
    };

    getInitialSession();

    // Auth-Status überwachen
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[Auth State Change]:", event);
      }

      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, fetchProfile]);

  // Helper Funktionen für Benutzerinformationen
  const getUsername = useCallback((): string => {
    if (!user) return "";
    return profile?.username || user.email?.split("@")[0] || "";
  }, [user, profile]);

  const getDisplayName = useCallback((): string => {
    if (!user) return "";
    return user.user_metadata?.name || profile?.username || user.email || "";
  }, [user, profile]);

  const getAvatarUrl = useCallback((): string | undefined => {
    if (!user) return undefined;
    return user.user_metadata?.avatar_url || undefined;
  }, [user]);

  return {
    user,
    profile,
    loading,
    error,
    refreshProfile,
    updateProfile: updateProfileData,
    deleteProfile: deleteProfileData,
    getUsername,
    getDisplayName,
    getAvatarUrl,
  };
}
