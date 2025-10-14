import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/settings.css";

export default function Settings() {
  const nav = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState({ email: "", plan: "Basic" });


  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    const plan = sessionStorage.getItem("userPlan") || "Basic";
    if (email) {
      setAuthed(true);
      setUser({ email, plan });
    }
  }, []);

  // 로그인/로그아웃 이메일, 플랜 임시 데이터
  const login = () => {
    sessionStorage.setItem("userEmail", "user@example.com");
    sessionStorage.setItem("userPlan", "Basic");
    setAuthed(true);
    setUser({ email: "user@example.com", plan: "Basic" });
  };

  const logout = () => {
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userPlan");
    setAuthed(false);
    setUser({ email: "", plan: "Basic" });
  };

  const goBack = () => nav(-1);

  return (
    <div className="settings-wrap">
      {/* 환경설정 헤더 */}
      <header className="settings-header">
        <button className="settings-back" onClick={goBack} aria-label="뒤로가기">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="settings-title">환경설정</div>
        <div className="settings-right-space" />
      </header>

      {/* 프로필 박스 부분 */}
      <section className="profile-card">
        <div className="avatar" aria-hidden />
        <div className="profile-texts">
          {authed ? (
            <>
              <div className="profile-name">{user.email}</div>
              <div className="profile-sub">{user.plan}</div>
            </>
          ) : (
            <div className="profile-need">로그인이 필요합니다.</div>
          )}
        </div>

        {authed ? (
          <button className="pill-btn" onClick={logout} aria-label="로그아웃">
            <span className="pill-icon" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span> 로그아웃
          </button>
        ) : (
          <button className="pill-btn" onClick={login} aria-label="로그인">
            <span className="pill-icon" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11985 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H15M10 7L15 12M15 12L10 17M15 12L3 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span> 로그인
          </button>
        )}
      </section>

      <div className="sep" />

{/* 메뉴 리스트 시작 */}
      <nav className="menu-list">
        <a className="menu-item" href="#?">
          <span className="mi-icon" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7.49994 15.2499C7.30994 15.2499 7.11994 15.1799 6.96994 15.0299C6.67994 14.7399 6.67994 14.2599 6.96994 13.9699L10.1699 10.7699C10.3299 10.6099 10.5399 10.5299 10.7699 10.5499C10.9899 10.5699 11.1899 10.6899 11.3199 10.8799L12.4099 12.5199L15.9599 8.96994C16.2499 8.67994 16.7299 8.67994 17.0199 8.96994C17.3099 9.25994 17.3099 9.73994 17.0199 10.0299L12.8199 14.2299C12.6599 14.3899 12.4499 14.4699 12.2199 14.4499C11.9999 14.4299 11.7999 14.3099 11.6699 14.1199L10.5799 12.4799L8.02994 15.0299C7.87994 15.1799 7.68994 15.2499 7.49994 15.2499Z" fill="#FBFDFF" />
              <path d="M16.5 12.25C16.09 12.25 15.75 11.91 15.75 11.5V10.25H14.5C14.09 10.25 13.75 9.91 13.75 9.5C13.75 9.09 14.09 8.75 14.5 8.75H16.5C16.91 8.75 17.25 9.09 17.25 9.5V11.5C17.25 11.91 16.91 12.25 16.5 12.25Z" fill="#FBFDFF" />
              <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="#FBFDFF" />
            </svg>
          </span>
          <span className="mi-text">구독 레벨 업그레이드</span>
        </a>
        <a className="menu-item" href="#?">
          <span className="mi-icon" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 7.99992V11.9999M10.25 5.49991H6.8C5.11984 5.49991 4.27976 5.49991 3.63803 5.82689C3.07354 6.11451 2.6146 6.57345 2.32698 7.13794C2 7.77968 2 8.61976 2 10.2999L2 11.4999C2 12.4318 2 12.8977 2.15224 13.2653C2.35523 13.7553 2.74458 14.1447 3.23463 14.3477C3.60218 14.4999 4.06812 14.4999 5 14.4999V18.7499C5 18.9821 5 19.0982 5.00963 19.1959C5.10316 20.1455 5.85441 20.8968 6.80397 20.9903C6.90175 20.9999 7.01783 20.9999 7.25 20.9999C7.48217 20.9999 7.59826 20.9999 7.69604 20.9903C8.64559 20.8968 9.39685 20.1455 9.49037 19.1959C9.5 19.0982 9.5 18.9821 9.5 18.7499V14.4999H10.25C12.0164 14.4999 14.1772 15.4468 15.8443 16.3556C16.8168 16.8857 17.3031 17.1508 17.6216 17.1118C17.9169 17.0756 18.1402 16.943 18.3133 16.701C18.5 16.4401 18.5 15.9179 18.5 14.8736V5.1262C18.5 4.08191 18.5 3.55976 18.3133 3.2988C18.1402 3.05681 17.9169 2.92421 17.6216 2.88804C17.3031 2.84903 16.8168 3.11411 15.8443 3.64427C14.1772 4.55302 12.0164 5.49991 10.25 5.49991Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span className="mi-text">공지사항</span>
        </a>
        <a className="menu-item" href="#?">
          <span className="mi-icon" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span className="mi-text">자주묻는 질문</span>
        </a>
        <a className="menu-item" href="#?">
          <span className="mi-icon" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span className="mi-text">정보</span>
        </a>
        <button className="menu-item danger" type="button">
          <span className="mi-icon" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15.59 21.66C15.4 21.66 15.21 21.59 15.06 21.44C14.77 21.15 14.77 20.67 15.06 20.38L17.88 17.56C18.17 17.27 18.65 17.27 18.94 17.56C19.23 17.85 19.23 18.33 18.94 18.62L16.12 21.44C15.97 21.59 15.78 21.66 15.59 21.66Z" fill="#FF6E6E" />
              <path d="M18.41 21.66C18.22 21.66 18.03 21.59 17.88 21.44L15.06 18.62C14.77 18.33 14.77 17.85 15.06 17.56C15.35 17.27 15.83 17.27 16.12 17.56L18.94 20.38C19.23 20.67 19.23 21.15 18.94 21.44C18.79 21.59 18.6 21.66 18.41 21.66Z" fill="#FF6E6E" />
              <path d="M12.1598 11.62C12.1298 11.62 12.1098 11.62 12.0798 11.62C12.0298 11.61 11.9598 11.61 11.8998 11.62C8.99981 11.53 6.80981 9.25 6.80981 6.44C6.80981 3.58 9.13981 1.25 11.9998 1.25C14.8598 1.25 17.1898 3.58 17.1898 6.44C17.1798 9.25 14.9798 11.53 12.1898 11.62C12.1798 11.62 12.1698 11.62 12.1598 11.62ZM11.9998 2.75C9.96981 2.75 8.30981 4.41 8.30981 6.44C8.30981 8.44 9.86981 10.05 11.8598 10.12C11.9198 10.11 12.0498 10.11 12.1798 10.12C14.1398 10.03 15.6798 8.42 15.6898 6.44C15.6898 4.41 14.0298 2.75 11.9998 2.75Z" fill="#FF6E6E" />
              <path d="M11.9999 22.5599C9.95992 22.5599 8.02992 22.0299 6.56992 21.0499C5.17992 20.1199 4.41992 18.8499 4.41992 17.4799C4.41992 16.1099 5.18992 14.8499 6.56992 13.9299C9.55992 11.9299 14.4199 11.9299 17.4099 13.9299C17.7499 14.1599 17.8499 14.6299 17.6199 14.9699C17.3899 15.3199 16.9199 15.4099 16.5799 15.1799C14.0899 13.5199 9.88992 13.5199 7.39992 15.1799C6.43992 15.8199 5.91992 16.6299 5.91992 17.4799C5.91992 18.3299 6.44992 19.1599 7.39992 19.7999C8.60992 20.6099 10.2399 21.0499 11.9899 21.0499C12.3999 21.0499 12.7399 21.3899 12.7399 21.7999C12.7399 22.2099 12.4099 22.5599 11.9999 22.5599Z" fill="#FF6E6E" />
            </svg>
          </span>
          <span className="mi-text">회원탈퇴</span>
        </button>
      </nav>

      <div className="sep" />

      <nav className="menu-list">
        <a className="menu-item" href="#?">
          <span className="mi-icon" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 12H5.88197C6.56717 12 7.19357 12.3871 7.5 13C7.80643 13.6129 8.43283 14 9.11803 14H14.882C15.5672 14 16.1936 13.6129 16.5 13C16.8064 12.3871 17.4328 12 18.118 12H22M2 12V8.8C2 7.11984 2 6.27976 2.32698 5.63803C2.6146 5.07354 3.07354 4.6146 3.63803 4.32698C4.27976 4 5.11984 4 6.8 4H17.2C18.8802 4 19.7202 4 20.362 4.32698C20.9265 4.6146 21.3854 5.07354 21.673 5.63803C22 6.27976 22 7.11984 22 8.8V12M2 12V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span className="mi-text">아카이브에 보관된 채팅 보기</span>
        </a>
        <button className="menu-item" type="button">
          <span className="mi-icon" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7.5 10.5H7.51M12 10.5H12.01M16.5 10.5H16.51M7 18V20.3355C7 20.8684 7 21.1348 7.10923 21.2716C7.20422 21.3906 7.34827 21.4599 7.50054 21.4597C7.67563 21.4595 7.88367 21.2931 8.29976 20.9602L10.6852 19.0518C11.1725 18.662 11.4162 18.4671 11.6875 18.3285C11.9282 18.2055 12.1844 18.1156 12.4492 18.0613C12.7477 18 13.0597 18 13.6837 18H16.2C17.8802 18 18.7202 18 19.362 17.673C19.9265 17.3854 20.3854 16.9265 20.673 16.362C21 15.7202 21 14.8802 21 13.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V14C3 14.93 3 15.395 3.10222 15.7765C3.37962 16.8117 4.18827 17.6204 5.22354 17.8978C5.60504 18 6.07003 18 7 18ZM8 10.5C8 10.7761 7.77614 11 7.5 11C7.22386 11 7 10.7761 7 10.5C7 10.2239 7.22386 10 7.5 10C7.77614 10 8 10.2239 8 10.5ZM12.5 10.5C12.5 10.7761 12.2761 11 12 11C11.7239 11 11.5 10.7761 11.5 10.5C11.5 10.2239 11.7239 10 12 10C12.2761 10 12.5 10.2239 12.5 10.5ZM17 10.5C17 10.7761 16.7761 11 16.5 11C16.2239 11 16 10.7761 16 10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span className="mi-text">채팅 기록을 아카이브에 보관</span>
        </button>
        <button className="menu-item danger" type="button">
          <span className="mi-icon" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="#FF6E6E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span className="mi-text">채팅 기록 지우기</span>
        </button>
      </nav>
    </div>
  );
}
