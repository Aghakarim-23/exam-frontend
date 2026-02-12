import { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/questions");
        setQuestions(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-3">
        {loading ? (
          <Loader />
        ) : (
          <div className=" bg-white rounded-md shadow-lg max-w-md w-full py-16 px-6 ">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Questions
            </h2>
            <ul className="flex flex-col gap-3 h-96 overflow-y-scroll">
              {questions.map((question,index) => (
                <li
                  key={index}
                  className="border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition cursor-pointer"
                >
                  <p className="font-medium">{index + 1}. {question.questionText}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Questions;
