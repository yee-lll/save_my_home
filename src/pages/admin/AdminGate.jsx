import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminGate({ children }) {
  const userRole = localStorage.getItem("USER_ROLE");

  // 1 관리자, 0 사용자
  if (userRole === "1") {
    return children;
  }

  // 관리자가 아니면 메인화면
  return <Navigate to="/" replace />;
}