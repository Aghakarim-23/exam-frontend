import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const Questions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [questionsRes, quizRes] = await Promise.all([
          api.get(`/api/questions?quizId=${id}`),
          api.get(`/api/quizzes/${id}`),
        ]);
        setQuestions(questionsRes.data);
        setQuiz(quizRes.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {quiz ? quiz.title : "Questions"}
          </h1>
          {quiz?.description && (
            <p className="text-gray-500 mt-2">{quiz.description}</p>
          )}
          <p className="text-sm text-gray-400 mt-1">
            {questions.length} question{questions.length !== 1 ? "s" : ""}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : questions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">No questions for this quiz yet.</p>
            <button
              onClick={() => navigate(`/quiz/${id}/create-question`)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Question
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {questions.map((q, index) => (
              <div key={q._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <p className="text-sm font-semibold text-blue-500 mb-2">Question {index + 1}</p>
                <p className="text-gray-800 font-medium text-base mb-4">{q.questionText}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((option, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm ${
                        i === q.correctAnswer
                          ? "border-green-400 bg-green-50 text-green-700 font-medium"
                          : "border-gray-200 bg-gray-50 text-gray-600"
                      }`}
                    >
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0 ${
                        i === q.correctAnswer
                          ? "bg-green-400 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}>
                        {optionLabels[i]}
                      </span>
                      {option.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={() => navigate(`/quiz/${id}/create-question`)}
              className="w-full py-3 rounded-2xl border-2 border-dashed border-blue-300 text-blue-500 hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              + Add Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
