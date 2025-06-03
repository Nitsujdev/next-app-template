import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  // Umgebungsprüfung für NODE_ENV hat Vorrang
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // Wenn im Browser, verwende die aktuelle URL des Nutzers
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // Im Server-Kontext - verwende die konfigurierte URL für Produktion
  return (
    process.env.NEXT_PUBLIC_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000")
  );
}
