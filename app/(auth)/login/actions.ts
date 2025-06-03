"use server";

import { createClient } from "@/lib/supabase/server";
import { getBaseUrl } from "@/lib/utils/utils";
import { redirect } from "next/navigation";

export async function signInWithMagicLink(email: string) {
  const supabase = await createClient();
  const baseUrl = getBaseUrl();

  console.log("Sende Magic Link an:", email);
  console.log("Verwende Redirect-URL:", `${baseUrl}/auth/callback`);

  // Explizit den Parameter wieder setzen
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${baseUrl}/auth/callback`,
    },
  });

  // Log für erfolgreiche Anfragen und Daten
  console.log("Supabase Antwort:", { data, error });

  if (error) {
    console.error("Magic link error:", error);
    throw new Error(error.message);
  }

  // Rückgabeinformationen
  return {
    success: true,
    message: "Magic Link wurde gesendet. Bitte prüfe deine E-Mail.",
  };
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const baseUrl = getBaseUrl();

  console.log("Using origin for auth:", baseUrl); // Debugging-Hilfe

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("OAuth error:", error);
    throw new Error(error.message);
  }

  redirect(data.url);
}
