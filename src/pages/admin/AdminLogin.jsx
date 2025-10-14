import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HLLogo from "../../assets/HL.png";
import "../../styles/login.css"

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const nav = useNavigate();
// 로그인 인증은 추후 삭제 예정
    const submit = () => {
        if (email === "admin" && pw === "1234") {
            sessionStorage.setItem("adminAuthed", "1");
            nav("/admin/users", { replace: true });
        }
    };

    return (
        <div className="totalbox">
            <div style={{ background: "#DDE6ED" }} />
            
            <div className="login-box">
                <div style={{ width: 360 }}>
                    <div className="login-header">
                        <div><img src={HLLogo} alt="logo" className="brand-logo" /></div>
                        <div className="login-title">구해줘, 홈!</div>
                    </div>


                    <input 
                    className="inputbox"
                    placeholder="Email"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    />

                    <input 
                    className="inputbox"
                    type="password" 
                    placeholder="Password" 
                    value={pw} 
                    onChange={e => setPw(e.target.value)} 
                    />

                
                    <button 
                    className="login-btn"
                    onClick={submit} 
                    >
                    Login
                    </button>
                </div>
            </div>
        </div>
    );
}
