import React from "react";

const QuizWinners = () => {
  const winners = [
    {
      id: 1,
      name: "Aysel",
      score: 320,
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Murad",
      score: 280,
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Elvin",
      score: 250,
      img: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: 4,
      name: "Nigar",
      score: 210,
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 5,
      name: "Rauf",
      score: 190,
      img: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  const top3 = winners.slice(0, 3);
  const others = winners.slice(3);

  return (
    <section
      id="winners"
      className="py-16 px-4 bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Quiz qalibləri
        </h2>
        <p className="text-gray-600 mt-3">
          Ən yüksək nəticə göstərən istifadəçilər burada yer alır.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-12">
        
        <div className="bg-white rounded-xl shadow-lg p-5 text-center w-60 hover:scale-105 transition">
          <img
            src={top3[1].img}
            alt=""
            className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
          />
          <h3 className="font-semibold">{top3[1].name}</h3>
          <p className="text-gray-500 text-sm">{top3[1].score} xal</p>
          <div className="text-2xl mt-2">🥈</div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 text-center w-72 scale-105">
          <img
            src={top3[0].img}
            alt=""
            className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-yellow-400"
          />
          <h3 className="font-bold text-lg">{top3[0].name}</h3>
          <p className="text-gray-600">{top3[0].score} xal</p>
          <div className="text-3xl mt-2">🥇</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 text-center w-60 hover:scale-105 transition">
          <img
            src={top3[2].img}
            alt=""
            className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
          />
          <h3 className="font-semibold">{top3[2].name}</h3>
          <p className="text-gray-500 text-sm">{top3[2].score} xal</p>
          <div className="text-2xl mt-2">🥉</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md divide-y">
        {others.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-500">
                #{index + 4}
              </span>
              <img
                src={user.img}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{user.name}</span>
            </div>

            <span className="font-semibold text-blue-600">
              {user.score} xal
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuizWinners;