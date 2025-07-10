import {
  FETCH_QUIZ_FAILURE,
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  SUBMIT_ANSWER,
} from "../actions/actionTypes";

const initialState = {
  score: 0,
  loading: false,
  error: null,
  questions: [],
  currentIndex: 0,
  totalQuestion: 10,
};

function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZ_REQUEST:
      return { ...state, loading: true };
    case FETCH_QUIZ_SUCCESS:
      return { ...state, loading: false, questions: action.payload };
    case FETCH_QUIZ_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SUBMIT_ANSWER:
      const correct = state.questions[state.currentIndex].correctOptionIndex;
      const questionOption = state.questions[state.currentIndex].options;
      const result = questionOption[correct] === action.payload;
      if (result) {
        return {
          ...state,
          score: state.score + 1,
          currentIndex: state.currentIndex + 1,
        };
      }
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
    default:
      return state;
  }
}

export default quizReducer;
