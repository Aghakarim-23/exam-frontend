import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (!formData.name || !formData.surname || !formData.username || !formData.email || !formData.password) {
      toast.error("Bütün xanaları doldurun");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/api/auth/register", formData);
      toast.success(response.data?.message || "Qeydiyyat uğurlu oldu. Emailinizi təsdiqləyin.");
      setFormData({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
      });
      setIsOpen(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Qeydiyyatdan keçmək mümkün olmadı");
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className=" w-full  h-screen flex justify-center items-center bg-gray-100 p-3">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md relative">
          <h2 className="text-2xl font-bold mb-6 text-center">Qeydiyyat</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Ad
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Adınızı daxil edin"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Soyad
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Soyadınızı daxil edin"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  İstifadəçi adı
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="İstifadəçi adınızı daxil edin"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Şifrə
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Şifrənizi daxil edin"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Qeydiyyat aparılır..." : "Qeydiyyatdan keçin"}
              </button>
            </div>
            <div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Hesabınız yoxdur?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Hesabınız var? Buradan daxil olun
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
