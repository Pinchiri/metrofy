import React from "react";

const Divider = ({ color = "neutral" }) => {
  const colors = {
    primary: "divider-primary",
    secondary: "divider-secondary",
    neutral: "divider-neutral",
    accent: "divider-accent",
  };
  return (
    <div className="flex flex-col w-[95%]">
      <div className={`divider ${colors[color]}`}></div>
    </div>
  );
};

export default Divider;
