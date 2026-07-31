"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import ConfirmModal from "@/components/confirm-modal";
import Skeleton from "@/components/skeleton";

interface Testimonial {
  id: string;
  customerName: string;
  review: string;
  rating: number;
  isActive: boolean;
  sortOrder: number;
}

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [confirmItem, setConfirmItem] = useState<{ id: string; name: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!name || !review) { toast.error("Name and review required"); return; }
    try {
      const method = editing ? "PUT" : "POST";
      const body: Record<string, unknown> = { customerName: name, review, rating };
      if (editing) body.id = editing.id;
      await fetch("/api/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      toast.success(editing ? "Review updated" : "Review added");
      setName("");
      setReview("");
      setRating(5);
      setEditing(null);
      load();
    } catch { toast.error("Failed to save"); }
  };

  const remove = async (id: string) => {
    try {
      await fetch("/api/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Review deleted");
      load();
    } catch { toast.error("Failed to delete"); }
  };

  const toggleActive = async (item: Testimonial) => {
    try {
      await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, customerName: item.customerName, review: item.review, rating: item.rating, isActive: !item.isActive }),
      });
      load();
    } catch { toast.error("Failed to update"); }
  };

  const startEdit = (item: Testimonial) => {
    setEditing(item);
    setName(item.customerName);
    setReview(item.review);
    setRating(item.rating);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditing(null);
    setName("");
    setReview("");
    setRating(5);
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
        fetch("/api/testimonials", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[index].id, customerName: arr[index].customerName, review: arr[index].review, rating: arr[index].rating, isActive: arr[index].isActive, sortOrder: arr[index].sortOrder }) }),
        fetch("/api/testimonials", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[newIndex].id, customerName: arr[newIndex].customerName, review: arr[newIndex].review, rating: arr[newIndex].rating, isActive: arr[newIndex].isActive, sortOrder: arr[newIndex].sortOrder }) }),
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
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Reviews</h1>

      <div ref={formRef} className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">{editing ? "Edit Review" : "Add Review"}</h2>
        <div className="space-y-3">
          <div>
            <label htmlFor="customerName" className="block text-sm font-bold text-[#2f261c] mb-1">Customer Name</label>
            <input id="customerName" placeholder="Customer name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          </div>
          <div>
            <label htmlFor="review" className="block text-sm font-bold text-[#2f261c] mb-1">Review</label>
            <textarea id="review" placeholder="Review text" value={review} onChange={(e) => setReview(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium resize-y" />
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-bold text-[#2f261c] mb-1">Rating</label>
            <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium">
              {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">
              {editing ? "Update" : "Add Review"}
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
          <div key={item.id} className="bg-white rounded-2xl border border-[#eadbc2] p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <strong className="text-[#2f261c]">{item.customerName}</strong>
                  <span className="text-[#d6a85f]">{Array.from({ length: item.rating }, () => "★").join("")}</span>
                  {!item.isActive && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Hidden</span>}
                </div>
                <p className="text-sm text-[#766653] mt-1">{item.review}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveItem(i, "up")} disabled={i === 0} className="text-xs disabled:opacity-30 hover:text-[#d6a85f]">▲</button>
                  <button onClick={() => moveItem(i, "down")} disabled={i === items.length - 1} className="text-xs disabled:opacity-30 hover:text-[#d6a85f]">▼</button>
                </div>
                <button onClick={() => toggleActive(item)} className={`px-3 py-1 rounded-xl text-xs font-bold ${item.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {item.isActive ? "Active" : "Off"}
                </button>
                <button onClick={() => startEdit(item)} className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-xl text-xs">Edit</button>
                <button onClick={() => setConfirmItem({ id: item.id, name: item.customerName })} className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-xl text-xs">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center py-8 text-[#766653]">No reviews yet</p>}
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
