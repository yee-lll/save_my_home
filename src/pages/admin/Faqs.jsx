/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { listFAQ, createFAQ, updateFAQ, deleteFAQ } from "../../api/faqApi";
import "../../styles/admin.css";
import Pagination from "./Pagination";
import InNav from "./InNav";

export default function Faqs() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState("");
    const [modal, setModal] = useState(null);
    const [openId, setOpenId] = useState(null);
    const [sort, setSort] = useState({ key: "updated", dir: "desc" });
    const [createOpen, setCreateOpen] = useState(false);

    const [detailOpen, setDetailOpen] = useState(false);
    //페이지
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 10;

    //정렬된 데이터
    const sorted = useMemo(() => {
        const cp = [...rows];
        cp.sort((a, b) => {
            const { key, dir } = sort;
            const d = dir === "asc" ? 1 : -1;
            return (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * d;
        });
        return cp;
    }, [rows, sort]);

    const toggleSort = (k) =>
        setSort((s) =>
            s.key === k ? { ...s, dir: s.dir === "asc" ? "desc" : "asc" } : { key: k, dir: "asc" }
        );

    const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);

    const pagedRows = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return sorted.slice(start, start + PAGE_SIZE);
    }, [sorted, currentPage]);

    const load = async () => {
        setLoading(true);
        try {
            const list = await listFAQ(); // 
            const mapped = (list || []).map((r) => ({
                id: r.FAQ_ID ?? r.id,
                q: r.FAQ_Q ?? r.q ?? "",
                a: r.FAQ_A ?? r.a ?? "",
            }));
            setRows(mapped);
        } catch (e) {
            alert("목록 불러오기 실패: " + e.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { load(); }, []);

    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();
        if (!qq) return rows;
        return rows.filter((r) =>
            (r.q || "").toLowerCase().includes(qq) ||
            (r.a || "").toLowerCase().includes(qq)
        );
    }, [rows, q]);

    const save = async (data) => {
        if (!data.q?.trim()) return alert("질문을 입력하세요.");
        if (!data.a?.trim()) return alert("답변을 입력하세요.");
        const payload = { faqQ: data.q.trim(), faqA: data.a.trim() };
        try {
            if (data.id) await updateFAQ(data.id, payload);
            else await createFAQ(payload);
            await load();
            setModal(null);
        } catch (e) {
            alert("저장 실패: " + e.message);
        }
    };

    const remove = async (id) => {
        if (!window.confirm("삭제하시겠습니까?")) return;
        try {
            await deleteFAQ(id);
            await load();
        } catch (e) {
            alert("삭제 실패: " + e.message);
        }
    };
    const toggleOpen = (id) => setOpenId((cur) => (cur === id ? null : id));
    return (
        <>
            <InNav title="FAQ" q={q} onQChange={setQ} onAdd={() => setModal({ q: "", a: "" })} />

            {loading && <div style={{ padding: 12 }}>로딩중…</div>}

            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "45%" }}>질문</th>
                        <th>답변</th>
                        <th style={{ width: 160 }}>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((r) => {
                        const short = r.a.length > 20 ? r.a.slice(0, 20) + "..." : r.a;
                        const isLong = r.a.length > 20;
                        return (
                            <React.Fragment key={r.id}>
                                <tr>
                                    <td>{r.q}</td>
                                    <td>
                                        {isLong ? (
                                            <button
                                                className="linklike"
                                                onClick={() => toggleOpen(r.id)}
                                                title="답변 전체 보기"
                                            >
                                                {short}
                                            </button>
                                        ) : (
                                            <span>{r.a}</span>
                                        )}
                                    </td>
                                    <td className="row-actions">
                                        <button className="small-btn" onClick={() => setModal(r)}>수정</button>
                                        <button className="small-btn" onClick={() => remove(r.id)}>삭제</button>
                                    </td>
                                </tr>

                                {openId === r.id && isLong && (
                                    <tr className="faq-answer-row">
                                        <td colSpan={3}>
                                            <div className="faq-answer-full">{r.a}</div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                    {filtered.length === 0 && !loading && (
                        <tr><td colSpan={3} style={{ textAlign: "center" }}>데이터 없음</td></tr>
                    )}
                </tbody>
            </table>

            {modal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h3>{modal.id ? "FAQ 수정" : "FAQ 생성"}</h3>
                        <div className="form">
                            <label>질문</label>
                            <input
                                placeholder="질문 내용을 입력하세요"
                                value={modal.q}
                                onChange={(e) => setModal(m => ({ ...m, q: e.target.value }))}
                            />
                            <label>답변</label>
                            <textarea
                                rows={5}
                                placeholder="답변 내용을 입력하세요"
                                value={modal.a}
                                onChange={(e) => setModal(m => ({ ...m, a: e.target.value }))}
                            />
                        </div>
                        <div className="actions">
                            <button className="small-btn" onClick={() => save(modal)}>
                                {modal.id ? "수정" : "생성"}
                            </button>
                            <button className="small-btn" onClick={() => setModal(null)}>닫기</button>
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
                />)}
        </>

    );
}