"use client";

import { useEffect, useState } from "react";
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

  const load = async () => {
    const res = await fetch("/api/hero-slides");
    const data = await res.json();
    setSlides(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addSlide = async () => {
    if (!imageUrl) { toast.error("Image URL is required"); return; }
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
      <p className="text-[#766653] mb-6">Manage the hero slideshow images</p>

      <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">Add New Slide</h2>
        <div className="space-y-3">
          <input
            placeholder="Slide title/caption"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium"
          />
          <input
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium"
          />
          <button
            onClick={addSlide}
            className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl"
          >
            Add Slide
          </button>
        </div>
      </div>

      <div className="grid gap-4 max-w-xl">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white rounded-2xl border border-[#eadbc2] p-4 flex items-center gap-4"
          >
            {slide.imageUrl && (
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-24 h-16 object-cover rounded-xl"
              />
            )}
            <div className="flex-1">
              <strong className="text-[#2f261c]">{slide.title}</strong>
            </div>
            <button
              onClick={() => deleteSlide(slide.id)}
              className="bg-red-50 text-red-700 font-bold px-4 py-2 rounded-xl hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        ))}
        {slides.length === 0 && (
          <p className="text-[#766653] text-center py-8">No slides yet</p>
        )}
      </div>
    </div>
  );
}
