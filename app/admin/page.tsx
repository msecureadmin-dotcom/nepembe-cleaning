"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    Promise.all([
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/gallery").then((r) => r.json()),
      fetch("/api/hero-slides").then((r) => r.json()),
      fetch("/api/testimonials").then((r) => r.json()),
      fetch("/api/submissions").then((r) => r.json()),
      fetch("/api/faq").then((r) => r.json()),
    ]).then(([services, gallery, heroSlides, testimonials, submissions, faq]) => {
      setStats({
        Services: Array.isArray(services) ? services.length : 0,
        Gallery: Array.isArray(gallery) ? gallery.length : 0,
        "Hero Slides": Array.isArray(heroSlides) ? heroSlides.length : 0,
        Reviews: Array.isArray(testimonials) ? testimonials.length : 0,
        Submissions: Array.isArray(submissions) ? submissions.length : 0,
        FAQs: Array.isArray(faq) ? faq.length : 0,
      });
    }).catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-6">
        <p className="eyebrow">Admin Dashboard</p>
        <h1 className="text-3xl font-black text-[#2f261c]">
          Nepembe Cleaning Service
        </h1>
        <p className="text-[#766653] mt-1">
          Manage all website content from one place
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="bg-white rounded-2xl border border-[#eadbc2] p-5 shadow-sm"
          >
            <div className="text-3xl font-black text-[#2f261c]">{value}</div>
            <p className="font-bold text-[#2f261c] mt-1">{key}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: "/admin/settings", label: "Landing Page", icon: "✏️" },
          { href: "/admin/hero-slides", label: "Hero Slides", icon: "🖼️" },
          { href: "/admin/services", label: "Services", icon: "🧹" },
          { href: "/admin/gallery", label: "Gallery", icon: "📷" },
          { href: "/admin/testimonials", label: "Reviews", icon: "⭐" },
          { href: "/admin/faq", label: "FAQ", icon: "❓" },
          { href: "/admin/contact", label: "Contact & Map", icon: "📞" },
          { href: "/admin/submissions", label: "Submissions", icon: "📬" },
          { href: "/admin/users", label: "Users", icon: "👤" },
          { href: "/", label: "View Website", icon: "🌐" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white rounded-2xl border border-[#eadbc2] p-4 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <p className="font-bold text-sm text-[#2f261c]">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
