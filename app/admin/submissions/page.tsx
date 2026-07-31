"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Submission {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function SubmissionsPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const load = async () => {
    try {
      const res = await fetch("/api/submissions");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const markStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/submissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      toast.success(`Marked as ${status}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      load();
    }
  };

  const paginated = items.slice(0, page * perPage);
  const hasMore = paginated.length < items.length;

  if (loading) return <div className="text-center py-12 text-[#766653]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">Contact Submissions</h1>
      <p className="text-[#766653] mb-6">Quote requests from visitors</p>

      <div className="space-y-4">
        {paginated.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#eadbc2] p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <strong className="text-lg text-[#2f261c]">{item.name}</strong>
                <span className={`ml-3 px-3 py-1 rounded-full text-xs font-bold ${
                  item.status === "New" ? "bg-yellow-100 text-yellow-800" :
                  item.status === "Read" ? "bg-blue-100 text-blue-800" :
                  "bg-green-100 text-green-800"
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="text-sm text-[#766653]">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div><strong>Phone:</strong> {item.phone}</div>
              <div><strong>Email:</strong> {item.email || "-"}</div>
              <div><strong>Service:</strong> {item.service || "-"}</div>
              <div><strong>Location:</strong> {item.location || "-"}</div>
              {item.preferredDate && <div><strong>Date:</strong> {item.preferredDate}</div>}
              {item.preferredTime && <div><strong>Time:</strong> {item.preferredTime}</div>}
            </div>
            {item.message && <p className="text-sm text-[#766653] mb-3">{item.message}</p>}
            <div className="flex gap-2">
              <button onClick={() => markStatus(item.id, "Read")} className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-lg">Mark Read</button>
              <button onClick={() => markStatus(item.id, "Replied")} className="text-xs bg-green-50 text-green-700 font-bold px-3 py-1 rounded-lg">Mark Replied</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center py-12 text-[#766653]">No submissions yet</p>}

        {hasMore && (
          <div className="text-center">
            <button onClick={() => setPage((p) => p + 1)} className="bg-white border border-[#eadbc2] text-[#2f261c] font-bold px-6 py-3 rounded-xl hover:bg-[#fbf4e8]">
              Load More ({items.length - paginated.length} remaining)
            </button>
          </div>
        )}

        {items.length > 0 && (
          <p className="text-center text-sm text-[#766653]">
            Showing {paginated.length} of {items.length}
          </p>
        )}
      </div>
    </div>
  );
}
