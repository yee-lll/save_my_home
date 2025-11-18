/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import http from "../../api/http";
import "../../styles/admin.css";
import Pagination from "./Pagination";
import InNav from "./InNav";



function toShortAddress(addr) {
    if (!addr) return "";
    const parts = String(addr).split(" ").filter(Boolean);
    if (parts.length <= 2) return parts.join(" ");
    return parts.slice(0, 2).join(" ");
}

export default function Offices() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState("");
    const [modal, setModal] = useState(null);


    const [page, setPage] = useState(1);
    const PAGE_SIZE = 10;

    const load = async () => {
        setLoading(true);
        try {
            const list = await http.get("/admin/office").then((r) => r.data);

            const mapped = (list || []).map((r) => {
                const officeId = r.OFFICE_ID ?? r.officeId ?? r.id;
                const officeName = r.OFFICE_NAME ?? r.officeName ?? "";
                const officeTel = r.OFFICE_TEL ?? r.officeTel ?? "";
                const fullAddr =
                    r.OFFICE_ADD ?? r.OFFICE_LOCATION ?? r.officeAddress ?? "";
                const shortAddress = toShortAddress(fullAddr);

                return {
                    officeId,
                    officeName,
                    officeTel,
                    officeAddress: fullAddr,
                    shortAddress,
                };
            });

            setRows(mapped);
        } catch (e) {
            console.error(e);
            alert("법률사무소 목록 불러오기 실패: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);


    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();
        if (!qq) return rows;
        return rows.filter((r) => {
            const name = r.officeName?.toLowerCase() ?? "";
            const addr = r.officeAddress?.toLowerCase() ?? "";
            return name.includes(qq) || addr.includes(qq);
        });
    }, [rows, q]);

    const sorted = useMemo(() => {
        const cp = [...filtered];
        cp.sort((a, b) => {
            const an = Number(a.officeId);
            const bn = Number(b.officeId);

            if (!Number.isNaN(an) && !Number.isNaN(bn)) {
                return an - bn;
            }

            return String(a.officeId).localeCompare(String(b.officeId), "ko", {
                numeric: true,
            });
        });
        return cp;
    }, [filtered]);

    const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);

    const pagedRows = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return sorted.slice(start, start + PAGE_SIZE);
    }, [sorted, currentPage]);

    useEffect(() => {
        if (page > pageCount) setPage(pageCount);
    }, [page, pageCount]);


    const save = async () => {
        if (!modal) return;
        const { officeId, officeName, officeTel, officeAddress, isNew } = modal;

        if (!officeId?.trim()) return alert("사무소 ID를 입력하세요.");
        if (!officeName?.trim()) return alert("사무소명을 입력하세요.");
        if (!officeTel?.trim()) return alert("대표 연락처를 입력하세요.");
        if (!officeAddress?.trim()) return alert("주소(전체)를 입력하세요.");

        try {
            if (isNew) {
                await http.post("/admin/office/create", {
                    officeId: officeId.trim(),
                    name: officeName.trim(),
                    tel: officeTel.trim(),
                    location: officeAddress.trim(),
                });
            } else {
                await http.put(`/admin/office/${encodeURIComponent(officeId)}`, {
                    officeName: officeName.trim(),
                    officeTel: officeTel.trim(),
                    officeAdd: officeAddress.trim(),
                });
            }
            await load();
            setModal(null);
        } catch (e) {
            console.error(e);
            alert("저장 실패: " + (e?.response?.data?.message || e.message));
        }
    };


    const remove = async (officeId) => {
        if (!window.confirm("해당 사무소를 삭제하시겠습니까?")) return;
        try {
            await http.delete(`/admin/office/${encodeURIComponent(officeId)}`);
            await load();
        } catch (e) {
            console.error(e);
            alert("삭제 실패: " + (e?.response?.data?.message || e.message));
        }
    };

    return (
        <>
            <InNav
                title="법률사무소"
                q={q}
                onQChange={setQ}
                onAdd={() =>
                    setModal({
                        officeId: "",
                        officeName: "",
                        officeTel: "",
                        officeAddress: "",
                        isNew: true,
                    })
                }
            />

            {loading && <div style={{ padding: 12 }}>로딩중…</div>}

            <table className="table">
                <thead>
                    <tr>
                        <th>사무소 코드</th>
                        <th>사무소명</th>
                        <th>대표 연락처</th>
                        <th>주소 / 지역</th>
                        <th style={{ width: 160 }}>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {pagedRows.map((r) => (
                        <tr key={r.officeId}>
                            <td>{r.officeId}</td>
                            <td>{r.officeName}</td>
                            <td>{r.officeTel}</td>
                            <td>{r.shortAddress || r.officeAddress}</td>
                            <td className="row-actions">
                                <button
                                    className="small-btn"
                                    onClick={() =>
                                        setModal({
                                            officeId: r.officeId,
                                            officeName: r.officeName,
                                            officeTel: r.officeTel,
                                            officeAddress: r.officeAddress,
                                            isNew: false,
                                        })
                                    }
                                >
                                    수정
                                </button>
                                <button
                                    className="small-btn"
                                    onClick={() => remove(r.officeId)}
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}

                    {pagedRows.length === 0 && !loading && (
                        <tr>
                            <td colSpan={5} style={{ textAlign: "center" }}>
                                등록된 법률사무소가 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Pagination
                page={currentPage}
                totalPages={pageCount}
                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => Math.min(pageCount, p + 1))}
            />
            {modal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h3>{modal.isNew ? "법률사무소 등록" : "법률사무소 수정"}</h3>
                        <div className="form">
                            <label>사무소 ID</label>
                            <input
                                placeholder="예 : OFF001"
                                value={modal.officeId}
                                onChange={(e) =>
                                    setModal((m) => ({ ...m, officeId: e.target.value }))
                                }
                                disabled={!modal.isNew}
                            />

                            <label>사무소명</label>
                            <input
                                placeholder="예 : 사무소명"
                                value={modal.officeName}
                                onChange={(e) =>
                                    setModal((m) => ({ ...m, officeName: e.target.value }))
                                }
                            />

                            <label>대표 연락처</label>
                            <input
                                placeholder="예 : 000-0000-0000"
                                value={modal.officeTel}
                                onChange={(e) =>
                                    setModal((m) => ({ ...m, officeTel: e.target.value }))
                                }
                            />

                            <label>전체 주소</label>
                            <input
                                placeholder="예 : ○○○○시 ○○구 ○○○○ ○○○"
                                value={modal.officeAddress}
                                onChange={(e) =>
                                    setModal((m) => ({ ...m, officeAddress: e.target.value }))
                                }
                            />
                            <p style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
                                목록 나열에서는 간략 주소로 표시됩니다.
                            </p>
                        </div>

                        <div className="actions">
                            <button className="small-btn" onClick={save}>
                                {modal.isNew ? "생성" : "수정"}
                            </button>
                            <button className="small-btn" onClick={() => setModal(null)}>
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
