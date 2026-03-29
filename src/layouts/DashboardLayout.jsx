import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiUser, FiSettings } from "react-icons/fi";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-16 sm:w-20 md:w-64 bg-gray-100 p-4 border-r border-gray-300">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center md:flex-row md:items-center 
     px-3 py-2 rounded-md hover:bg-gray-200 ${
       isActive ? "bg-gray-300 font-bold" : ""
     }`
          }
        >
          <AiOutlineHome className="text-xl md:mr-2" />
          <span className="hidden md:inline">Ana səhifə</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center md:flex-row md:items-center 
     px-3 py-2 rounded-md hover:bg-gray-200 ${
       isActive ? "bg-gray-300 font-bold" : ""
     }`
          }
        >
          <FaRegUser className="text-xl md:mr-2" />
          <span className="hidden md:inline">Profil</span>
        </NavLink>

        <NavLink
          to="/my-account"
          className={({ isActive }) =>
            `flex flex-col items-center md:flex-row md:items-center 
     px-3 py-2 rounded-md hover:bg-gray-200 ${
       isActive ? "bg-gray-300 font-bold" : ""
     }`
          }
        >
          <FiUser className="text-xl md:mr-2" />
          <span className="hidden md:inline">Hesab</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center md:flex-row md:items-center 
     px-3 py-2 rounded-md hover:bg-gray-200 ${
       isActive ? "bg-gray-300 font-bold" : ""
     }`
          }
        >
          <FiSettings className="text-xl md:mr-2" />
          <span className="hidden md:inline">Tənzimləmələr</span>
        </NavLink>
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
