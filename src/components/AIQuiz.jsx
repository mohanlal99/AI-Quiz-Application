import { GoogleGenAI } from "@google/genai";
import React, { useEffect, useState } from "react";

const GOOGLE_API = import.meta.env.VITE_GEMINI_API_KEY;
const Quiz = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const ai = new GoogleGenAI({ apiKey: GOOGLE_API });
  const [aiResponse, setAiResponse] = useState("");
  const [questions, setQuestions] = useState([]);
  async function searchResult() {
    if (!userPrompt) {
      return;
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 1 multiple-choice quiz question based on the topic: "{${userPrompt}}".
            Requirements:
            - Only 1 question
            - 4 answer options labeled A, B, C, and D
            - Clearly mark the correct answer at the end as "Correct Answer: X" (where X is A/B/C/D)
            - Format your response like this:

            Question: ...
            A. Option 1  
            B. Option 2  
            C. Option 3  
            D. Option 4  

            Correct Answer: X
            Related to user prompt
`,
    });
    setAiResponse(response.text);
  }

//   function parseQuizResponse(responseText) {
//     responseText = responseText.trim().split("\n").filter(Boolean);
//     const question = responseText[0].split(":")[1].trim();
//     const options = [
//       responseText[1],
//       responseText[2],
//       responseText[3],
//       responseText[4],
//     ].map((item) => item?.split(".")[1]?.trim());
//     const answer = responseText[5]?.split(":")[1].trim();
//     const correctAnswer =
//       answer == "A"
//         ? 0
//         : answer == "B"
//         ? 1
//         : answer == "C"
//         ? 2
//         : answer == "D"
//         ? 3
//         : "None";
//     return { id: Date.now(), question, options, correctAnswer };
//   }
  function parseQuizResponse(responseText) {
    const questionMatch = responseText.match(/Question:\s*(.*)/i);
    const optionRegex = /[A-D]\.\s*(.+)/g;
    id: Date.now();
    const correctMatch = responseText.match(/Correct Answer:\s*([A-D])/i);

    if (!questionMatch || !correctMatch) throw new Error("Parsing failed.");

    const question = questionMatch[1].trim();
    const options = [];
    let match;
    while ((match = optionRegex.exec(responseText)) !== null) {
      options.push(match[1].trim());
    }

    if (options.length !== 4) throw new Error("Options not complete.");

    const correctLetter = correctMatch[1].toUpperCase();
    const correctAnswer = "ABCD".indexOf(correctLetter);

    return { id: Date.now(), question, options, correctAnswer };
  }

  useEffect(() => {
    if (aiResponse) {
      setQuestions([...questions, parseQuizResponse(aiResponse)]);
    }
  }, [aiResponse]);

  return (
    <div className="text-center">
      <input
        className="border-2 p-2"
        type="text"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />
      <button
        className="bg-blue-500 cursor-pointer"
        onClick={() => searchResult()}>
        Search
      </button>

      <div className="text-start mt-6 max-w-3xl mx-auto">
        {questions.length === 0 ? (
          <p>No questions generated yet. Please ask a topic above.</p>
        ) : (
          questions.map((q, index) => (
            <div
              key={q.id}
              className="shadow-md rounded-lg p-6 border border-gray-200 mb-6">
              <div className="text-lg font-bold mb-4">
                {index + 1}. {q.question}
              </div>

              <ul className="list-disc pl-6">
                {q.options.map((opt, i) => (
                  <li key={i} className="text-sm">
                    {opt}{" "}
                    {q.correctAnswer === i && (
                      <span className="text-green-600">(Correct)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Quiz;
