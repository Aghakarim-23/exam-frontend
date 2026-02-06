import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateQuestion = () => {
  const [questionFormData, setQuestionFormData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    optionE: "",
    correctAnswer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

  const payload = {
  questionText: questionFormData.question,
  options: [
    questionFormData.optionA,
    questionFormData.optionB,
    questionFormData.optionC,
    questionFormData.optionD,
    questionFormData.optionE
  ],
  correctAnswer: questionFormData.correctAnswer
};

    try {
        await axios.post("http://localhost:8001/api/questions", payload)
        toast.success("Question submitted successfully!");
        setQuestionFormData({
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            optionE: "",
            correctAnswer: "",
        })
    } catch (error) {
        console.error("Error submitting question:", error);
        toast.error("Failed to submit question. Please try again." || error.message);
    }
  }
 
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-3">
        <h1 className="text-2xl font-bold">Create a Question</h1>
        <form 
            onSubmit={(e) => {
              e.preventDefault();
              console.log(questionFormData);

            }}
            className="flex flex-col gap-2 bg-white p-6 rounded-md shadow-md w-full max-w-md mt-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              name="question"
              id="question"
              className="w-full border border-zinc-300 pl-2 py-2 rounded-md"
              placeholder="Add your question"
              onChange={handleChange}
              value={questionFormData.question}
            />
          </div>

          {["A", "B", "C", "D", "E"].map((option, index) => (
            <div className="flex flex-col gap-1" key={index}>
              <label htmlFor={`option${option}`}>Option: {option}</label>
              <input
                type="text"
                name={`option${option}`}
                id={`option${option}`}
                className="w-full border border-zinc-300 pl-2 py-2 rounded-md"
                placeholder={`Add your option ${option}`}
                onChange={handleChange}
                value={questionFormData[`option${option}`]}
              />
            </div>
          ))}

          <select
            name="correctAnswer"
            id="correctAnswer"
            className="w-full border border-gray-300 rounded pl-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={questionFormData.correctAnswer}
          >
            <option value="">Select Correct Answer</option>
            {["A", "B", "C", "D", "E"].map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button 
            onClick={handleSubmit}
            className="w-full rounded-md bg-blue-500 active:bg-blue-600 cursor-pointer py-2 text-white">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreateQuestion;
