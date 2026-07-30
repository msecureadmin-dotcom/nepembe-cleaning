import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminHash = await bcrypt.hash("nepembe2026", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin" },
    update: {},
    create: {
      email: "admin",
      name: "Admin",
      passwordHash: adminHash,
      role: "Admin",
    },
  });
  console.log("Admin user created:", admin.email);

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
      email: "nepembejasen@gmail.com",
      address: "Walvis Bay, Namibia",
      mapLocation: "Walvis Bay, Namibia",
      businessHours: "Mon - Sat: 08:00 - 18:00",
      heroEyebrow: "Desert-fresh cleaning in Walvis Bay",
      heroTitle: "Reliable cleaning services for homes, offices and businesses.",
      heroSubtitle: "We are the kings of the cleaning world — trusted, detail-focused cleaning across Walvis Bay.",
      servicesEyebrow: "What we do",
      servicesTitle: "Cleaning services built around your space",
      servicesText: "Choose a once-off deep clean, recurring office cleaning, or specialist cleaning support after moving, building, or events.",
      featuresEyebrow: "Cleaning features",
      featuresTitle: "The kings of the cleaning world",
      featuresText: "Professional cleaning features that make every service easier to trust, easier to book and easier to update online.",
      aboutEyebrow: "About Nepembe",
      aboutTitle: "Local, dependable and detail-driven.",
      aboutText: "Nepembe Cleaning Service helps households and businesses in Walvis Bay maintain clean, healthy and welcoming spaces. We focus on punctual service, professional communication and visible results.",
      processEyebrow: "Simple booking flow",
      processTitle: "From dusty to desert-fresh in three smooth steps",
      processText: "A polished experience from the first message to the final quality check.",
      transformEyebrow: "Live cleaning feel",
      transformTitle: "See the transformation before customers even call.",
      transformText: "The landing page feels alive with image slides, elegant hover movements, animated counters and smooth scroll progress that guide visitors towards requesting a quote.",
      galleryEyebrow: "Recent work",
      galleryTitle: "Gallery",
      galleryText: "Filter projects by category and click any image to preview the work.",
      quoteEyebrow: "Request a quote",
      quoteTitle: "Tell us what needs cleaning.",
      quoteText: "Submit your details and Nepembe Cleaning Service will receive your request by email. You can also continue by WhatsApp for a faster response.",
      testimonialsEyebrow: "Client confidence",
      testimonialsTitle: "Why customers choose Nepembe",
      contactEyebrow: "Contact",
      contactTitle: "Ready for a cleaner space?",
      contactText: "Reach out for residential, office, commercial, deep cleaning, sofa cleaning, upholstery cleaning, carpet, window, move-in/move-out and post-construction cleaning.",
      seoTitle: "Nepembe Cleaning Service | Professional Cleaning in Walvis Bay",
      seoDescription: "Professional cleaning services in Walvis Bay, Namibia. Sofa, upholstery, residential, office, commercial, deep cleaning, post-construction cleaning and more.",
    },
  });
  console.log("Site settings seeded");

  const heroSlides = [
    { title: "Professional home cleaning", imageUrl: "/assets/hero-desert-cleaning.svg", sortOrder: 0, isActive: true },
    { title: "Office & commercial cleaning", imageUrl: "/assets/hero-desert-office.svg", sortOrder: 1, isActive: true },
    { title: "Sofa & upholstery care", imageUrl: "/assets/hero-desert-sofa.svg", sortOrder: 2, isActive: true },
  ];
  for (const slide of heroSlides) {
    await prisma.heroSlide.create({ data: slide });
  }
  console.log("Hero slides seeded");

  const services = [
    { title: "Residential Cleaning", slug: "residential-cleaning", description: "Regular and once-off home cleaning to keep every room fresh, neat and comfortable.", imageUrl: "/assets/cleaning-home.svg", sortOrder: 0 },
    { title: "Office Cleaning", slug: "office-cleaning", description: "Professional office cleaning for productive, hygienic workspaces and happy teams.", imageUrl: "/assets/cleaning-office.svg", sortOrder: 1 },
    { title: "Commercial Cleaning", slug: "commercial-cleaning", description: "Reliable cleaning for shops, guesthouses, facilities and small business premises.", imageUrl: "/assets/cleaning-office.svg", sortOrder: 2 },
    { title: "Deep Cleaning", slug: "deep-cleaning", description: "Detailed top-to-bottom cleaning for kitchens, bathrooms, floors and hard-to-reach areas.", imageUrl: "/assets/deep-cleaning.svg", sortOrder: 3 },
    { title: "Sofa Cleaning", slug: "sofa-cleaning", description: "Professional sofa cleaning to remove dust, stains, odours and refresh your lounge furniture.", imageUrl: "/assets/sofa-cleaning.svg", sortOrder: 4 },
    { title: "Upholstery Cleaning", slug: "upholstery-cleaning", description: "Fabric chair, couch, cushion and upholstery cleaning for homes, offices and guest spaces.", imageUrl: "/assets/sofa-cleaning.svg", sortOrder: 5 },
    { title: "Move-In / Move-Out Cleaning", slug: "move-in-move-out-cleaning", description: "Prepare a property before moving in or hand it over spotless after moving out.", imageUrl: "/assets/cleaning-home.svg", sortOrder: 6 },
    { title: "Post-Construction Cleaning", slug: "post-construction-cleaning", description: "Dust, debris and finishing cleanups after renovation or building projects.", imageUrl: "/assets/deep-cleaning.svg", sortOrder: 7 },
    { title: "Carpet Cleaning", slug: "carpet-cleaning", description: "Refresh carpets and fabric surfaces with careful deep cleaning support.", imageUrl: "/assets/sofa-cleaning.svg", sortOrder: 8 },
    { title: "Window Cleaning", slug: "window-cleaning", description: "Cleaner glass, brighter rooms and better presentation for homes and businesses.", imageUrl: "/assets/window-cleaning.svg", sortOrder: 9 },
    { title: "Event Cleaning", slug: "event-cleaning", description: "Before and after event cleaning for private functions, community events and business gatherings.", imageUrl: "/assets/deep-cleaning.svg", sortOrder: 10 },
  ];
  for (const service of services) {
    await prisma.service.create({ data: service });
  }
  console.log("Services seeded");

  const galleryItems = [
    { title: "Office deep clean", category: "Office Cleaning", imageUrl: "/assets/cleaning-office.svg", caption: "Office Cleaning", sortOrder: 0 },
    { title: "Residential home cleaning", category: "Residential Cleaning", imageUrl: "/assets/cleaning-home.svg", caption: "Residential Cleaning", sortOrder: 1 },
    { title: "Sofa cleaning result", category: "Sofa Cleaning", imageUrl: "/assets/sofa-cleaning.svg", caption: "Sofa Cleaning", sortOrder: 2 },
    { title: "Upholstery cleaning", category: "Upholstery Cleaning", imageUrl: "/assets/sofa-cleaning.svg", caption: "Upholstery Cleaning", sortOrder: 3 },
    { title: "Deep cleaning project", category: "Deep Cleaning", imageUrl: "/assets/deep-cleaning.svg", caption: "Deep Cleaning", sortOrder: 4 },
    { title: "Window cleaning", category: "Window Cleaning", imageUrl: "/assets/window-cleaning.svg", caption: "Window Cleaning", sortOrder: 5 },
  ];
  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item });
  }
  console.log("Gallery items seeded");

  const testimonials = [
    { customerName: "Walvis Bay Client", review: "Professional, friendly and the place looked fresh afterwards. Highly recommended.", rating: 5, sortOrder: 0 },
    { customerName: "Office Manager", review: "They communicate well and pay attention to the small details that matter.", rating: 5, sortOrder: 1 },
    { customerName: "Homeowner", review: "Easy booking process and reliable cleaning service. I would use them again.", rating: 5, sortOrder: 2 },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log("Testimonials seeded");

  const features = [
    { title: "Sofa & upholstery care", text: "Refresh couches, office chairs, cushions and fabric furniture with dedicated upholstery cleaning.", imageUrl: "/assets/sofa-cleaning.svg", sortOrder: 0 },
    { title: "Deep cleaning details", text: "Bathrooms, kitchens, corners, surfaces and high-touch areas cleaned with attention to detail.", imageUrl: "/assets/deep-cleaning.svg", sortOrder: 1 },
    { title: "Clear finishing touches", text: "Windows, glass and presentation-focused cleaning that leaves spaces looking brighter.", imageUrl: "/assets/window-cleaning.svg", sortOrder: 2 },
  ];
  for (const f of features) {
    await prisma.featureCard.create({ data: f });
  }
  console.log("Features seeded");

  const processSteps = [
    { title: "Choose a service", text: "Select home, office, sofa, upholstery, windows, deep cleaning or any custom cleaning need.", sortOrder: 0 },
    { title: "Send a quick quote request", text: "Use WhatsApp or email. The form prepares all your details so the team can respond faster.", sortOrder: 1 },
    { title: "Enjoy the clean finish", text: "Nepembe arrives prepared, cleans with detail and leaves your space fresh and presentable.", sortOrder: 2 },
  ];
  for (const step of processSteps) {
    await prisma.processStep.create({ data: step });
  }
  console.log("Process steps seeded");

  const faqs = [
    { question: "What areas do you service?", answer: "We primarily serve Walvis Bay and surrounding areas in Namibia. Contact us to confirm if we cover your location.", sortOrder: 0, isActive: true },
    { question: "How do I get a quote?", answer: "Fill out the quote form on our website, send us an email, or message us on WhatsApp. We typically respond within 24 hours.", sortOrder: 1, isActive: true },
    { question: "Do you offer recurring cleaning services?", answer: "Yes! We offer both one-time and recurring cleaning plans for homes and offices. Contact us to set up a schedule that works for you.", sortOrder: 2, isActive: true },
    { question: "What cleaning products do you use?", answer: "We use professional-grade cleaning products that are effective yet safe for your family, pets and the environment.", sortOrder: 3, isActive: true },
  ];
  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }
  console.log("FAQs seeded");

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
