import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useAuth()

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Tənzimləmələr</h2>

        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <button
            onClick={handleToggleDarkMode}
            className={`px-4 py-2 rounded ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
            } transition`}
          >
            {darkMode ? "On" : "Off"}
          </button>
        </div>

        <div className="flex flex-col gap-4 justify-center mt-4">
          <button className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 transition">
            Şifrəni dəyiş
          </button>
          <button 
            className="rounded-lg bg-red-600 hover:bg-red-500 text-white px-6 py-2 transition"
            onClick={logout}>
            Çıxış et
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;