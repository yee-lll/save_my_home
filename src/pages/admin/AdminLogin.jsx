import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HLLogo from "../../assets/HL.png";
import "../../styles/login.css";
import { login } from "../../api/authApi";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const nav = useNavigate();

   const submit = async () => {
    const id = email.trim();
    const password = pw.trim();
    if (!id) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const { data } = await login({ userId: id, password });
      const { userId, userRole } = data || {};
      localStorage.setItem("USER_ID", userId);
      localStorage.setItem("USER_ROLE", String(userRole));

      if (Number(userRole) === 1) {
        nav("/admin/users", { replace: true });
      } else {
        nav("/", { replace: true });
      }
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        "아이디 또는 비밀번호를 다시 확인해주세요.";
      alert(msg);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit();
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-left">
          <div className="login-header">
            <img src={HLLogo} alt="로고" className="brand-logo" />
            <div className="login-title">구해줘, 홈!</div>
          </div>

          <h2 className="login-heading">Sign in</h2>
          <p className="login-sub">
            기본적으로 관리자 계정을<br />
            로그인 하는 페이지입니다.
          </p>

           <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label">ID</label>
            <input
              className="inputbox"
              placeholder="ID를 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="login-label">Password</label>
            <input
              className="inputbox"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />

            <button className="login-btn" type="submit">
              로그인
            </button>
          </form>
          </div>
        

       
        <div className="login-right">
          <div className="login-right-inner">
            <h3>관리 화면</h3>
            <p>
              구해줘, 홈! 관리자 페이지에서<br />
              회원 정보, 공지사항, FAQ, 법률사무소 정보를<br />
              한 번에 관리할 수 있습니다.
            </p>
            <div className="login-right-badge">
              믿을 수 있는 상담 파트너
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
