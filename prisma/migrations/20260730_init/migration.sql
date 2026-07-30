warn The configuration property `package.json#prisma` is deprecated and will be removed in Prisma 7. Please migrate to a Prisma config file (e.g., `prisma.config.ts`).
For more information, see: https://pris.ly/prisma-config

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Admin',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "company_name" TEXT NOT NULL DEFAULT 'Nepembe Cleaning Service',
    "slogan" TEXT NOT NULL DEFAULT 'We are the kings of the cleaning world',
    "logo_url" TEXT NOT NULL DEFAULT '/assets/nepembe-logo.png',
    "phone" TEXT NOT NULL DEFAULT '081 227 3021 / 085 227 3021',
    "whatsapp" TEXT NOT NULL DEFAULT '+264812273021',
    "email" TEXT NOT NULL DEFAULT 'nepembejasen@gmail.com',
    "address" TEXT NOT NULL DEFAULT 'Walvis Bay, Namibia',
    "map_location" TEXT NOT NULL DEFAULT 'Walvis Bay, Namibia',
    "google_maps_url" TEXT NOT NULL DEFAULT '',
    "business_hours" TEXT NOT NULL DEFAULT 'Mon - Sat: 08:00 - 18:00',
    "facebook_url" TEXT NOT NULL DEFAULT '',
    "instagram_url" TEXT NOT NULL DEFAULT '',
    "tiktok_url" TEXT NOT NULL DEFAULT '',
    "hero_eyebrow" TEXT NOT NULL DEFAULT 'Desert-fresh cleaning in Walvis Bay',
    "hero_title" TEXT NOT NULL DEFAULT 'Reliable cleaning services for homes, offices and businesses.',
    "hero_subtitle" TEXT NOT NULL DEFAULT 'We are the kings of the cleaning world ÔÇö trusted, detail-focused cleaning across Walvis Bay.',
    "services_eyebrow" TEXT NOT NULL DEFAULT 'What we do',
    "services_title" TEXT NOT NULL DEFAULT 'Cleaning services built around your space',
    "services_text" TEXT NOT NULL DEFAULT 'Choose a once-off deep clean, recurring office cleaning, or specialist cleaning support after moving, building, or events.',
    "features_eyebrow" TEXT NOT NULL DEFAULT 'Cleaning features',
    "features_title" TEXT NOT NULL DEFAULT 'The kings of the cleaning world',
    "features_text" TEXT NOT NULL DEFAULT 'Professional cleaning features that make every service easier to trust, easier to book and easier to update online.',
    "about_eyebrow" TEXT NOT NULL DEFAULT 'About Nepembe',
    "about_title" TEXT NOT NULL DEFAULT 'Local, dependable and detail-driven.',
    "about_text" TEXT NOT NULL DEFAULT 'Nepembe Cleaning Service helps households and businesses in Walvis Bay maintain clean, healthy and welcoming spaces.',
    "process_eyebrow" TEXT NOT NULL DEFAULT 'Simple booking flow',
    "process_title" TEXT NOT NULL DEFAULT 'From dusty to desert-fresh in three smooth steps',
    "process_text" TEXT NOT NULL DEFAULT 'A polished experience from the first message to the final quality check.',
    "transform_eyebrow" TEXT NOT NULL DEFAULT 'Live cleaning feel',
    "transform_title" TEXT NOT NULL DEFAULT 'See the transformation before customers even call.',
    "transform_text" TEXT NOT NULL DEFAULT 'The landing page feels alive with image slides, elegant hover movements, animated counters and smooth scroll progress.',
    "gallery_eyebrow" TEXT NOT NULL DEFAULT 'Recent work',
    "gallery_title" TEXT NOT NULL DEFAULT 'Gallery',
    "gallery_text" TEXT NOT NULL DEFAULT 'Filter projects by category and click any image to preview the work.',
    "quote_eyebrow" TEXT NOT NULL DEFAULT 'Request a quote',
    "quote_title" TEXT NOT NULL DEFAULT 'Tell us what needs cleaning.',
    "quote_text" TEXT NOT NULL DEFAULT 'Submit your details and Nepembe Cleaning Service will receive your request by email.',
    "testimonials_eyebrow" TEXT NOT NULL DEFAULT 'Client confidence',
    "testimonials_title" TEXT NOT NULL DEFAULT 'Why customers choose Nepembe',
    "contact_eyebrow" TEXT NOT NULL DEFAULT 'Contact',
    "contact_title" TEXT NOT NULL DEFAULT 'Ready for a cleaner space?',
    "contact_text" TEXT NOT NULL DEFAULT 'Reach out for residential, office, commercial, deep cleaning and more.',
    "seo_title" TEXT NOT NULL DEFAULT 'Nepembe Cleaning Service | Professional Cleaning in Walvis Bay',
    "seo_description" TEXT NOT NULL DEFAULT 'Professional cleaning services in Walvis Bay, Namibia. Sofa, upholstery, residential, office, deep cleaning and more.',

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_slides" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "hero_slides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL DEFAULT '',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'General',
    "image_url" TEXT NOT NULL,
    "caption" TEXT NOT NULL DEFAULT '',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gallery_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature_cards" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image_url" TEXT NOT NULL DEFAULT '',
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "feature_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "process_steps" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "process_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "service" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "preferred_date" TEXT NOT NULL DEFAULT '',
    "preferred_time" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'New',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

