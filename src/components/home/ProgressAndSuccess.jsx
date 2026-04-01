import { FaRegUser } from "react-icons/fa";
import { AiOutlineQuestionCircle, AiFillStar } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const ProgressAndSuccess = () => {
  const cards = [
    {
      title: "İstifadəçilər",
      desc: "Üzvlər və istifadəçi statistikaları",
      icon: <FaRegUser size={30} className="text-blue-500" />,
      bg: "bg-blue-100",
      value: 42,
    },
    {
      title: "Ümumi suallar",
      desc: "Tez-tez verilən suallar",
      icon: <AiOutlineQuestionCircle size={30} className="text-green-500" />,
      bg: "bg-green-100",
      value: 245,
    },
    {
      title: "Kateqoriyalar",
      desc: "Bölmələr və mövzular",
      icon: <MdCategory size={30} className="text-yellow-500" />,
      bg: "bg-yellow-100",
      value: 12,
    },
    {
      title: "Orta reytinq",
      desc: "Orta istifadəçi qiymətləndirilməsi",
      icon: <AiFillStar size={30} className="text-orange-500" />,
      bg: "bg-orange-100",
      value: 4.5,
    },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 p-6 bg-gradient-to-r from-blue-400 via-red-300 to-gray-400">
      <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold  text-center my-8">
        Ümumi Performans və İrəliləyiş
      </h2>

      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl"
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`${card.bg} rounded-lg shadow-lg p-6 flex flex-col items-center text-center mt-6
             transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
          >
            <div className="mb-4">{card.icon}</div>
            <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
            <p className="text-gray-600 text-sm">{card.desc}</p>
            <p className="text-2xl font-bold mt-2">
              {inView ? <CountUp end={card.value} duration={2} /> : 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressAndSuccess;
