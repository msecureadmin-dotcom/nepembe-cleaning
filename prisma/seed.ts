import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("nepembe2026", 12);

  await prisma.user.upsert({
    where: { email: "admin" },
    update: { passwordHash: hash },
    create: { email: "admin", name: "Admin", passwordHash: hash, role: "Admin" },
  });
  await prisma.user.upsert({
    where: { email: "editor@nepembe.na" },
    update: { passwordHash: hash },
    create: { email: "editor@nepembe.na", name: "Selma Nangolo", passwordHash: hash, role: "Editor" },
  });
  console.log("Users seeded");

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      companyName: "Nepembe Cleaning Service",
      slogan: "We are the kings of the cleaning world",
      logoUrl: "/assets/nepembe-logo.svg",
      phone: "081 227 3021 / 085 227 3021",
      whatsapp: "+264812273021",
      email: "msecure.admin@gmail.com",
      address: "21 Sam Nujoma Avenue, Walvis Bay, Namibia",
      mapLocation: "Walvis Bay, Namibia",
      businessHours: "Mon - Fri: 07:30 - 18:00 | Sat: 08:00 - 15:00 | Sun: Closed",
      facebookUrl: "https://facebook.com/nepembecleaning",
      instagramUrl: "https://instagram.com/nepembecleaning",
      tiktokUrl: "",
      heroEyebrow: "Desert-fresh cleaning in Walvis Bay",
      heroTitle: "Reliable cleaning services for homes, offices and businesses in Walvis Bay",
      heroSubtitle: "We are the kings of the cleaning world — trusted, detail-focused cleaning across Walvis Bay, Swakopmund and the Erongo region.",
      servicesEyebrow: "What we do",
      servicesTitle: "Cleaning services built around your space",
      servicesText: "Choose a once-off deep clean, recurring office cleaning, or specialist cleaning support after moving, building, or hosting an event. Every service includes a quality check before we leave.",
      featuresEyebrow: "Cleaning features",
      featuresTitle: "The kings of the cleaning world",
      featuresText: "Professional cleaning features that make every service easier to trust, easier to book and easier to update online.",
      aboutEyebrow: "About Nepembe",
      aboutTitle: "Local, dependable and detail-driven.",
      aboutText: "Nepembe Cleaning Service is a Walvis Bay-based cleaning company specialising in residential, office and specialist cleaning. We serve homes, guesthouses, shops, offices and construction sites across the Erongo region. Every job is backed by clear communication, punctual arrival and a final quality walk-through.",
      processEyebrow: "Simple booking flow",
      processTitle: "From dusty to desert-fresh in three smooth steps",
      processText: "A polished experience from the first message to the final quality check.",
      transformEyebrow: "Live cleaning feel",
      transformTitle: "See the transformation before customers even call.",
      transformText: "The landing page feels alive with image slides, elegant hover movements, animated counters and smooth scroll progress that guide visitors towards requesting a quote.",
      galleryEyebrow: "Recent work",
      galleryTitle: "Before and after — see the Nepembe difference",
      galleryText: "Filter projects by category and click any image to preview the work. Every photo shows a real cleaning result from Walvis Bay.",
      quoteEyebrow: "Request a quote",
      quoteTitle: "Tell us what needs cleaning. We will get back to you within 24 hours.",
      quoteText: "Submit your details and Nepembe Cleaning Service will receive your request by email and WhatsApp. Prefer to call? Dial 081 227 3021.",
      testimonialsEyebrow: "Client confidence",
      testimonialsTitle: "Why customers choose Nepembe",
      contactEyebrow: "Contact",
      contactTitle: "Ready for a cleaner space?",
      contactText: "Reach out for residential, office, commercial, deep cleaning, sofa cleaning, upholstery cleaning, carpet, window, move-in/move-out and post-construction cleaning across Walvis Bay and surrounding areas.",
      seoTitle: "Nepembe Cleaning Service | Professional Cleaning in Walvis Bay, Namibia",
      seoDescription: "Professional cleaning services in Walvis Bay, Namibia. Sofa and upholstery cleaning, residential, office, commercial, deep cleaning, post-construction, carpet and window cleaning. Call 081 227 3021.",
    },
  });
  console.log("Site settings seeded");

  await prisma.heroSlide.deleteMany();
  await prisma.heroSlide.createMany({
    data: [
      { title: "Professional home cleaning in Walvis Bay", imageUrl: "/assets/hero-desert-cleaning.svg", sortOrder: 0, isActive: true },
      { title: "Office and commercial cleaning services", imageUrl: "/assets/hero-desert-office.svg", sortOrder: 1, isActive: true },
      { title: "Sofa and upholstery care specialists", imageUrl: "/assets/hero-desert-sofa.svg", sortOrder: 2, isActive: true },
      { title: "Post-construction and deep cleaning", imageUrl: "/assets/deep-cleaning.svg", sortOrder: 3, isActive: true },
    ],
  });
  console.log("Hero slides seeded");

  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      { title: "Residential Cleaning", slug: "residential-cleaning", description: "Regular and once-off home cleaning to keep every room fresh, neat and comfortable. Includes dusting, mopping, kitchen and bathroom cleaning.", imageUrl: "/assets/cleaning-home.svg", sortOrder: 0, isActive: true },
      { title: "Office Cleaning", slug: "office-cleaning", description: "Professional office cleaning for productive, hygienic workspaces and happy teams. Includes desk wipe-downs, vacuuming, kitchen and bathroom sanitisation.", imageUrl: "/assets/cleaning-office.svg", sortOrder: 1, isActive: true },
      { title: "Commercial Cleaning", slug: "commercial-cleaning", description: "Reliable cleaning for shops, guesthouses, lodges, showrooms and small business premises. Flexible scheduling outside trading hours.", imageUrl: "/assets/cleaning-office.svg", sortOrder: 2, isActive: true },
      { title: "Deep Cleaning", slug: "deep-cleaning", description: "Detailed top-to-bottom cleaning for kitchens, bathrooms, floors, skirting boards, light fittings and hard-to-reach areas. Ideal for spring cleans or preparing a property.", imageUrl: "/assets/deep-cleaning.svg", sortOrder: 3, isActive: true },
      { title: "Sofa Cleaning", slug: "sofa-cleaning", description: "Professional sofa and couch cleaning to remove dust, allergens, stains and odours. Safe for fabric and leather — restores the fresh look of your lounge furniture.", imageUrl: "/assets/sofa-cleaning.svg", sortOrder: 4, isActive: true },
      { title: "Upholstery Cleaning", slug: "upholstery-cleaning", description: "Fabric chair, dining chair, cushion, headboard and upholstery cleaning for homes, offices, hotels and guest spaces.", imageUrl: "/assets/sofa-cleaning.svg", sortOrder: 5, isActive: true },
      { title: "Move-In / Move-Out Cleaning", slug: "move-in-move-out-cleaning", description: "Prepare a property before moving in or hand it over spotless after moving out. Includes fridge, oven, cupboards, windows and floors.", imageUrl: "/assets/cleaning-home.svg", sortOrder: 6, isActive: true },
      { title: "Post-Construction Cleaning", slug: "post-construction-cleaning", description: "Dust, cement splatter, paint flecks, adhesive marks and fine debris removal after renovation, building projects or new finishes.", imageUrl: "/assets/deep-cleaning.svg", sortOrder: 7, isActive: true },
      { title: "Carpet Cleaning", slug: "carpet-cleaning", description: "Refresh carpets and fabric floor surfaces with careful deep cleaning, stain treatment and deodorising.", imageUrl: "/assets/sofa-cleaning.svg", sortOrder: 8, isActive: true },
      { title: "Window Cleaning", slug: "window-cleaning", description: "Cleaner glass, brighter rooms and better presentation for homes, offices and storefronts. Interior and exterior available.", imageUrl: "/assets/window-cleaning.svg", sortOrder: 9, isActive: true },
      { title: "Event Cleaning", slug: "event-cleaning", description: "Before and after event cleaning for private functions, weddings, community events and business gatherings. Includes setup support and full post-event cleanup.", imageUrl: "/assets/deep-cleaning.svg", sortOrder: 10, isActive: true },
    ],
  });
  console.log("Services seeded");

  await prisma.galleryItem.deleteMany();
  await prisma.galleryItem.createMany({
    data: [
      { title: "Office deep clean — Walvis Bay CBD", category: "Office Cleaning", imageUrl: "/assets/cleaning-office.svg", caption: "Full office sanitisation and desk detail for a local law firm", sortOrder: 0 },
      { title: "Residential living room refresh", category: "Residential Cleaning", imageUrl: "/assets/cleaning-home.svg", caption: "Weekly home clean for a family in Narraville", sortOrder: 1 },
      { title: "Sofa cleaning — fabric lounge suite", category: "Sofa Cleaning", imageUrl: "/assets/sofa-cleaning.svg", caption: "Deep extraction clean on a 3-seater and two armchairs", sortOrder: 2 },
      { title: "Upholstery cleaning — office chairs", category: "Upholstery Cleaning", imageUrl: "/assets/sofa-cleaning.svg", caption: "12 fabric office chairs cleaned and deodorised", sortOrder: 3 },
      { title: "Kitchen deep clean", category: "Deep Cleaning", imageUrl: "/assets/deep-cleaning.svg", caption: "Oven, hob, extractor, cupboards and tile scrub", sortOrder: 4 },
      { title: "Commercial window cleaning", category: "Window Cleaning", imageUrl: "/assets/window-cleaning.svg", caption: "Storefront and mezzanine windows for a retail shop", sortOrder: 5 },
      { title: "Post-construction dust removal", category: "Post-Construction Cleaning", imageUrl: "/assets/deep-cleaning.svg", caption: "Full dust clean after a bathroom renovation in Meersig", sortOrder: 6 },
      { title: "Move-out clean — 2-bedroom flat", category: "Move-In / Move-Out Cleaning", imageUrl: "/assets/cleaning-home.svg", caption: "Tenancy handover clean including oven and fridge", sortOrder: 7 },
      { title: "Carpet clean — open-plan office", category: "Carpet Cleaning", imageUrl: "/assets/sofa-cleaning.svg", caption: "Hot water extraction on 180m² of commercial carpet", sortOrder: 8 },
      { title: "Guesthouse deep clean", category: "Commercial Cleaning", imageUrl: "/assets/cleaning-office.svg", caption: "5-room guesthouse turnover clean in Langstrand", sortOrder: 9 },
      { title: "Post-event hall cleanup", category: "Event Cleaning", imageUrl: "/assets/deep-cleaning.svg", caption: "Community hall cleanup after a wedding reception", sortOrder: 10 },
      { title: "Sofa cleaning — leather 2-seater", category: "Sofa Cleaning", imageUrl: "/assets/sofa-cleaning.svg", caption: "Leather clean and conditioning for a lounge suite", sortOrder: 11 },
      { title: "Office floor strip and wax", category: "Office Cleaning", imageUrl: "/assets/cleaning-office.svg", caption: "Vinyl floor strip, scrub and re-wax for a medical centre", sortOrder: 12 },
      { title: "Residential bathroom deep clean", category: "Deep Cleaning", imageUrl: "/assets/deep-cleaning.svg", caption: "Grout scrub, mould treatment and tile polish", sortOrder: 13 },
    ],
  });
  console.log("Gallery items seeded");

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      { customerName: "Helena // Narraville", review: "Nepembe cleaned our entire house after a renovation. The dust was everywhere but they got every corner. Even the windows were streak-free. Fair pricing and friendly team.", rating: 5, sortOrder: 0, isActive: true },
      { customerName: "Marius // Meersig", review: "We use Nepembe for our office block twice a week. Reliable, consistent, and they communicate well. Highly recommended for commercial cleaning.", rating: 5, sortOrder: 1, isActive: true },
      { customerName: "Grace // Walvis Bay CBD", review: "Had my 3-seater sofa and two armchairs cleaned. The difference is unbelievable — looks like new furniture. Will definitely use again.", rating: 5, sortOrder: 2, isActive: true },
      { customerName: "Tomas // Kuisebmond", review: "Quick response on WhatsApp, fair quote, and they did a great job on my carpets. No smell, no dampness left behind. Thanks team!", rating: 4, sortOrder: 3, isActive: true },
      { customerName: "Lindi // Langstrand", review: "Booked a move-out clean for our rental property. The agent was impressed and we got our full deposit back. Great service, will call again.", rating: 5, sortOrder: 4, isActive: true },
    ],
  });
  console.log("Testimonials seeded");

  await prisma.stat.deleteMany();
  await prisma.stat.createMany({
    data: [
      { label: "fast response goal", value: "24h", icon: "⚡", sortOrder: 0, isActive: true },
      { label: "cleaning services offered", value: "11", icon: "🛋️", sortOrder: 1, isActive: true },
      { label: "serving Walvis Bay and beyond", value: "Erongo", icon: "📍", sortOrder: 2, isActive: true },
      { label: "satisfaction guarantee", value: "100%", icon: "✨", sortOrder: 3, isActive: true },
    ],
  });
  console.log("Stats seeded");

  await prisma.featureCard.deleteMany();
  await prisma.featureCard.createMany({
    data: [
      { title: "Sofa and upholstery care", text: "Refresh couches, office chairs, dining chairs, cushions and fabric furniture with dedicated upholstery cleaning. Safe for fabric and leather.", imageUrl: "/assets/sofa-cleaning.svg", sortOrder: 0 },
      { title: "Deep cleaning detail", text: "Bathrooms, kitchens, corners, skirting boards, light switches and high-touch areas cleaned with attention to every surface.", imageUrl: "/assets/deep-cleaning.svg", sortOrder: 1 },
      { title: "Clear finishing touches", text: "Windows, glass partitions, mirrors and presentation-focused cleaning that leaves homes, offices and storefronts looking brighter.", imageUrl: "/assets/window-cleaning.svg", sortOrder: 2 },
      { title: "Reliable communication", text: "WhatsApp booking, email confirmation and arrival updates. No guessing — you will know when we are coming and when we are done.", imageUrl: "/assets/cleaning-home.svg", sortOrder: 3 },
    ],
  });
  console.log("Features seeded");

  await prisma.processStep.deleteMany();
  await prisma.processStep.createMany({
    data: [
      { title: "Choose a service", text: "Select home, office, sofa, upholstery, windows, deep cleaning or post-construction. Not sure? Send us a message and we will recommend the right clean.", sortOrder: 0 },
      { title: "Send a quick quote request", text: "Use WhatsApp, the quote form on this site, or give us a call. We respond within 24 hours with a clear, no-obligation quote.", sortOrder: 1 },
      { title: "Enjoy the clean finish", text: "Nepembe arrives on time, cleans with attention to detail and does a final quality check before leaving. You get a space that looks and feels fresh.", sortOrder: 2 },
    ],
  });
  console.log("Process steps seeded");

  await prisma.fAQ.deleteMany();
  await prisma.fAQ.createMany({
    data: [
      { question: "What areas do you service?", answer: "We primarily serve Walvis Bay, Swakopmund, Langstrand and surrounding areas in the Erongo region of Namibia. Contact us to confirm if we cover your specific location — we may be able to arrange travel for larger commercial projects.", sortOrder: 0, isActive: true },
      { question: "How do I get a quote?", answer: "You can fill out the quote form on our website, send an email to msecure.admin@gmail.com, or message us on WhatsApp at +264 81 227 3021. We typically respond within 24 hours with a clear, itemised quote. For urgent jobs, WhatsApp gets the fastest response.", sortOrder: 1, isActive: true },
      { question: "Do you offer recurring cleaning plans?", answer: "Yes. We offer weekly, bi-weekly and monthly cleaning plans for homes, offices and commercial spaces. Recurring clients receive priority scheduling and a consistent dedicated cleaner. Contact us to set up a schedule that works for you and we will tailor the plan to your needs.", sortOrder: 2, isActive: true },
      { question: "What cleaning products do you use?", answer: "We use professional-grade, multi-surface cleaning products that are effective against dirt, grease and germs while being safe for your family, pets and the environment. We can also use your preferred products if you have specific requirements or sensitivities.", sortOrder: 3, isActive: true },
      { question: "How long does a typical clean take?", answer: "It depends on the size and condition of the space. A standard 2-bedroom home clean takes 2—3 hours. Deep cleaning, sofa cleaning or post-construction jobs can take 4—6 hours. We will give you an estimated time when we provide the quote.", sortOrder: 4, isActive: true },
      { question: "Do I need to be home during the cleaning?", answer: "Not necessarily. Many clients provide access via a key, security code or arrangement with a neighbour. We respect your privacy and security. If you prefer to be home, that is perfectly fine too — we work around your schedule.", sortOrder: 5, isActive: true },
    ],
  });
  console.log("FAQs seeded");

  await prisma.contactSubmission.deleteMany();
  await prisma.contactSubmission.createMany({
    data: [
      { name: "Helena Shikongo", phone: "081 345 6789", email: "helena@example.na", service: "Residential Cleaning", location: "Narraville, Walvis Bay", preferredDate: "2026-08-05", preferredTime: "Morning", message: "Looking for a once-off deep clean of my 3-bedroom house. Kitchen and bathrooms need special attention.", status: "New" },
      { name: "Marius de Klerk", phone: "085 234 5678", email: "marius@example.na", service: "Office Cleaning", location: "CBD, Walvis Bay", preferredDate: "2026-08-03", preferredTime: "After hours", message: "We need bi-weekly cleaning for our office. About 120m² open plan plus a kitchenette and 2 toilets.", status: "Read" },
      { name: "Grace Nangolo", phone: "081 567 8901", email: "grace@example.na", service: "Sofa Cleaning", location: "Meersig, Walvis Bay", preferredDate: "2026-07-28", preferredTime: "Afternoon", message: "I have a 3-seater fabric sofa and two armchairs that need a proper clean. Please quote.", status: "Replied" },
      { name: "Tomas Amutenya", phone: "085 789 0123", email: "", service: "Carpet Cleaning", location: "Kuisebmond, Walvis Bay", preferredDate: "2026-07-25", preferredTime: "Morning", message: "Two bedrooms with carpets. About 30m² total. Need stain treatment on one area.", status: "Replied" },
      { name: "Lindi Mbala", phone: "081 901 2345", email: "lindi@example.na", service: "Move-In / Move-Out Cleaning", location: "Langstrand", preferredDate: "2026-08-01", preferredTime: "Any", message: "Move-out clean for a 2-bedroom flat. Need it done before the inspection on 2 August.", status: "New" },
      { name: "Shoprite Walvis Bay", phone: "064 123 4567", email: "facilities@shoprite.na", service: "Commercial Cleaning", location: "Shoprite Centre, Walvis Bay", preferredDate: "", preferredTime: "After hours", message: "Looking for a commercial cleaning company for our retail floor. Approximately 800m². Please send a quote for daily cleaning.", status: "New" },
    ],
  });
  console.log("Contact submissions seeded");

  console.log("\n✅ Seed completed successfully");
  console.log("Admin login: admin / nepembe2026");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
