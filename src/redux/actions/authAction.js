import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionTypes";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post("https://dummyjson.com/auth/login", {
      username: "emilys",
      password: "emilyspass",
      expiresInMins: 30,
    });
    localStorage.setItem("token", JSON.stringify(res.data.accessToken));
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.accessToken });
  } catch (error) {
    // console.log(error)

    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message || "Something wen't wrong",
    });
  }
};
