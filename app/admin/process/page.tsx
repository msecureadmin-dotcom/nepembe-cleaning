"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Step {
  id: string;
  title: string;
  text: string;
}

export default function ProcessPage() {
  const [items, setItems] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const load = async () => {
    const res = await fetch("/api/process-steps");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!title || !text) { toast.error("Title and text required"); return; }
    try {
      await fetch("/api/process-steps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text }),
      });
      toast.success("Step added");
      setTitle("");
      setText("");
      load();
    } catch { toast.error("Failed to add"); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this step?")) return;
    try {
      await fetch("/api/process-steps", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Step deleted");
      load();
    } catch { toast.error("Failed to delete"); }
  };

  if (loading) return <div className="text-center py-12 text-[#766653]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Process Steps</h1>

      <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <div className="space-y-3">
          <input placeholder="Step title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <input placeholder="Step text" value={text} onChange={(e) => setText(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <button onClick={add} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">Add Step</button>
        </div>
      </div>

      <div className="grid gap-4 max-w-xl">
        {items.map((item, i) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#eadbc2] p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#2f261c] text-white flex items-center justify-center font-bold shrink-0">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex-1">
              <strong className="text-[#2f261c]">{item.title}</strong>
              <p className="text-sm text-[#766653]">{item.text}</p>
            </div>
            <button onClick={() => remove(item.id)} className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-xl text-sm">Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-center py-8 text-[#766653]">No steps yet</p>}
      </div>
    </div>
  );
}
