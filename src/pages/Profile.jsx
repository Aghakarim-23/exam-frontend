import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Spinner from "../components/shared/Spinner";
import dayjs from "dayjs";
import "dayjs/locale/az";
import { FiUser, FiStar, FiAward, FiCheckCircle, FiActivity, FiCalendar, FiZap } from "react-icons/fi";
import { MdOutlineQuiz } from "react-icons/md";

dayjs.locale("az");

const RANKS = [
  { label: "Bürünc", min: 0,   max: 99,   color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200",  bar: "bg-amber-400" },
  { label: "Gümüş", min: 100,  max: 299,  color: "text-slate-500",  bg: "bg-slate-100", border: "border-slate-300",  bar: "bg-slate-400" },
  { label: "Qızıl", min: 300,  max: 9999, color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-200", bar: "bg-yellow-400" },
];

const getRank = (score) =>
  RANKS.find((r) => score >= r.min && score <= r.max) ?? RANKS[0];

const getRankProgress = (score) => {
  if (score >= 300) return { pct: 100, next: null };
  if (score >= 100) return { pct: Math.round(((score - 100) / 200) * 100), next: "Qızıl", needed: 300 - score };
  return { pct: Math.round((score / 100) * 100), next: "Gümüş", needed: 100 - score };
};

const StatCard = ({ icon, label, value, accent }) => {
  const styles = {
    blue:    { wrap: "from-blue-50 to-blue-100/60 border-blue-100",    icon: "bg-blue-500",    val: "text-blue-700"    },
    purple:  { wrap: "from-purple-50 to-purple-100/60 border-purple-100", icon: "bg-purple-500",  val: "text-purple-700"  },
    emerald: { wrap: "from-emerald-50 to-emerald-100/60 border-emerald-100", icon: "bg-emerald-500", val: "text-emerald-700" },
  };
  const s = styles[accent] ?? styles.blue;
  return (
    <div className={`bg-linear-to-br ${s.wrap} border rounded-xl sm:rounded-2xl p-2 sm:p-5 flex flex-col gap-1.5 sm:gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}>
      <div className={`w-6 h-6 sm:w-10 sm:h-10 rounded-md sm:rounded-xl ${s.icon} flex items-center justify-center text-white text-sm sm:text-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-[9px] sm:text-xs text-gray-400 uppercase leading-tight mb-0.5">{label}</p>
        <p className={`text-base sm:text-3xl font-extrabold ${s.val}`}>{value}</p>
      </div>
    </div>
  );
};

const Profile = () => {
  const [user, setUser]       = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          api.get("/api/auth/me"),
          api.get("/api/results/me"),
        ]);
        setUser(uRes.data.user);
        setResults(rRes.data.results || []);
      } catch (e) {
        console.error("Xəta:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Spinner />;

  const totalScore   = results.reduce((s, r) => s + (r.score || 0), 0);
  const totalCorrect = results.reduce((s, r) => s + (r.answers?.filter((a) => a.isCorrect).length || 0), 0);
  const rank         = getRank(totalScore);
  const { pct, next, needed } = getRankProgress(totalScore);
  const recentResults = results.slice(0, 5);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50/30 to-slate-100">
      <div className="max-w-4xl mx-auto px-2 sm:px-6 py-3 sm:py-10 flex flex-col gap-2.5 sm:gap-5">

        {/* ── Hero card ── */}
        <div className="relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* top accent strip */}
          <div className="h-2 w-full bg-linear-to-r from-blue-500 via-purple-500 to-blue-400" />

          <div className="p-3 sm:p-7 flex flex-row items-center gap-2.5 sm:gap-6">
            {/* Avatar */}
            <div className="shrink-0">
              {user.img ? (
                <img
                  src={user.img}
                  alt="profil"
                  className="w-12 h-12 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl object-cover border-2 border-white shadow-md"
                />
              ) : (
                <div className="w-12 h-12 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
                  <FiUser className="text-white text-xl sm:text-4xl" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[9px] sm:text-xs font-semibold text-blue-400 uppercase tracking-wide mb-0.5">Profil</p>
              <h1 className="text-sm sm:text-2xl font-extrabold text-gray-900 truncate">{user.name}</h1>
              {user.email && (
                <p className="text-[10px] sm:text-sm text-gray-400 mt-0.5 truncate">{user.email}</p>
              )}
              <div className="flex items-center gap-1 mt-1 text-gray-400 text-[10px] sm:text-sm">
                <FiCalendar className="shrink-0 text-[10px] sm:text-base" />
                <span>{dayjs().format("DD MMM YYYY")}</span>
              </div>
            </div>

            {/* Rank badge */}
            <div className={`shrink-0 flex flex-col items-center gap-0.5 px-2 py-1.5 sm:px-5 sm:py-3 rounded-lg sm:rounded-2xl border-2 font-bold ${rank.bg} ${rank.border} ${rank.color}`}>
              <FiAward className="text-base sm:text-2xl" />
              <span className="text-[9px] sm:text-sm leading-none">{rank.label}</span>
            </div>
          </div>
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <StatCard icon={<FiStar />}         label="Ümumi xal"       value={totalScore}    accent="blue"    />
          <StatCard icon={<MdOutlineQuiz />}   label="İştirak sayı"    value={results.length} accent="purple"  />
          <StatCard icon={<FiCheckCircle />}   label="Düzgün cavab"    value={totalCorrect}  accent="emerald" />
        </div>

        {/* ── Rank progress ── */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-5">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="p-1 sm:p-1.5 rounded-md bg-yellow-50 shrink-0">
              <FiZap className="text-yellow-500 text-xs sm:text-base" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-800 text-[11px] sm:text-sm">Rütbə irəliləyişi</p>
              {next ? (
                <p className="text-[9px] sm:text-xs text-gray-400 truncate">{needed} xal → <span className="font-medium">{next}</span></p>
              ) : (
                <p className="text-[9px] sm:text-xs text-gray-400">Maks. rütbəyə çatdınız!</p>
              )}
            </div>
            <span className={`shrink-0 text-[9px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full border ${rank.bg} ${rank.border} ${rank.color}`}>
              {rank.label}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${rank.bar}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[10px] sm:text-xs text-gray-400">
            <span>{totalScore} xal</span>
            <span>{pct}%</span>
          </div>
        </div>

        {/* ── Recent results ── */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-5">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="p-1 sm:p-1.5 rounded-md bg-blue-50 shrink-0">
              <FiActivity className="text-blue-500 text-xs sm:text-base" />
            </div>
            <h3 className="font-semibold text-gray-800 text-[11px] sm:text-sm">Son aktivlik</h3>
          </div>

          {recentResults.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">Hələ heç bir quiz tamamlanmayıb</p>
          ) : (
            <div className="flex flex-col divide-y divide-gray-50">
              {recentResults.map((r, i) => {
                const correct = r.answers?.filter((a) => a.isCorrect).length ?? 0;
                const total   = r.answers?.length ?? 0;
                const pctScore = total > 0 ? Math.round((correct / total) * 100) : 0;
                const dotColor = pctScore >= 80 ? "bg-emerald-400" : pctScore >= 50 ? "bg-yellow-400" : "bg-red-400";
                return (
                  <div key={i} className="flex items-center justify-between py-2.5 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${dotColor}`} />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                          {r.quiz?.title || "Quiz"}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-400">
                          {dayjs(r.createdAt).format("DD MMMM YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs sm:text-sm font-bold text-gray-700">{correct}/{total}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">{pctScore}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
