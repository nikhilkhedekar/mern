import React from "react";
import { useState, useEffect, createContext } from "react";
import axios from "axios";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });


  console.log("contestState", state)
  useEffect(() => {
    setState(JSON.parse(localStorage.getItem("auth")));
  }, []);

  // axios config
  const token = state?.token ? state.token : "";
  axios.defaults.baseURL = "http://localhost:8080";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;//`Bearer${token}` === token not working properly in header

  return (
    <UserContext.Provider value={{state, setState}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
