import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus, FiTrash2 } from "react-icons/fi";
import { MdOutlineQuiz, MdOutlineTopic } from "react-icons/md";
import { FaCircleXmark } from "react-icons/fa6";
import api from "../api/axios";

const Admin = () => {
  const [topics, setTopics] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [questionsLength, setQuestionsLength] = useState(0);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await api.get("/api/quizzes");
        setTopics(response.data.quizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();

    const fetchQuestions = async () => {
      try {
        const response = await api.get("/api/questions");
        setQuestionsLength(response.data.length);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleDeleteTopic = async (id) => {
    try {
      await api.delete(`/api/quizzes/${id}`);
      setTopics((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error(`Error deleting quiz with ID ${id}:`, error);
    }
  };

  const difficultyStyles = {
    easy: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    medium: "bg-amber-50 text-amber-600 border border-amber-200",
    hard: "bg-red-50 text-red-500 border border-red-200",
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-medium px-4 py-1.5 rounded-full border border-blue-100 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Admin Panel
          </span>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            İdarəetmə paneli
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Quizləri idarə et, yeni quiz və suallar yarat
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50">
              <MdOutlineTopic className="text-blue-500 text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{topics.length}</p>
              <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">Quiz</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-50">
              <MdOutlineQuiz className="text-purple-500 text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{questionsLength}</p>
              <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">Sual</p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <button
              onClick={() => setDeleteMode(!deleteMode)}
              className={`w-full h-full min-h-19 rounded-2xl border shadow-sm flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 cursor-pointer
                ${deleteMode
                  ? "bg-red-500 border-red-500 text-white shadow-red-100 hover:bg-red-600"
                  : "bg-white border-gray-100 text-gray-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50"
                }`}
            >
              <FiTrash2 className="text-lg" />
              {deleteMode ? "Silmə rejimindən çıxış" : "Silmə rejimi"}
            </button>
          </div>
        </div>

        {/* Topics section */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Quizlər</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            {topics.length} total
          </span>
        </div>

        {topics.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-12 text-center">
            <MdOutlineTopic className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No topics yet. Create one below!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <div
                key={topic._id}
                className={`bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${deleteMode ? "wiggle" : ""}`}
              >
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-gray-800 text-base leading-snug">
                      {topic.title}
                    </h3>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${
                          difficultyStyles[topic.difficulty] ?? "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {topic.difficulty}
                      </span>
                      {deleteMode && (
                        <button
                          onClick={() => {
                            setIsOpenModal(true);
                            setSelectedTopicId(topic._id);
                          }}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <FaCircleXmark className="text-lg" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {topic.description}
                  </p>
                </div>

                <div className="px-5 pb-5">
                  <Link
                    to={`/create-quiz/${topic._id}/question`}
                    className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-blue-200 hover:shadow-md"
                  >
                    Sual yaratmaq
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Quiz CTA */}
        <div className="mt-8">
          <Link
            to="/create-quiz"
            className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-gray-800 active:scale-[0.99] text-white py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 shadow-sm"
          >
            <FiPlus className="text-base" />
            Yeni Quiz yaratmaq
          </Link>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <div className="mb-1 flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto">
              <FiTrash2 className="text-red-500 text-xl" />
            </div>
            <h2 className="text-gray-900 font-semibold text-center mt-3 mb-1">
              Bu quiz silinsin
            </h2>
            <p className="text-gray-400 text-sm text-center mb-6">
              Bu əməliyyat geri qaytarıla bilməz
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpenModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                İmtina
              </button>
              <button
                onClick={() => {
                  handleDeleteTopic(selectedTopicId);
                  setIsOpenModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
              >
                Silmək
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
