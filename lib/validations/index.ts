import { z } from "zod";

// Common validation schemas
export const emailSchema = z
  .string()
  .email("Bitte gib eine gültige E-Mail-Adresse ein")
  .min(1, "E-Mail ist erforderlich");

export const passwordSchema = z
  .string()
  .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Passwort muss mindestens einen Kleinbuchstaben, einen Großbuchstaben und eine Zahl enthalten"
  );

export const nameSchema = z
  .string()
  .min(2, "Name muss mindestens 2 Zeichen lang sein")
  .max(50, "Name darf maximal 50 Zeichen lang sein")
  .regex(
    /^[a-zA-ZäöüßÄÖÜ\s-]+$/,
    "Name darf nur Buchstaben, Leerzeichen und Bindestriche enthalten"
  );

export const urlSchema = z
  .string()
  .url("Bitte gib eine gültige URL ein")
  .optional()
  .or(z.literal(""));

// Form schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Passwort ist erforderlich"),
});

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Passwort-Bestätigung ist erforderlich"),
    fullName: nameSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwörter stimmen nicht überein",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  fullName: nameSchema.optional(),
  email: emailSchema.optional(),
  avatarUrl: urlSchema,
  bio: z.string().max(500, "Bio darf maximal 500 Zeichen lang sein").optional(),
});

export const searchSchema = z.object({
  query: z
    .string()
    .min(1, "Suchbegriff ist erforderlich")
    .max(100, "Suchbegriff zu lang"),
  filters: z.record(z.any()).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

// API response schemas
export const apiResponseSchema = z.object({
  data: z.any(),
  error: z.string().nullable(),
  success: z.boolean(),
});

export const paginatedResponseSchema = z.object({
  data: z.array(z.any()),
  count: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  hasMore: z.boolean(),
});

// Type exports
export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type ProfileForm = z.infer<typeof profileSchema>;
export type SearchForm = z.infer<typeof searchSchema>;
export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type PaginatedResponse = z.infer<typeof paginatedResponseSchema>;
