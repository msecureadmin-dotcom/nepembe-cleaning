"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Login failed");
        return;
      }
      toast.success("Logged in successfully");
      router.push("/admin");
    } catch {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbf4e8] p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full border border-[#eadbc2]">
        <img
          src="/assets/nepembe-logo.png"
          alt="Nepembe logo"
          className="h-16 w-auto mx-auto mb-6"
        />
        <h1 className="text-2xl font-black text-[#2f261c] mb-2 text-center">
          Admin Login
        </h1>
        <p className="text-[#766653] text-sm text-center mb-6">
          Sign in to manage your website
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#2f261c] mb-1">
              Email / Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium focus:outline-none focus:ring-2 focus:ring-[#d6a85f]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#2f261c] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium focus:outline-none focus:ring-2 focus:ring-[#d6a85f]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-xs text-[#766653] text-center mt-4">
          Default: admin / nepembe2026
        </p>
      </div>
    </div>
  );
}
