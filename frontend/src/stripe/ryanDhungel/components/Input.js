import React from "react";

const Input = ({ label, value, setValue, type = "text" }) => (
  <div>
    <span >{label}</span>
    <input
      type={type}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  </div>
);

export default Input;
