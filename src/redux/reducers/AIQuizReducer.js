import {
  AI_QUIZ_FAILURE,
  AI_QUIZ_REQUEST,
  AI_QUIZ_SUCCESS,
  AI_SUBMIT_ANSWER,
} from "../actions/actionTypes";

const initialState = {
  submitedQuestions: [],
  question: null,
  isLoading: false,
  error: null,
  score: 0,
};

const aiQuizReducer = (state = initialState, action) => {
  switch (action.type) {
    case AI_QUIZ_REQUEST:
      return { ...state, isLoading: true };
    case AI_QUIZ_SUCCESS:
      return { ...state, isLoading: false, question: action.payload };
    case AI_QUIZ_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case AI_SUBMIT_ANSWER:
      const correct = state.question.correctAnswer;
      const questionOption = state.question.options;
      const result = questionOption[correct] === action.payload;
      const que = {
        ...state.question, // clone the current question
        selectedAnswer: action.payload,
        isCorrect: result,
      };

      if (result) {
        return {
          ...state,
          submitedQuestions: [...state.submitedQuestions, que],
          score: state.score + 1,
        };
      }
      return {...state,
        submitedQuestions: [...state.submitedQuestions, que],
      };
    default:
      return state;
  }
};

export default aiQuizReducer;
