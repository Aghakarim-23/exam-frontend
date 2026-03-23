import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateQuestion from "./pages/CreateQuestion";
import "react-toastify/dist/ReactToastify.css";
import Results from "./pages/Results";
import QuizPage from "./pages/QuizPage";
import Questions from "./pages/Questions";
import Topics from "./pages/Topics";
import Topic from "./pages/Topic";
import KeepAlive from "./components/KeepAlive";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import ConfrimationPage from "./pages/auth/ConfirmationPage"


const App = () => {
  return (
    <>

    <KeepAlive/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/results" element={<Results />} />
        <Route path="/quiz-page" element={<QuizPage />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topic/:slug" element={<Topic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<ConfrimationPage/>} />

      </Routes>
      
      <ToastContainer />
    </>
  );
};

export default App;
