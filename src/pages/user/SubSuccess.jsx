import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://ceprj.gachon.ac.kr:60003";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SubSuccess() {
  const query = useQuery();
  const navigate = useNavigate();
  const [state, setState] = useState({ loading: true, error: "", done: false });

  useEffect(() => {
    const run = async () => {
      try {
        const authKey = query.get("authKey");
        const customerKey = query.get("customerKey");
        if (!authKey || !customerKey) {
          throw new Error("authKey 또는 customerKey 가 없습니다.");
        }
        const res = await axios.post(`${API_BASE}/api/sub/billing/confirm`, {
          authKey,
          customerKey,
          amount: 20000,
          orderName: "프리미엄 구독 1개월",
        });

        if (!res.data?.ok) {
          throw new Error(res.data?.message || "결제 처리 실패");
        }

        setState({ loading: false, error: "", done: true });
      } catch (err) {
        console.error("[SubSuccess]", err);
        setState({
          loading: false,
          error: err?.response?.data?.message || err.message || "오류",
          done: false,
        });
      }
    };

    run();
  }, [query]);

  return (
    <div style={{ padding: 32 }}>
      <h2>구독 결제 완료</h2>
      {state.loading && <p>결제 처리 중입니다...</p>}
      {state.error && (
        <p style={{ color: "crimson" }}>
          결제 처리 중 오류가 발생했습니다: {state.error}
        </p>
      )}
      {state.done && <p>프리미엄 구독이 활성화되었습니다.</p>}
      <button onClick={() => navigate("/console")}>콘솔로 이동</button>
    </div>
  );
}
