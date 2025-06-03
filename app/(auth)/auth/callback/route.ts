import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { handleError } from "@/lib/utils/result-handler";

// Hilfsfunktion für die Weiterleitungslogik
function createRedirectResponse(request: Request, next: string = "/") {
  const { origin } = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  } else {
    return NextResponse.redirect(`${origin}${next}`);
  }
}

// Hilfsfunktion für die Profilprüfung
async function checkUserProfileAndRedirect(
  userId: string,
  request: Request,
  next: string = "/"
) {
  const supabase = await createClient();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) {
    handleError(profileError);
  }

  if (!profile) {
    // Neuer Benutzer - zur Profileinrichtung weiterleiten
    return NextResponse.redirect(
      new URL("/dashboard/einstellungen", request.url)
    );
  } else {
    return createRedirectResponse(request, next);
  }
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/";

  const supabase = await createClient();
  console.log("Callback aufgerufen mit:", { code, tokenHash, type });

  try {
    // OAuth-Authentifizierung (z.B. Google)
    if (code) {
      console.log("OAuth-Code gefunden, tausche gegen Sitzung...");
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) throw error;
      return await checkUserProfileAndRedirect(data.user.id, request, next);
    }
    // Magic Link/Email-OTP Authentifizierung
    else if (tokenHash && type === "email") {
      console.log("Magic Link Token gefunden, verarbeite Session...");
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: "email",
      });

      if (error) throw error;
      if (!data || !data.user || !data.user.id)
        throw new Error("Benutzer nicht gefunden");

      return await checkUserProfileAndRedirect(data.user.id, request, next);
    }

    throw new Error("Ungültige Authentifizierungsparameter");
  } catch (error) {
    console.error("Authentifizierungsfehler:", error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
