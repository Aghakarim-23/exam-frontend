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

  const getRank = (score) => {
    if (score < 100) return "Bürünc";
    if (score < 300) return "Gümüş";
    return "Qızıl";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("Xəta:", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <Spinner />;

  const rank = getRank(user.score || 0);

  const rankColor = {
    Bürünc: "bg-yellow-600",
    Gümüş: "bg-gray-400",
    Qızıl: "bg-yellow-400",
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 lg:p-12 flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3 text-gray-600">
          <p className="italic text-sm sm:text-base md:text-xl lg:text-2xl">
            Xoş gəlmişsiniz, {user.name}
          </p>
          <p className="italic text-sm sm:text-base md:text-xl lg:text-2xl">
            {dayjs().format("DD MMMM YYYY")}
          </p>
        </div>

        <div>
          {user.img ? (
            <img
              src={user.img}
              alt="profil"
              className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
              <FaUserAlt className="w-10 h-10" />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Sənin rütbən</h2>
          <p className="text-gray-500 text-sm">Score-na əsasən təyin olunur</p>
        </div>

        <div
          className={`${rankColor[rank]} text-white px-5 py-2 rounded-full font-semibold`}
        >
          {rank}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition">
          <h3 className="text-gray-500 text-sm">Ümumi score</h3>
          <p className="text-2xl font-bold mt-2">{user.score || 0}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition">
          <h3 className="text-gray-500 text-sm">İştirak etdiyi yarışlar</h3>
          <p className="text-2xl font-bold mt-2">{user.quizzes || 0}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition">
          <h3 className="text-gray-500 text-sm">Düzgün cavablar</h3>
          <p className="text-2xl font-bold mt-2">{user.correctAnswers || 0}</p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Son aktivlik</h3>

        <div className="flex justify-between border-b pb-3">
          <span>Son iştirak etdiyi yarış</span>
          <span className="font-medium">
            {user.lastQuiz || "Məlumat yoxdur"}
          </span>
        </div>

        <div className="flex justify-between pt-3">
          <span>Status</span>
          <span className="text-green-500 font-medium">Tamamlandı</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
