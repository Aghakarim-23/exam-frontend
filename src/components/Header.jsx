import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { GrClose } from "react-icons/gr";
import { useState } from "react";


const Header = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white flex justify-between items-center">
        <div className="w-full md:w-fit flex justify-between md:justify-center items-center  h-16 sm:h-18 md:h-20 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            My App
          </Link>
          <HiOutlineMenu className="h-6 w-6 text-gray-900 md:hidden" 
            onClick={() => setMenuOpen(!menuOpen)}
          
          />
        </div>

        {/*  mobile menu */}
        <div className={`md:hidden bg-white shadow fixed top-0 left-0 w-full h-screen z-50  transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex  justify-between items-center max-w-7xl mx-auto h-16 sm:h-18 md:h-20 px-4 sm:px-6 lg:px-8 border-b border-gray-300">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              My App
            </Link>
            <GrClose className="h-6 w-6 text-gray-900" 
              onClick={() => setMenuOpen(!menuOpen)}
            
            />


          </div>
          {user ? (
            <Link
              to="/profile"
              className="block px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 transition text-center mb-2"
            >
              Profil
            </Link>
          ) : (
            <div className="flex gap-3 px-4 py-2 mt-6">
              <Link
                to="/login"
                className="flex-1 text-center px-4 py-2 rounded-md font-medium text-white bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
              >
                Daxil ol
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center px-4 py-2 rounded-md font-medium text-blue-700 bg-blue-100 active:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
              >
                Qeydiyyat
              </Link>
            </div>
          )}
          <div className="text-center flex flex-col gap-4 mt-6">
            <a
              href="#quizs"
              className="block px-4 py-4 text-gray-800 border-b border-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Quizlər
            </a>
            <a
              href="#winners"
              className="block px-4 py-4 text-gray-800 border-b border-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Qaliblər
            </a>
            <a
              href="#how-it-works"
              className="block px-4 py-4 text-gray-800 border-b border-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Necə işləyir ?
            </a>
            <a
              href="#contact"
              className="block px-4 py-4 text-gray-800 border-b border-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Əlaqə
            </a>
          </div>
        </div>

   
        {/* desktop menu */}
        <nav className="hidden md:flex gap-4 px-4">
          <a href="#quizs" className="text-gray-700 hover:text-blue-600">
            Quizlər
          </a>
          <a href="#winners" className="text-gray-700 hover:text-blue-600">
            Qaliblər
          </a>
          <a href="#how-it-works" className="text-gray-700 hover:text-blue-600">
            Necə işləyir ?
          </a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600">
            Əlaqə
          </a>
        </nav>

        <div className="hidden md:flex gap-4">
          {user ? (
            <Link
              to="/profile"
              className="px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 transition"
            >
              {user.name}
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md font-medium text-white bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
              >
                Daxil ol
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md font-medium text-blue-700 bg-blue-100 active:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
              >
                Qeydiyyat
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
