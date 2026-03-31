import { Link } from "react-router-dom";
import api from "../api/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaPen } from "react-icons/fa";

const MyAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/auth/me");
        setFormData({
          name: response.data.user.name,
          surname: response.data.user.surname,
          username: response.data.user.username,
          email: response.data.user.email,
        });
        console.log(response.data.user._id)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.patch("/api/auth/update-profile", formData);
      toast.success(
        response.data?.message || "Profil məlumatlarınız uğurla yeniləndi",
      );
      setFormData({
        name: response.data.user.name,
        surname: response.data.user.surname,
        username: response.data.user.username,
        email: response.data.user.email,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Profil məlumatlarını yeniləmək mümkün olmadı",
      );
      console.error(error);
    } finally {
      setLoading(false);
      setIsEditing(false)
    }
  };

  return (
    <>
      <div className=" w-full  h-screen flex justify-center items-center bg-gray-100 p-3">
        <div className="max-w-md md:max-w-xl w-full bg-white p-8 rounded-lg shadow-md relative">
          <div
            className="flex gap-3 justify-center items-center mb-12 cursor-pointer "
            onClick={() => setIsEditing(true)}
          >
            <span className="text-2xl  text-gray-700 hover:text-gray-500 transition">
              Redaktə et
            </span>
            <FaPen className="text-gray-700 hover:text-gray-500 transition" />
          </div>

          <form onSubmit={handleUpdate}>
            <div className="flex flex-col gap-4 ">
              <div className="md:flex gap-2">
                <div className="md:w-full">
                  <label
                    className={`block mb-1 text-sm font-medium text-gray-700 ${!isEditing ? "opacity-50" : ""}`}
                  >
                    Ad
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
                    placeholder="Adınızı daxil edin"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="md:w-full">
                  <label
                    className={`block mb-1 text-sm font-medium text-gray-700 ${!isEditing ? "opacity-50" : ""}`}
                  >
                    Soyad
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
                    placeholder="Soyadınızı daxil edin"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="md:flex gap-2">
                <div className="w-full">
                  <label
                    className={`block mb-1 text-sm font-medium text-gray-700 ${!isEditing ? "opacity-50" : ""}`}
                  >
                    İstifadəçi adı
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
                    placeholder="İstifadəçi adınızı daxil edin"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-1 text-sm font-medium text-gray-700 opacity-50">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed opacity-50"
                    placeholder="Emailinizi daxil edin"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
                disabled={!isEditing}
              >
                {loading ? "Hesabım yenilənir..." : "Yenilə "}
              </button>
              <Link
                to="/change-password"
                className="text-blue-500 hover:underline text-center"
              >
                Şifrəni dəyişmək üçün linkə daxil olun
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
