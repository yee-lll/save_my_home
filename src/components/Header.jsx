import React from "react";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="header">
      <button className="hamburger" onClick={onToggleSidebar} aria-label="사이드바 토글">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.3125C0 0.587626 0.537258 0 1.2 0H22.8C23.4627 0 24 0.587626 24 1.3125C24 2.03737 23.4627 2.625 22.8 2.625H1.2C0.537258 2.625 0 2.03737 0 1.3125ZM0 10.5C0 9.77513 0.537258 9.1875 1.2 9.1875H22.8C23.4627 9.1875 24 9.77513 24 10.5C24 11.2249 23.4627 11.8125 22.8 11.8125H1.2C0.537258 11.8125 0 11.2249 0 10.5ZM0 19.6875C0 18.9626 0.537258 18.375 1.2 18.375H22.8C23.4627 18.375 24 18.9626 24 19.6875C24 20.4124 23.4627 21 22.8 21H1.2C0.537258 21 0 20.4124 0 19.6875Z" fill="white" />
        </svg>
      </button>

      <div className="brand">
        <div className="avatar" aria-hidden="true" />
        <div className="title-wrap">
          <div className="title">법률 자문 서비스</div>

        </div>
      </div>

      <div className="header-actions">
        <button className="icon-btn" title="기타기능" aria-label="기타기능">Icon</button>
        <button className="icon-btn" title="설정" aria-label="설정">
          Icon
        </button>
      </div>
    </header>
  );
}
