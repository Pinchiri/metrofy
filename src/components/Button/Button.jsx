import React from "react";

const Button = ({ color, size, text, extraStyles = "", onClick }) => {
  const colors = {
    manz: "btn-primary",
    masala: "btn-secondary",
    stratos: "btn-accent",
    oxford: "btn-neutral",
  };

  const sizes = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  return (
    <button
      className={`btn ${colors[color]} ${sizes[size]} rounded-full normal-case font-sans font-semibold ${extraStyles}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
