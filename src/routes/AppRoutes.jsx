import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "../components/Landing";
import Home from "../pages/user/Home";
import Settings from "../pages/user/Settings";
import AdminRoutes from "./AdminRoutes";
import SubSuccess from "../pages/user/SubSuccess";
import Sub from "../pages/user/Sub";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/console" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/billing/success" element={<SubSuccess />} />
      <Route path="/billing/fail" element={<Sub />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
