import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer } from "./reducers/authReducer";
import { thunk } from "redux-thunk";
import quizReducer from "./reducers/quizReducer";
import aiQuizReducer from "./reducers/AIQuizReducer";


const rootReducer = combineReducers({
    auth:authReducer,
    quiz:quizReducer,
    aiquiz:aiQuizReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store