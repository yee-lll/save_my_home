import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../styles/admin.css";
import {
  listPrecedents,
  searchPrecedents,
  getPrecedent,
} from "../../api/precedentApi";
import InNav from "./InNav";
import Pagination from "./Pagination";

// 국가법령정보 DRF HTML 뷰 /판례 상세
const LAW_DRF_HTML_BASE = "https://www.law.go.kr/DRF/lawService.do";
const LAW_API_OC = "jangyeri2002"; 

function truncateMiddle(str = "", head = 14, tail = 6) {
  if (!str) return "-";
  const len = str.length;
  if (len <= head + tail + 1) return str;
  return `${str.slice(0, head)}…${str.slice(-tail)}`;
}

export default function Cases() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [detailOpen, setDetailOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  // 목록 로딩 
  const load = useCallback(
    async (opts = {}) => {
      setLoading(true);
      try {
        const keyword = (opts.keyword ?? q).trim();

        let res;
        if (keyword) {
          // 검색
          res = await searchPrecedents({ keyword });
        } else {
          // 기본 목록
          res = await listPrecedents();
        }

        if (res?.success) {
          const data = res.data || {};
          const items = Array.isArray(data.items) ? data.items : [];
          setRows(items);

          setCurrentPage(1);
        } else {
          setRows([]);
          setCurrentPage(1);
        }
      } catch (e) {
        console.error("[precedents] load error", e);
        setRows([]);
        setCurrentPage(1);
      } finally {
        setLoading(false);
      }
    },
    [q]
  );

  useEffect(() => {
    load();
  }, [load]);

  const onSearch = () => {
    load({ keyword: q });
  };

  const totalPages = useMemo(() => {
    if (!rows || rows.length === 0) return 1;
    return Math.ceil(rows.length / itemsPerPage);
  }, [rows]);

  const pagedRows = useMemo(() => {
    if (!rows) return [];
    const safePage =
      currentPage > totalPages ? totalPages : currentPage < 1 ? 1 : currentPage;
    const start = (safePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return rows.slice(start, end);
  }, [rows, currentPage, totalPages]);

  const norm = (obj, keys) => {
    for (const k of keys) {
      if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== "") {
        return obj[k];
      }
    }
    return "";
  };

  const openDetail = async (id) => {
    if (!id) return;
    setDetailOpen(true);
    setDetail(null);

    try {
      const res = await getPrecedent(id);
      if (res?.success && res.data) {
        setDetail(res.data);
        return;
      }

     
      setDetailOpen(false);
      const url = `${LAW_DRF_HTML_BASE}?OC=${encodeURIComponent(
        LAW_API_OC
      )}&target=prec&type=HTML&ID=${encodeURIComponent(id)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      console.error("precedent detail error", e);
     
      setDetailOpen(false);
      const url = `${LAW_DRF_HTML_BASE}?OC=${encodeURIComponent(
        LAW_API_OC
      )}&target=prec&type=HTML&ID=${encodeURIComponent(id)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setDetail(null);
  };

  return (
    <>
   
      <InNav title="판례" q={q} onQChange={setQ} onSearch={onSearch} />

      {loading && <div style={{ padding: 12 }}>로딩중…</div>}

      <table className="table cases-table">
        <colgroup>
          <col style={{ width: "110px" }} />
          <col style={{ width: "360px" }} />
          <col style={{ width: "180px" }} />
          <col style={{ width: "140px" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "100px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>판례일련번호</th>
            <th>사건명</th>
            <th>사건번호</th>
            <th>선고일자</th>
            <th>법원명</th>
            <th>판결유형</th>
            <th>상세</th>
          </tr>
        </thead>
        <tbody>
          {pagedRows.map((r, idx) => {
            const id = norm(r, ["판례일련번호", "판례번호", "id", "ELMNO"]);
            const caseName = norm(r, ["사건명", "caseName"]);
            const caseNo = norm(r, ["사건번호", "caseNo"]);
            const date = norm(r, ["선고일자", "judgementDate", "date"]);
            const court = norm(r, ["법원명", "courtName"]);
            const type = norm(r, ["판결유형", "caseType"]);

            return (
              <tr key={id || idx}>
                <td>{id}</td>
                <td className="ellipsis w-name" title={caseName || ""}>
                  {caseName || "-"}
                </td>
                <td className="ellipsis w-no" title={caseNo || ""}>
                  {truncateMiddle(caseNo || "", 10, 4)}
                </td>
                <td>{date || "-"}</td>
                <td>{court || "-"}</td>
                <td>{type || "-"}</td>
                <td className="row-actions">
                  <button
                    className="small-btn"
                    type="button"
                    onClick={() => openDetail(id)}
                  >
                    보기
                  </button>
                </td>
              </tr>
            );
          })}

          {!loading && pagedRows.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                데이터 없음
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!detailOpen && rows.length > 0 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPrev={() =>
            setCurrentPage((p) => (p > 1 ? p - 1 : p))
          }
          onNext={() =>
            setCurrentPage((p) => (p < totalPages ? p + 1 : p))
          }
        />
      )}

      {/* 상세 모달 */}
      {detailOpen && (
        <div className="modal-backdrop" onClick={closeDetail}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>판례 상세</h3>
            {!detail && <div style={{ padding: 8 }}>불러오는 중…</div>}

            {detail && !detail.error && (
              <div
                className="form"
                style={{ maxHeight: 400, overflow: "auto" }}
              >
                <div>
                  <strong>판례일련번호</strong>
                  <div>{detail["판례일련번호"] || "-"}</div>
                </div>
                <div>
                  <strong>사건명</strong>
                  <div>{detail["사건명"] || "-"}</div>
                </div>
                <div>
                  <strong>사건번호</strong>
                  <div>{detail["사건번호"] || "-"}</div>
                </div>
                <div>
                  <strong>선고일자</strong>
                  <div>{detail["선고일자"] || "-"}</div>
                </div>
                <div>
                  <strong>법원명</strong>
                  <div>{detail["법원명"] || "-"}</div>
                </div>
                <div>
                  <strong>판결유형</strong>
                  <div>{detail["판결유형"] || "-"}</div>
                </div>
                <div>
                  <strong>판시사항</strong>
                  <div>{detail["판시사항"] || "-"}</div>
                </div>
                <div>
                  <strong>참조판례</strong>
                  <div>{detail["참조판례"] || "-"}</div>
                </div>
                <div>
                  <strong>참조조문</strong>
                  <div>{detail["참조조문"] || "-"}</div>
                </div>
                <div>
                  <strong>판결요지</strong>
                  <div>{detail["판결요지"] || "-"}</div>
                </div>
                <div>
                  <strong>판례내용</strong>
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {detail["판례내용"] || "-"}
                  </div>
                </div>
              </div>
            )}

            <div className="actions">
              <button
                className="small-btn"
                type="button"
                onClick={closeDetail}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
