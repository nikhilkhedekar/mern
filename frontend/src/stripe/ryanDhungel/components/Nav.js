import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/index";

const Nav = () => {
  //context state not handling properly ?????
  const state = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    state.setState({ user: {}, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  console.log("STATE => ", state);

  return (
    <ul >
      <li >
        <Link aria-current="page" to="/">
          Home
        </Link>
      </li>

      {state?.token ? (
        <div >
          <li >
            {state.user.email}
          </li>
          <ul >
            <li >
              <Link to="/account">
                Account
              </Link>
            </li>
            <li >
              <Link onClick={logout} >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <Fragment>
          <li >
            <Link  to="/register">
              Sign up
            </Link>
          </li>
          <li >
            <Link to="/login">
              Login
            </Link>
          </li>
        </Fragment>
      )}
    </ul>
  );
};

export default Nav;
