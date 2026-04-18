import { FaEnvelope, FaUser, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-24 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-medium px-4 py-1.5 rounded-full border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Dəstək
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Bizimlə <span className="text-blue-500">əlaqə</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Suallarınız və ya təklifləriniz varsa, formu doldurun — tezliklə cavab verəcəyik.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-slate-50 border border-gray-100 rounded-2xl p-8 shadow-sm">
          <form className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ad</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                <input
                  type="text"
                  placeholder="Adınızı daxil edin"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mesaj</label>
              <textarea
                placeholder="Mesajınızı yazın..."
                rows={5}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-blue-200 hover:shadow-lg transition-all duration-200 mt-1"
            >
              <FaPaperPlane className="text-sm" />
              Göndər
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
