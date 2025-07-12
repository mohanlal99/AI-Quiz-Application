import {
  AI_QUIZ_FAILURE,
  AI_QUIZ_REQUEST,
  AI_QUIZ_SUCCESS,
} from "./actionTypes";
import { GoogleGenAI } from "@google/genai";

const GOOGLE_API = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GOOGLE_API });

const fetchAiQuiz = (userPrompt) => {
  // console.log(userPrompt)
  return async (dispatch) => {
    dispatch({ type: AI_QUIZ_REQUEST });
    try {
      const response = await searchResult(userPrompt);
      const res = parseQuizResponse(response);
      dispatch({ type: AI_QUIZ_SUCCESS, payload: res });
    } catch (error) {
      console.log(error);
      dispatch({ type: AI_QUIZ_FAILURE, payload: error });
    }
  };
};

async function searchResult(userPrompt = "Random") {
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
  return response.text;
}

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

const getSubtopicsFromGemini = async (mainTopic = "React") => {
  try {
    const prompt = `List 30 different subtopics or concepts related to "${mainTopic}". Only list the names, comma-separated, no explanations.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text; 

    
    const cleanText = text
      .replace(/\n/g, ",") 
      .replace(/,+/g, ",") 
      .replace(/[^a-zA-Z0-9_, ]/g, "") 
      .trim();

    return cleanText
  } catch (error) {
    console.error("Subtopic fetch error:", error);
    throw error;
  }
};


export { getSubtopicsFromGemini };
export default fetchAiQuiz;
