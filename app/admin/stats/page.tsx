"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import ConfirmModal from "@/components/confirm-modal";
import Skeleton from "@/components/skeleton";

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
  const [editing, setEditing] = useState<Stat | null>(null);
  const [confirmItem, setConfirmItem] = useState<{ id: string; name: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  const save = async () => {
    if (!label || !value) { toast.error("Label and value required"); return; }
    try {
      const method = editing ? "PUT" : "POST";
      const body: Record<string, unknown> = { label, value, icon };
      if (editing) body.id = editing.id;
      await fetch("/api/stats", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      toast.success(editing ? "Stat updated" : "Stat added");
      setLabel(""); setValue(""); setIcon("");
      setEditing(null);
      load();
    } catch { toast.error("Failed to save"); }
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

  const startEdit = (item: Stat) => {
    setEditing(item);
    setLabel(item.label);
    setValue(item.value);
    setIcon(item.icon);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditing(null);
    setLabel(""); setValue(""); setIcon("");
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
        fetch("/api/stats", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[index].id, label: arr[index].label, value: arr[index].value, icon: arr[index].icon, isActive: arr[index].isActive, sortOrder: arr[index].sortOrder }) }),
        fetch("/api/stats", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[newIndex].id, label: arr[newIndex].label, value: arr[newIndex].value, icon: arr[newIndex].icon, isActive: arr[newIndex].isActive, sortOrder: arr[newIndex].sortOrder }) }),
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
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Live Stats</h1>
      <p className="text-[#766653] mb-6">Manage trust-building stats shown below the hero section</p>

      <div ref={formRef} className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">{editing ? "Edit Stat" : "Add Stat"}</h2>
        <div className="space-y-3">
          <div>
            <label htmlFor="icon" className="block text-sm font-bold text-[#2f261c] mb-1">Icon (emoji)</label>
            <input id="icon" placeholder="e.g. ⚡" value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
            <p className="text-xs text-[#766653] mt-1">Pick an emoji that represents the stat</p>
          </div>
          <div>
            <label htmlFor="value" className="block text-sm font-bold text-[#2f261c] mb-1">Value *</label>
            <input id="value" placeholder="e.g. 24h" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
            <p className="text-xs text-[#766653] mt-1">Short bold number or text to highlight</p>
          </div>
          <div>
            <label htmlFor="label" className="block text-sm font-bold text-[#2f261c] mb-1">Label *</label>
            <input id="label" placeholder="e.g. fast response goal" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
            <p className="text-xs text-[#766653] mt-1">Description text shown under the value</p>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">
              {editing ? "Update" : "Add Stat"}
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
            <div className="flex flex-col gap-1">
              <button onClick={() => moveItem(i, "up")} disabled={i === 0} className="text-xs disabled:opacity-30 hover:text-[#d6a85f]">▲</button>
              <button onClick={() => moveItem(i, "down")} disabled={i === items.length - 1} className="text-xs disabled:opacity-30 hover:text-[#d6a85f]">▼</button>
            </div>
            <button onClick={() => toggleActive(item)} className={`px-3 py-1 rounded-xl text-xs font-bold ${item.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {item.isActive ? "Active" : "Off"}
            </button>
            <button onClick={() => startEdit(item)} className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-xl text-xs">Edit</button>
            <button onClick={() => setConfirmItem({ id: item.id, name: item.value })} className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-xl text-xs">Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-center py-8 text-[#766653]">No stats yet. Add one above.</p>}
      </div>

      <ConfirmModal
        open={!!confirmItem}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${confirmItem?.name}"? This cannot be undone.`}
        onConfirm={() => { if (confirmItem) remove(confirmItem.id); setConfirmItem(null); }}
        onCancel={() => setConfirmItem(null)}
      />
    </div>
  );
}
