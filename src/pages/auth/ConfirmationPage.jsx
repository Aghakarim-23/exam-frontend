import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdOutlineDone } from "react-icons/md";

const ConfirmEmail = () => {
  const [status, setStatus] = useState("Təsdiqlənir...");
  const { token } = useParams();

  useEffect(() => {
    if (!token) {
      setStatus("Token tapılmadı");
      return;
    }

    const confirm = async () => {
      try {
        const res = await api.get(`/api/auth/confirm-email/${token}`);
        setStatus(res.data.message);
        toast.success(res.data.message);
      } catch (err) {
        setStatus(err.response?.data?.message || "Xəta baş verdi");
        toast.error(err.response?.data?.message || "Xəta baş verdi");
      }
    };

    confirm();
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 sm:p-10 md:p-14 rounded-lg shadow-md text-center max-w-md w-full">
        {status.includes("uğurla") && (
          <div className="flex flex-col gap-6 justify-center items-center text-center">
            
            <div className="border border-gray-300 bg-green-600 p-3 sm:p-4 rounded-full">
              <MdOutlineDone className="text-white text-4xl sm:text-5xl md:text-6xl" />
            </div>

            <div>
              <p className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                Hesabınız uğurla təsdiqləndi
              </p>

              <Link
                to="/login"
                className="text-sm sm:text-base md:text-lg text-blue-500 hover:underline"
              >
                Daxil olmaq üçün buraya klik edin
              </Link>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail;