import { useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";



const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/api/auth/forgot-password", { email });
            setMessage("Şifrə sıfırlama emaili göndərildi.");
        } catch (error) {
            console.error("Şifrə sıfırlama xətası:", error);
            setMessage("Şifrə sıfırlama xətası baş verdi.");
        } finally {
            setLoading(false);
        }
      }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 p-3 text-center">
      <div className=" bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Şifrəni unutmusunuz?
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Email adresinizi daxil edin və şifrənizi sıfırlamaq üçün təsdiq emaili
          alacaqsınız.
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
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200 cursor-pointer"
          onClick={handleSubmit}
        >
          {loading ? "Göndərilir..." : "Göndər"}
        </button>
      </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        <p>sas</p>
        <div>
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
