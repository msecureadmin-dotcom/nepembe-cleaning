"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-center py-12 text-[#766653]">Loading...</div>;
  }

  const textFields = [
    { key: "companyName", label: "Company Name" },
    { key: "slogan", label: "Slogan" },
    { key: "heroEyebrow", label: "Hero Eyebrow" },
    { key: "heroTitle", label: "Hero Title" },
    { key: "heroSubtitle", label: "Hero Subtitle" },
    { key: "servicesEyebrow", label: "Services Eyebrow" },
    { key: "servicesTitle", label: "Services Title" },
    { key: "servicesText", label: "Services Text" },
    { key: "featuresEyebrow", label: "Features Eyebrow" },
    { key: "featuresTitle", label: "Features Title" },
    { key: "featuresText", label: "Features Text" },
    { key: "aboutEyebrow", label: "About Eyebrow" },
    { key: "aboutTitle", label: "About Title" },
    { key: "aboutText", label: "About Text" },
    { key: "processEyebrow", label: "Process Eyebrow" },
    { key: "processTitle", label: "Process Title" },
    { key: "processText", label: "Process Text" },
    { key: "transformEyebrow", label: "Transform Eyebrow" },
    { key: "transformTitle", label: "Transform Title" },
    { key: "transformText", label: "Transform Text" },
    { key: "galleryEyebrow", label: "Gallery Eyebrow" },
    { key: "galleryTitle", label: "Gallery Title" },
    { key: "galleryText", label: "Gallery Text" },
    { key: "quoteEyebrow", label: "Quote Eyebrow" },
    { key: "quoteTitle", label: "Quote Title" },
    { key: "quoteText", label: "Quote Text" },
    { key: "testimonialsEyebrow", label: "Testimonials Eyebrow" },
    { key: "testimonialsTitle", label: "Testimonials Title" },
    { key: "contactEyebrow", label: "Contact Eyebrow" },
    { key: "contactTitle", label: "Contact Title" },
    { key: "contactText", label: "Contact Text" },
    { key: "seoTitle", label: "SEO Title" },
    { key: "seoDescription", label: "SEO Description" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">
        Landing Page Editor
      </h1>
      <p className="text-[#766653] mb-6">
        Change text on the public website. No coding needed.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 space-y-4">
          <h2 className="font-black text-lg text-[#2f261c]">
            Logo & Branding
          </h2>
          <div className="flex items-center gap-4">
            <img
              src={form.logoUrl || "/assets/nepembe-logo.png"}
              alt="Current logo"
              className="h-20 w-auto bg-[#fbf4e8] rounded-xl border border-[#eadbc2] p-2"
            />
            <div className="flex-1">
              <label className="block text-sm font-bold text-[#2f261c] mb-1">
                Logo URL
              </label>
              <input
                value={form.logoUrl || ""}
                onChange={(e) => handleChange("logoUrl", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 space-y-4">
          <h2 className="font-black text-lg text-[#2f261c]">
            All Text Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {textFields.map(({ key, label }) => (
              <div
                key={key}
                className={
                  key.includes("Text") || key.includes("Description")
                    ? "md:col-span-2"
                    : ""
                }
              >
                <label className="block text-sm font-bold text-[#2f261c] mb-1">
                  {label}
                </label>
                {key.includes("Text") || key.includes("Description") ? (
                  <textarea
                    value={form[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium resize-y"
                  />
                ) : (
                  <input
                    value={form[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:opacity-90"
        >
          Save All Settings
        </button>
      </form>
    </div>
  );
}
