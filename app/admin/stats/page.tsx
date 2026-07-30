"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Stat {
  id: string;
  label: string;
  value: string;
  icon: string;
  isActive: boolean;
  sortOrder: number;
}

export default function StatsPage() {
  const [items, setItems] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [icon, setIcon] = useState("");

  const load = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!label || !value) { toast.error("Label and value required"); return; }
    try {
      await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, value, icon }),
      });
      toast.success("Stat added");
      setLabel(""); setValue(""); setIcon("");
      load();
    } catch { toast.error("Failed to add"); }
  };

  const toggleActive = async (item: Stat) => {
    try {
      await fetch("/api/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, isActive: !item.isActive }),
      });
      load();
    } catch { toast.error("Failed to update"); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this stat?")) return;
    try {
      await fetch("/api/stats", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Stat deleted");
      load();
    } catch { toast.error("Failed to delete"); }
  };

  if (loading) return <div className="text-center py-12 text-[#766653]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Live Stats</h1>
      <p className="text-[#766653] mb-6">Manage trust-building stats shown below the hero section</p>

      <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">Add Stat</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-bold text-[#2f261c] mb-1">Icon (emoji)</label>
            <input placeholder="e.g. ⚡" value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
            <p className="text-xs text-[#766653] mt-1">Pick an emoji that represents the stat</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#2f261c] mb-1">Value *</label>
            <input placeholder="e.g. 24h" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
            <p className="text-xs text-[#766653] mt-1">Short bold number or text to highlight</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#2f261c] mb-1">Label *</label>
            <input placeholder="e.g. fast response goal" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
            <p className="text-xs text-[#766653] mt-1">Description text shown under the value</p>
          </div>
          <button onClick={add} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">
            Add Stat
          </button>
        </div>
      </div>

      <div className="grid gap-4 max-w-xl">
        {items.map((item, i) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#eadbc2] p-4 flex items-center gap-4">
            <span className="text-2xl w-10 text-center">{item.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <strong className="text-[#2f261c]">{item.value}</strong>
                {!item.isActive && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Hidden</span>}
              </div>
              <p className="text-sm text-[#766653]">{item.label}</p>
            </div>
            <button onClick={() => toggleActive(item)} className={`px-3 py-1 rounded-xl text-sm font-bold ${item.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {item.isActive ? "Active" : "Off"}
            </button>
            <button onClick={() => remove(item.id)} className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-xl text-sm">Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-center py-8 text-[#766653]">No stats yet. Add one above.</p>}
      </div>
    </div>
  );
}
