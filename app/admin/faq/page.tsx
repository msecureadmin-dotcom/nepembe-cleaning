"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
}

export default function FAQPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const load = async () => {
    const res = await fetch("/api/faq");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!question || !answer) { toast.error("Question and answer required"); return; }
    try {
      await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      toast.success("FAQ added");
      setQuestion("");
      setAnswer("");
      load();
    } catch { toast.error("Failed to add"); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
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

  if (loading) return <div className="text-center py-12 text-[#766653]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">FAQ</h1>

      <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <div className="space-y-3">
          <input placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <textarea placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium resize-y" />
          <button onClick={add} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">Add FAQ</button>
        </div>
      </div>

      <div className="grid gap-4 max-w-xl">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#eadbc2] p-4">
            <div className="flex items-start justify-between">
              <div>
                <strong className="text-[#2f261c]">{item.question}</strong>
                <p className="text-sm text-[#766653] mt-1">{item.answer}</p>
              </div>
              <button onClick={() => remove(item.id)} className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-xl text-sm shrink-0 ml-4">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center py-8 text-[#766653]">No FAQs yet</p>}
      </div>
    </div>
  );
}
