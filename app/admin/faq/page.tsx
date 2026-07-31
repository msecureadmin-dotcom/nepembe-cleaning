"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import ConfirmModal from "@/components/confirm-modal";
import Skeleton from "@/components/skeleton";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
  sortOrder: number;
}

export default function FAQPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [confirmItem, setConfirmItem] = useState<{ id: string; name: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/faq");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!question || !answer) { toast.error("Question and answer required"); return; }
    try {
      const method = editing ? "PUT" : "POST";
      const body: Record<string, unknown> = { question, answer };
      if (editing) body.id = editing.id;
      await fetch("/api/faq", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      toast.success(editing ? "FAQ updated" : "FAQ added");
      setQuestion("");
      setAnswer("");
      setEditing(null);
      load();
    } catch { toast.error("Failed to save"); }
  };

  const remove = async (id: string) => {
    try {
      await fetch("/api/faq", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("FAQ deleted");
      load();
    } catch { toast.error("Failed to delete"); }
  };

  const toggleActive = async (item: FAQ) => {
    try {
      await fetch("/api/faq", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, question: item.question, answer: item.answer, isActive: !item.isActive }),
      });
      load();
    } catch { toast.error("Failed to update"); }
  };

  const startEdit = (item: FAQ) => {
    setEditing(item);
    setQuestion(item.question);
    setAnswer(item.answer);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditing(null);
    setQuestion("");
    setAnswer("");
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
        fetch("/api/faq", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[index].id, question: arr[index].question, answer: arr[index].answer, isActive: arr[index].isActive, sortOrder: arr[index].sortOrder }) }),
        fetch("/api/faq", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: arr[newIndex].id, question: arr[newIndex].question, answer: arr[newIndex].answer, isActive: arr[newIndex].isActive, sortOrder: arr[newIndex].sortOrder }) }),
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
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">FAQ</h1>

      <div ref={formRef} className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">{editing ? "Edit FAQ" : "Add FAQ"}</h2>
        <div className="space-y-3">
          <div>
            <label htmlFor="question" className="block text-sm font-bold text-[#2f261c] mb-1">Question</label>
            <input id="question" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          </div>
          <div>
            <label htmlFor="answer" className="block text-sm font-bold text-[#2f261c] mb-1">Answer</label>
            <textarea id="answer" placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium resize-y" />
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">
              {editing ? "Update" : "Add FAQ"}
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
                <div className="flex items-center gap-2 mb-1">
                  <strong className="text-[#2f261c]">{item.question}</strong>
                  {!item.isActive && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Hidden</span>}
                </div>
                <p className="text-sm text-[#766653]">{item.answer}</p>
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
                <button onClick={() => setConfirmItem({ id: item.id, name: item.question })} className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-xl text-xs">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center py-8 text-[#766653]">No FAQs yet</p>}
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
