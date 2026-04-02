import { FaRegUser } from "react-icons/fa";
import { AiOutlineQuestionCircle, AiFillStar } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const ProgressAndSuccess = () => {
  const cards = [
    {
      title: "İstifadəçilər",
      desc: "Platformamızda aktiv istifadəçilərin ümumi sayı.",
      icon: <FaRegUser size={26} className="text-blue-500" />,
      value: 42,
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      title: "Ümumi suallar",
      desc: "İstifadəçilər tərəfindən yaradılmış sualların sayı.",
      icon: <AiOutlineQuestionCircle size={26} className="text-green-500" />,
      value: 245,
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    },
    {
      title: "Kateqoriyalar",
      desc: "Mövzulara görə bölünmüş kateqoriyalar.",
      icon: <MdCategory size={26} className="text-yellow-500" />,
      value: 12,
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      title: "Orta reytinq",
      desc: "İstifadəçilərin platformaya verdiyi orta qiymət.",
      icon: <AiFillStar size={26} className="text-orange-500" />,
      value: 4.5,
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="py-16 px-4 bg-gray-50" id="how-it-works">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Ümumi Performans və İrəliləyiş
        </h2>
        <p className="text-gray-600 mt-4">
          Platformamızın əsas göstəriciləri və istifadəçi aktivliyi haqqında
          ümumi məlumat.
        </p>
      </div>

      <div
        ref={ref}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto"
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl overflow-hidden shadow-md 
            hover:shadow-xl transition duration-300 hover:scale-105"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover hover:scale-110 transition duration-300"
              />
            </div>

            <div className="p-5 text-center flex flex-col items-center">
              <div className="bg-gray-100 p-3 rounded-full mb-3">
                {card.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {card.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2">{card.desc}</p>

              <p className="text-2xl font-bold mt-3 text-blue-600">
                {inView ? <CountUp end={card.value} duration={2} /> : 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgressAndSuccess;
