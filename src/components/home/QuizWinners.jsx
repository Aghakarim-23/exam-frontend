import { FaTrophy, FaMedal } from "react-icons/fa";

const winners = [
  { id: 1, name: "Aysel",  score: 320, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Murad",  score: 280, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Elvin",  score: 250, img: "https://randomuser.me/api/portraits/men/12.jpg" },
  { id: 4, name: "Nigar",  score: 210, img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 5, name: "Rauf",   score: 190, img: "https://randomuser.me/api/portraits/men/75.jpg" },
];

const podium = [
  { ...winners[1], rank: 2, height: "h-24", iconColor: "text-gray-400",  ring: "ring-gray-200",  badge: "bg-gray-100 text-gray-500" },
  { ...winners[0], rank: 1, height: "h-32", iconColor: "text-yellow-400", ring: "ring-yellow-300", badge: "bg-yellow-50 text-yellow-600" },
  { ...winners[2], rank: 3, height: "h-16", iconColor: "text-orange-400", ring: "ring-orange-200", badge: "bg-orange-50 text-orange-500" },
];

const QuizWinners = () => {
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

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 mb-10">
          {podium.map((w) => (
            <div key={w.id} className="flex flex-col items-center gap-3">
              <img
                src={w.img}
                alt={w.name}
                className={`w-14 h-14 rounded-full object-cover ring-2 ${w.ring}`}
              />
              <div className="text-center">
                <p className="font-semibold text-gray-800 text-sm">{w.name}</p>
                <p className="text-xs text-gray-400">{w.score} xal</p>
              </div>
              <div className={`w-20 ${w.height} rounded-t-xl ${
                w.rank === 1 ? "bg-yellow-50 border border-yellow-100" :
                w.rank === 2 ? "bg-gray-50 border border-gray-100" :
                "bg-orange-50 border border-orange-100"
              } flex items-center justify-center`}>
                <span className={`font-bold text-lg ${w.iconColor}`}>#{w.rank}</span>
              </div>
            </div>
          ))}
        </div>

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
                <img src={user.img} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                <span className="font-medium text-gray-800 text-sm">{user.name}</span>
              </div>

              <div className="flex items-center gap-2">
                {idx < 3 && (
                  <FaMedal className={`text-sm
                    ${idx === 0 ? "text-yellow-400" : idx === 1 ? "text-gray-400" : "text-orange-400"}`}
                  />
                )}
                <span className="font-semibold text-blue-500 text-sm">{user.score} xal</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default QuizWinners;
