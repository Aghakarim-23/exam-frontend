import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Settings = () => {
  const { logout } = useAuth();



  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Tənzimləmələr</h2>

        <div className="flex flex-col gap-4 justify-center mt-4">
          <Link
            to="/change-password"
            className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 transition cursor-pointer flex justify-center "
          >
            Şifrəni dəyişmək
          </Link>

          <button
            className="rounded-lg bg-red-600 hover:bg-red-500 text-white px-6 py-2 transition cursor-pointer "
            onClick={logout}
          >
            Çıxış et
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
