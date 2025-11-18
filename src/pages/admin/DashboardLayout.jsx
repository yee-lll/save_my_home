import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("USER_ID");
        localStorage.removeItem("USER_ROLE");
        localStorage.removeItem("ACCESS_TOKEN");
        navigate("/", { replace: true });
    };

    return (
        <div className="admin-shell">
            <aside className="admin-sidebar">
                <div className="admin-logo">구해줘, 홈!</div>
                <nav className="admin-menu">
                    <NavLink to="/admin/users" className={({ isActive }) => isActive ? "active" : undefined}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7M11.9999 21.5L14.025 21.095C14.2015 21.0597 14.2898 21.042 14.3721 21.0097C14.4452 20.9811 14.5147 20.9439 14.579 20.899C14.6516 20.8484 14.7152 20.7848 14.8426 20.6574L21.5 14C22.0524 13.4477 22.0523 12.5523 21.5 12C20.9477 11.4477 20.0523 11.4477 19.5 12L12.8425 18.6575C12.7152 18.7848 12.6516 18.8484 12.601 18.921C12.5561 18.9853 12.5189 19.0548 12.4902 19.1278C12.458 19.2102 12.4403 19.2984 12.405 19.475L11.9999 21.5ZM13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>사용자 관리
                    </NavLink>
                    <NavLink to="/admin/cases" className={({ isActive }) => isActive ? "active" : undefined}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clipPath="url(#clip0_270_11794)">
                                <path d="M13 10L20.383 17.418C21.206 18.238 21.206 19.566 20.383 20.385C19.9876 20.7783 19.4527 20.999 18.895 20.999C18.3373 20.999 17.8024 20.7783 17.407 20.385L10 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 9L10 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13 10L9 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 21H10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6.79297 15.793L3.20697 12.207C3.0195 12.0194 2.91418 11.7651 2.91418 11.5C2.91418 11.2348 3.0195 10.9805 3.20697 10.793L5.49997 8.49997L5.99997 8.99997L8.99997 5.99997L8.49997 5.49997L10.793 3.20697C10.9805 3.0195 11.2348 2.91418 11.5 2.91418C11.7651 2.91418 12.0194 3.0195 12.207 3.20697L15.793 6.79297C15.9804 6.9805 16.0858 7.23481 16.0858 7.49997C16.0858 7.76514 15.9804 8.01944 15.793 8.20697L13.5 10.5L13 9.99997L9.99997 13L10.5 13.5L8.20697 15.793C8.01944 15.9804 7.76514 16.0858 7.49997 16.0858C7.23481 16.0858 6.9805 15.9804 6.79297 15.793Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_270_11794">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg> 판례 관리
                    </NavLink>
                    <NavLink to="/admin/laws" className={({ isActive }) => isActive ? "active" : undefined}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clipPath="url(#clip0_270_11786)">
                                <path d="M7 20H17" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 6L12 5L18 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 3V20" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 12L6 6L3 12C3 12.7956 3.31607 13.5587 3.87868 14.1213C4.44129 14.6839 5.20435 15 6 15C6.79565 15 7.55871 14.6839 8.12132 14.1213C8.68393 13.5587 9 12.7956 9 12Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 12L18 6L15 12C15 12.7956 15.3161 13.5587 15.8787 14.1213C16.4413 14.6839 17.2044 15 18 15C18.7956 15 19.5587 14.6839 20.1213 14.1213C20.6839 13.5587 21 12.7956 21 12Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></g><defs>
                                <clipPath id="clip0_270_11786">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg> 법률 관리
                    </NavLink>
                    <NavLink to="/admin/offices" className={({ isActive }) => isActive ? "active" : undefined}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clipPath="url(#clip0_270_12587)">
                                <path d="M3 21H21" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 8H10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 12H10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 16H10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 8H15" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 12H15" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 16H15" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></g>
                            <defs>
                                <clipPath id="clip0_270_12587">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg> 법률사무소 관리
                    </NavLink>
                    <NavLink to="/admin/notices" className={({ isActive }) => isActive ? "active" : undefined}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M22 8.00004V12M10.25 5.50003H6.8C5.11984 5.50003 4.27976 5.50003 3.63803 5.82701C3.07354 6.11463 2.6146 6.57358 2.32698 7.13806C2 7.7798 2 8.61988 2 10.3L2 11.5C2 12.4319 2 12.8979 2.15224 13.2654C2.35523 13.7555 2.74458 14.1448 3.23463 14.3478C3.60218 14.5 4.06812 14.5 5 14.5V18.75C5 18.9822 5 19.0983 5.00963 19.1961C5.10316 20.1456 5.85441 20.8969 6.80397 20.9904C6.90175 21 7.01783 21 7.25 21C7.48217 21 7.59826 21 7.69604 20.9904C8.64559 20.8969 9.39685 20.1456 9.49037 19.1961C9.5 19.0983 9.5 18.9822 9.5 18.75V14.5H10.25C12.0164 14.5 14.1772 15.4469 15.8443 16.3557C16.8168 16.8858 17.3031 17.1509 17.6216 17.1119C17.9169 17.0757 18.1402 16.9431 18.3133 16.7011C18.5 16.4402 18.5 15.918 18.5 14.8737V5.12632C18.5 4.08203 18.5 3.55988 18.3133 3.29892C18.1402 3.05694 17.9169 2.92433 17.6216 2.88816C17.3031 2.84916 16.8168 3.11423 15.8443 3.64439C14.1772 4.55315 12.0164 5.50003 10.25 5.50003Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> 공지사항 관리
                    </NavLink>
                    <NavLink to="/admin/faqs" className={({ isActive }) => isActive ? "active" : undefined}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> 자주 묻는 질문 관리
                    </NavLink>
                </nav>

                <button className="small-btn-logout" onClick={handleLogout}>
                    로그아웃
                </button>
            </aside>

            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
}
