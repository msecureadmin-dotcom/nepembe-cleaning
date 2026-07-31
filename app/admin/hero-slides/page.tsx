"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import ConfirmModal from "@/components/confirm-modal";
import Skeleton from "@/components/skeleton";

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
  const [editing, setEditing] = useState<Slide | null>(null);
  const [confirmItem, setConfirmItem] = useState<{ id: string; name: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  const saveSlide = async () => {
    if (!imageUrl) { toast.error("Image URL or upload required"); return; }
    try {
      const method = editing ? "PUT" : "POST";
      const body: Record<string, unknown> = { title: title || "Cleaning service", imageUrl };
      if (editing) body.id = editing.id;
      else body.sortOrder = slides.length;
      const res = await fetch("/api/hero-slides", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Slide updated" : "Slide added");
      setTitle("");
      setImageUrl("");
      setEditing(null);
      load();
    } catch { toast.error("Failed to save"); }
  };

  const deleteSlide = async (id: string) => {
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

  const toggleActive = async (item: Slide) => {
    try {
      await fetch("/api/hero-slides", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, title: item.title, imageUrl: item.imageUrl, sortOrder: item.sortOrder, isActive: !item.isActive }),
      });
      load();
    } catch { toast.error("Failed to update"); }
  };

  const startEdit = (item: Slide) => {
    setEditing(item);
    setTitle(item.title);
    setImageUrl(item.imageUrl);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditing(null);
    setTitle("");
    setImageUrl("");
  };

  const moveItem = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= slides.length) return;
    const arr = [...slides];
    const temp = arr[index].sortOrder;
    arr[index].sortOrder = arr[newIndex].sortOrder;
    arr[newIndex].sortOrder = temp;
    try {
      await Promise.all([
        fetch("/api/hero-slides", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[index].id, title: arr[index].title, imageUrl: arr[index].imageUrl, sortOrder: arr[index].sortOrder, isActive: arr[index].isActive }) }),
        fetch("/api/hero-slides", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[newIndex].id, title: arr[newIndex].title, imageUrl: arr[newIndex].imageUrl, sortOrder: arr[newIndex].sortOrder, isActive: arr[newIndex].isActive }) }),
      ]);
      load();
    } catch { toast.error("Failed to reorder"); }
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
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Hero Slides</h1>
      <p className="text-[#766653] mb-6">Manage the hero slideshow images. Upload or paste an image URL.</p>

      <div ref={formRef} className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">{editing ? "Edit Slide" : "Add New Slide"}</h2>
        <div className="space-y-3">
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-[#2f261c] mb-1">Slide Caption</label>
            <input id="title" placeholder="e.g. Professional home cleaning" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-bold text-[#2f261c] mb-1">Image</label>
            {imageUrl && <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-xl mb-2" />}
            <div className="flex gap-2">
              <input id="imageUrl" placeholder="Or paste image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="bg-[#2f261c] text-white font-bold px-4 py-3 rounded-xl text-sm hover:opacity-90 disabled:opacity-50 shrink-0">
                {uploading ? "..." : "Upload"}
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            <p className="text-xs text-[#766653] mt-1">Accepts JPG, PNG, WebP, GIF, SVG up to 10MB</p>
          </div>
          <div className="flex gap-2">
            <button onClick={saveSlide} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">
              {editing ? "Update" : "Add Slide"}
            </button>
            {editing && (
              <button onClick={cancelEdit} className="bg-gray-100 text-[#2f261c] font-bold py-3 px-6 rounded-xl hover:bg-gray-200">
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 max-w-xl">
        {slides.map((slide, i) => (
          <div key={slide.id} className="bg-white rounded-2xl border border-[#eadbc2] p-4 flex items-center gap-4">
            {slide.imageUrl && (
              <img src={slide.imageUrl} alt={slide.title} className="w-24 h-16 object-cover rounded-xl shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <strong className="text-[#2f261c]">{slide.title}</strong>
                {!slide.isActive && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Hidden</span>}
              </div>
              <p className="text-xs text-[#766653] truncate">{slide.imageUrl}</p>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => moveItem(i, "up")} disabled={i === 0} className="text-xs disabled:opacity-30 hover:text-[#d6a85f]">▲</button>
              <button onClick={() => moveItem(i, "down")} disabled={i === slides.length - 1} className="text-xs disabled:opacity-30 hover:text-[#d6a85f]">▼</button>
            </div>
            <button onClick={() => toggleActive(slide)} className={`px-3 py-1 rounded-xl text-xs font-bold ${slide.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {slide.isActive ? "Active" : "Off"}
            </button>
            <button onClick={() => startEdit(slide)} className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-xl text-xs">Edit</button>
            <button onClick={() => setConfirmItem({ id: slide.id, name: slide.title })} className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-xl text-xs">Delete</button>
          </div>
        ))}
        {slides.length === 0 && <p className="text-[#766653] text-center py-8">No slides yet</p>}
      </div>

      <ConfirmModal
        open={!!confirmItem}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${confirmItem?.name}"? This cannot be undone.`}
        onConfirm={() => { if (confirmItem) deleteSlide(confirmItem.id); setConfirmItem(null); }}
        onCancel={() => setConfirmItem(null)}
      />
    </div>
  );
}
