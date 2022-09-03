import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/index";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // context
  const {state, setState} = useContext(UserContext);

  const handleClick = async (e) => {
    // console.log(name, email, password);
    try {
      e.preventDefault();
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log(data);

      if (data.error) {
        toast.error(data.error);
      } else {
        setName("");
        setEmail("");
        setPassword("");
        toast.success(
          `Hey ${data.user.name}. You are part of team now. Congrats!`
        );
        setState(data);
        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/");
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
          <h1>Let's Get Started</h1>
          <p>
            Sign up for free. No credit card required.
          </p>

          <div>
            <Input label="Name" value={name} setValue={setName} />
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
                text="Register"                
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
