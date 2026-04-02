import { FaGift, FaBrain, FaTrophy } from "react-icons/fa";

const Hero = () => {
  const features = [
    {
      icon: <FaGift className="text-pink-500 text-2xl" />,
      title: "Gündəlik bonus",
      desc: "Hər gün daxil ol və əlavə xallar qazan.",
    },
    {
      icon: <FaBrain className="text-blue-500 text-2xl" />,
      title: "Yeni quizlər",
      desc: "Hər gün yenilənən suallar ilə biliklərini yoxla.",
    },
    {
      icon: <FaTrophy className="text-yellow-500 text-2xl" />,
      title: "Qalib ol",
      desc: "Ən yüksək nəticəni əldə et və liderlərə qoşul.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-20 px-4 text-center">
      
      {/* TITLE */}
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 max-w-3xl mx-auto leading-tight">
        Gündəlik quizlər və gündəlik bonuslar 🎯
      </h1>

      {/* DESCRIPTION */}
      <p className="mt-6 text-gray-600 max-w-xl mx-auto text-sm md:text-base">
        Hər gün yeni quizlərə qoşul, biliklərini artır və bonuslar qazan.
        Özünü sına və liderlər siyahısında yerini tut.
      </p>

      {/* BUTTON */}
      <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition">
        Bu gün oyna
      </button>

      {/* CARDS */}
      <div className="mt-16 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition hover:scale-105"
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="font-semibold text-lg text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;