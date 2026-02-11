import { useEffect, useState } from "react";
import QuizTimer from "../components/QuizTimer";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
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
    getData();
  }, []);

  const handleChangeQuestion = () => {
    const totalQuestions = questions.length;
    const endTime = Date.now();
    const timeUsed = Math.floor((endTime - startTime) / 1000); 

    if (selectedOptionIndex === Number(questions[currentQuestionIndex]?.correctAnswer)) {
      setScore(prevScore => prevScore + 1);
    }

    if(currentQuestionIndex === questions.length - 1) {
      navigate("/results", {state: {score: score + (selectedOptionIndex === Number(questions[currentQuestionIndex]?.correctAnswer) ? 1 : 0), totalQuestions: totalQuestions, timeUsed: timeUsed}});
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
    }
  };

  const handleOptionSelect = (index) => {
    setSelectedOptionIndex(index);
  };

  const correctAnswerIndex = Number(
    questions[currentQuestionIndex]?.correctAnswer,
  );

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
              onClick={() => handleChangeQuestion()}
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

export default Home;
