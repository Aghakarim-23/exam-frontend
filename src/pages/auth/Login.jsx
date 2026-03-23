import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";


const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Email və şifrəni daxil edin");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/api/auth/login", formData);
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Daxil olmaq mümkün olmadı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gray-100 p-3">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Daxil ol</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Emailinizi daxil edin"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative ">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Şifrə
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Şifrənizi daxil edin"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute top-9 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

              </div>
              <Link to="/forgot-password" className="text-sm text-right text-blue-500 hover:underline">
                Şifrəni unutmusunuz?
              </Link>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Daxil olunur..." : "Daxil ol"}
              </button>
            </div>
            <div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Hesabınız yoxdur?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Qeydiyyatdan keçin
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
