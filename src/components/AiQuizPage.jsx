import React, { useEffect, useRef, useState } from "react";
import {
  Brain,
  PlayCircle,
  ChevronDown,
  SquareUser,
  ArrowRightCircle,
  Leaf,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import fetchAiQuiz, {
  getSubtopicsFromGemini,
} from "../redux/actions/aiQuizAction";
import { AI_SUBMIT_ANSWER } from "../redux/actions/actionTypes";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const AiQuizPage = () => {
  const sectionRef = useRef(null);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const [isDataSaved, setIsDataSaved] = useState(false);
  const navigate = useNavigate();
  const [selectOption, setSelectOption] = useState("");
  const { question, score, isLoading, submitedQuestions, error } = useSelector(
    (state) => state.aiquiz
  );
  const [userPrompt, setUserPrompt] = useState("Random");
  const [subTopics, setSubTopics] = useState([]);
  const handleStartQuiz = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
    let sub = getRandomSubtopic(subTopics);
    dispatch(fetchAiQuiz(userPrompt +" "+ sub));
  };
  function handleSubmit() {
    setCount(count + 1);
    dispatch({ type: AI_SUBMIT_ANSWER, payload: selectOption });
    setSelectOption("");
    dispatch(fetchAiQuiz(userPrompt));
  }
  function handleSelectOption(e) {
    setSelectOption(e.target.value);
  }

  function getRandomSubtopic(subtopics = []) {
    if (subTopics.length == 0) return 0;
    const randomIndex = Math.floor(Math.random() * subtopics.length);
    return subtopics[randomIndex];
  }

  if (error) return <div>{error}</div>;

  async function getSubTopics() {
    const res = await getSubtopicsFromGemini(userPrompt);
    setSubTopics(res.split(", "));
  }
  useEffect(() => {
    getSubTopics();
  }, [userPrompt]);

  useEffect(() => {
    if (count === 10 && !isDataSaved) {
      const quiz = JSON.parse(localStorage.getItem("ai-quiz")) || [];
      quiz.push(submitedQuestions);
      localStorage.setItem("ai-quiz", JSON.stringify(quiz));
      setIsDataSaved(true);
    }
  }, [count, submitedQuestions, isDataSaved]);

  if (count == 10) {
    return (
      <Result
        score={score}
        totalQuestion={submitedQuestions.length}
        submitedQuestions={submitedQuestions}
      />
    );
  }

  const avg = (score * 100) / submitedQuestions.length;

  const handleRedirect = () => {
    navigate("/quiz-result");
  };

  if(subTopics.length == 0) return <Loader/>
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <div className="min-h-screen flex flex-col  items-center justify-center px-4 text-center space-y-6">
        <button
          onClick={handleRedirect}
          className="md:flex items-center hidden  z-50 justify-center bg-indigo-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-500 transition duration-300 ease-in-out">
          <span className="mr-2">Go to Results</span>
          <ArrowRightCircle size={24} />
        </button>
        <div className="animate-fadeInUp">
          <Brain className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-2">
            Welcome to the AI Quiz
          </h1>
          <p className="text-lg text-gray-100 max-w-md mx-auto">
            Test your knowledge of Artificial Intelligence and Machine Learning
            with fun, engaging questions.
          </p>
          <button
            onClick={handleStartQuiz}
            className="mt-6 cursor-pointer bg-blue-800 inline-flex items-center gap-2 border hover:bg-blue-700  border-gray-800 py-2 px-6 rounded-lg font-medium hover:scale-105 transition-transform duration-300">
            <PlayCircle className="w-5 h-5" />
            Start Quiz
          </button>
          <div className="flex flex-wrap justify-center gap-3 my-4">
            {[
              "React",
              "Python",
              "JavaScript",
              "Node.js",
              "CSS",
              "HTML",
              "Machine Learning",
              "Artificial Intelligence",
              "Nature",
              "Physics",
              "Chemistry",
              "Mathematics",
              "Blockchain",
              "Quantum Computing",
              "Random",
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => setUserPrompt(topic)}
                className={`px-4 py-2 rounded-full border 
          ${
            userPrompt === topic
              ? "bg-blue-600 text-white"
              : " shadow-md cursor-pointer  text-gray-200"
          } 
          hover:bg-blue-700 transition`}>
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>

      <section
        ref={sectionRef}
        className="min-h-screen mt-16 pt-16 md:pt-0 md:mt-2 max-w-2xl  mx-auto flex flex-col text-center p-8 space-y-4 animate-fadeInSlow">
        <h2 className="text-3xl font-semibold mb-2">Quiz Questions</h2>
        {isLoading && <Loader />}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${avg}%` }}></div>
        </div>

        <div>
          <h2 className="text-xl text-start font-normal text-gray-200">
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
              className={`bg-green-500 text-start hover:bg-blue-800 transition-all duration-300 cursor-pointer rounded-md p-2 text-white gap-2 flex items-center`}>
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

        {question && (
          <div className="text-center">
            <button
              disabled={selectOption === ""}
              onClick={handleSubmit}
              className="bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Submit Answer
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AiQuizPage;

const Result = ({ score, totalQuestion, submitedQuestions }) => {
  const percentage = Math.round((score / totalQuestion) * 100);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r  from-indigo-600 via-purple-600 to-pink-600  flex flex-col items-center justify-center px-4 py-8 space-y-10">
      <div className="max-w-md w-full  rounded-lg shadow-lg p-6 text-center space-y-6">
        <h1 className="text-3xl font-bold ">Quiz Completed 🎉</h1>

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

        <div className=" text-lg">
          You answered <span className="font-bold text-blue-600">{score}</span>{" "}
          out of{" "}
          <span className="font-bold text-blue-600">{totalQuestion}</span>{" "}
          questions correctly.
        </div>

        <button
          className="bg-blue-600 flex gap-2  px-5 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/quiz-result")}>
          Result <Leaf />
        </button>
      </div>

      <div className="max-w-2xl bg-black w-full rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-boldtext-center ">Your Answers</h2>
        {submitedQuestions.map((item, index) => (
          <div key={item.id || index} className="border-b pb-4">
            <p className="font-semibold text-rose-100">
              {index + 1}. {item.question} {item.isCorrect ? "✅" : "❌"}
            </p>
            <p>
              Your Answer:{" "}
              <span
                className={item.isCorrect ? "text-green-500" : "text-red-400"}>
                {item.selectedAnswer}
              </span>
            </p>
            {!item.isCorrect && (
              <p>
                Correct Answer:{" "}
                <span className="text-green-500 font-medium">
                  {item.options[item.correctAnswer]}
                </span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
