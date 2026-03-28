import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateQuestion from "./pages/CreateQuestion";
import "react-toastify/dist/ReactToastify.css";
import Results from "./pages/Results";
import QuizPage from "./pages/QuizPage";
import Questions from "./pages/Questions";
import Topics from "./pages/Topics";
import Topic from "./pages/Topic";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import ConfrimationPage from "./pages/auth/ConfirmationPage"
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Layout from "./layouts/Layout";


const App = () => {
  return (
    <>


      <Routes>
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/results" element={<Results />} />
        <Route path="/quiz-page" element={<QuizPage />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topic/:slug" element={<Topic />} />

          <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

       <Route element={<Layout />}>
        <Route index element={<Home />} />
      
        <Route path="/verify-email/:token" element={
          <PublicRoute>
            <ConfrimationPage />
          </PublicRoute>
        } />
        <Route path="/forgot-password" element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } />
        <Route path="/reset-password/:token" element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        } />

        <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
        </Route>

       </Route>
      </Routes>
      
      <ToastContainer />
    </>
  );
};

export default App;
