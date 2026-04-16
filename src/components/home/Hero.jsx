import { useState } from "react";
import { FaGift, FaBrain, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <FaGift className="text-pink-500 text-3xl" />,
    title: "Gündəlik bonus",
    desc: "Hər gün daxil ol və əlavə xallar qazan.",
    accent: "pink",
    bg: "hover:border-pink-300",
    glow: "hover:shadow-pink-100",
  },
  {
    icon: <FaBrain className="text-blue-500 text-3xl" />,
    title: "Yeni quizlər",
    desc: "Hər gün yenilənən suallar ilə biliklərini yoxla.",
    accent: "blue",
    bg: "hover:border-blue-300",
    glow: "hover:shadow-blue-100",
  },
  {
    icon: <FaTrophy className="text-yellow-500 text-3xl" />,
    title: "Qalib ol",
    desc: "Ən yüksək nəticəni əldə et və liderlərə qoşul.",
    accent: "yellow",
    bg: "hover:border-yellow-300",
    glow: "hover:shadow-yellow-100",
  },
];

const FeatureCard = ({ icon, title, desc, bg, glow }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative bg-white border border-gray-100 rounded-2xl p-7 cursor-default
        transition-all duration-300 ease-out
        ${bg} ${glow}
        hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
        shadow-sm`}
    >
      {/* top accent line */}
      <div
        className={`absolute top-0 left-0 h-1 rounded-t-2xl w-full transition-all duration-300
          ${hovered ? "opacity-100" : "opacity-0"}
          bg-linear-to-r from-transparent via-current to-transparent`}
        style={{ color: "inherit" }}
      />

      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-gray-50">{icon}</div>
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="bg-slate-50 min-h-[90vh] flex flex-col items-center justify-center px-4 py-24">

      {/* badge */}
      <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-medium px-4 py-1.5 rounded-full border border-blue-100 mb-8">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        Hər gün yenilənir
      </span>

      {/* headline */}
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight text-center tracking-tight">
        Gündəlik quizlər <br />
        <span className="text-blue-500">və bonuslar</span>
      </h1>

      {/* subtext */}
      <p className="mt-5 text-gray-500 max-w-lg mx-auto text-sm md:text-base text-center leading-relaxed">
        Hər gün yeni quizlərə qoşul, biliklərini artır və bonuslar qazan.
        Özünü sına və liderlər siyahısında yerini tut.
      </p>

      {/* CTA */}
      <div className="mt-10 flex items-center gap-4 flex-wrap justify-center">
        <Link
          to="/quiz-page"
          className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-8 py-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-blue-200 hover:shadow-lg transition-all duration-200"
        >
          Bu gün oyna →
        </Link>
        <Link
          to="/leaderboard"
          className="text-gray-500 hover:text-gray-800 text-sm font-medium border border-gray-200 hover:border-gray-300 px-6 py-3 rounded-xl transition-all duration-200 bg-white hover:bg-gray-50"
        >
          Liderbordu gör
        </Link>
      </div>

      {/* cards */}
      <div className="mt-20 grid gap-5 md:grid-cols-3 max-w-4xl mx-auto w-full">
        {features.map((item, idx) => (
          <FeatureCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
