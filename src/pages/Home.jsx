import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [questions, setQuestions] = useState([]);

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

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-3">
        <div className="max-w-md w-full bg-white rounded-md shadow-md p-8">
          <h2 className="font-semibold sm:text-2xl text-center">
            {questions[0]?.questionText}
          </h2>
          <div className="my-4 flex flex-col gap-3">
            {questions[0]?.options.map((option, index) => (
              <button className="w-full rounded-md bg-gray-100 p-3 hover:bg-gray-200 transition cursor-pointer">
                {option}
              </button>
            ))}
          </div>
          <div>
            <button className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition">Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
