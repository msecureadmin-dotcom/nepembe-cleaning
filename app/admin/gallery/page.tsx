"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
  sortOrder: number;
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
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  const saveItem = async () => {
    if (!imageUrl) { toast.error("Image URL is required"); return; }
    try {
      const method = editing ? "PUT" : "POST";
      const body: Record<string, unknown> = { title: title || "Gallery image", category, imageUrl };
      if (editing) body.id = editing.id;
      const res = await fetch("/api/gallery", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Image updated" : "Image added to gallery");
      setTitle("");
      setImageUrl("");
      setCategory("General");
      setEditing(null);
      await fetchItems();
    } catch { toast.error("Failed to save"); }
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

  const startEdit = (item: GalleryItem) => {
    setEditing(item);
    setTitle(item.title);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditing(null);
    setTitle("");
    setImageUrl("");
    setCategory("General");
  };

  const moveItem = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    const arr = [...items];
    const temp = arr[index].sortOrder;
    arr[index].sortOrder = arr[newIndex].sortOrder;
    arr[newIndex].sortOrder = temp;
    try {
      await Promise.all([
        fetch("/api/gallery", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[index].id, title: arr[index].title, category: arr[index].category, imageUrl: arr[index].imageUrl, caption: arr[index].caption, sortOrder: arr[index].sortOrder }) }),
        fetch("/api/gallery", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[newIndex].id, title: arr[newIndex].title, category: arr[newIndex].category, imageUrl: arr[newIndex].imageUrl, caption: arr[newIndex].caption, sortOrder: arr[newIndex].sortOrder }) }),
      ]);
      await fetchItems();
    } catch { toast.error("Failed to reorder"); }
  };

  const categories = ["All", ...new Set(services.map((s) => s.title)), "General"];
  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  if (loading) return <div className="text-center py-12 text-[#766653]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Gallery</h1>
      <p className="text-[#766653] mb-6">Add images with category/service labels</p>

      <div ref={formRef} className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">{editing ? "Edit Image" : "Add Image"}</h2>
        <div className="space-y-3">
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-[#2f261c] mb-1">Title</label>
            <input id="title" placeholder="Image title/caption" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-bold text-[#2f261c] mb-1">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium">
              <option value="General">General Gallery</option>
              {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-bold text-[#2f261c] mb-1">Image URL</label>
            <input id="imageUrl" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          </div>
          <div className="flex gap-2">
            <button onClick={saveItem} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">
              {editing ? "Update" : "Add to Gallery"}
            </button>
            {editing && (
              <button onClick={cancelEdit} className="bg-gray-100 text-[#2f261c] font-bold py-3 px-6 rounded-xl hover:bg-gray-200">
                Cancel
              </button>
            )}
          </div>
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
        {filtered.map((item, i) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#eadbc2] overflow-hidden">
            <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
            <div className="p-3">
              <strong className="text-sm text-[#2f261c]">{item.title}</strong>
              <p className="text-xs text-[#766653]">{item.category}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-1">
                  <button onClick={() => moveItem(items.indexOf(item), "up")} disabled={items.indexOf(item) === 0} className="text-xs disabled:opacity-30 hover:text-[#d6a85f]">▲</button>
                  <button onClick={() => moveItem(items.indexOf(item), "down")} disabled={items.indexOf(item) === items.length - 1} className="text-xs disabled:opacity-30 hover:text-[#d6a85f]">▼</button>
                </div>
                <button onClick={() => startEdit(item)} className="text-blue-600 text-xs font-bold hover:underline">Edit</button>
                <button onClick={() => deleteItem(item.id)} className="text-red-600 text-xs font-bold hover:underline">Delete</button>
              </div>
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
