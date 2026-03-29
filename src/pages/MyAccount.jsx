import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Spinner from "../components/shared/Spinner";
import useAuth from "../hooks/useAuth";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("İstifadəçi məlumatları alınarkən xəta baş verdi:", error);
      }
    };
    fetchUser();
  }, []);

  const handleDeleteAccount = async () => {
    if (!confirm("Hesabınızı silmək istədiyinizə əminsiniz?")) return;

    try {
      await api.delete("/api/auth/delete-me"); 
      logout(); 
    } catch (error) {
      console.error("Hesab silinərkən xəta baş verdi:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 flex justify-center">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center">Hesabım</h2>

          <div className="space-y-2">
            <p><strong>Ad:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>İstifadəçi adı:</strong> {user.username}</p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="rounded-lg bg-red-600 hover:bg-red-500 text-white px-6 py-2 transition"
              onClick={logout}
            >
              Çıxış
            </button>

            <button
              className="rounded-lg bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 transition"
              onClick={handleDeleteAccount}
            >
              Hesabı sil
            </button>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MyAccount;