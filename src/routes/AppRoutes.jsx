import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/user/Home";
import Settings from "../pages/user/Settings";
import AdminRoutes from "./AdminRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
