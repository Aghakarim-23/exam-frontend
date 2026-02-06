import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/questions");
        setQuestions(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handleChangeQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-3">
        <div className="max-w-md w-full bg-white rounded-md shadow-md p-8">
          <div className="mb-4 text-center">
            <p className="text-lg font-semibold">Question {currentQuestionIndex + 1}</p>
            <p className="text-gray-700">{questions[currentQuestionIndex]?.questionText}</p>
          </div>
        {  <div className="my-4 flex flex-col gap-3">
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <button className="w-full rounded-md bg-gray-100 p-3 hover:bg-gray-400 border border-zinc-500 transition cursor-pointer">
                {option}
              </button>
            ))}
          </div>}
          <div>
            <button 
            onClick={() => handleChangeQuestion()}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 active:bg-blue-800 transition cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
