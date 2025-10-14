import React from "react";

const items = [
  { id: 1, label: "상담 주제1", time: "약 1시간 전", icon: "1" },
  { id: 2, label: "상담 주제2", time: "약 30분 전", icon: "2" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* 모바일 오버레이 */}
      <div className={`overlay ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <button className="new-chat">+ 새로운 상담 시작</button>
        <div className="recent-label">최근 상담 내역</div>
        <ul className="recent-list">
          {items.map((it, idx) => (
            <li key={it.id} className={`recent-item ${idx === 0 ? "active" : ""}`}>
              <div className="recent-icon" aria-hidden="true">{it.icon}</div>
              <div className="recent-text">
                <div className="recent-title">{it.label}</div>
                <div className="recent-time">{it.time}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="notice">
          본 상담은 참고용이며<br />
          내용 경고
        </div>
      </aside>
    </>
  );
}
