import React from "react";

export default function Sidebar({ open=false, onClose }) {
  const items = [
    { id: 1, title:"상담 주제", sub:"몇시간전 / 상담 내용 일부 요약" },
    { id: 2, title:"상담 주제2", sub:"몇분 전 / 상담 내용 일부 요약" },
  ];
  return (
    <aside className={`user-sidebar ${open ? "open" : ""}`}>
      <button className="new-chat">+ 새로운 상담 시작</button>
      <div className="section-title">최근 상담 내역</div>
      <div className="list">
        {items.map(it=>(
          <div key={it.id} className="item">
            <div className="title">{it.title}</div>
            <div className="sub">{it.sub}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
