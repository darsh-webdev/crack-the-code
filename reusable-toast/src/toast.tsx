import React, { useState, useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info";
  duration: number;
};

// Toast Component
const Toast = ({ message, type, duration }: ToastProps) => {
  return <div></div>;
};

export default Toast;
