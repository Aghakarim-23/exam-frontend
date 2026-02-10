import React from "react";
import { TfiCup, TfiTimer } from "react-icons/tfi";
import { GoGoal } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const totalQuestions = state?.totalQuestions || 0;
    const score = state?.score || 0;
    const timeUsed = state?.timeUsed || 0;

     const minutes = Math.floor(timeUsed / 60);
     const seconds = timeUsed % 60;
    
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center bg-gray-100 p-3 md:p-6">

      <div className="bg-white max-w-md w-full rounded-md p-6 md:p-8 shadow-md">
          <div className="flex flex-col gap-4 my-3 justify-center items-center">
            <TfiCup className="text-6xl text-yellow-400"/>
            <h1 className="text-2xl font-semibold">Quiz completed!</h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mt-8 text-center">
            <div className="bg-blue-200 text-blue-800 max-w-[320px] text w-full flex flex-col gap-3 justify-center items-center rounded-md border border-zinc-600 p-3 shadow-xl">
                <GoGoal className="text-3xl"/>
                <p className="font-bold">{score}/{totalQuestions}</p>
                <p>Question correct</p>
            </div>
            <div className="bg-green-200 text-green-800 max-w-[320px] text w-full flex flex-col gap-3 justify-center items-center rounded-md border border-zinc-600 p-3 shadow-xl">
                <TfiTimer className="text-3xl"/>
                <p className="font-bold">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                <p>Time used</p>
            </div>
          </div>
          <button 
                onClick={() => navigate("/")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-6 w-full">Restart Quiz</button>
      </div>



    </div>
  );
};

export default Results;
