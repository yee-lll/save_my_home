import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
    const nav = useNavigate();
    const logout = () => {
        sessionStorage.removeItem("adminAuthed");
        nav("/admin/login", { replace: true });
    };

    return (
        <div className="admin-shell">
            <aside className="admin-sidebar">
                <div className="admin-logo">구해줘, 홈!</div>
                <nav className="admin-menu">
                    <NavLink to="/admin/users" className={({ isActive }) => isActive ? "active" : undefined}>
                        <span className="admin-dot" /> 사용자 관리
                    </NavLink>
                    <NavLink to="/admin/cases" className={({ isActive }) => isActive ? "active" : undefined}>
                        <span className="admin-dot" /> 판례 관리
                    </NavLink>
                    <NavLink to="/admin/laws" className={({ isActive }) => isActive ? "active" : undefined}>
                        <span className="admin-dot" /> 법률 관리
                    </NavLink>
                    <NavLink to="/admin/offices" className={({ isActive }) => isActive ? "active" : undefined}>
                        <span className="admin-dot" /> 법률사무소관리
                    </NavLink>
                    <NavLink to="/admin/notices" className={({ isActive }) => isActive ? "active" : undefined}>
                        <span className="admin-dot" /> 공지사항 관리
                    </NavLink>
                    <NavLink to="/admin/faqs" className={({ isActive }) => isActive ? "active" : undefined}>
                        <span className="admin-dot" /> 자주 묻는 질문 관리
                    </NavLink>
                </nav>
                <button onClick={logout} className="small-btn" style={{ marginTop: "auto" }}>로그아웃</button>
            </aside>

            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
}
