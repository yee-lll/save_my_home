import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminGate from "../pages/admin/AdminGate";
import AdminLogin from "../pages/admin/AdminLogin";
import DashboardLayout from "../pages/admin/DashboardLayout";
import Users from "../pages/admin/Users";
import Cases from "../pages/admin/Cases";
import Laws from "../pages/admin/Laws";
import Offices from "../pages/admin/Offices";
import Notices from "../pages/admin/Notices";
import Faqs from "../pages/admin/Faqs";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        element={<AdminGate><DashboardLayout /></AdminGate>}
      >
        <Route path="users" element={<Users />} />
        <Route path="cases" element={<Cases />} />
        <Route path="laws" element={<Laws />} />
        <Route path="offices" element={<Offices />} />
        <Route path="notices" element={<Notices />} />
        <Route path="faqs" element={<Faqs />} />
      </Route>
    <Route path="*" element={<Navigate to="/admin/users" replace />} />
    </Routes>
  );
}
