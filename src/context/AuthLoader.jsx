import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from "../redux/actions/actionTypes";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    dispatch({ type: LOGIN_REQUEST });
    if (token) {
      dispatch({ type: LOGIN_SUCCESS, payload: token });
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: "No token found" });
    }
  }, []);

  return children;
};

export default AuthLoader;
