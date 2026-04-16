import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const Questions = () => {
  const { quizId } = useParams(); // burada quizId'ni aliriq
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]); // burada suallari saxlayiriq ve title burdan aliriq
  const [quizTitle, setQuizTitle] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];

  const [selected, setSelected] = useState(null);

  const [answers, setAnswers] = useState([]);

  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const optionLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/quizzes/${quizId}/questions`);
        setQuestions(response.data.questions);
        setQuizTitle(response.data.quizTitle);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [quizId]);

  useEffect(() => {
    if (loading) return;
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [loading]);

  const handleNextQuestion = () => {
    if (selected === null) return;

    const isCorrect = currentQuestion?.options?.[selected]?.isCorrect === true;

    const newAnswer = {
      questionId: currentQuestion._id,
      selected,
      isCorrect,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentIndex === questions.length - 1) {
      clearInterval(timerRef.current);
      const score = updatedAnswers.filter((a) => a.isCorrect).length;
      navigate("/results", {
        state: {
          totalQuestions: questions.length,
          score,
          timeUsed: elapsed,
          quizId,
          answers: updatedAnswers,
        },
      });
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            {questions ? quizTitle : "Questions"}
          </h1>
          {!loading && (
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col p-3">
            {currentQuestion && (
              <div className="bg-white shadow rounded-lg p-6 mb-4">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">
                  Sual {currentIndex + 1} / {questions.length}
                </h2>
                <p className="text-gray-700 mb-6">
                  {currentQuestion?.questionText}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuestion?.options?.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left px-4 py-3 mb-3 rounded-xl border transition-all duration-200
                          ${
                            selected === index
                              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-200 scale-[1.01]"
                              : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm"
                          }`}
                      onClick={() => setSelected(index)}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200
                            ${
                              selected === index
                                ? "bg-white/25 text-white"
                                : "bg-gray-100 text-gray-500"
                            }`}
                        >
                          {optionLabels[index]}
                        </span>
                        <span className="font-medium">{option?.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  className={`w-full px-6 py-2 rounded-lg text-white ${selected === null ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                  onClick={() => handleNextQuestion()}
                  disabled={selected === null}
                >
                  Növbəti
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
