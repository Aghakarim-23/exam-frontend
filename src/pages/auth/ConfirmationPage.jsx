import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {status.includes("uğurla") ? "✅" : "❌"}{" "}
        {status.includes("uğurla") && (
          <p className="mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Daxil olmaq üçün buraya klik edin
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail;
