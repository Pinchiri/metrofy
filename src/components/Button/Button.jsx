import React from "react";

const Button = ({ color, size, text, extraStyles = "", onClick }) => {
  const colors = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    neutral: "btn-neutral",
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
