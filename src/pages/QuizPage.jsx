import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FiClock, FiTag, FiZap, FiBookOpen, FiAward } from "react-icons/fi";
import QuizSkeleton from "../components/home/QuizSkeleton";
import useAuth from "../hooks/useAuth";
const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) {
      navigate("/login")
    } 
  },[])

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/quizzes/");
        setQuizzes(res.data.quizzes);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      {/* ── HERO HEADER ─────────────────────────────────────── */}

      <div className="relative overflow-hidden border-b border-gray-200 bg-white px-6 py-14">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full bg-indigo-100 blur-[100px]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-semibold tracking-widest mb-5">
            <FiZap size={11} />
            Quiz Arenası
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Biliklərini Test Et
          </h1>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Bir quiz seç, vaxtı başlat və biliklərinin səviyyəsini yoxla.
          </p>

          {/* statistics row */}
          <div className="flex justify-center gap-8 mt-8">
            {[
              {
                icon: <FiBookOpen size={15} />,
                label: `${quizzes.length} Quiz`,
              },
              { icon: <FiAward size={15} />, label: "3 Çətinlik səviyyəsi" },
              { icon: <FiClock size={15} />, label: "Vaxtlı testlər" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-gray-400 text-sm"
              >
                <span className="text-indigo-500">{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <QuizSkeleton key={i} />
              ))}
          </div>
        ) : quizzes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
              <FiBookOpen className="text-gray-400" size={28} />
            </div>
            <p className="text-gray-500 text-base font-medium">
              Heç bir quiz tapılmadı.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Zəhmət olmasa, daha sonra yenidən cəhd edin.
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 text-sm mb-6">
              Hazırda sistemdə{" "}
              <span className="text-gray-700 font-medium">
                {quizzes.length}
              </span>{" "}
              quiz var
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {quizzes.map((quiz) => (
                <div
                  className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-300 hover:shadow-[0_8px_30px_-6px_rgba(99,102,241,0.18)] hover:-translate-y-0.5"
                  key={quiz._id}
                >
                  {/* top accent bar */}
                  <div className="h-0.75 w-full bg-linear-to-r from-indigo-500 via-violet-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex flex-col flex-1 p-6">
                    {/* header row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h2 className="text-base font-semibold text-gray-800 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {quiz.title}
                      </h2>
                    </div>

                    {/* description */}
                    <p className="text-sm text-gray-500 line-clamp-2 mb-5 leading-relaxed">
                      {quiz.description || "No description provided."}
                    </p>

                    {/* meta chips */}
                    <div className="flex flex-wrap gap-2 mt-auto mb-5">
                      {quiz.category && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 text-xs font-medium border border-gray-200">
                          <FiTag className="text-indigo-400" size={11} />
                          {quiz.category}
                        </span>
                      )}
                      {quiz.duration && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 text-xs font-medium border border-gray-200">
                          <FiClock className="text-sky-500" size={11} />
                          {Math.ceil(quiz.duration / 60)} min
                        </span>
                      )}
                      {quiz.questions?.length != null && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 text-xs font-medium border border-gray-200">
                          <FiBookOpen className="text-violet-500" size={11} />
                          {quiz.questions.length} Qs
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/quizzes/${quiz._id}/questions`}
                      className="w-full flex justify-center py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] shadow-sm shadow-indigo-200"
                    >
                      Start Quiz
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
