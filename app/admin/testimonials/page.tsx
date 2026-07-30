"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Testimonial {
  id: string;
  customerName: string;
  review: string;
  rating: number;
  isActive: boolean;
}

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const load = async () => {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!name || !review) { toast.error("Name and review required"); return; }
    try {
      await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName: name, review, rating: 5 }),
      });
      toast.success("Review added");
      setName("");
      setReview("");
      load();
    } catch { toast.error("Failed to add"); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this review?")) return;
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

  if (loading) return <div className="text-center py-12 text-[#766653]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Reviews</h1>

      <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <div className="space-y-3">
          <input placeholder="Customer name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <textarea placeholder="Review text" value={review} onChange={(e) => setReview(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium resize-y" />
          <button onClick={add} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">Add Review</button>
        </div>
      </div>

      <div className="grid gap-4 max-w-xl">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#eadbc2] p-4">
            <div className="flex items-start justify-between">
              <div>
                <strong className="text-[#2f261c]">{item.customerName}</strong>
                <p className="text-sm text-[#766653] mt-1">{item.review}</p>
              </div>
              <button onClick={() => remove(item.id)} className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-xl text-sm">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center py-8 text-[#766653]">No reviews yet</p>}
      </div>
    </div>
  );
}
