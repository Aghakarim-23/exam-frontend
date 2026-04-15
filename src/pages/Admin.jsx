import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import api from "../api/axios";
import { FaCircle, FaTrash } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

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
        const data = await response.data;
        setTopics(data.quizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();

    const fetchQuestions = async () => {
      try {
        const response = await api.get("/api/questions");
        const questionsLength = await response.data;
        setQuestionsLength(questionsLength.length);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleDeleteTopic = async (id) => {
    try {
      await api.delete(`/api/quizzes/${id}`);
      setTopics((prevTopics) => prevTopics.filter((topic) => topic._id !== id));
      console.log(`Quiz with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting quiz with ID ${id}:`, error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Manage quizzes, users, and settings
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <p className="text-2xl font-bold text-gray-800">
                {topics.length}
              </p>
              <p className="text-gray-500">topics</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <p className="text-2xl font-bold text-gray-800">{questionsLength}</p>
              <p className="text-gray-500">questions</p>
            </div>
            <div
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:cursor-pointer hover:shadow-lg transition"
              onClick={() => setDeleteMode(!deleteMode)}
            >
              <FaTrash className="text-red-500" />
            </div>
          </div>

          {/* Cards */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mt-6">Topics</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {topics.length === 0 ? (
                <p className="text-gray-500 text-center col-span-full">
                  No topics found. Create one first!
                </p>
              ) : (
                topics.map((topic) => (
                  <div
                    className={`bg-white rounded-lg shadow-md  flex flex-col gap-4 hover:scale-105 transition ${deleteMode ? "wiggle" : ""}`}
                    key={topic._id}
                  >
                    <div className="p-6 min-h-33 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold text-gray-800">
                          {topic.title}
                        </h1>
                        <div className="flex gap-1">
                          <span
                              className={`text-sm text-white px-2 py-1 rounded-full ${topic.difficulty === "easy" ? "bg-green-500" : topic.difficulty === "medium" ? "bg-yellow-500" : "bg-red-500"}`}
                            >
                              {topic.difficulty}
                            </span>
                          {deleteMode && (
                            <button
                              onClick={() => {
                                setIsOpenModal(true);
                                setSelectedTopicId(topic._id);
                              }}
                              className="text-white-500 hover:text-white transition"
                            >
                              <div className="bg-red-600 text-white px-2 py-2 rounded-full">
                                <FaCircleXmark />
                              </div>
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-500">{topic.description}</p>
                    </div>
                    <hr />
                    <div className="flex justify-center items-center mx-auto  bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors px-4 py-2 mb-3">
                      <Link
                        className="flex items-center gap-2"
                        to={`/create-quiz/${topic._id}/question`}
                      >
                        <p>Create Question</p>
                        <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                ))
              )}
              {isOpenModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
                    <h2 className="text-lg font-semibold mb-4">
                      Are you sure you want to delete?
                    </h2>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setIsOpenModal(false)}
                        className="px-4 py-2 bg-gray-300 rounded"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => {
                          handleDeleteTopic(selectedTopicId);
                          setIsOpenModal(false);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Create Quiz Button */}
          <div>
            <button className="mt-10 w-full bg-black/80 hover:bg-black/90 active:bg-black/100 text-white py-3 rounded-md transition cursor-pointer text-sm font-medium">
              <Link
                className="flex items-center justify-center gap-2"
                to="/create-quiz"
              >
                Create New Quiz
                <FiArrowRight />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
