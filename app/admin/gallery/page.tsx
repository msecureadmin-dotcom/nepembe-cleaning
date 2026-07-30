"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
}

interface Service {
  id: string;
  title: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [imageUrl, setImageUrl] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchItems = async () => {
    try {
      const [itemsRes, servicesRes] = await Promise.all([
        fetch("/api/gallery"),
        fetch("/api/services"),
      ]);
      const itemsData = await itemsRes.json();
      setItems(Array.isArray(itemsData) ? itemsData : []);
      const svcData = await servicesRes.json();
      setServices(Array.isArray(svcData) ? svcData : []);
    } catch {}
  };

  useEffect(() => {
    (async () => {
      await fetchItems();
      setLoading(false);
    })();
  }, []);

  const addItem = async () => {
    if (!imageUrl) { toast.error("Image URL is required"); return; }
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title || "Gallery image", category, imageUrl }),
      });
      if (!res.ok) throw new Error();
      toast.success("Image added to gallery");
      setTitle("");
      setImageUrl("");
      await fetchItems();
    } catch { toast.error("Failed to add"); }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Image deleted");
      await fetchItems();
    } catch { toast.error("Failed to delete"); }
  };

  const categories = ["All", ...new Set(services.map((s) => s.title)), "General"];
  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  if (loading) return <div className="text-center py-12 text-[#766653]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Gallery</h1>
      <p className="text-[#766653] mb-6">Add images with category/service labels</p>

      <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">Add Image</h2>
        <div className="space-y-3">
          <input placeholder="Image title/caption" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium">
            <option value="General">General Gallery</option>
            {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
          </select>
          <input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <button onClick={addItem} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">
            Add to Gallery
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${
              filter === c ? "bg-[#2f261c] text-white" : "bg-white text-[#2f261c] border border-[#eadbc2]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#eadbc2] overflow-hidden">
            <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
            <div className="p-3">
              <strong className="text-sm text-[#2f261c]">{item.title}</strong>
              <p className="text-xs text-[#766653]">{item.category}</p>
              <button onClick={() => deleteItem(item.id)} className="text-red-600 text-xs font-bold mt-1 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center py-8 text-[#766653]">No images in this category</p>
        )}
      </div>
    </div>
  );
}
