import { CheckCircle, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

const ResultPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [averageScore, setAverageScore] = useState(null);
  const [openQuiz, setOpenQuiz] = useState(null); // For handling which quiz is open

  console.log(quizData);

  const calculateAverage = (data) => {
    let total = 0;
    let count = 0;

    data.forEach((quizSet) => {
      quizSet.forEach((question) => {
        if (question.isCorrect) {
          total += 1;
        }
        count += 1;
      });
    });

    return count > 0 ? (total / count) * 100 : 0;
  };
  const handleShare = () => {
    const shareData = {
      title: "My Quiz Results",
      text: `I scored ${averageScore.toFixed(
        2
      )}% on this quiz! Check out my results.`,
      url: window.location.href, // You can modify this to share a custom URL
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      alert("Sharing is not supported on this platform.");
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("ai-quiz");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setQuizData(parsedData);
      const avgScore = calculateAverage(parsedData);
      setAverageScore(avgScore);
    }
  }, []);

  const toggleQuiz = (index) => {
    setOpenQuiz(openQuiz === index ? null : index);
  };
  console.log(quizData);

  return (
    <div className="min-h-fit">
      <div className="max-w-4xl mx-auto  rounded-lg shadow-lg m-2">
        <h1 className="text-3xl flex justify-between gap-2 items-center px-3 font-bold text-center text-blue-100 mb-6">
          Quiz Results
          {averageScore !== null && (
            <div className="text-center my-6">
              <p className="text-lg text-gray-300">Your Average Score</p>
              <div className="inline-block bg-green-600 text-white text-3xl font-bold px-6 py-3 rounded-full shadow-md">
                {averageScore.toFixed(2)}%
              </div>
            </div>
          )}
        </h1>

        {quizData.length > 0 ? (
          <div className="py-5">
            {/* Displaying each question's result */}
            {quizData.map((quizSet, index) => (
              <div key={index} className="mb-6">
                <div
                  className="bg-indigo-600 p-3 rounded-lg mx-2 shadow-md cursor-pointer hover:bg-indigo-400"
                  onClick={() => toggleQuiz(index)}>
                  <h2 className="text-xl font-semibold text-white">{`Quiz ${
                    index + 1
                  }`}</h2>
                </div>

                {openQuiz === index && (
                  <div className="p-0 md:p-4   rounded-lg shadow-sm mt-4">
                    {quizSet.map((question, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white relative rounded-lg shadow-sm mb-4">
                        <div className="absolute right-0 top-2 flex items-center space-x-2">
                          {question.isCorrect ? (
                            <CheckCircle size={50}  className="text-green-500 w-10 h-10" />
                          ) : (
                            <XCircle  size={50} className="text-red-500 w-10 h-10" />
                          )}
                          <span className="text-sm font-medium">
                            {question.isCorrect ? "Correct" : "Wrong"}
                          </span>
                        </div>
                        <p className="text-lg font-medium text-gray-900">
                          {question.question}
                        </p>
                        <div className="mt-2">
                          <p className="text-sm text-green-300">
                            <strong>Correct Answer:</strong>{" "}
                            {question?.options[question.correctAnswer]}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Your Answer:</strong>{" "}
                            {question.selectedAnswer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {averageScore !== null && (
              <div className="m-6 flex justify-center my-2">
                <button
                  onClick={handleShare}
                  className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none">
                  <CheckCircle className="inline mr-2" /> Share Results
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600">No quiz data available.</p>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
