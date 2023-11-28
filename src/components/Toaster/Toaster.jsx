import React from "react";

const Toaster = ({ message, typeColor, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  const type = {
    info: "alert-info",
    warning: "alert-warning",
    error: "alert-error",
    success: "alert-success",
  };

  return (
    <div className="toast toast-top toast-end z-40">
      <div
        className={`alert ${type[typeColor]} shadow-md text-white font-semibold animate-fade-left`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toaster;
