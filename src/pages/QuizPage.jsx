/* import { useEffect, useState } from "react";
import QuizTimer from "../components/QuizTimer";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";


const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [startTime] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      try {
        const res = await api.get("/api/questions");
        setQuestions(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

 


 

  

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-3">
       {loading ? <Loader/> : (
         <div className="max-w-md w-full bg-white rounded-md shadow-md p-8">
          <div className="mb-4 ">
            <div className="flex justify-between">
              <p className="text-lg font-semibold bg-linear-to-tr from-blue-800 to bg-blue-300  bg-clip-text text-transparent">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
                <QuizTimer />
            </div>
            <p className="text-gray-700 text-center my-4 font-semibold">
              {questions[currentQuestionIndex]?.questionText}
            </p>
          </div>
          {
            <div className="my-4 flex flex-col gap-3">
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full rounded-md  p-3 hover:bg-gray-400 hover:text-white border border-zinc-500 transition cursor-pointer 
                ${selectedOptionIndex !== null && index === correctAnswerIndex ? "bg-green-500 text-white" : selectedOptionIndex !== null && index === selectedOptionIndex ? "bg-red-500 text-white" : "bg-gray-100"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          }
          <div>
            <button
              onClick={() => handleNextQuestion()}
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 active:bg-blue-800 transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
       )}
      </div>
    </>
  );
};

export default QuizPage;
 */


import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/quizzes/");
        setQuizzes(res.data.quizzes);
        console.log(res)
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Available Quizzes</h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : quizzes.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes found. Create one first!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 truncate">{quiz.title}</h2>
              <p className="text-gray-500 text-sm flex-1 line-clamp-3">{quiz.description}</p>
              <button
                onClick={() => navigate(`/quiz/${quiz._id}/create-question`)}
                className="mt-auto w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer text-sm font-medium"
              >
                Create Questions
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPage;