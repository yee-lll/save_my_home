import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import http from "../../api/http";

export default function Sub() {
  const { search, pathname } = useLocation();
  const nav = useNavigate();
  const qs = new URLSearchParams(search);
  const [msg, setMsg] = useState("처리 중...");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (pathname.endsWith("/success")) {
          const customerKey = qs.get("customerKey");
          const authKey = qs.get("authKey");
          if (!customerKey || !authKey) {
            if (!cancelled) setMsg("필수 파라미터 누락");
            return;
          }
          await http.post("/sub/confirm", { customerKey, authKey });
          if (!cancelled) {
            setMsg("구독이 활성화되었습니다.");
            setTimeout(() => nav("/?upgraded=1"), 900);
          }
        } else {
          const code = qs.get("code");
          const message = qs.get("message");
          if (!cancelled) setMsg(`결제가 취소/실패되었습니다. [${code}] ${message || ""}`);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setMsg("처리 실패: " + (e?.response?.data?.message || e.message));
      }
    })();
    return () => { cancelled = true; };
      // eslint-disable-next-line
  }, [pathname, nav, search]); 

  return (
    <div style={{ padding: 24 }}>
      <h2>결제 처리</h2>
      <p>{msg}</p>
    </div>
  );
}
