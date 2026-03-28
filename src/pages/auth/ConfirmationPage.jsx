import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { MdOutlineDone, MdErrorOutline } from "react-icons/md";

const ConfirmEmail = () => {
  const [status, setStatus] = useState("loading"); 
  const [message, setMessage] = useState("");
  const { token } = useParams();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token tapılmadı");
      return;
    }

    const confirm = async () => {
      try {
        const res = await api.get(`/api/auth/confirm-email/${token}`);
        setStatus("success");
        setMessage(res.data.message);
        toast.success(res.data.message);
      } catch (err) {
        const errMsg = err.response?.data?.message || "Xəta baş verdi";
        setStatus("error");
        setMessage(errMsg);
        toast.error(errMsg);
      }
    };

    confirm();
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 sm:p-10 md:p-14 rounded-lg shadow-md text-center max-w-md w-full">

        {status === "loading" && (
          <p className="text-gray-600 text-lg animate-pulse">
            Təsdiqlənir...
          </p>
        )}

        {status === "success" && (
          <div className="flex flex-col gap-6 items-center">
            <div className="bg-green-600 p-4 rounded-full">
              <MdOutlineDone className="text-white text-5xl" />
            </div>

            <div>
              <p className="text-xl font-semibold mb-2">
                {message}
              </p>

              <Link
                to="/login"
                className="text-blue-500 hover:underline"
              >
                Daxil ol
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col gap-6 items-center">
            <div className="bg-red-500 p-4 rounded-full">
              <MdErrorOutline className="text-white text-5xl" />
            </div>

            <div>
              <p className="text-xl font-semibold mb-2 text-red-500">
                {message}
              </p>

              <p className="text-gray-500 text-sm mb-4">
                Linkin vaxtı bitmiş və ya yanlışdır.
              </p>

              <Link
                to="/register"
                className="text-blue-500 hover:underline"
              >
                Yenidən qeydiyyatdan keç
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ConfirmEmail;