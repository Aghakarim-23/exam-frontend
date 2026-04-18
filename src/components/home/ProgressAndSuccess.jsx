import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdQuiz } from "react-icons/md";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import api from "../../api/axios";

const CARD_META = [
  {
    key: "userCount",
    title: "İstifadəçilər",
    desc: "Platformamızda aktiv istifadəçilərin ümumi sayı.",
    icon: <FaRegUser size={22} className="text-blue-500" />,
    iconBg: "bg-blue-50",
    suffix: "+",
    accent: "text-blue-500",
    border: "hover:border-blue-200",
    glow: "hover:shadow-blue-100",
  },
  {
    key: "questionCount",
    title: "Ümumi suallar",
    desc: "Platformamızda mövcud olan sualların sayı.",
    icon: <AiOutlineQuestionCircle size={22} className="text-green-500" />,
    iconBg: "bg-green-50",
    suffix: "+",
    accent: "text-green-500",
    border: "hover:border-green-200",
    glow: "hover:shadow-green-100",
  },
  {
    key: "quizCount",
    title: "Testlər",
    desc: "Platformada mövcud olan quizlərin ümumi sayı.",
    icon: <MdQuiz size={22} className="text-yellow-500" />,
    iconBg: "bg-yellow-50",
    suffix: "+",
    accent: "text-yellow-500",
    border: "hover:border-yellow-200",
    glow: "hover:shadow-yellow-100",
  },
];

const ProgressAndSuccess = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [stats, setStats] = useState({ userCount: 0, questionCount: 0, quizCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Stats fetch failed:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section id="how-it-works" className="bg-slate-50 py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-medium px-4 py-1.5 rounded-full border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Yenilənən statistika
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Ümumi <span className="text-blue-500">performans</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Platformamızın əsas göstəriciləri və istifadəçi aktivliyi haqqında ümumi məlumat.
          </p>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid gap-5 md:grid-cols-3">
          {CARD_META.map((card) => (
            <div
              key={card.key}
              className={`bg-white border border-gray-100 rounded-2xl p-7 shadow-sm
                transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]
                hover:shadow-xl ${card.border} ${card.glow}`}
            >
              <div className={`w-11 h-11 ${card.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                {card.icon}
              </div>

              <p className={`text-4xl font-bold ${card.accent} mb-1`}>
                {inView ? (
                  <CountUp end={stats[card.key]} duration={2} suffix={card.suffix} />
                ) : (
                  `0${card.suffix}`
                )}
              </p>

              <h3 className="font-semibold text-gray-800 text-base mb-1">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProgressAndSuccess;
