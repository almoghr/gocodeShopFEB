import React from "react";
import "./Button.css";
const Button = ({ text, onClick, style={}, disabled}) => {
  return (
    <button disabled={disabled} onClick={onClick} style={style} className="button-21" role="button">
      {text}
    </button>
  );
};

export default Button;
