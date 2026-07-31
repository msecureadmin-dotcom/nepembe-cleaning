"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  sortOrder: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editing, setEditing] = useState<Service | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const saveService = async () => {
    if (!title || !description) { toast.error("Title and description required"); return; }
    try {
      const method = editing ? "PUT" : "POST";
      const body: Record<string, unknown> = { title, description, imageUrl };
      if (editing) body.id = editing.id;
      const res = await fetch("/api/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Service updated" : "Service added");
      setTitle("");
      setDescription("");
      setImageUrl("");
      setEditing(null);
      load();
    } catch { toast.error("Failed to save"); }
  };

  const toggleActive = async (item: Service) => {
    try {
      await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, title: item.title, description: item.description, imageUrl: item.imageUrl, isActive: !item.isActive }),
      });
      load();
    } catch { toast.error("Failed to update"); }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await fetch("/api/services", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Service deleted");
      load();
    } catch { toast.error("Failed to delete"); }
  };

  const startEdit = (item: Service) => {
    setEditing(item);
    setTitle(item.title);
    setDescription(item.description);
    setImageUrl(item.imageUrl);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditing(null);
    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  const moveItem = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= services.length) return;
    const arr = [...services];
    const temp = arr[index].sortOrder;
    arr[index].sortOrder = arr[newIndex].sortOrder;
    arr[newIndex].sortOrder = temp;
    try {
      await Promise.all([
        fetch("/api/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[index].id, title: arr[index].title, description: arr[index].description, imageUrl: arr[index].imageUrl, isActive: arr[index].isActive, sortOrder: arr[index].sortOrder }) }),
        fetch("/api/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[newIndex].id, title: arr[newIndex].title, description: arr[newIndex].description, imageUrl: arr[newIndex].imageUrl, isActive: arr[newIndex].isActive, sortOrder: arr[newIndex].sortOrder }) }),
      ]);
      load();
    } catch { toast.error("Failed to reorder"); }
  };

  if (loading) return <div className="text-center py-12 text-[#766653]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Services</h1>
      <p className="text-[#766653] mb-6">Add or remove cleaning services</p>

      <div ref={formRef} className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">{editing ? "Edit Service" : "Add New Service"}</h2>
        <div className="space-y-3">
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-[#2f261c] mb-1">Title</label>
            <input id="title" placeholder="Service name" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-[#2f261c] mb-1">Description</label>
            <textarea id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium resize-y" />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-bold text-[#2f261c] mb-1">Image URL</label>
            <input id="imageUrl" placeholder="Image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          </div>
          <div className="flex gap-2">
            <button onClick={saveService} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">
              {editing ? "Update" : "Add Service"}
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
        {services.map((s, i) => (
          <div key={s.id} className="bg-white rounded-2xl border border-[#eadbc2] p-4 flex items-center gap-4">
            {s.imageUrl && <img src={s.imageUrl} alt={s.title} className="w-20 h-16 object-cover rounded-xl" />}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <strong className="text-[#2f261c]">{s.title}</strong>
                {!s.isActive && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Hidden</span>}
              </div>
              <p className="text-sm text-[#766653]">{s.description.slice(0, 80)}...</p>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => moveItem(i, "up")} disabled={i === 0} className="text-xs disabled:opacity-30 hover:text-[#d6a85f]">▲</button>
              <button onClick={() => moveItem(i, "down")} disabled={i === services.length - 1} className="text-xs disabled:opacity-30 hover:text-[#d6a85f]">▼</button>
            </div>
            <button onClick={() => toggleActive(s)} className={`px-3 py-1 rounded-xl text-xs font-bold ${s.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {s.isActive ? "Active" : "Off"}
            </button>
            <button onClick={() => startEdit(s)} className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-xl text-xs">Edit</button>
            <button onClick={() => deleteService(s.id)} className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-xl text-xs">Delete</button>
          </div>
        ))}
        {services.length === 0 && <p className="text-[#766653] text-center py-8">No services yet</p>}
      </div>
    </div>
  );
}
