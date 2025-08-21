"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Profile, ProfileUpdate, CombinedProfile } from "@/lib/types/profile";
import {
  getUserProfileWithAuth,
  updateUserProfile,
  softDeleteUserProfile,
} from "@/lib/supabase/functions";

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
  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const data: CombinedProfile = await getUserProfileWithAuth(userId);
      setProfile(data.profile);
      return data.profile;
    } catch (err) {
      console.error("Error in fetchProfile:", err);
      setError("Failed to fetch profile");
      return null;
    }
  };

  // Profil aktualisieren
  const updateProfileData = async (updates: ProfileUpdate) => {
    if (!user) {
      setError("No user logged in");
      return;
    }

    try {
      const data = await updateUserProfile(user.id, updates);
      setProfile(data);
    } catch (err) {
      console.error("Error in updateProfile:", err);
      setError("Failed to update profile");
    }
  };

  // Profil löschen (soft delete)
  const deleteProfileData = async () => {
    if (!user) {
      setError("No user logged in");
      return;
    }

    try {
      await softDeleteUserProfile(user.id);
      await refreshProfile();
    } catch (err) {
      console.error("Error in deleteProfile:", err);
      setError("Failed to delete profile");
    }
  };

  // Profil neu laden
  const refreshProfile = async () => {
    if (!user) return;
    setLoading(true);
    await fetchProfile(user.id);
    setLoading(false);
  };

  useEffect(() => {
    // Initiale Session abrufen
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          setError(error.message);
          setLoading(false);
          return;
        }

        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error in getInitialSession:", err);
        setError("Failed to get session");
        setLoading(false);
      }
    };

    getInitialSession();

    // Auth-Status überwachen
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);

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
  }, [supabase.auth]);

  // Helper Funktionen für Benutzerinformationen
  const getUsername = (): string => {
    if (!user) return "";
    return profile?.username || user.email?.split("@")[0] || "";
  };

  const getDisplayName = (): string => {
    if (!user) return "";
    return user.user_metadata?.name || profile?.username || user.email || "";
  };

  const getAvatarUrl = (): string | undefined => {
    if (!user) return undefined;
    return user.user_metadata?.avatar_url || undefined;
  };

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
