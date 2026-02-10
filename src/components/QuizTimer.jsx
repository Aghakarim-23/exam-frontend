import { useEffect, useState } from "react";

const QuizTimer = () => {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {

    if(timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
      <div className="flex justify-center items-center h-7 ">
        <h1 className="text-lg font-semibold bg-gradient-to-tr from-blue-800 to bg-blue-300  bg-clip-text text-transparent">
          Quiz Timer: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      </div>
  );
};

export default QuizTimer;
