import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().min(1, "Phone is required").max(30),
  email: z.string().email("Invalid email").or(z.literal("")).default(""),
  service: z.string().max(100).default(""),
  location: z.string().max(200).default(""),
  preferredDate: z.string().max(20).default(""),
  preferredTime: z.string().max(20).default(""),
  message: z.string().max(2000).default(""),
});

export const siteSettingsSchema = z.object({
  companyName: z.string().max(200).optional(),
  slogan: z.string().max(300).optional(),
  logoUrl: z.string().max(500).optional(),
  phone: z.string().max(100).optional(),
  whatsapp: z.string().max(30).optional(),
  email: z.string().email().or(z.literal("")).optional(),
  address: z.string().max(300).optional(),
  mapLocation: z.string().max(300).optional(),
  googleMapsUrl: z.string().max(500).optional(),
  businessHours: z.string().max(200).optional(),
  facebookUrl: z.string().max(500).optional(),
  instagramUrl: z.string().max(500).optional(),
  tiktokUrl: z.string().max(500).optional(),
  seoTitle: z.string().max(200).optional(),
  seoDescription: z.string().max(500).optional(),
  heroEyebrow: z.string().max(200).optional(),
  heroTitle: z.string().max(200).optional(),
  heroSubtitle: z.string().max(500).optional(),
  servicesEyebrow: z.string().max(200).optional(),
  servicesTitle: z.string().max(200).optional(),
  servicesText: z.string().max(1000).optional(),
  featuresEyebrow: z.string().max(200).optional(),
  featuresTitle: z.string().max(200).optional(),
  featuresText: z.string().max(1000).optional(),
  aboutEyebrow: z.string().max(200).optional(),
  aboutTitle: z.string().max(200).optional(),
  aboutText: z.string().max(2000).optional(),
  processEyebrow: z.string().max(200).optional(),
  processTitle: z.string().max(200).optional(),
  processText: z.string().max(1000).optional(),
  transformEyebrow: z.string().max(200).optional(),
  transformTitle: z.string().max(200).optional(),
  transformText: z.string().max(1000).optional(),
  galleryEyebrow: z.string().max(200).optional(),
  galleryTitle: z.string().max(200).optional(),
  galleryText: z.string().max(1000).optional(),
  quoteEyebrow: z.string().max(200).optional(),
  quoteTitle: z.string().max(200).optional(),
  quoteText: z.string().max(1000).optional(),
  testimonialsEyebrow: z.string().max(200).optional(),
  testimonialsTitle: z.string().max(200).optional(),
  contactEyebrow: z.string().max(200).optional(),
  contactTitle: z.string().max(200).optional(),
  contactText: z.string().max(1000).optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  imageUrl: z.string().max(500).default(""),
  isActive: z.boolean().default(true),
});

export const gallerySchema = z.object({
  title: z.string().min(1).max(200),
  category: z.string().max(200).default("General"),
  imageUrl: z.string().min(1, "Image URL is required"),
  caption: z.string().max(500).default(""),
  sortOrder: z.number().default(0),
});

export const testimonialSchema = z.object({
  customerName: z.string().min(1).max(200),
  review: z.string().min(1).max(1000),
  rating: z.number().min(1).max(5).default(5),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const faqSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(5000),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const statSchema = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(50),
  icon: z.string().max(20).default(""),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().max(200).optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Admin", "Editor"]).default("Editor"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
