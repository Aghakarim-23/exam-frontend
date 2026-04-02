const Contact = () => {
  
  return (
    <section
      id="contact"
      className="min-h-[90vh] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center px-6 py-16 relative text-white"
    >
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Bizimlə əlaqə
        </h2>
        <p className="text-gray-700 mb-8">
          Suallarınız və ya təklifləriniz varsa, aşağıdakı formu doldurun və biz sizə tezliklə cavab verəcəyik.
        </p>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Adınız"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Mesajınız"
            rows={5}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Göndər
          </button>
        </form>
      </div>

      <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-200 opacity-30 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Contact;