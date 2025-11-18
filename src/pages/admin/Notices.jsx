/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import {
  listNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../../api/noticeApi";
import Pagination from "./Pagination";
import InNav from "./InNav";

export default function Notices() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState({ key: "id", dir: "desc" });
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const [modal, setModal] = useState(null); 
  const [createOpen, setCreateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const toggleSort = (k) =>
    setSort((s) =>
      s.key === k ? { ...s, dir: s.dir === "asc" ? "desc" : "asc" } : { key: k, dir: "asc" }
    );

  const load = async () => {
    setLoading(true);
    try {
      const list = await listNotices();

      const mapped = (list || []).map((r) => {
        const id = r.NOTICE_ID ?? r.id ?? r.noticeId;
        const titleFromDb = r.NOTICE_TITLE ?? r.noticeTitle ?? "";
        const raw = r.NOTICE_INFO ?? r.noticeInfo ?? "";

        let title = titleFromDb || "";
        let desc = "";

        if (raw && typeof raw === "string") {
          // 기존데이터가 JSON이 들어 있을 가능성
          try {
            const obj = JSON.parse(raw);
            if (!title) title = obj.title || "";
            desc = obj.desc || obj.description || raw;
          } catch {

            desc = raw;
          }
        }

        return { id, title, desc };
      });

      setRows(mapped);
    } catch (e) {
      console.error(e);
      alert("공지 목록 불러오기 실패: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);


  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    const sorted = [...rows].sort((a, b) => {
      const d = sort.dir === "asc" ? 1 : -1;
      const ak = a[sort.key] ?? "";
      const bk = b[sort.key] ?? "";
      return (ak > bk ? 1 : ak < bk ? -1 : 0) * d;
    });

    if (!qq) return sorted;

    return sorted.filter(
      (r) =>
        (r.title || "").toLowerCase().includes(qq) ||
        (r.desc || "").toLowerCase().includes(qq)
    );
  }, [rows, q, sort]);


  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);

  const pagedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const save = async (data) => {
    if (!data.title?.trim()) return alert("공지 제목을 입력하세요.");
    if (!data.desc?.trim()) return alert("공지 내용을 입력하세요.");

    const title = data.title.trim();
    const desc = data.desc.trim();

    const payload = {
      noticeTitle: title,
      noticeInfo: desc,
    };

    try {
      if (data.id) {
        await updateNotice(data.id, payload);
      } else {
        await createNotice(payload);
      }
      await load();
      setModal(null);
    } catch (e) {
      console.error(e);
      alert("저장 실패: " + e.message);
    }
  };

  // 🔹 삭제
  const remove = async (id) => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    try {
      await deleteNotice(id);
      await load();
    } catch (e) {
      console.error(e);
      alert("삭제 실패: " + e.message);
    }
  };

  return (
    <>

      <InNav
      title="공지사항"
        onAdd={() => setModal({ title: "", desc: "" })}
        q={q}
        onQChange={setQ}
      />

      {loading && <div style={{ padding: 12 }}>로딩중…</div>}

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => toggleSort("title")}>제목</th>
            <th style={{ width: 160 }}>관리</th>
          </tr>
        </thead>
        <tbody>
          {pagedRows.map((r) => (
            <tr key={r.id}>
              <td>
                <details>
                  <summary>{r.title}</summary>
                  <div
                    style={{
                      padding: "8px 0 0 12px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {r.desc}
                  </div>
                </details>
              </td>
              <td className="row-actions">
                <button className="small-btn" onClick={() => setModal(r)}>
                  수정
                </button>
                <button className="small-btn" onClick={() => remove(r.id)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}

          {pagedRows.length === 0 && !loading && (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                데이터 없음
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{modal.id ? "공지 수정" : "공지 생성"}</h3>
            <div className="form">
              <label>공지 제목</label>
              <input
                placeholder="제목을 입력하세요"
                value={modal.title}
                onChange={(e) =>
                  setModal((m) => ({ ...m, title: e.target.value }))
                }
              />

              <label>공지 내용</label>
              <textarea
                rows={5}
                placeholder="공지 상세 내용을 입력하세요"
                value={modal.desc}
                onChange={(e) =>
                  setModal((m) => ({ ...m, desc: e.target.value }))
                }
              />
            </div>

            <div className="actions">
              <button className="small-btn" onClick={() => save(modal)}>
                {modal.id ? "수정" : "생성"}
              </button>
              <button className="small-btn" onClick={() => setModal(null)}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {!createOpen && !detailOpen && (
        <Pagination
          page={currentPage}
          pageCount={pageCount}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(pageCount, p + 1))}
        />
      )}
    </>
  );
}
