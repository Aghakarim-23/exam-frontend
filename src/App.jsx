import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateQuestion from "./pages/CreateQuestion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizTimer from "./components/QuizTimer";
import Results from "./pages/Results";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/quiz-timer" element={<QuizTimer />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      
      <ToastContainer />
    </>
  );
};

export default App;
