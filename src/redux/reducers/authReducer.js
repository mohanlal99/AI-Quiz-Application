import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  token: null,
  loading: false,
  error: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, isAuth: true, token: action.payload };
    case LOGIN_FAILURE:
  return { ...state, loading: false, isAuth: false, token: null, error: action.payload };
  case "LOGOUT":
      return { ...state, isAuth: false, token: null, error: null };
    default:
      return state;
  }
};
