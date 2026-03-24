import { useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/auth/request-password-reset", { email });
      toast.success("Şifrənizi sıfırlamaq üçün siz email göndərildi");
      setEmail("");
    } catch (error) {
      console.error("Şifrə sıfırlama xətası:", error);
      toast.error("Şifrə sıfırlama xətası baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 p-3 text-center">
      <div className=" bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Şifrəni unutmusunuz?
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Email adresinizi daxil edin və şifrənizi sıfırlamaq üçün təsdiq
            emaili alacaqsınız.
          </p>
          <div className="w-full">
            <input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email adresinizi daxil edin"
              className="border rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200 cursor-pointer"
          >
            {loading ? "Göndərilir..." : "Göndər"}
          </button>
        </form>
        <div className="my-4">
          <Link to="/login" className="text-gray-500 hover:underline">
            <RiArrowLeftSLine className="inline-block mr-1" />
            Girişə qayıtmaq üçün buraya klik edin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
