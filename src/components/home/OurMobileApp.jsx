import { FaApple, FaGooglePlay } from "react-icons/fa";

const OurMobileApp = () => {
  return (
    <section className="  min-h-[90vh] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col md:flex-row md:gap-10 items-center justify-center px-6 md:px-20 py-16 text-white relative overflow-hidden">
      
      <div className=" flex flex-col items-start mb-12 md:mb-0">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Bizim Mobil Tətbiq ilə Tanış Ol
        </h2>
        <p className="text-white text-sm md:text-base mb-6 max-w-md">
          İstədiyin zaman quizlərə qoşul, gündəlik bonuslar qazan və liderlər siyahısında yerini tut.
          Hər şey telefonunda bir klikdə!
        </p>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-black bg-opacity-70 hover:bg-black px-5 py-3 rounded-xl font-semibold transition">
            <FaApple /> App Store
          </button>
          <button className="flex items-center gap-2 bg-black bg-opacity-70 hover:bg-black px-5 py-3 rounded-xl font-semibold transition">
            <FaGooglePlay /> Google Play
          </button>
        </div>
      </div>

      <div className=" flex justify-center items-center">
        <div className="w-64 h-128 bg-gray-200 rounded-3xl shadow-xl flex items-center justify-center text-gray-500 text-xl text-center">
          Dizayn ekranı Mockup burada olacaq
        </div>
      </div>

      <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-200 opacity-30 rounded-full blur-3xl"></div>
    </section>
  );
};

export default OurMobileApp;