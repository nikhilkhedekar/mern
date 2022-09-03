import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/index";

const StripeSuccess = () => {
  const {state, setState} = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    const getSubscriptionStatus = () => {
      let respData;
      setTimeout( async () => {
        const { data } = await axios.get("/api/subscription-status");//header not working properly
        respData = data;
      }, 1000);
      console.log("SUBSCRIPTION STATUS => ", respData);    
      if (respData?.length === 0) {
        navigate("/");
      } else {
        // update user in local storage
        const auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = respData;        
        localStorage.setItem("auth", JSON.stringify(auth));
        // update user in context
        setState(prevState => {
          const oldState = {...prevState};
          oldState.user = respData;
          return oldState;
        });
        setTimeout(() => {
          navigate("/account");
        }, 2000);
      }
    };

    getSubscriptionStatus();
  }, []);

  return (
    <div>
      <div>
        <h1> Success </h1>
      </div>
    </div>
  );
};

export default StripeSuccess;
