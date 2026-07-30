"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

interface Slide {
  id: string;
  title: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/hero-slides");
      const data = await res.json();
      setSlides(Array.isArray(data) ? data : []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) { setImageUrl(data.url); toast.success("Image uploaded"); }
      else throw new Error();
    } catch { toast.error("Upload failed"); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  };

  const addSlide = async () => {
    if (!imageUrl) { toast.error("Image URL or upload required"); return; }
    try {
      const res = await fetch("/api/hero-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title || "Cleaning service", imageUrl, sortOrder: slides.length }),
      });
      if (!res.ok) throw new Error();
      toast.success("Slide added");
      setTitle("");
      setImageUrl("");
      load();
    } catch { toast.error("Failed to add"); }
  };

  const deleteSlide = async (id: string) => {
    if (!confirm("Delete this slide?")) return;
    try {
      await fetch("/api/hero-slides", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Slide deleted");
      load();
    } catch { toast.error("Failed to delete"); }
  };

  if (loading) return <div className="text-center py-12 text-[#766653]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Hero Slides</h1>
      <p className="text-[#766653] mb-6">Manage the hero slideshow images. Upload or paste an image URL.</p>

      <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">Add New Slide</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-bold text-[#2f261c] mb-1">Slide Caption</label>
            <input placeholder="e.g. Professional home cleaning" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#2f261c] mb-1">Image</label>
            {imageUrl && <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-xl mb-2" />}
            <div className="flex gap-2">
              <input placeholder="Or paste image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="bg-[#2f261c] text-white font-bold px-4 py-3 rounded-xl text-sm hover:opacity-90 disabled:opacity-50 shrink-0">
                {uploading ? "..." : "Upload"}
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            <p className="text-xs text-[#766653] mt-1">Accepts JPG, PNG, WebP, GIF, SVG up to 10MB</p>
          </div>
          <button onClick={addSlide} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">
            Add Slide
          </button>
        </div>
      </div>

      <div className="grid gap-4 max-w-xl">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-2xl border border-[#eadbc2] p-4 flex items-center gap-4">
            {slide.imageUrl && (
              <img src={slide.imageUrl} alt={slide.title} className="w-24 h-16 object-cover rounded-xl shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <strong className="text-[#2f261c]">{slide.title}</strong>
              <p className="text-xs text-[#766653] truncate">{slide.imageUrl}</p>
            </div>
            <button onClick={() => deleteSlide(slide.id)} className="bg-red-50 text-red-700 font-bold px-4 py-2 rounded-xl hover:bg-red-100 shrink-0">
              Delete
            </button>
          </div>
        ))}
        {slides.length === 0 && <p className="text-[#766653] text-center py-8">No slides yet</p>}
      </div>
    </div>
  );
}
