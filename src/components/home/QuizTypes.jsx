import React from "react";
import { FaBrain, FaClock, FaQuestion, FaStar } from "react-icons/fa";

const QuizTypes = () => {
  const quizTypes = [
    {
      id: 1,
      title: "Bilik Quizləri",
      desc: "Ümumi bilik və faktlara əsaslanan suallar.",
      icon: <FaBrain className="text-blue-500 text-3xl" />,
    },
    {
      id: 2,
      title: "Zamanlı Quizlər",
      desc: "Sürət və düzgün cavab kombinasiyası ilə xal qazan.",
      icon: <FaClock className="text-purple-500 text-3xl" />,
    },
    {
      id: 3,
      title: "Çətin Quizlər",
      desc: "Ən çətin sualları cavablandır və lider ol.",
      icon: <FaQuestion className="text-red-500 text-3xl" />,
    },
    {
      id: 4,
      title: "Bonus Quizlər",
      desc: "Əlavə xallar və gündəlik bonuslar üçün.",
      icon: <FaStar className="text-yellow-500 text-3xl" />,
    },
  ];

  return (
    <section
      id="quizs"
      className="py-16 px-4 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Quiz növləri
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Hər gün fərqli növ quizlər oynayaraq biliklərini artır və bonuslar qazan.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {quizTypes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition hover:scale-105"
          >
            <div className="mb-4">{quiz.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{quiz.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{quiz.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuizTypes;