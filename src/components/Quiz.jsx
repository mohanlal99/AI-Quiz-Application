import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_FAILURE, SUBMIT_ANSWER } from "../redux/actions/actionTypes";
import fetchQuiz from "../redux/actions/quizAction";

const Quiz = () => {
  const dispatch = useDispatch();
  const { loading, questions, currentIndex, score, totalQuestion } =
    useSelector((state) => state.quiz);
  const [selectOption, setSelectOption] = useState("");
  const { token } = useSelector((state) => state.auth);
  function handleLogout() {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  }

  useEffect(() => {
    dispatch(fetchQuiz());
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  const avg = (currentIndex * 100) / questions.length;
  const question = questions[currentIndex];

  function handleSelectOption(e) {
    setSelectOption(e.target.value);
  }

  function handleSubmit() {
    dispatch({ type: SUBMIT_ANSWER, payload: selectOption });
    setSelectOption("");
  }

  if (currentIndex == totalQuestion) {
    return <Result score={score} totalQuestion={totalQuestion}/>
  }
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Welcome back, Quiz
        </h1>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${avg}%` }}></div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            {question?.question}
          </h2>
        </div>

        <div className="space-y-4"></div>
        {question &&
          question.options.map((item) => (
            <label
              style={{
                backgroundColor: selectOption === item ? "blue" : "black",
              }}
              key={item}
              className={`bg-gray-800  hover:bg-blue-800 transition-all duration-300 cursor-pointer rounded-md p-2 text-white gap-2 flex items-center`}>
              <input
                onChange={handleSelectOption}
                value={item}
                size={20}
                className=""
                type="radio"
                name="option"
              />
              <span>{item}</span>
            </label>
          ))}

        <div className="text-center">
          <button
            disabled={selectOption === ""}
            onClick={handleSubmit}
            className="bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

const Result = ({ score, totalQuestion }) => {
  const percentage = Math.round((score / totalQuestion) * 100);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Quiz Completed 🎉</h1>

        {/* Percentage Circle */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-gray-200"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-blue-500"
              strokeWidth="10"
              fill="none"
              strokeDasharray="282.6"
              strokeDashoffset={282.6 - (percentage / 100) * 282.6}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-blue-600">
            {percentage}%
          </div>
        </div>

        {/* Score Info */}
        <div className="text-gray-700 text-lg">
          You answered <span className="font-bold text-blue-600">{score}</span>{" "}
          out of
          <span className="font-bold text-blue-600">
            {" "}
            {totalQuestion}
          </span>{" "}
          questions correctly.
        </div>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    </div>
  );
};


