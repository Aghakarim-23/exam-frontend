import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Spinner from "../components/shared/Spinner";
import dayjs from "dayjs";
import "dayjs/locale/az";
import useAuth from "../hooks/useAuth";
import { FiUser, FiStar, FiAward, FiCheckCircle, FiActivity, FiCalendar } from "react-icons/fi";
import { MdOutlineQuiz } from "react-icons/md";

dayjs.locale("az");

const getRank = (score) => {
  if (score < 100) return { label: "Bürünc", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" };
  if (score < 300) return { label: "Gümüş", color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-200" };
  return { label: "Qızıl", color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-200" };
};

const StatCard = ({ icon, label, value, accent }) => {
  const accents = {
    blue: { icon: "bg-blue-50 text-blue-500", value: "text-blue-600" },
    purple: { icon: "bg-purple-50 text-purple-500", value: "text-purple-600" },
    emerald: { icon: "bg-emerald-50 text-emerald-500", value: "text-emerald-600" },
  };
  const style = accents[accent] ?? accents.blue;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${style.icon}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
        <p className={`text-2xl font-bold ${style.value}`}>{value}</p>
      </div>
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, resultsRes] = await Promise.all([
          api.get("/api/auth/me"),
          api.get("/api/results/me"),
        ]);
        setUser(userRes.data.user);
        setResults(resultsRes.data.results || []);
      } catch (error) {
        console.error("Xəta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  const totalScore = results.reduce((sum, r) => sum + (r.score || 0), 0);
  const totalCorrect = results.reduce(
    (sum, r) => sum + (r.answers?.filter((a) => a.isCorrect).length || 0),
    0
  );
  const lastResult = results[0];
  const lastQuizLabel = lastResult
    ? `${lastResult.quiz?.title || "Quiz"} — ${dayjs(lastResult.createdAt).format("DD MMMM YYYY")}`
    : null;

  const rank = getRank(totalScore);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Profile header card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-5">
          {/* Avatar */}
          <div className="shrink-0">
            {user.img ? (
              <img
                src={user.img}
                alt="profil"
                className="w-20 h-20 rounded-2xl object-cover border border-gray-100 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <FiUser className="text-blue-400 text-3xl" />
              </div>
            )}
          </div>

          {/* Name & date */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Profil</p>
            <h1 className="text-xl font-bold text-gray-900 truncate">{user.name}</h1>
            <div className="flex items-center gap-1.5 mt-1.5 text-gray-400 text-sm">
              <FiCalendar className="text-base shrink-0" />
              <span>{dayjs().format("DD MMMM YYYY")}</span>
            </div>
          </div>

          {/* Rank badge */}
          <div className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold text-sm ${rank.bg} ${rank.border} ${rank.color}`}>
            <FiAward className="text-base" />
            {rank.label}
          </div>
        </div>

        {/* Rank info */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-yellow-50">
            <FiStar className="text-yellow-500 text-xl" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">Sənin rütbən</p>
            <p className="text-gray-400 text-xs mt-0.5">Toplam {totalScore} xal əsasında</p>
          </div>
          <div className="ml-auto">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${rank.bg} ${rank.border} ${rank.color}`}>
              {rank.label}
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<FiStar className="text-xl" />}
            label="Ümumi xallarım"
            value={totalScore}
            accent="blue"
          />
          <StatCard
            icon={<MdOutlineQuiz className="text-xl" />}
            label="İştirak"
            value={results.length}
            accent="purple"
          />
          <StatCard
            icon={<FiCheckCircle className="text-xl" />}
            label="Düzgün cavablar"
            value={totalCorrect}
            accent="emerald"
          />
        </div>

        {/* Recent activity */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 rounded-lg bg-blue-50">
              <FiActivity className="text-blue-500 text-base" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Son aktivlik</h3>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <span className="text-sm text-gray-500">Son yarış</span>
            <span className="text-sm font-medium text-gray-800">
              {lastQuizLabel || "Məlumat yoxdur"}
            </span>
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="text-sm text-gray-500">Status</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Tamamlandı
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
