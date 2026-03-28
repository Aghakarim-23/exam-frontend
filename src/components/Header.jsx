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
      <header className="bg-white shadow ">
        <div className="flex justify-between items-center max-w-7xl mx-auto h-16 sm:h-18 md:h-20 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            My App
          </Link>
          <HiOutlineMenu className="h-6 w-6 text-gray-900 md:hidden" 
            onClick={() => setMenuOpen(!menuOpen)}
          
          />
        </div>

        {/*  mobile menu */}
        <div className={`md:hidden bg-white shadow fixed top-0 left-0 w-full h-screen z-50 p-4 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center max-w-7xl mx-auto h-16 sm:h-18 md:h-20 px-4 sm:px-6 lg:px-8">
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
            <div className="flex gap-3 px-4 py-2">
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
          <div className="text-center flex flex-col gap-4 ">
            <a
              href="#about"
              className="block px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 transition"
            >
              Haqqımızda
            </a>
            <a
              href="#services"
              className="block px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 transition"
            >
              Xidmətlər
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 transition"
            >
              Əlaqə
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
