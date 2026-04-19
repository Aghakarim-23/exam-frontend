import React, { useEffect, useState } from "react";
import { FiSearch, FiUsers } from "react-icons/fi";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import api from "../api/axios";

const roleStyles = {
  admin: "bg-purple-50 text-purple-600 border border-purple-200",
  user: "bg-blue-50 text-blue-600 border border-blue-200",
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/auth/users");
        setUsers(res.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.surname.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-medium px-4 py-1.5 rounded-full border border-blue-100 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Admin Panel
          </span>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">İstifadəçilər</h1>
          <p className="text-gray-500 mt-1 text-sm">Bütün qeydiyyatdan keçmiş istifadəçilər</p>
        </div>

        {/* Stats + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm">
            <div className="p-2 rounded-xl bg-blue-50">
              <FiUsers className="text-blue-500 text-xl" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{users.length}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">İstifadəçi</p>
            </div>
          </div>

          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Ad, istifadəçi adı, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400 text-sm">Yüklənir...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <FiUsers className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">İstifadəçi tapılmadı</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left">
                    <th className="px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">#</th>
                    <th className="px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">İstifadəçi</th>
                    <th className="px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</th>
                    <th className="px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Rol</th>
                    <th className="px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Təsdiqlənib</th>
                    <th className="px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Qeydiyyat tarixi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((user, index) => (
                    <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 text-gray-400 font-medium">{index + 1}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {user.name[0]}{user.surname[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{user.name} {user.surname}</p>
                            <p className="text-xs text-gray-400">@{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{user.email}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${roleStyles[user.role] ?? "bg-gray-100 text-gray-500"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {user.isVerified ? (
                          <HiCheckCircle className="text-emerald-500 text-xl" />
                        ) : (
                          <HiXCircle className="text-red-400 text-xl" />
                        )}
                      </td>
                      <td className="px-5 py-4 text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString("az-AZ", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 text-right mt-3">{filtered.length} / {users.length} istifadəçi</p>
      </div>
    </div>
  );
};

export default Users;
