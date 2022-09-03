import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // context
  const {state, setState} = useContext(UserContext);

  const handleClick = async (e) => {
    // console.log("email and password", email, password);
    try {
      e.preventDefault();
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      console.log("loggedinUser", data);

      if (data.error) {
        toast.error(data.error);
      } else {
        setEmail("");
        setPassword("");
        setState(data);
        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/account");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again");
    }
  };

  return (
    <div>
      <div>
        <div>
          <h1>Login</h1>
          <p>
            Access your subscriptions. Anytime. Anywhere.
          </p>

          <div>
            <Input
              label="Email"
              type="email"
              value={email}
              setValue={setEmail}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
            />

            <div>
              <Button
                handleClick={handleClick}
                text="Login"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
