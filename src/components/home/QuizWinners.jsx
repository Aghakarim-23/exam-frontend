import { useEffect, useState } from "react";
import { FaTrophy, FaMedal } from "react-icons/fa";
import api from "../../api/axios";

const RANK_STYLES = [
  { iconColor: "text-yellow-400", ring: "ring-yellow-300", height: "h-32", podiumBg: "bg-yellow-50 border border-yellow-100", badgeBg: "bg-yellow-50 text-yellow-600" },
  { iconColor: "text-gray-400",   ring: "ring-gray-200",   height: "h-24", podiumBg: "bg-gray-50 border border-gray-100",   badgeBg: "bg-gray-100 text-gray-500" },
  { iconColor: "text-orange-400", ring: "ring-orange-200", height: "h-16", podiumBg: "bg-orange-50 border border-orange-100", badgeBg: "bg-orange-50 text-orange-500" },
];

const Avatar = ({ src, alt, className }) =>
  src ? (
    <img src={src} alt={alt} className={className} />
  ) : (
    <div className={`${className} bg-blue-100 flex items-center justify-center font-bold text-blue-500`}>
      {alt?.[0]?.toUpperCase()}
    </div>
  );

const QuizWinners = () => {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get("/api/results/leaderboard");
        setWinners(res.data.leaderboard);
      } catch (error) {
        console.error("Leaderboard fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const podium = winners.length >= 3
    ? [
        { ...winners[1], rank: 2, ...RANK_STYLES[1] },
        { ...winners[0], rank: 1, ...RANK_STYLES[0] },
        { ...winners[2], rank: 3, ...RANK_STYLES[2] },
      ]
    : [];

  return (
    <section id="winners" className="bg-white py-24 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 text-xs font-medium px-4 py-1.5 rounded-full border border-yellow-100 mb-6">
            <FaTrophy className="text-yellow-400 text-xs" />
            Bu həftənin qalibləri
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Liderler <span className="text-blue-500">siyahısı</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Ən yüksək nəticə göstərən istifadəçilər burada yer alır.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16 text-gray-400 text-sm">Yüklənir...</div>
        ) : winners.length === 0 ? (
          <div className="flex justify-center py-16 text-gray-400 text-sm">Hələ nəticə yoxdur.</div>
        ) : (
          <>
            {/* Podium */}
            {podium.length > 0 && (
              <div className="flex items-end justify-center gap-4 mb-10">
                {podium.map((w) => (
                  <div key={w.id} className="flex flex-col items-center gap-3">
                    <Avatar
                      src={w.avatar}
                      alt={w.name}
                      className={`w-14 h-14 rounded-full object-cover ring-2 ${w.ring}`}
                    />
                    <div className="text-center">
                      <p className="font-semibold text-gray-800 text-sm">{w.name}</p>
                      <p className="text-xs text-gray-400">{w.totalScore} xal</p>
                    </div>
                    <div className={`w-20 ${w.height} rounded-t-xl ${w.podiumBg} flex items-center justify-center`}>
                      <span className={`font-bold text-lg ${w.iconColor}`}>#{w.rank}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Leaderboard list */}
            <div className="bg-slate-50 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              {winners.map((user, idx) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between px-6 py-4 transition hover:bg-white
                    ${idx !== winners.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                      ${idx === 0 ? "bg-yellow-50 text-yellow-600" :
                        idx === 1 ? "bg-gray-100 text-gray-500" :
                        idx === 2 ? "bg-orange-50 text-orange-500" :
                        "bg-slate-100 text-gray-400"}`}>
                      {idx + 1}
                    </span>
                    <Avatar src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                    <span className="font-medium text-gray-800 text-sm">{user.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {idx < 3 && (
                      <FaMedal className={`text-sm
                        ${idx === 0 ? "text-yellow-400" : idx === 1 ? "text-gray-400" : "text-orange-400"}`}
                      />
                    )}
                    <span className="font-semibold text-blue-500 text-sm">{user.totalScore} xal</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default QuizWinners;
