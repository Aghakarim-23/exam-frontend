import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      await api.post("/api/quizzes", {
        title: formData.title.trim(),
        description: formData.description.trim(),
      });

      toast.success("Quiz created successfully!");
      setFormData({ title: "", description: "" });
      navigate("/quiz-page");
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("Failed to create quiz. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-3">
      <h1 className="text-2xl font-bold">Create a Quiz</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-md shadow-md w-full max-w-md mt-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full border border-zinc-300 pl-2 py-2 rounded-md"
            placeholder="Enter quiz title"
            onChange={handleChange}
            value={formData.title}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            rows={4}
            className="w-full border border-zinc-300 pl-2 py-2 rounded-md resize-none"
            placeholder="Enter quiz description"
            onChange={handleChange}
            value={formData.description}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 active:bg-blue-600 cursor-pointer py-2 text-white"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
