import { FaApple, FaGooglePlay, FaBolt, FaTrophy, FaBell } from "react-icons/fa";

const features = [
  { icon: <FaBolt className="text-blue-500 text-xl" />, label: "Sürətli quizlər" },
  { icon: <FaTrophy className="text-yellow-500 text-xl" />, label: "Liderboard" },
  { icon: <FaBell className="text-pink-500 text-xl" />, label: "Gündəlik bildiriş" },
];

const OurMobileApp = () => {
  return (
    <section className="bg-slate-50 py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* Left — text content */}
        <div className="flex-1 flex flex-col items-start">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-medium px-4 py-1.5 rounded-full border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Yaxında mövcud olacaq
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
            Hər şey cibinizdə —{" "}
            <span className="text-blue-500">mobil tətbiq</span>
          </h2>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md mb-8">
            İstədiyin zaman quizlərə qoşul, gündəlik bonuslar qazan və
            liderlər siyahısında yerini tut. Bir klikdə.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm text-sm text-gray-700 font-medium"
              >
                {f.icon}
                {f.label}
              </div>
            ))}
          </div>

          {/* Store buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-3 bg-gray-900 hover:bg-gray-700 active:scale-95 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all duration-200">
              <FaApple className="text-lg" />
              <span>
                <span className="block text-[10px] font-normal opacity-70 leading-none">Yüklə</span>
                App Store
              </span>
            </button>
            <button className="flex items-center gap-3 bg-gray-900 hover:bg-gray-700 active:scale-95 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all duration-200">
              <FaGooglePlay className="text-lg" />
              <span>
                <span className="block text-[10px] font-normal opacity-70 leading-none">Yüklə</span>
                Google Play
              </span>
            </button>
          </div>
        </div>

        {/* Right — phone mockup */}
        <div className="shrink-0 flex justify-center items-center relative">
          {/* Glow */}
          <div className="absolute w-64 h-64 bg-blue-200 opacity-30 rounded-full blur-3xl" />

          {/* Phone frame */}
          <div className="relative w-56 h-115 bg-white border-[6px] border-gray-800 rounded-[3rem] shadow-2xl flex flex-col overflow-hidden">
            {/* Status bar */}
            <div className="bg-gray-800 h-8 flex items-center justify-center">
              <div className="w-20 h-4 bg-gray-900 rounded-full" />
            </div>

            {/* Screen content */}
            <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center gap-5 p-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-md">
                <FaTrophy className="text-white text-xl" />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-800 text-base">Quiz App</p>
                <p className="text-gray-400 text-xs mt-1">Gündəlik yarışmalar</p>
              </div>

              {/* Mock score card */}
              <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-2">Bu günki nəticən</p>
                <p className="text-3xl font-bold text-blue-500">320 xal</p>
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-blue-400 rounded-full" />
                </div>
              </div>

              {/* Mock button */}
              <div className="w-full bg-blue-500 text-white text-xs font-semibold text-center py-3 rounded-xl shadow">
                Oyna →
              </div>
            </div>

            {/* Home indicator */}
            <div className="bg-white h-6 flex items-center justify-center">
              <div className="w-16 h-1 bg-gray-300 rounded-full" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurMobileApp;
