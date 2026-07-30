"use client";

import { useEffect, useState } from "react";
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

  const load = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addService = async () => {
    if (!title || !description) { toast.error("Title and description required"); return; }
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, imageUrl }),
      });
      if (!res.ok) throw new Error();
      toast.success("Service added");
      setTitle("");
      setDescription("");
      setImageUrl("");
      load();
    } catch { toast.error("Failed to add"); }
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

  if (loading) return <div className="text-center py-12 text-[#766653]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Services</h1>
      <p className="text-[#766653] mb-6">Add or remove cleaning services</p>

      <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">Add New Service</h2>
        <div className="space-y-3">
          <input placeholder="Service name" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium resize-y" />
          <input placeholder="Image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <button onClick={addService} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">
            Add Service
          </button>
        </div>
      </div>

      <div className="grid gap-4 max-w-xl">
        {services.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-[#eadbc2] p-4 flex items-center gap-4">
            {s.imageUrl && <img src={s.imageUrl} alt={s.title} className="w-20 h-16 object-cover rounded-xl" />}
            <div className="flex-1">
              <strong className="text-[#2f261c]">{s.title}</strong>
              <p className="text-sm text-[#766653]">{s.description.slice(0, 80)}...</p>
            </div>
            <button onClick={() => deleteService(s.id)} className="bg-red-50 text-red-700 font-bold px-4 py-2 rounded-xl hover:bg-red-100">
              Delete
            </button>
          </div>
        ))}
        {services.length === 0 && <p className="text-[#766653] text-center py-8">No services yet</p>}
      </div>
    </div>
  );
}
