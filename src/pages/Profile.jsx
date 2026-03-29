import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Spinner from "../components/shared/Spinner";
import dayjs from "dayjs";
import "dayjs/locale/az";
import useAuth from "../hooks/useAuth";

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
        console.error("İstifadəçi məlumatları alınarkən xəta baş verdi:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 lg:p-12 flex justify-center">
      {user ? (
        <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Profil Məlumatları
          </h2>

          {user.img ? (
            <div className="flex justify-center mb-6">
              <img
                src={user.img}
                alt="Profil Şəkli"
                className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                N/A
              </div>
            </div>
          )}

          <div className="space-y-4 text-sm md:text-base lg:text-lg">
            <p>
              <strong>Ad:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>İstifadəçi adı:</strong> {user.username}
            </p>
            <p>
              <strong>Qeydiyyat tarixi:</strong>{" "}
              {dayjs(user.createdAt).format("DD MMMM YYYY")}
            </p>
          </div>

          <div className="w-full flex justify-center mt-6">
            <button
              className="rounded-lg cursor-pointer text-white bg-red-600 hover:bg-red-500 transition px-8 py-2 md:py-3"
              onClick={logout}
            >
              Çıxış
            </button>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Profile;