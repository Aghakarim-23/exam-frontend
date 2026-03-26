import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Spinner from "../components/shared/Spinner";
import dayjs from "dayjs";
import "dayjs/locale/az";
import { useAuth } from "../hooks/useAuth";

dayjs.locale("az");

const Profile = () => {
  const [user, setUser] = useState(null);


  const { logout } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.error(
          "İstifadəçi məlumatları alınarkən xəta baş verdi:",
          error,
        );
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-3">
        {user ? (
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Profil Məlumatları
            </h2>
            {user && user.img ? (
              <div className="flex justify-center mb-6">
                <img
                  src={user.img}
                  alt="Profil Şəkli"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                  N/A
                </div>
              </div>
            )}
            {user ? (
              <div className="space-y-4">
                <p>
                  <strong>Ad:</strong> {user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>İstifadəçi adı:</strong> {user?.username}
                </p>
                <p>
                  <strong>Qeydiyyat tarixi:</strong> {dayjs(user?.createdAt).format("DD MMMM YYYY")}
                </p>
                <div className="w-full flex justify-center mt-6">
                  <button
                    className="rounded-lg cursor-pointer text-white bg-red-600 hover:bg-red-500 transition px-8 py-1"
                    onClick={logout}
                  >
                    Çıxış 
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Yüklənir...</p>
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Profile;
