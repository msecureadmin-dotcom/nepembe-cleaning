# Nepembe Cleaning Services

Production-ready full-stack website for **Nepembe Cleaning Service** in Walvis Bay, Namibia.

Built with Next.js 15, TypeScript, Tailwind CSS v4, Prisma, PostgreSQL, and more.

## Tech Stack

- **Frontend:** Next.js 15 App Router, TypeScript, Tailwind CSS v4
- **Backend:** Next.js API routes (server-side)
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** JWT with httpOnly cookies, bcrypt password hashing
- **Images:** Cloudinary (for production), local assets for fallback
- **Email:** Nodemailer SMTP
- **Hosting:** Railway (ready)

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your settings (DATABASE_URL, JWT_SECRET, etc.)

# Set up database
npx prisma migrate dev --name init

# Seed default data
npx prisma db seed

# Start development
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## Admin Login

Open `/admin/login` and use:
- **Email:** admin
- **Password:** nepembe2026

## Project Structure

```
app/                    # Next.js App Router pages
  page.tsx             # Landing page (public)
  layout.tsx           # Root layout with font + SEO
  globals.css          # Tailwind with desert theme
  sitemap.ts           # Dynamic sitemap
  robots.ts            # Robots config
  api/                 # All API routes
    auth/              # Login, logout, session
    contact/           # Quote form submission + email
    upload/            # Cloudinary image upload
    settings/          # Site settings CRUD
    hero-slides/       # Hero slideshow CRUD
    services/          # Services CRUD
    gallery/           # Gallery CRUD
    testimonials/      # Reviews CRUD
    features/          # Feature cards CRUD
    process-steps/     # Process steps CRUD
    faq/               # FAQ CRUD
    submissions/       # Contact submissions
    users/             # User management
  admin/               # Protected admin pages
    login/             # Login page
    page.tsx           # Dashboard
    settings/          # Landing page text editor
    hero-slides/       # Hero slides manager
    services/          # Services CRUD
    gallery/           # Gallery manager
    testimonials/      # Reviews manager
    features/          # Features manager
    process/           # Process steps manager
    faq/               # FAQ manager
    contact/           # Contact & social links
    submissions/       # View quote requests
    users/             # User management
prisma/
  schema.prisma        # Database schema (12 models)
  seed.ts              # Default data seeder
lib/
  prisma.ts            # Prisma client singleton
  auth.ts              # JWT auth helpers
  cloudinary.ts        # Cloudinary upload helpers
  email.ts             # Nodemailer SMTP helper
  validations.ts       # Zod schemas for all forms
components/            # Reusable components
public/assets/         # Static images (logo, hero, services)
```

## Environment Variables

```env
DATABASE_URL=          # PostgreSQL connection string
JWT_SECRET=            # Random secret for JWT signing
NEXT_PUBLIC_URL=       # Public URL (e.g., https://nepembe.railway.app)
CLOUDINARY_CLOUD_NAME= # Cloudinary cloud name
CLOUDINARY_API_KEY=    # Cloudinary API key
CLOUDINARY_API_SECRET= # Cloudinary API secret
SMTP_HOST=             # SMTP server host
SMTP_PORT=             # SMTP port (587)
SMTP_USER=             # SMTP username
SMTP_PASS=             # SMTP password
ADMIN_EMAIL=           # Where quote emails go (nepembejasen@gmail.com)
```

## Railway Deployment

### 1. Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: Nepembe Cleaning Services full-stack website"
gh repo create nepembe-cleaning --public --source=. --push
```

### 2. Deploy on Railway

1. Go to [railway.app](https://railway.app) and create a new project
2. Select **Deploy from GitHub repo** and choose your repo
3. Add a **PostgreSQL** plugin (Railway will provide a DATABASE_URL)
4. Go to your project's **Variables** tab and add all env vars:
   - `DATABASE_URL` — auto-provided by Railway PostgreSQL
   - `JWT_SECRET` — generate a random string
   - `NEXT_PUBLIC_URL` — your Railway app URL
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
   - `ADMIN_EMAIL` — `nepembejasen@gmail.com`
5. Open a **Railway Shell** (or use the dashboard) and run:

```bash
npx prisma migrate deploy
npx prisma db seed
```

6. Deploy will automatically run. If it doesn't, trigger a manual redeploy.

### 3. Verify

- Visit your Railway URL — public site should load
- Visit `/admin/login` — sign in with `admin` / `nepembe2026`
- Edit landing page text, add services, upload gallery images
- Submit a test quote form

## Default Admin

- **Email:** admin
- **Password:** nepembe2026

Change this password immediately after first login.

## Features

- Dynamic landing page with all content editable from admin
- Hero slideshow with image management
- 11 cleaning services with galleries
- Before/after transformation section
- Quote form with email notifications + WhatsApp integration
- Google Maps embed with editable location
- Gallery with category filters, load-more, and lightbox viewer
- Testimonials/reviews management
- FAQ accordion
- Live stats / trust highlights
- Feature cards editor
- Process steps editor
- SEO metadata, sitemap, robots.txt, JSON-LD
- Mobile-first desert theme design
- WhatsApp floating button
- Sticky booking bar
- User management (add/remove/change password)
- Contact submissions viewer with status tracking
- Export/restore functionality via admin

## License

Private — Nepembe Cleaning Services
