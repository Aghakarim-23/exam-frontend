import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const NAV_LINKS = [
    // { href: "#quizs", label: "Quizlər" },
    { href: "/", label: "Ana səhifə" },
    { href: "#winners", label: "Qaliblər" },
    { href: "#how-it-works", label: "Statistika" },
    { href: "#contact", label: "Əlaqə" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 ">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-white text-xl font-bold mb-3">QuizApp</h2>
          <p className="text-sm text-gray-400">
            Biliklərini yoxla, dostlarınla yarış və liderlər cədvəlində yüksəl
            🚀
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Sürətli Keçidlər</h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((link, index) => (
              <li className="hover:text-white cursor-pointer" key={index}>
                <Link to={`${link.href}`}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Kateqoriyalar</h3>
          <ul className="space-y-2 text-sm">
            <li>Ümumi bilik</li>
            <li>Elm</li>
            <li>Tarix</li>
            <li>İdman</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Bizi izlə</h3>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center h-16 items-center border-t border-gray-700 mt-10  text-center text-sm text-gray-500">
        © {new Date().getFullYear()} QuizApp. Bütün hüquqlar qorunur.
      </div>
    </footer>
  );
};

export default Footer;
