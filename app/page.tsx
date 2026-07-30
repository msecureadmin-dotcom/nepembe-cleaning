"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface SiteSettings {
  companyName: string;
  slogan: string;
  logoUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapLocation: string;
  googleMapsUrl: string;
  businessHours: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesText: string;
  featuresEyebrow: string;
  featuresTitle: string;
  featuresText: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutText: string;
  processEyebrow: string;
  processTitle: string;
  processText: string;
  transformEyebrow: string;
  transformTitle: string;
  transformText: string;
  galleryEyebrow: string;
  galleryTitle: string;
  galleryText: string;
  quoteEyebrow: string;
  quoteTitle: string;
  quoteText: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  contactEyebrow: string;
  contactTitle: string;
  contactText: string;
  seoTitle: string;
  seoDescription: string;
}

interface Slide {
  id: string;
  title: string;
  imageUrl: string;
}

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
}

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
}

interface Testimonial {
  id: string;
  customerName: string;
  review: string;
  rating: number;
}

interface Feature {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
}

interface ProcessStep {
  id: string;
  title: string;
  text: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[m] as string
  );
}

export default function HomePage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [galleryCount, setGalleryCount] = useState(12);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", service: "", location: "",
    preferredDate: "", preferredTime: "", message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [showSticky, setShowSticky] = useState(true);
  const lastScrollY = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [sRes, slidesRes, svcRes, galRes, tesRes, featRes, procRes, faqRes] =
          await Promise.all([
            fetch("/api/settings"),
            fetch("/api/hero-slides"),
            fetch("/api/services"),
            fetch("/api/gallery"),
            fetch("/api/testimonials"),
            fetch("/api/features"),
            fetch("/api/process-steps"),
            fetch("/api/faq"),
          ]);
        const s = await sRes.json();
        setSettings(s);
        setSlides((await slidesRes.json()) || []);
        setServices((await svcRes.json()) || []);
        setGallery((await galRes.json()) || []);
        setTestimonials((await tesRes.json()) || []);
        setFeatures((await featRes.json()) || []);
        setProcessSteps((await procRes.json()) || []);
        setFaqs((await faqRes.json()) || []);
      } catch {}
    };
    load();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
      setScrolled(window.scrollY > 30);
      const cur = window.scrollY;
      if (cur > 200 && cur > lastScrollY.current + 10) setShowSticky(false);
      else if (cur < lastScrollY.current - 10 || cur < 200) setShowSticky(true);
      lastScrollY.current = cur;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slides, services, gallery, testimonials, features, processSteps, faqs]);

  const galleryCats = [
    "All",
    ...new Set([
      ...services.map((s) => s.title),
      ...gallery.map((g) => g.category || "General"),
    ]),
  ];
  const filteredGallery =
    galleryFilter === "All"
      ? gallery
      : gallery.filter((g) => g.category === galleryFilter);
  const visibleGallery = filteredGallery.slice(0, galleryCount);

  const whatsappLink = (msg?: string) => {
    const num = settings?.whatsapp?.replace(/[^0-9]/g, "") || "264812273021";
    const text = msg || "Hello Nepembe Cleaning Service, I would like to request a cleaning quote.";
    return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  };

  const googleMapsEmbed = () => {
    if (settings?.googleMapsUrl?.includes("google.com/maps/embed")) return settings.googleMapsUrl;
    const query = settings?.mapLocation || settings?.address || "Walvis Bay, Namibia";
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  };

  const googleMapsOpen = () => {
    const query = settings?.mapLocation || settings?.address || "Walvis Bay, Namibia";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("Sending...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setFormStatus("Quote request sent! We will get back to you shortly.");
      setFormData({ name: "", phone: "", email: "", service: "", location: "", preferredDate: "", preferredTime: "", message: "" });
    } catch {
      setFormStatus("Something went wrong. Please try WhatsApp instead.");
    }
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fbf4e8]">
        <div className="w-8 h-8 border-4 border-[#d6a85f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const icons = ["🏠", "🏢", "🧼", "✨", "📦", "🏗️", "🛋️", "🪟", "🎉", "🧹", "🎊"];

  return (
    <>
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-[#f4e4c8]/35">
        <div
          className="h-full bg-gradient-to-r from-[#d6a85f] to-[#0f766e] transition-[width] duration-75 ease-linear"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#fff9ef]/96 shadow-lg py-0"
            : "bg-white/82 backdrop-blur-md"
        }`}
      >
        <nav className="container-custom flex items-center justify-between py-3">
          <Link href="/" className="flex items-center">
            <img
              src={settings.logoUrl || "/assets/nepembe-logo.svg"}
              alt="Nepembe Cleaning Services logo"
              className={`transition-all duration-300 ${scrolled ? "h-11" : "h-14"} w-auto`}
            />
          </Link>
          <button
            className="lg:hidden bg-[#2f261c] text-white rounded-xl px-3 py-2 text-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <ul
            className={`${
              menuOpen ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row absolute lg:relative top-full left-0 right-0 bg-white lg:bg-transparent border border-[#eadbc2] lg:border-0 rounded-2xl lg:rounded-none p-4 lg:p-0 shadow-lg lg:shadow-none gap-2 lg:gap-5 items-stretch lg:items-center`}
          >
            <li><Link href="#services" className="block font-bold text-[#26435d] hover:text-[#7b4f2a] py-2">Services</Link></li>
            <li><Link href="#gallery" className="block font-bold text-[#26435d] hover:text-[#7b4f2a] py-2">Gallery</Link></li>
            <li><Link href="#about" className="block font-bold text-[#26435d] hover:text-[#7b4f2a] py-2">About</Link></li>
            <li><Link href="#testimonials" className="block font-bold text-[#26435d] hover:text-[#7b4f2a] py-2">Reviews</Link></li>
            <li><Link href="#contact" className="block font-bold text-[#26435d] hover:text-[#7b4f2a] py-2">Contact</Link></li>
            <li>
              <Link
                href="#quote"
                className="block text-center font-bold bg-gradient-to-r from-[#2f261c] to-[#7b4f2a] text-white rounded-full px-5 py-2"
              >
                Request a Quote
              </Link>
            </li>
            <li className="lg:hidden">
              <Link href="/admin" className="block font-bold text-[#26435d] hover:text-[#7b4f2a] py-2 text-sm border-t border-[#eadbc2] pt-3 mt-2">
                Admin ⚙️
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-24 bg-gradient-to-br from-[#fff7e8] via-[#f4dfb6] via-[#fbf4e8] to-[#e5f6f3]">
        <div className="container-custom grid lg:grid-cols-2 gap-10 items-center">
          <div className="reveal visible">
            <p className="eyebrow">{settings.heroEyebrow}</p>
            <h1 className="text-4xl lg:text-5xl font-black text-[#2f261c] leading-tight mb-4">
              {settings.heroTitle}
            </h1>
            <p className="text-lg text-[#766653] mb-6">{settings.heroSubtitle}</p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a href="#quote" className="btn-primary">Request a Quote</a>
              <a href="#quote" className="btn-secondary">Book Cleaning Services</a>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-whatsapp">Call / WhatsApp</a>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-bold text-[#766653] mb-6">
              <span>✓ Sofa & upholstery experts</span>
              <span>✓ Affordable quotes</span>
              <span>✓ Fast response</span>
            </div>
            <div className="bg-white/72 backdrop-blur-md border border-[#eadbc2]/95 rounded-2xl p-4 flex flex-wrap items-center gap-3">
              <strong className="text-[#2f261c]">Ready to clean?</strong>
              <a href={`tel:${settings.phone.split("/")[0].replace(/[^0-9+]/g, "")}`} className="font-black text-[#7b4f2a]">
                {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="font-black text-[#7b4f2a]">
                {settings.email}
              </a>
            </div>
          </div>

          <div
            ref={heroRef}
            className="relative min-h-[400px] lg:min-h-[560px] rounded-3xl overflow-hidden bg-[#2f261c] border border-white/60 shadow-2xl reveal delay-1 visible"
          >
            {slides.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-white/50 font-bold">
                No slides yet
              </div>
            )}
            {slides.map((slide, i) => (
              <figure
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  i === activeSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <figcaption className="absolute left-7 bottom-20 z-10 bg-[#fff9ef]/86 text-[#2f261c] border border-[#eadbc2]/90 rounded-xl px-4 py-3 font-black shadow-lg">
                  {slide.title}
                </figcaption>
              </figure>
            ))}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-3 rounded-full border-0 transition-all cursor-pointer ${
                    i === activeSlide ? "w-8 bg-[#d6a85f]" : "w-3 bg-white/68"
                  }`}
                  aria-label={`Show slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="bg-[#fff9ef] py-5">
        <div className="container-custom grid grid-cols-3 gap-4">
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="text-center font-bold py-3 rounded-2xl hover:bg-[#f4e4c8] transition-colors">
            WhatsApp us
          </a>
          <a href={`mailto:${settings.email}`} className="text-center font-bold py-3 rounded-2xl hover:bg-[#f4e4c8] transition-colors">
            Email inquiry
          </a>
          <a href="#services" className="text-center font-bold py-3 rounded-2xl hover:bg-[#f4e4c8] transition-colors">
            Explore services
          </a>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-6 bg-gradient-to-r from-[#fff9ef] via-[#f4e4c8] to-[#fff9ef] border-b border-[#eadbc2]">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center reveal visible">
            <span className="text-2xl">⚡</span>
            <div className="text-2xl font-black text-[#2f261c]">24h</div>
            <p className="text-sm font-bold text-[#766653]">fast response goal</p>
          </div>
          <div className="text-center reveal visible delay-1">
            <span className="text-2xl">🛋️</span>
            <div className="text-2xl font-black text-[#2f261c]">{services.length}+</div>
            <p className="text-sm font-bold text-[#766653]">cleaning services</p>
          </div>
          <div className="text-center reveal visible">
            <span className="text-2xl">📍</span>
            <div className="text-2xl font-black text-[#2f261c]">Walvis Bay</div>
            <p className="text-sm font-bold text-[#766653]">local mobile team</p>
          </div>
          <div className="text-center reveal visible delay-1">
            <span className="text-2xl">✨</span>
            <div className="text-2xl font-black text-[#2f261c]">Fresh</div>
            <p className="text-sm font-bold text-[#766653]">desert-clean finish</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20" id="services">
        <div className="container-custom">
          <div className="text-center mb-12 reveal">
            <p className="eyebrow">{settings.servicesEyebrow}</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#2f261c] mb-3">{settings.servicesTitle}</h2>
            <p className="text-[#766653] max-w-2xl mx-auto">{settings.servicesText}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <article key={s.id} className="bg-white rounded-3xl border border-[#eadbc2] shadow-lg overflow-hidden reveal">
                <img
                  src={s.imageUrl || "/assets/deep-cleaning.svg"}
                  alt={s.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-2xl mb-2">{icons[i % icons.length]}</div>
                  <h3 className="text-xl font-black text-[#2f261c] mb-2">{s.title}</h3>
                  <p className="text-[#766653] mb-4">{s.description}</p>
                  <div className="mt-auto">
                    <a href="#quote" className="font-black text-[#0f766e] hover:underline">
                      Request this service →
                    </a>
                    <button
                      onClick={() => { setGalleryFilter(s.title); document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" }); }}
                      className="block mt-2 w-full border border-[#eadbc2] bg-[#fff9ef] text-[#2f261c] rounded-full py-2 font-black text-center hover:bg-[#f4e4c8] transition-colors"
                    >
                      View service gallery
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section className="py-20 bg-white" id="features">
          <div className="container-custom">
            <div className="text-center mb-12 reveal">
              <p className="eyebrow">{settings.featuresEyebrow}</p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#2f261c] mb-3">{settings.featuresTitle}</h2>
              <p className="text-[#766653] max-w-2xl mx-auto">{settings.featuresText}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <article key={f.id} className={`bg-gradient-to-b from-white to-[#f6fbff] border border-[#eadbc2] rounded-3xl shadow-lg overflow-hidden reveal ${i === 1 ? "delay-1" : ""}`}>
                  <img src={f.imageUrl || "/assets/deep-cleaning.svg"} alt={f.title} className="w-full h-52 object-cover" />
                  <h3 className="text-xl font-black text-[#2f261c] mt-5 mx-6">{f.title}</h3>
                  <p className="text-[#766653] mx-6 mb-6">{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About */}
      <section className="py-20 bg-[#fff9ef]" id="about">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4 reveal">
            <div className="rounded-3xl overflow-hidden shadow-lg"><img src="/assets/cleaning-office.svg" alt="Office cleaning" className="w-full h-48 object-cover" /></div>
            <div className="rounded-3xl overflow-hidden shadow-lg mt-8"><img src="/assets/sofa-cleaning.svg" alt="Sofa cleaning" className="w-full h-48 object-cover" /></div>
          </div>
          <div className="reveal delay-1">
            <p className="eyebrow">{settings.aboutEyebrow}</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#2f261c] mb-4">{settings.aboutTitle}</h2>
            <p className="text-[#766653] mb-6">{settings.aboutText}</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 font-bold text-[#2f261c]">✓ Flexible cleaning plans for homes, offices and businesses</li>
              <li className="flex items-center gap-2 font-bold text-[#2f261c]">✓ Sofa, upholstery, carpet and fabric care cleaning</li>
              <li className="flex items-center gap-2 font-bold text-[#2f261c]">✓ Quality checks after every project</li>
              <li className="flex items-center gap-2 font-bold text-[#2f261c]">✓ Friendly team and easy booking process</li>
              <li className="flex items-center gap-2 font-bold text-[#2f261c]">✓ Serving Walvis Bay and nearby areas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      {processSteps.length > 0 && (
        <section className="py-20" id="process">
          <div className="container-custom">
            <div className="text-center mb-12 reveal">
              <p className="eyebrow">{settings.processEyebrow}</p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#2f261c] mb-3">{settings.processTitle}</h2>
              <p className="text-[#766653] max-w-2xl mx-auto">{settings.processText}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {processSteps.map((step, i) => (
                <article key={step.id} className="relative bg-white/60 backdrop-blur-sm border border-[#eadbc2] rounded-3xl p-8 shadow-lg text-center reveal">
                  <div className="text-5xl font-black text-[#d6a85f]/30 mb-4">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-xl font-black text-[#2f261c] mb-3">{step.title}</h3>
                  <p className="text-[#766653]">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Transformation */}
      <section className="py-20 bg-[#fff9ef]">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <p className="eyebrow">{settings.transformEyebrow}</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#2f261c] mb-4">{settings.transformTitle}</h2>
            <p className="text-[#766653] mb-6">{settings.transformText}</p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#f4e4c8] text-[#2f261c] font-bold px-4 py-2 rounded-full">Premium first impression</span>
              <span className="bg-[#f4e4c8] text-[#2f261c] font-bold px-4 py-2 rounded-full">Service-gallery browsing</span>
              <span className="bg-[#f4e4c8] text-[#2f261c] font-bold px-4 py-2 rounded-full">WhatsApp-ready CTAs</span>
            </div>
          </div>
          <div className="relative min-h-[400px] rounded-3xl overflow-hidden shadow-xl reveal delay-1">
            <img src="/assets/deep-cleaning.svg" alt="Before" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(0 0 0 30%)" }}>
              <img src="/assets/sofa-cleaning.svg" alt="After" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-0 bottom-0 w-1 bg-white/80 shadow-lg" style={{ left: "30%" }}>
              <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#fff9ef] text-[#2f261c] font-black text-xs px-3 py-1 rounded-full whitespace-nowrap shadow">
                Clean finish
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-[#f7ead2]" id="gallery">
        <div className="container-custom">
          <div className="text-center mb-8 reveal">
            <p className="eyebrow">{settings.galleryEyebrow}</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#2f261c] mb-3">{settings.galleryTitle}</h2>
            <p className="text-[#766653] max-w-2xl mx-auto">{settings.galleryText}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8 reveal">
            {galleryCats.slice(0, 8).map((cat) => (
              <button
                key={cat}
                onClick={() => { setGalleryFilter(cat); setGalleryCount(12); }}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
                  galleryFilter === cat
                    ? "bg-[#2f261c] text-white"
                    : "bg-white text-[#2f261c] border border-[#eadbc2]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {visibleGallery.map((item, i) => (
              <article
                key={item.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer group reveal"
                onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <strong className="text-white text-sm">{item.title}</strong>
                  <span className="text-white/80 text-xs block">{item.category}</span>
                </div>
              </article>
            ))}
          </div>
          {filteredGallery.length > galleryCount && (
            <div className="text-center mt-8 reveal">
              <p className="text-[#766653] font-bold mb-3">
                Showing {galleryCount} of {filteredGallery.length} pictures
              </p>
              <button onClick={() => setGalleryCount((c) => c + 12)} className="btn-primary">
                Load More Pictures
              </button>
            </div>
          )}
          {filteredGallery.length > 0 && filteredGallery.length <= galleryCount && (
            <p className="text-center text-[#766653] font-bold mt-6">
              Showing all {filteredGallery.length} picture{filteredGallery.length === 1 ? "" : "s"}
            </p>
          )}
          {filteredGallery.length === 0 && (
            <div className="text-center bg-white border border-dashed border-[#eadbc2] rounded-3xl p-12 reveal">
              <h3 className="text-xl font-black text-[#2f261c] mb-2">No pictures in this gallery yet</h3>
              <p className="text-[#766653] mb-4">Check back soon or request examples on WhatsApp</p>
              <a href={whatsappLink(`Hello Nepembe Cleaning Service, please send me pictures for ${galleryFilter}.`)} target="_blank" rel="noreferrer" className="btn-primary">
                Ask on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20 bg-gradient-to-r from-[#2f261c] via-[#7b4f2a] to-[#0f766e]" id="quote">
        <div className="container-custom grid lg:grid-cols-2 gap-10 items-start">
          <div className="text-white reveal">
            <p className="eyebrow text-[#f4e4c8]">{settings.quoteEyebrow}</p>
            <h2 className="text-3xl lg:text-4xl font-black mb-4">{settings.quoteTitle}</h2>
            <p className="text-white/80 mb-6">{settings.quoteText}</p>
          </div>
          <form onSubmit={handleQuoteSubmit} className="bg-white rounded-3xl shadow-xl p-8 reveal delay-1 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#2f261c] mb-1">Name *</label>
                <input required value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#2f261c] mb-1">Phone *</label>
                <input required value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#2f261c] mb-1">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#2f261c] mb-1">Service</label>
                <select value={formData.service} onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8]">
                  <option value="">Select a service</option>
                  {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#2f261c] mb-1">Location</label>
                <input value={formData.location} onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))} placeholder="Walvis Bay area" className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#2f261c] mb-1">Preferred Date</label>
                <input type="date" value={formData.preferredDate} onChange={(e) => setFormData((p) => ({ ...p, preferredDate: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2f261c] mb-1">Message</label>
              <textarea rows={3} value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} placeholder="Describe the job and any special notes" className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] resize-y" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90">
              Send Quote Request
            </button>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="block w-full text-center bg-[#25D366] text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90">
              Send Quote Request by WhatsApp
            </a>
            {formStatus && (
              <p className={`text-center font-bold text-sm ${formStatus.includes("sent") || formStatus.includes("success") ? "text-green-600" : "text-[#766653]"}`}>
                {formStatus}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20" id="testimonials">
          <div className="container-custom">
            <div className="text-center mb-12 reveal">
              <p className="eyebrow">{settings.testimonialsEyebrow}</p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#2f261c]">{settings.testimonialsTitle}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <article key={t.id} className="bg-white border border-[#eadbc2] rounded-3xl p-6 shadow-lg reveal">
                  <div className="text-[#d6a85f] text-lg mb-3">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
                  <p className="text-[#766653] mb-4 italic">"{t.review}"</p>
                  <strong className="text-[#2f261c]">{t.customerName}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 bg-[#fff9ef]" id="faq">
          <div className="container-custom max-w-3xl">
            <div className="text-center mb-12 reveal">
              <p className="eyebrow">FAQ</p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#2f261c]">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.id} className="bg-white border border-[#eadbc2] rounded-2xl overflow-hidden reveal">
                  <summary className="cursor-pointer font-black text-[#2f261c] p-5 list-none flex items-center justify-between">
                    {faq.question}
                    <span className="text-[#d6a85f] text-xl font-bold">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-[#766653]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="py-20" id="contact">
        <div className="container-custom grid lg:grid-cols-2 gap-12">
          <div className="reveal">
            <p className="eyebrow">{settings.contactEyebrow}</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#2f261c] mb-4">{settings.contactTitle}</h2>
            <p className="text-[#766653] mb-6">{settings.contactText}</p>
            <div className="space-y-4">
              <a href={`tel:${settings.phone.split("/")[0].replace(/[^0-9+]/g, "")}`} className="block font-black text-[#7b4f2a] text-lg">{settings.phone}</a>
              <a href={`mailto:${settings.email}`} className="block font-black text-[#7b4f2a]">{settings.email}</a>
              <p className="font-bold text-[#2f261c]">{settings.address}</p>
              <p className="font-bold text-[#766653]">{settings.businessHours}</p>
            </div>
            <div className="flex gap-4 mt-6">
              {settings.facebookUrl && <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="bg-gradient-to-r from-[#2f261c] to-[#7b4f2a] text-white font-bold px-4 py-2 rounded-full text-sm">Facebook</a>}
              {settings.instagramUrl && <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="bg-gradient-to-r from-[#2f261c] to-[#7b4f2a] text-white font-bold px-4 py-2 rounded-full text-sm">Instagram</a>}
              {settings.tiktokUrl && <a href={settings.tiktokUrl} target="_blank" rel="noreferrer" className="bg-gradient-to-r from-[#2f261c] to-[#7b4f2a] text-white font-bold px-4 py-2 rounded-full text-sm">TikTok</a>}
            </div>
          </div>
          <div className="relative min-h-[400px] rounded-3xl overflow-hidden shadow-xl reveal delay-1">
            <iframe
              title="Nepembe Cleaning Services location"
              src={googleMapsEmbed()}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
            />
            <div className="absolute left-4 right-4 bottom-4 bg-[#fff9ef]/93 backdrop-blur-md border border-[#eadbc2]/95 rounded-2xl p-5 shadow-xl">
              <div className="text-3xl mb-2">📍</div>
              <strong className="text-[#2f261c]">{settings.mapLocation || "Walvis Bay Service Area"}</strong>
              <p className="text-[#766653] text-sm my-2">Mobile cleaning team serving homes, offices and business premises.</p>
              <a href={googleMapsOpen()} target="_blank" rel="noreferrer" className="inline-block bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold px-4 py-2 rounded-full text-sm">
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Booking Bar */}
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-30 w-[min(920px,94vw)] bg-white/95 backdrop-blur-md border border-[#eadbc2] rounded-t-3xl shadow-2xl p-4 hidden lg:flex items-center gap-4 transition-transform duration-300 ${showSticky ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex-1 min-w-0">
          <strong className="text-[#2f261c]">Need cleaning today?</strong>
          <span className="text-[#766653] text-sm ml-2">Request a quote, book a service, or call/WhatsApp Nepembe.</span>
        </div>
        <a href="#quote" className="btn-primary text-sm whitespace-nowrap">Request a Quote</a>
        <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-whatsapp text-sm whitespace-nowrap">Call / WhatsApp</a>
        <Link href="/admin" className="text-[#766653] hover:text-[#2f261c] text-xs font-bold shrink-0" title="Admin panel">⚙️</Link>
      </div>

      {/* WhatsApp Float */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-30 bg-[#25D366] text-white font-bold px-5 py-3 rounded-full shadow-xl hover:opacity-90 transition-all hover:scale-105 hidden lg:flex items-center gap-2"
        aria-label="Chat on WhatsApp"
      >
        <span>💬</span> WhatsApp
      </a>

      {/* Footer */}
      <footer className="bg-[#2f261c] text-white py-8 pb-24 lg:pb-8">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/80">
            © {new Date().getFullYear()} {settings.companyName}. All rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            <Link href="/admin" className="hover:text-white">Admin</Link> · Built for modern local SEO
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxOpen && filteredGallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-6 bg-white rounded-full w-11 h-11 flex items-center justify-center text-2xl font-bold cursor-pointer z-10"
          >
            ×
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/92 rounded-full w-12 h-12 flex items-center justify-center text-3xl cursor-pointer shadow-xl hover:bg-[#f4e4c8] z-10"
          >
            ‹
          </button>
          <figure className="max-w-[min(980px,82vw)] max-h-[86vh] text-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredGallery[lightboxIndex].imageUrl}
              alt={filteredGallery[lightboxIndex].title}
              className="max-w-full max-h-[78vh] rounded-2xl shadow-2xl"
            />
            <figcaption className="text-white font-bold mt-3">
              {filteredGallery[lightboxIndex].title} · {filteredGallery[lightboxIndex].category}
            </figcaption>
            <span className="absolute top-4 left-4 bg-[#2f261c]/72 text-white border border-white/35 rounded-full px-3 py-1 font-bold text-sm">
              {lightboxIndex + 1} / {filteredGallery.length}
            </span>
          </figure>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % filteredGallery.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/92 rounded-full w-12 h-12 flex items-center justify-center text-3xl cursor-pointer shadow-xl hover:bg-[#f4e4c8] z-10"
          >
            ›
          </button>
        </div>
      )}

      {/* Inline styles for buttons */}
      <style jsx>{`
        .btn-primary {
          display: inline-block;
          background: linear-gradient(135deg, #d6a85f, #0f766e);
          color: #fff;
          font-weight: 900;
          padding: 13px 22px;
          border-radius: 999px;
          box-shadow: 0 14px 28px rgba(214, 168, 95, 0.25);
          transition: opacity 0.2s;
        }
        .btn-primary:hover { opacity: 0.9; }
        .btn-secondary {
          display: inline-block;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(123,79,42,0.22);
          color: #2f261c;
          font-weight: 900;
          padding: 13px 22px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
          transition: background 0.2s;
        }
        .btn-secondary:hover { background: rgba(255,255,255,0.8); }
        .btn-whatsapp {
          display: inline-block;
          background: #25D366;
          color: #fff;
          font-weight: 900;
          padding: 13px 22px;
          border-radius: 999px;
          box-shadow: 0 14px 28px rgba(37,211,102,0.23);
          transition: opacity 0.2s;
        }
        .btn-whatsapp:hover { opacity: 0.9; }
        details[open] summary span { transform: rotate(45deg); display: inline-block; }
      `}</style>
    </>
  );
}
