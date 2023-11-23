"use client";
import { useState } from "react";

export const useToaster = (duration = 4000) => {
  const [isVisible, setIsVisible] = useState(false);
  const [toasterProperties, setToasterProperties] = useState({
    toasterMessage: "",
    typeColor: "",
  });

  const showToast = () => {
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), duration);
  };

  return { isVisible, showToast, toasterProperties, setToasterProperties };
};
