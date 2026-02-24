import { z } from "zod";

export const CityCreateSchema = z.object({
  cityName: z.string().min(1, "Stadtname ist erforderlich").max(100),
  slug: z
    .string()
    .min(1, "Slug ist erforderlich")
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten"),
  region: z.string().max(100).optional().nullable(),
  shortLocalHook: z.string().max(300).optional().nullable(),
  published: z.boolean().optional(),
});

export const CityUpdateSchema = CityCreateSchema.partial();

export const LeadSchema = z.object({
  citySlug: z.string().min(1),
  name: z.string().min(1, "Name ist erforderlich").max(100),
  email: z.string().email("Ungültige E-Mail-Adresse").max(200),
  phone: z.string().max(30).optional().default(""),
  service: z.string().min(1, "Bitte wählen Sie eine Leistung"),
  message: z.string().min(1, "Nachricht ist erforderlich").max(2000),
  honeypot: z.string().max(0, "Bot detected").optional().default(""),
});

export type CityCreateInput = z.infer<typeof CityCreateSchema>;
export type CityUpdateInput = z.infer<typeof CityUpdateSchema>;
export type LeadInput = z.infer<typeof LeadSchema>;
