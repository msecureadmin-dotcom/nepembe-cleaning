"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    branding: true,
    hero: false,
    services: false,
    features: false,
    about: false,
    process: false,
    transform: false,
    gallery: false,
    quote: false,
    testimonials: false,
    contact: false,
    seo: false,
  });
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        const fields: Record<string, string> = {};
        Object.keys(data).forEach((k) => {
          if (k !== "id") fields[k] = data[k] || "";
        });
        setForm(fields);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load settings");
        setLoading(false);
      });
  }, []);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        handleChange("logoUrl", data.url);
        toast.success("Logo uploaded");
      } else throw new Error();
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Failed to save settings");
    }
  };

  const section = (key: string, title: string, content: React.ReactNode) => (
    <div className="bg-white rounded-2xl border border-[#eadbc2] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpenSections((p) => ({ ...p, [key]: !p[key] }))}
        className="w-full flex items-center justify-between p-5 font-black text-lg text-[#2f261c] hover:bg-[#fbf4e8] transition-colors text-left"
      >
        {title}
        <span className={`text-[#d6a85f] transition-transform duration-200 ${openSections[key] ? "rotate-45" : ""}`}>+</span>
      </button>
      {openSections[key] && <div className="px-5 pb-5 space-y-4">{content}</div>}
    </div>
  );

  const field = (key: string, label: string, multiline?: boolean, hint?: string) => (
    <div className={key.includes("Text") || key.includes("Description") ? "md:col-span-2" : ""}>
      <label htmlFor={key} className="block text-sm font-bold text-[#2f261c] mb-1">{label}</label>
      {multiline ? (
        <textarea
          id={key}
          value={form[key] || ""}
          onChange={(e) => handleChange(key, e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium resize-y"
        />
      ) : (
        <input
          id={key}
          value={form[key] || ""}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium"
        />
      )}
      {hint && <p className="text-xs text-[#766653] mt-1">{hint}</p>}
    </div>
  );

  if (loading) {
    return <div className="text-center py-12 text-[#766653]">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Landing Page Editor</h1>
      <p className="text-[#766653] mb-6">Click sections to expand. Edit text and save when done.</p>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-3xl">
        {section("branding", "Logo & Branding", (
          <>
            <div className="flex items-start gap-4">
              <img src={form.logoUrl || "/assets/nepembe-logo.svg"} alt="Current logo" className="h-20 w-auto bg-[#fbf4e8] rounded-xl border border-[#eadbc2] p-2 shrink-0" />
              <div className="flex-1 space-y-2">
                {field("logoUrl", "Logo URL", false, "Full URL or /assets/filename.svg")}
                <div>
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="bg-[#2f261c] text-white font-bold px-4 py-2 rounded-xl text-sm hover:opacity-90 disabled:opacity-50">
                    {uploading ? "Uploading..." : "Upload New Logo"}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  <p className="text-xs text-[#766653] mt-1">Upload a PNG, JPG, WebP, or SVG image</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {field("companyName", "Company Name", false, "Used in footer and SEO")}
              {field("slogan", "Slogan", false, "Shown in hero section")}
            </div>
          </>
        ))}

        {section("hero", "Hero Section", (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("heroEyebrow", "Eyebrow", false, "Small label above the main title")}
            {field("heroTitle", "Title", false, "Main bold headline")}
            {field("heroSubtitle", "Subtitle", true, "Supporting text under the title")}
          </div>
        ))}

        {section("services", "Services Section", (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("servicesEyebrow", "Eyebrow")}
            {field("servicesTitle", "Title")}
            {field("servicesText", "Text", true)}
          </div>
        ))}

        {section("features", "Features Section", (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("featuresEyebrow", "Eyebrow")}
            {field("featuresTitle", "Title")}
            {field("featuresText", "Text", true)}
          </div>
        ))}

        {section("about", "About Section", (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("aboutEyebrow", "Eyebrow")}
            {field("aboutTitle", "Title")}
            {field("aboutText", "Text", true)}
          </div>
        ))}

        {section("process", "Process Section", (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("processEyebrow", "Eyebrow")}
            {field("processTitle", "Title")}
            {field("processText", "Text", true)}
          </div>
        ))}

        {section("transform", "Transformation Section", (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("transformEyebrow", "Eyebrow")}
            {field("transformTitle", "Title")}
            {field("transformText", "Text", true)}
          </div>
        ))}

        {section("gallery", "Gallery Section", (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("galleryEyebrow", "Eyebrow")}
            {field("galleryTitle", "Title")}
            {field("galleryText", "Text", true)}
          </div>
        ))}

        {section("quote", "Quote Form Section", (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("quoteEyebrow", "Eyebrow")}
            {field("quoteTitle", "Title")}
            {field("quoteText", "Text", true)}
          </div>
        ))}

        {section("testimonials", "Testimonials Section", (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("testimonialsEyebrow", "Eyebrow")}
            {field("testimonialsTitle", "Title")}
          </div>
        ))}

        {section("contact", "Contact Section", (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("contactEyebrow", "Eyebrow")}
            {field("contactTitle", "Title")}
            {field("contactText", "Text", true)}
          </div>
        ))}

        {section("seo", "SEO Settings", (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("seoTitle", "SEO Title", false, "Browser tab title and search result headline")}
            {field("seoDescription", "SEO Description", true, "Shown in Google search results")}
          </div>
        ))}

        <button type="submit" className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:opacity-90">
          Save All Settings
        </button>
      </form>
    </div>
  );
}
