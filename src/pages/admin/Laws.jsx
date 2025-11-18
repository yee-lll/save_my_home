import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../styles/admin.css";
import { listRequiredLaws, getLawArticles } from "../../api/lawApi";
import InNav from "./InNav";

function norm(obj, keys, fallback = "") {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== "") {
      return obj[k];
    }
  }
  return fallback;
}

function truncateMiddle(str = "", head = 16, tail = 4) {
  if (!str) return "";
  const len = str.length;
  if (len <= head + tail + 1) return str;
  return `${str.slice(0, head)}…${str.slice(-tail)}`;
}

export default function Laws() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const [detailOpen, setDetailOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [articlesError, setArticlesError] = useState(null);
  const [articleQ, setArticleQ] = useState("");

  //필수 법령 or 검색
  const load = useCallback(
    async (opts = {}) => {
      setLoading(true);
      try {
        const keyword = (opts.keyword ?? q).trim();


        const res = await listRequiredLaws();

        let list = [];
        if (res?.success) {
          if (Array.isArray(res.data)) {
            list = res.data;
          } else if (Array.isArray(res.data?.items)) {
            list = res.data.items;
          }
        }

        // 필터링
        if (keyword) {
          const lower = keyword.toLowerCase();
          list = list.filter((item) => {
            const name = norm(
              item,
              ["법령명한글", "법령명", "lawName"],
              ""
            ).toLowerCase();
            return name.includes(lower);
          });
        }

        setRows(list);
      } catch (err) {
        console.error("[laws] load error", err);
        setRows([]);
      } finally {
        setLoading(false);
      }
    },
    [q]
  );

  useEffect(() => {
    load();
  }, [load]);

  const onSearch = () => load({ keyword: q });

  const data = useMemo(() => rows || [], [rows]);

  // 상세 열기 / 조문 조회
  const openDetail = async (row) => {
    setDetail(row);
    setDetailOpen(true);

    setArticles([]);
    setArticlesError(null);
    setArticleQ(""); 

    const lawSeq = norm(row, ["법령일련번호", "lawSeq"], null);
    if (!lawSeq) return;

    try {
      setArticlesLoading(true);
      const res = await getLawArticles(lawSeq);

      let list = [];
      if (res?.success) {
        const d = res.data;
        if (Array.isArray(d)) list = d;
        else if (Array.isArray(d.articles)) list = d.articles;
      }

      if (!list || list.length === 0) {
        setArticlesError("조문 정보를 찾을 수 없습니다.");
        setArticles([]);
      } else {
        setArticles(list);
      }
    } catch (e) {
      console.error("조문 조회 오류", e);
      setArticlesError("조문 조회 중 오류가 발생했습니다.");
      setArticles([]);
    } finally {
      setArticlesLoading(false);
    }
  };

  const filteredArticles = useMemo(() => {
    if (!articleQ.trim()) return articles;
    const kw = articleQ.trim().toLowerCase();

    return articles.filter((a) => {
      const num = (a.조문번호 || a.articleNo || "").toString();
      const title = (a.조문제목 || "").toString();
      const content = (a.조문내용 || "").toString();
      const haystack = (num + " " + title + " " + content).toLowerCase();
      return haystack.includes(kw);
    });
  }, [articles, articleQ]);

  const closeDetail = () => {
    setDetailOpen(false);
    setDetail(null);
    setArticles([]);
    setArticlesError(null);
    setArticleQ("");
  };

  return (
    <>
      <InNav title="법률" q={q} onQChange={setQ} onSearch={onSearch} />

      {loading && <div style={{ padding: 12 }}>로딩 중…</div>}

      <table className="table laws-table">
        <colgroup>
          <col style={{ width: "140px" }} /> 
          <col style={{ width: "520px" }} /> 
          <col style={{ width: "180px" }} /> 
          <col style={{ width: "120px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>법령일련번호</th>
            <th>법령명</th>
            <th>시행일자</th>
            <th>상세</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, idx) => {
            const serial = norm(r, ["법령일련번호", "lawSeq"], "-");
            const name = norm(
              r,
              ["법령명한글", "법령명", "lawName"],
              ""
            );
            const effDate = norm(r, ["시행일자", "시행일"], "-");

            return (
              <tr key={serial || idx}>
                <td>{serial}</td>
                <td className="ellipsis w-name" title={name || ""}>
                  {truncateMiddle(name || "-", 28, 6)}
                </td>
                <td>{effDate || "-"}</td>
                <td className="row-actions">
                  <button
                    className="small-btn"
                    type="button"
                    onClick={() => openDetail(r)}
                  >
                    보기
                  </button>
                </td>
              </tr>
            );
          })}
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                데이터 없음
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 상세 모달 */}
      {detailOpen && (
        <div className="modal-backdrop" >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>법령 상세</h3>

            {detail && (
              <div
                className="form"
                style={{ maxHeight: 420, overflow: "auto" }}
              >
                <div>
                  <strong>법령명</strong>
                  <div>
                    {norm(
                      detail,
                      ["법령명한글", "법령명", "lawName"],
                      "-"
                    )}
                  </div>
                </div>
                <div>
                  <strong>법령일련번호</strong>
                  <div>
                    {norm(detail, ["법령일련번호", "lawSeq"], "-")}
                  </div>
                </div>
                <div>
                  <strong>시행일자</strong>
                  <div>
                    {norm(detail, ["시행일자", "시행일"], "-")}
                  </div>
                </div>

                <hr style={{ margin: "16px 0" }} />
                <strong>조문 목록</strong>
                {articles.length > 0 && (
                  <div style={{ marginTop: 8, marginBottom: 8 }}>
                    <input
                      type="text"
                      placeholder="조문 검색 "
                      value={articleQ}
                      onChange={(e) => setArticleQ(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "6px 8px",
                        fontSize: 13,
                        boxSizing: "border-box",
                        borderRadius: 6,
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                )}

                {articlesLoading && (
                  <div style={{ marginTop: 8 }}>조문 불러오는 중…</div>
                )}

                {articlesError && (
                  <div style={{ marginTop: 8, color: "red" }}>
                    {articlesError}
                  </div>
                )}

                {!articlesLoading && !articlesError && (
                  <>
                    {articles.length === 0 ? (
                      <div style={{ marginTop: 8, fontSize: 13 }}>
                        조문 정보가 없습니다.
                      </div>
                    ) : filteredArticles.length === 0 ? (
                      <div style={{ marginTop: 8, fontSize: 13 }}>
                        검색 결과가 없습니다.
                      </div>
                    ) : (
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          marginTop: 8,
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {filteredArticles.map((a) => (
                          <li
                            key={a.조문번호 || a.articleNo}
                            style={{
                              border: "1px solid #eee",
                              borderRadius: 8,
                              padding: 8,
                              background: "#fafafa",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 600,
                                marginBottom: 4,
                                fontSize: 14,
                              }}
                            >
                              제{a.조문번호}조 {a.조문제목}
                            </div>
                            {a.조문내용 && (
                              <div
                                style={{
                                  whiteSpace: "pre-wrap",
                                  fontSize: 13,
                                  lineHeight: 1.4,
                                }}
                              >
                                {a.조문내용}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            )}

            <div className="actions">
              <button className="small-btn" type="button" onClick={closeDetail}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}