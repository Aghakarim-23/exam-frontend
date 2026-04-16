import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { FiUser } from "react-icons/fi";

const NAV_LINKS = [
  { href: "#quizs", label: "Quizlər" },
  { href: "#winners", label: "Qaliblər" },
  { href: "#how-it-works", label: "Necə işləyir?" },
  { href: "#contact", label: "Əlaqə" },
];

const Header = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Sticky header */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 tracking-tight"
          >
            <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-black">E</span>
            </span>
            ExamGen
          </Link>

          {/* Desktop nav */}
          {isHome && (
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                >
                  {label}
                </a>
              ))}
            </nav>
          )}

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              >
                <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUser className="w-4 h-4 text-blue-600" />
                </span>
                <span>{user.name}</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors duration-150"
                >
                  Daxil ol
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-150 shadow-sm"
                >
                  Qeydiyyat
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Menyunu aç"
          >
            <HiOutlineMenuAlt3 className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50"
          onClick={closeMenu}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 text-lg font-bold text-gray-900"
          >
            <span className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-black">E</span>
            </span>
            ExamGen
          </Link>
          <button
            onClick={closeMenu}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Menyunu bağla"
          >
            <IoCloseOutline className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
          {user && (
            <Link
              to="/profile"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors mb-2"
            >
              <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FiUser className="w-4 h-4 text-blue-600" />
              </span>
              <span>{user.name}</span>
            </Link>
          )}

          <p className="px-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Naviqasiya
          </p>

          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Drawer auth */}
        {!user && (
          <div className="px-4 py-5 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/register"
              onClick={closeMenu}
              className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              Qeydiyyat
            </Link>
            <Link
              to="/login"
              onClick={closeMenu}
              className="w-full text-center py-2.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Daxil ol
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
