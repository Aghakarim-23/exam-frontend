import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizTimer from "../components/QuizTimer";
import Loader from "../components/Loader";
import api from "../api/axios";

const Topic = () => {
  const { slug } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/questions/${slug}`);
        setQuestions(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleOptionSelect = async (index) => {
    setSelectedAnswer(index);
    setIsAnswered(true);

    try {
      const res = await api.post("/api/questions/check", {
        questionId: questions[currentQuestionIndex]._id,
        selectedAnswer: index,
      });

      const correct = res.data.correctAnswerIndex;
      setCorrectAnswer(correct);

      if (index === correct) setScore((prev) => prev + 1);

      
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextQuestion = async () => {
    const totalQuestions = questions.length;
    const endTime = Date.now();
    const timeUsed = Math.floor((endTime - startTime) / 1000);

    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setIsAnswered(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/results", {
        state: {
          score,
          totalQuestions: questions.length,
          timeUsed: Math.floor((Date.now() - startTime) / 1000),
        },
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-3">
        {loading ? (
          <Loader />
        ) : (
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
                {questions[currentQuestionIndex]?.options.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                      className={`w-full rounded-md  p-3 hover:bg-gray-400 hover:text-white border border-zinc-500 transition cursor-pointer 
                        ${selectedAnswer !== null && index === correctAnswer ? "bg-green-500 text-white" : index === selectedAnswer ? "bg-red-500 text-white" : ""}`}
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
            }
            <div>
              <button
                onClick={() => handleNextQuestion()}
                className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 active:bg-blue-800 transition cursor-pointer disabled:bg-gray-600`}
                disabled={!isAnswered}
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

export default Topic;
