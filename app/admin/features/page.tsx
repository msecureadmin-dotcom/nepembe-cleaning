"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Feature {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
}

export default function FeaturesPage() {
  const [items, setItems] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const load = async () => {
    try {
      const res = await fetch("/api/features");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!title || !text) { toast.error("Title and text required"); return; }
    try {
      await fetch("/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text, imageUrl }),
      });
      toast.success("Feature added");
      setTitle("");
      setText("");
      setImageUrl("");
      load();
    } catch { toast.error("Failed to add"); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this feature?")) return;
    try {
      await fetch("/api/features", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Feature deleted");
      load();
    } catch { toast.error("Failed to delete"); }
  };

  if (loading) return <div className="text-center py-12 text-[#766653]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Feature Cards</h1>

      <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <div className="space-y-3">
          <input placeholder="Feature title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <input placeholder="Feature text" value={text} onChange={(e) => setText(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <input placeholder="Image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <button onClick={add} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">Add Feature</button>
        </div>
      </div>

      <div className="grid gap-4 max-w-xl">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#eadbc2] p-4 flex items-center gap-4">
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-20 h-16 object-cover rounded-xl" />}
            <div className="flex-1">
              <strong className="text-[#2f261c]">{item.title}</strong>
              <p className="text-sm text-[#766653]">{item.text}</p>
            </div>
            <button onClick={() => remove(item.id)} className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-xl text-sm">Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-center py-8 text-[#766653]">No features yet</p>}
      </div>
    </div>
  );
}
