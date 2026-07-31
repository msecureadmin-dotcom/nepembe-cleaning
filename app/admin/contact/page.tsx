"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Skeleton from "@/components/skeleton";

export default function ContactPage() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        const fields = ["phone", "whatsapp", "email", "address", "mapLocation", "googleMapsUrl", "businessHours", "facebookUrl", "instagramUrl", "tiktokUrl"];
        const vals: Record<string, string> = {};
        fields.forEach((f) => { vals[f] = data[f] || ""; });
        setForm(vals);
        setLoading(false);
      })
      .catch(() => { setLoading(false); });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Contact info saved!");
    } catch { toast.error("Failed to save"); }
  };

  if (loading) return (
    <div className="space-y-4 max-w-xl">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-40 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Contact & Social</h1>
      <p className="text-[#766653] mb-6">Update contact details, social links, and map location</p>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 space-y-4">
          {[
            { key: "phone", label: "Phone Number" },
            { key: "whatsapp", label: "WhatsApp Number" },
            { key: "email", label: "Email Address" },
            { key: "address", label: "Address" },
            { key: "mapLocation", label: "Google Maps Location Query" },
            { key: "googleMapsUrl", label: "Google Maps Embed URL (optional)" },
            { key: "businessHours", label: "Business Hours" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-bold text-[#2f261c] mb-1">{label}</label>
              <input value={form[key] || ""} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
            </div>
          ))}

          <div className="border-t border-[#eadbc2] pt-4">
            <h3 className="font-bold text-[#2f261c] mb-3">Social Media Links</h3>
            {[
              { key: "facebookUrl", label: "Facebook URL" },
              { key: "instagramUrl", label: "Instagram URL" },
              { key: "tiktokUrl", label: "TikTok URL" },
            ].map(({ key, label }) => (
              <div key={key} className="mb-3">
                <label className="block text-sm font-bold text-[#2f261c] mb-1">{label}</label>
                <input value={form[key] || ""} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
              </div>
            ))}
          </div>

          <button type="submit" className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:opacity-90">
            Save Contact Info
          </button>
        </div>
      </form>
    </div>
  );
}
