import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Spinner from "../components/shared/Spinner";
import dayjs from "dayjs";
import "dayjs/locale/az";
import useAuth from "../hooks/useAuth";
import { FaUserAlt } from "react-icons/fa";

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
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 lg:p-12 flex flex-col gap-10">
      <div className="flex justify-between items-center ">
        <div className="flex flex-col gap-3 md:text-2xl text-gray-600">
          <p className="italic text-sm sm:text-base md:text-xl lg:text-2xl">
            Xoş gəlmişsiniz, {user && user.name}
          </p>
          <p className="italic text-sm sm:text-base md:text-xl lg:text-2xl">
            {dayjs().format("DD MMMM YYYY")}
          </p>
        </div>
        <div className=" flex justify-center items-center">
          {user && user.img ? (
            <div className="flex justify-center mb-6">
              <img
                src={user.img}
                alt="Default profil"
                className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center  ">
              <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                <FaUserAlt className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              </div>
            </div>
          )}
        </div>
      </div>
      {user ? (
        <div>
          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-52 bg-white shadow-lg rounded-lg flex items-center justify-center">
                {/* Kart 1 */}
              </div>
              <div className="h-52 bg-white shadow-lg rounded-lg flex items-center justify-center">
                {/* Kart 2 */}
              </div>
              <div className="h-52 bg-white shadow-lg rounded-lg flex items-center justify-center">
                {/* Kart 3 */}
              </div>

              <div className="col-span-1 md:col-span-3 h-40 bg-white shadow-lg rounded-lg flex items-center justify-center">
                {/* Kart 4 */}
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Profile;
