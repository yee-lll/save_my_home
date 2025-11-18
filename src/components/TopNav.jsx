import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/HL.png";

export default function TopNav() {
  const nav = useNavigate();

  const items = [
    { key: "function", label: "주요 기능", href: "#function" },
    { key: "data", label: "흐름도", href: "#architecture" },
    { key: "pricing", label: "요금제", href: "#pricing" },
    { key: "contact", label: "FAQ", href: "#feedback" },
  ];

  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState(null);

  const syncAuth = useCallback(() => {
    const id = localStorage.getItem("USER_ID") || "";
    const roleRaw = localStorage.getItem("USER_ROLE");
    const role = roleRaw == null ? null : Number(roleRaw);
    setUserId(id);
    setUserRole(Number.isNaN(role) ? null : role);
  }, []);

  useEffect(() => {
    syncAuth();
    const onStorage = (e) => {
      if (e.key === "USER_ID" || e.key === "USER_ROLE") syncAuth();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [syncAuth]);

  const isLoggedIn = !!userId;

  const handleLogin = () => {
    nav("/admin/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("USER_ROLE");
    localStorage.removeItem("ACCESS_TOKEN");
    setUserId("");
    setUserRole(null);
    nav("/", { replace: true });
  };

  const handleBrandClick = () => {
    if (userRole === 1) {
      nav("/admin/users");
    } else {
      nav("/");
    }
  };

  return (
    <header className="og-nav">
      <div className="og-nav-inner">
        <div className="og-brand" onClick={handleBrandClick}>
          <img src={logo} alt="logo" />
          <span>구해줘, 홈!</span>
        </div>

        <nav className="og-menu" aria-label="Primary">
          {items.map((it) => (
            <a key={it.key} className="og-link" href={it.href}>
              <span>{it.label}</span>
              <i aria-hidden />
            </a>
          ))}

          {isLoggedIn && (
            <span
              aria-label="signed-user"
              style={{
                marginLeft: 12,
                marginRight: 12,
                fontWeight: "500",
                userSelect: "none",
              }}
            >
              {userId}
            </span>
          )}

          {isLoggedIn ? (
            <button className="og-login" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="og-login" onClick={handleLogin}>
              LOGIN
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
