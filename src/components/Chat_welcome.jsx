import React from "react";

export default function ChatWelcome() {
  return (
    <div className="welcome">
      <div className="welcome-icon" aria-hidden="true"></div>
      <h1>법률 자문 서비스</h1>
      <p>
        궁금한 법률 문제를 자유롭게 질문
        <br />
        판례, 벌금, 절차 등 민사법 관련 질문
      </p>
    </div>
  );
}
