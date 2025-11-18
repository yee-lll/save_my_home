import React, { useEffect, useState, useCallback } from "react";
import TopNav from "./TopNav";
import archImg from "../assets/Chart.png";
import axios from "axios";
import { loadTossPayments } from "@tosspayments/payment-sdk";

const CLIENT_KEY = process.env.REACT_APP_TOSS_CLIENT_KEY || "";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE || "http://ceprj.gachon.ac.kr:60003",
  headers: { "Content-Type": "application/json" },
});

export default function Landing() {
  const [faqs, setFaqs] = useState([]);

  // FAQ 불러오는 useEffect 
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/admin/faq");
        const list = res.data || [];
        const mapped = list.map((r) => ({
          q: r.FAQ_Q ?? r.q ?? "",
          a: r.FAQ_A ?? r.a ?? "",
        }));
        setFaqs(mapped.slice(0, 5));
      } catch (e) {
        console.error("[FAQ load error]", e);
        setFaqs([]);
      }
    })();
  }, []);
const handleUpgradeClick = useCallback(async () => {
  try {
    if (!CLIENT_KEY) {
      alert("REACT_APP_TOSS_CLIENT_KEY가 설정되어 있지 않습니다.");
      return;
    }

    const userId =
      localStorage.getItem("USER_ID") ||
      localStorage.getItem("userId") ||
      "";

    if (!userId) {
      alert("로그인 후 이용해 주세요.");
      return;
    }


    const tossPayments = await loadTossPayments(CLIENT_KEY);


    await tossPayments.requestBillingAuth("카드", {
      customerKey: userId, 
      successUrl: `${window.location.origin}/billing/success`,
      failUrl: `${window.location.origin}/billing/fail`,
    });
  } catch (err) {
    console.error("[Toss Billing Auth Error]", err);
    alert("결제 창을 열 수 없습니다: " + (err?.message || String(err)));
  }
}, []);
  return (
    <div className="og-shell">
      <TopNav />
      <section id="function" className="og-hero">
        <div className="og-hero-inner">
          <h1>구해줘! 홈</h1>
          <p>
            법률 상담부터 사무소 탐색까지,<br />
            AI가 법령과 판례를 분석해 정확한 자문을 제시합니다.<br />
            누구나 쉽고 빠르게 법률 자문을 받을 수 있는 새로운 방식.
          </p>
        </div>
        <div className="og-hero-bg" aria-hidden />
      </section>

      <section id="data" className="og-features">
        <h2>구해줘! 홈의 주요 기능</h2>
        <div className="og-grid3">
          <article>
            <h3>AI 법률 상담</h3>
            <p>
              사용자가 입력한 부동산·법률 관련 질문을 AI가 분석하여<br />
              법령과 판례를 근거로 한 정확한 자문을 제공합니다.<br />
              대화형 상담으로 누구나 쉽게 이용할 수 있습니다.
            </p>
          </article>
          <article>
            <h3>지도 기반 법률사무소 탐색</h3>
            <p>
              지도 API를 활용하여,<br />
              내 위치 기반 주변 법률사무소를 한눈에 확인할 수 있습니다.<br />
              전문분야·지역·운영시간 등 다양한 필터로 정확한 매칭이 가능합니다.
            </p>
          </article>
          <article>
            <h3>관리자 통합 관리 시스템</h3>
            <p>
              관리자 전용 페이지에서 법령, 판례, <br />사무소, 공지사항, FAQ 데이터를<br />
              직접 관리하고 서비스 품질을 유지합니다.<br />
            </p>
          </article>
        </div>
      </section>

      <section id="architecture" className="og-arch">
        <div className="og-section-head">
          <h2>시스템 흐름도</h2>
          <p>수집·정제 → 검증 → 인덱싱·검색 → AI 문장 구성 → 상담·피드백의 단계로 동작합니다.</p>
        </div>
        <figure className="og-arch-figure">
          <img src={archImg} alt="구해줘! 홈 시스템 흐름도" />
        </figure>
      </section>

      <section id="pricing" className="og-pricing">
        <h2>요금제 안내</h2>
        <div className="og-plans og-plans-two">
          <div className="og-plan">
            <div className="og-plan-name">Free</div>
            <div className="og-plan-price">₩ 0 / month</div>
            <ul>
              <li>AI 법률 상담 무제한</li>
              <li>파일/이미지 상담 <strong>3개 이하</strong> 가능</li>
              <li>최근 7일 이내 상담기록 열람</li>
              <li>기본 데이터셋(법령·판례) 제공</li>
              <li>일반 처리 우선순위</li>
            </ul>
            <a href="/consult" className="og-btn og-ghost">무료로 시작하기</a>
          </div>

          <div className="og-plan og-plan-dark">
            <div className="og-plan-name">Premium</div>
            <div className="og-plan-price">₩ 10,000 / month</div>
            <ul>
              <li>AI 법률 상담 무제한</li>
              <li>파일/이미지 상담 <strong>제한 없음</strong></li>
              <li>전체 상담기록 & 데이터 저장</li>
              <li>고급 판례 검색 및 추천 기능</li>
              <li>우선 응답 및 전담 지원</li>
            </ul>
            <button type="button" className="og-btn og-primary" onClick={handleUpgradeClick}>
              지금 업그레이드
            </button>
          </div>
        </div>
      </section>

      <section id="feedback" className="og-faq">
        <div className="og-section-head">
          <h2>자주 묻는 질문</h2>
        </div>

        {(faqs.length ? faqs : [
          { q: "1", a: "1" },
          { q: "2", a: "2" },
          { q: "3", a: "3" },
          { q: "4", a: "4" },
          { q: "5", a: "5" },
        ]).map((item, idx) => (
          <details key={idx} className="og-faq-item">
            <summary className="og-faq-q">
              <span>{item.q}</span>
              <span className="og-faq-icon" aria-hidden>+</span>
            </summary>
            <div className="og-faq-a">{item.a}</div>
          </details>
        ))}
      </section>

      <section id="contact" className="og-contact">
        <h2>접근 방법</h2>
        <p>추가 문의: adbc1234@gachon.ac.kr</p>
        <div className="og-cta-row">
          <a className="og-btn og-primary" href="/admin/login">관리자 로그인</a>
          <a className="og-btn og-ghost" href="/console">상담</a>
        </div>
      </section>
    </div>
  );
}
