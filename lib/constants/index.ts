// Application constants and configuration

export const APP_CONFIG = {
  name: "Next.js App Template",
  version: "1.0.0",
  description: "A modern Next.js application template with Supabase",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 10000,
} as const;

export const AUTH_CONFIG = {
  redirectTo: "/dashboard",
  loginUrl: "/login",
  registerUrl: "/register",
} as const;

export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  maxPageSize: 100,
  pageSizeOptions: [10, 20, 50, 100],
} as const;

export const THEME_CONFIG = {
  themes: [
    { name: "light", value: "light", label: "Light" },
    { name: "dark", value: "dark", label: "Dark" },
    { name: "system", value: "system", label: "System" },
  ],
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const ERROR_MESSAGES = {
  generic: "Ein unerwarteter Fehler ist aufgetreten",
  network: "Netzwerkfehler. Bitte überprüfe deine Verbindung.",
  unauthorized: "Du bist nicht berechtigt, diese Aktion auszuführen.",
  notFound: "Die angeforderte Ressource wurde nicht gefunden.",
  validation: "Bitte überprüfe deine Eingaben.",
} as const;

export const SUCCESS_MESSAGES = {
  saved: "Änderungen erfolgreich gespeichert",
  deleted: "Element erfolgreich gelöscht",
  created: "Element erfolgreich erstellt",
  updated: "Element erfolgreich aktualisiert",
} as const;
