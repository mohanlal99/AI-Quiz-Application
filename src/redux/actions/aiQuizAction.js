// import { AI_QUIZ_FAILURE, AI_QUIZ_REQUEST, AI_QUIZ_SUCCESS } from "./actionTypes";
// import { GoogleGenAI } from "@google/genai";

// const GOOGLE_API = process.env.GEMINI_API_KEY;
// const ai = new GoogleGenAI({ apiKey: GOOGLE_API });

// const fetchAiQuiz = (userPrompt) => {
//   return async (dispatch) => {
//     dispatch({ type: AI_QUIZ_REQUEST });
//     try {
//       const response = await searchResult(userPrompt);
//       const res = parseQuizResponse(response)
//       dispatch({ type: AI_QUIZ_SUCCESS, payload: res });
//     } catch (error) {
//         console.log(error)
//         dispatch({type: AI_QUIZ_FAILURE,payload:error})
//     }
//   };
// };

// async function searchResult(userPrompt = "Random") {
//   if (!userPrompt) {
//     return;
//   }
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: `Generate 1 multiple-choice quiz question based on the topic: "{${userPrompt}}".
//             Requirements:
//             - Only 1 question
//             - 4 answer options labeled A, B, C, and D
//             - Clearly mark the correct answer at the end as "Correct Answer: X" (where X is A/B/C/D)
//             - Format your response like this:

//             Question: ...
//             A. Option 1  
//             B. Option 2  
//             C. Option 3  
//             D. Option 4  

//             Correct Answer: X
//             Related to user prompt
// `,
//   });
//   return response.text;
// }


//  function parseQuizResponse(responseText) {
//     const questionMatch = responseText.match(/Question:\s*(.*)/i);
//     const optionRegex = /[A-D]\.\s*(.+)/g;
//     id: Date.now();
//     const correctMatch = responseText.match(/Correct Answer:\s*([A-D])/i);

//     if (!questionMatch || !correctMatch) throw new Error("Parsing failed.");

//     const question = questionMatch[1].trim();
//     const options = [];
//     let match;
//     while ((match = optionRegex.exec(responseText)) !== null) {
//       options.push(match[1].trim());
//     }

//     if (options.length !== 4) throw new Error("Options not complete.");

//     const correctLetter = correctMatch[1].toUpperCase();
//     const correctAnswer = "ABCD".indexOf(correctLetter);

//     return { id: Date.now(), question, options, correctAnswer };
//   }

// export default fetchAiQuiz


// In your frontend code (React)
// api/quiz.js
import { GoogleGenAI } from "@google/genai";

// This function will handle the request to GoogleGenAI and keep your API key secret.
export default async function handler(req, res) {
  const { userPrompt } = req.query;

  if (!userPrompt) {
    return res.status(400).json({ error: "User prompt is required" });
  }

  try {
    // Fetch the API key from Vercel environment variables
    const GOOGLE_API = process.env.GEMINI_API_KEY; // Use your actual Vercel environment variable here
    const ai = new GoogleGenAI({ apiKey: GOOGLE_API });

    // Call the Gemini API
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
                  Related to user prompt`,
    });

    // Respond with the generated quiz question
    res.status(200).json({ question: response.text });
  } catch (error) {
    console.error("Error fetching quiz: ", error);
    res.status(500).json({ error: "Failed to generate quiz question" });
  }
}


const fetchAiQuiz = async (userPrompt) => {
  try {
    // Make a request to the Vercel serverless function
    const response = await fetch(`/api/quiz?userPrompt=${userPrompt}`);
    const data = await response.json();

    if (response.ok) {
      console.log(data.question); // Process the quiz data here
    } else {
      console.error(data.error); // Handle the error
    }
  } catch (error) {
    console.error("Error fetching quiz: ", error);
  }
};


