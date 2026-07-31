"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import ConfirmModal from "@/components/confirm-modal";
import Skeleton from "@/components/skeleton";

interface Feature {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  sortOrder: number;
}

export default function FeaturesPage() {
  const [items, setItems] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editing, setEditing] = useState<Feature | null>(null);
  const [confirmItem, setConfirmItem] = useState<{ id: string; name: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  const save = async () => {
    if (!title || !text) { toast.error("Title and text required"); return; }
    try {
      const method = editing ? "PUT" : "POST";
      const body: Record<string, unknown> = { title, text, imageUrl };
      if (editing) body.id = editing.id;
      await fetch("/api/features", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      toast.success(editing ? "Feature updated" : "Feature added");
      setTitle("");
      setText("");
      setImageUrl("");
      setEditing(null);
      load();
    } catch { toast.error("Failed to save"); }
  };

  const remove = async (id: string) => {
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

  const startEdit = (item: Feature) => {
    setEditing(item);
    setTitle(item.title);
    setText(item.text);
    setImageUrl(item.imageUrl);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditing(null);
    setTitle("");
    setText("");
    setImageUrl("");
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
        fetch("/api/features", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[index].id, title: arr[index].title, text: arr[index].text, imageUrl: arr[index].imageUrl, sortOrder: arr[index].sortOrder }) }),
        fetch("/api/features", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[newIndex].id, title: arr[newIndex].title, text: arr[newIndex].text, imageUrl: arr[newIndex].imageUrl, sortOrder: arr[newIndex].sortOrder }) }),
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
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Feature Cards</h1>

      <div ref={formRef} className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">{editing ? "Edit Feature" : "Add Feature"}</h2>
        <div className="space-y-3">
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-[#2f261c] mb-1">Title</label>
            <input id="title" placeholder="Feature title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          </div>
          <div>
            <label htmlFor="text" className="block text-sm font-bold text-[#2f261c] mb-1">Text</label>
            <input id="text" placeholder="Feature text" value={text} onChange={(e) => setText(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-bold text-[#2f261c] mb-1">Image URL</label>
            <input id="imageUrl" placeholder="Image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">
              {editing ? "Update" : "Add Feature"}
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
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-20 h-16 object-cover rounded-xl" />}
            <div className="flex-1">
              <strong className="text-[#2f261c]">{item.title}</strong>
              <p className="text-sm text-[#766653]">{item.text}</p>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => moveItem(i, "up")} disabled={i === 0} className="text-xs disabled:opacity-30 hover:text-[#d6a85f]">▲</button>
              <button onClick={() => moveItem(i, "down")} disabled={i === items.length - 1} className="text-xs disabled:opacity-30 hover:text-[#d6a85f]">▼</button>
            </div>
            <button onClick={() => startEdit(item)} className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-xl text-sm">Edit</button>
            <button onClick={() => setConfirmItem({ id: item.id, name: item.title })} className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-xl text-sm">Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-center py-8 text-[#766653]">No features yet</p>}
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
