import { IoBookOutline } from "react-icons/io5";
import { TfiTimer } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="py-32 flex flex-col justify-center items-center">

        <div className="flex flex-col justify-center items-center text-center">
          <div className="bg-blue-200 p-5 rounded-full">
            <IoBookOutline className="text-6xl text-blue-600 " />
          </div>
          <h1 className="text-4xl font-semibold mt-4">Welcome to the Quiz App</h1>
          <h3 className="text-lg my-4">Test your knowledge with our interactive quizzes!</h3>
        </div>
        <div className="w-full p-4 flex flex-col gap-3 md:flex-row justify-center items-center">

           <div className="bg-blue-200 text-blue-800 max-w-[320px] text w-full flex flex-col gap-3 justify-center items-center rounded-md border border-zinc-600 p-3 shadow-xl">
              <IoBookOutline className="text-3xl"/>
              <p className="font-bold">10</p>
              <p>Questions</p>
            </div>

             <div className="bg-green-200 text-green-800 max-w-[320px] text w-full flex flex-col gap-3 justify-center items-center rounded-md border border-zinc-600 p-3 shadow-xl">
              <TfiTimer className="text-3xl"/>
              <p className="font-bold">5:00</p>
              <p>Minutes</p>
            </div>

        </div>

            <button 
              onClick={() => navigate("/quiz-page")}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 active:bg-blue-800 transition cursor-pointer mt-4">Start quiz</button>
      </div>
    </>
  )
}

export default Home