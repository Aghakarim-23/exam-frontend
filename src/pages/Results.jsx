import React, { useEffect, useState } from "react";
import { TfiCup, TfiTimer } from "react-icons/tfi";
import { GoGoal } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

const optionLabels = ["A", "B", "C", "D"];

const Results = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const timeUsed = state?.timeUsed || 0;
    const quizId = state?.quizId;
    const answers = state?.answers || [];

    const [reviewAnswers, setReviewAnswers] = useState([]);
    const [score, setScore] = useState(state?.score || 0);
    const [totalQuestions, setTotalQuestions] = useState(state?.totalQuestions || 0);

    const minutes = Math.floor(timeUsed / 60);
    const seconds = timeUsed % 60;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    const getScoreColor = () => {
        if (percentage >= 80) return "text-green-600";
        if (percentage >= 50) return "text-yellow-600";
        return "text-red-500";
    };

    useEffect(() => {
        if (!quizId || answers.length === 0) return;

        const payload = {
            quizId,
            answers: answers.map((a) => ({
                questionId: a.questionId,
                selectedAnswer: a.selected,
            })),
        };

        api.post("/api/questions/submit", payload)
            .then((res) => {
                const data = res.data;
                setScore(data.correctAnswers);
                setTotalQuestions(data.totalQuestions);
                setReviewAnswers(data.answers);
            })
            .catch((err) => {
                console.error("Failed to submit quiz result:", err);
            });
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-3 md:p-6">

            <div className="bg-white max-w-2xl w-full rounded-xl p-6 md:p-8 shadow-md">
                <div className="flex flex-col gap-2 my-3 justify-center items-center">
                    <TfiCup className="text-6xl text-yellow-400" />
                    <h1 className="text-2xl font-semibold">Quiz completed!</h1>
                    <p className={`text-4xl font-bold mt-1 ${getScoreColor()}`}>{percentage}%</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-6 text-center">
                    <div className="bg-blue-50 text-blue-800 w-full flex flex-col gap-2 justify-center items-center rounded-xl border border-blue-200 p-4">
                        <GoGoal className="text-3xl text-blue-500" />
                        <p className="font-bold text-lg">{score}/{totalQuestions}</p>
                        <p className="text-sm text-blue-600">Correct answers</p>
                    </div>
                    <div className="bg-green-50 text-green-800 w-full flex flex-col gap-2 justify-center items-center rounded-xl border border-green-200 p-4">
                        <TfiTimer className="text-3xl text-green-500" />
                        <p className="font-bold text-lg">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                        <p className="text-sm text-green-600">Time used</p>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    {quizId && (
                        <button
                            onClick={() => navigate(`/quizzes/${quizId}/questions`)}
                            className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            Try again
                        </button>
                    )}
                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        Home
                    </button>
                </div>

                {reviewAnswers.length > 0 && (
                    <div className="mt-8 flex flex-col gap-4">
                        <h2 className="text-lg font-semibold text-gray-700">Answer Review</h2>
                        {reviewAnswers.map((item, idx) => (
                            <div
                                key={idx}
                                className={`rounded-xl border p-4 ${item.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                            >
                                <p className="font-medium text-gray-800 mb-3">
                                    {idx + 1}. {item.questionText}
                                </p>
                                <div className="flex flex-col gap-2">
                                    {item.options.map((option, i) => {
                                        const isSelected = item.selectedOption === i;
                                        const isCorrect = item.correctAnswer === i;

                                        let style = "border-gray-200 bg-white text-gray-700";
                                        if (isCorrect) style = "border-green-500 bg-green-100 text-green-800 font-semibold";
                                        else if (isSelected && !isCorrect) style = "border-red-400 bg-red-100 text-red-700";

                                        return (
                                            <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${style}`}>
                                                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500">
                                                    {optionLabels[i]}
                                                </span>
                                                <span>{option.text}</span>
                                                {isCorrect && <span className="ml-auto text-green-600 text-xs font-semibold">Correct</span>}
                                                {isSelected && !isCorrect && <span className="ml-auto text-red-500 text-xs font-semibold">Your answer</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Results;
