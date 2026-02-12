import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateQuestion from "./pages/CreateQuestion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Results from "./pages/Results";
import QuizPage from "./pages/QuizPage";
import Questions from "./pages/Questions";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/results" element={<Results />} />
        <Route path="/quiz-page" element={<QuizPage />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
      
      <ToastContainer />
    </>
  );
};

export default App;
