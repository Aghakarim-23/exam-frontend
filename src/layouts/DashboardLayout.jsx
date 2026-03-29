import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiUser, FiSettings } from "react-icons/fi";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-md hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-bold" : ""
            }`
          }
        >
          <AiOutlineHome className="mr-2" />
          Ana səhifə
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-md hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-bold" : ""
            }`
          }
        >
          <FaRegUser className="mr-2" />
          Profil
        </NavLink>

        <NavLink
          to="/my-account"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-md hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-bold" : ""
            }`
          }
        >
          <FiUser className="mr-2" />
          Hesab
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-md hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-bold" : ""
            }`
          }
        >
          <FiSettings className="mr-2" />
          Tənzimləmələr
        </NavLink>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
