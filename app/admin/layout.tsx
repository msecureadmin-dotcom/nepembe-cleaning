"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Toaster } from "sonner";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<{
    pathname: string;
    user: User | null;
  } | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    let cancelled = false;
    setAuthState(null);
    fetch("/api/auth/me")
      .then((r) => {
        if (!r.ok) throw new Error("Not authenticated");
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setAuthState({ pathname, user: data.user });
      })
      .catch(() => {
        if (!cancelled) setAuthState({ pathname, user: null });
      });
    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  if (isLogin) {
    return <>{children}</>;
  }

  if (!authState || authState.pathname !== pathname) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fbf4e8]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#d6a85f] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#766653] font-semibold">Loading admin...</p>
        </div>
      </div>
    );
  }

  if (!authState.user) {
    router.push("/admin/login");
    return null;
  }

  const user = authState.user;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const tabs = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/settings", label: "Landing Page", icon: "✏️" },
    { href: "/admin/hero-slides", label: "Hero Slides", icon: "🖼️" },
    { href: "/admin/stats", label: "Stats", icon: "📊" },
    { href: "/admin/services", label: "Services", icon: "🧹" },
    { href: "/admin/gallery", label: "Gallery", icon: "📷" },
    { href: "/admin/testimonials", label: "Reviews", icon: "⭐" },
    { href: "/admin/features", label: "Features", icon: "✨" },
    { href: "/admin/process", label: "Process", icon: "📋" },
    { href: "/admin/faq", label: "FAQ", icon: "❓" },
    { href: "/admin/contact", label: "Contact", icon: "📞" },
    { href: "/admin/submissions", label: "Submissions", icon: "📬" },
    { href: "/admin/users", label: "Users", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-[#eef7ff]">
      <Toaster richColors position="top-center" />
      <div className="flex min-h-screen">
        <aside className="w-64 bg-[#2f261c] text-white p-6 flex flex-col gap-2 shrink-0 overflow-y-auto">
          <Link href="/" className="mb-4 block">
            <img
              src="/assets/nepembe-logo.svg"
              alt="Nepembe logo"
              className="h-14 w-auto brightness-0 invert opacity-90"
            />
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white rounded-xl px-4 py-3 font-bold shadow-lg mb-2 hover:opacity-90"
          >
            ← View Site
          </Link>
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`rounded-xl px-4 py-3 font-bold text-left transition-all ${
                pathname === tab.href
                  ? "bg-white text-[#2f261c]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {tab.icon} {tab.label}
            </Link>
          ))}
          <div className="mt-auto pt-4 border-t border-white/20">
            <p className="text-sm text-white/60 mb-2">
              {user.email} ({user.role})
            </p>
            <button
              onClick={handleLogout}
              className="w-full rounded-xl px-4 py-3 font-bold bg-red-500/20 text-red-300 hover:bg-red-500/30 text-left"
            >
              Logout
            </button>
          </div>
        </aside>
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
