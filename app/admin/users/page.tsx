"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Editor");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const load = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addUser = async () => {
    if (!email || !password) { toast.error("Email and password required"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      if (!res.ok) { const d = await res.json(); toast.error(d.error || "Failed"); return; }
      toast.success("User added");
      setEmail("");
      setPassword("");
      load();
    } catch { toast.error("Failed to add user"); }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) { const d = await res.json(); toast.error(d.error || "Failed"); return; }
      toast.success("User deleted");
      load();
    } catch { toast.error("Failed to delete"); }
  };

  const changePassword = async () => {
    if (!currentPassword || !newPassword) { toast.error("Fill in both password fields"); return; }
    if (newPassword.length < 6) { toast.error("New password must be at least 6 characters"); return; }
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ changePassword: true, currentPassword, newPassword }),
      });
      if (!res.ok) { const d = await res.json(); toast.error(d.error || "Failed"); return; }
      toast.success("Password changed!");
      setCurrentPassword("");
      setNewPassword("");
    } catch { toast.error("Failed to change password"); }
  };

  if (loading) return <div className="text-center py-12 text-[#766653]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-black text-[#2f261c] mb-2">User Management</h1>
      <p className="text-[#766653] mb-6">Add, remove users and change passwords</p>

      <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">Change My Password</h2>
        <div className="space-y-3">
          <input type="password" placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <input type="password" placeholder="New password (min 6 chars)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <button onClick={changePassword} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">Change Password</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#eadbc2] p-6 mb-6 max-w-xl">
        <h2 className="font-bold text-lg mb-4">Add New User</h2>
        <div className="space-y-3">
          <input placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <input type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium" />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#eadbc2] bg-[#fbf4e8] font-medium">
            <option value="Editor">Editor</option>
            <option value="Admin">Admin</option>
          </select>
          <button onClick={addUser} className="bg-gradient-to-r from-[#d6a85f] to-[#0f766e] text-white font-bold py-3 px-6 rounded-xl">Add User</button>
        </div>
      </div>

      <div className="max-w-xl">
        <h2 className="font-bold text-xl text-[#2f261c] mb-4">Existing Users</h2>
        <div className="space-y-3">
          {users.map((u) => (
            <div key={u.id} className="bg-white rounded-2xl border border-[#eadbc2] p-4 flex items-center justify-between">
              <div>
                <strong className="text-[#2f261c]">{u.email}</strong>
                <p className="text-sm text-[#766653]">{u.role}</p>
              </div>
              <button onClick={() => deleteUser(u.id)} className="bg-red-50 text-red-700 font-bold px-4 py-2 rounded-xl hover:bg-red-100">Remove</button>
            </div>
          ))}
          {users.length === 0 && <p className="text-center py-8 text-[#766653]">No users found</p>}
        </div>
      </div>
    </div>
  );
}
