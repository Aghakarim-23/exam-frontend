const HowItWorks = () => {
  
  const steps = [
    {
      id: 1,
      title: "Oyuna daxil olun",
      desc: "Platformaya daxil olaraq öz hesabınızı yaradın və ya mövcud hesabınızla giriş edin. Bu, oyuna başlamaq üçün ilk addımdır.",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    },
    {
      id: 2,
      title: "Tapşırıqları yerinə yetirin",
      desc: "Verilən tapşırıqları tamamlayaraq təcrübə qazanın və bacarıqlarınızı inkişaf etdirin. Hər addım sizi daha da irəli aparacaq.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      id: 3,
      title: "Uğur qazanın",
      desc: "Topladığınız nəticələrə əsasən uğur əldə edin və liderlər siyahısında yerinizi tutun. Özünüzü digərləri ilə müqayisə edin.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Bu necə işləyir?
        </h2>
        <p className="text-gray-600 mt-4">
          Platformamızdan istifadə etmək çox sadədir. Sadəcə aşağıdakı addımları
          izləyərək qısa zamanda başlaya bilərsiniz.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:scale-105"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={step.img}
                alt={step.title}
                className="w-full h-full object-cover hover:scale-110 transition duration-300"
              />
            </div>

            <div className="p-5">
              <span className="text-sm text-blue-500 font-semibold">
                Addım {step.id}
              </span>
              <h3 className="text-lg font-bold mt-1 text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
