import React from "react";

const Button = ({
  text = "Submit",
  handleClick,
}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

export default Button;
