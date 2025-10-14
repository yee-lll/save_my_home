import React, { useMemo, useState } from "react";

function Topbar({ title, onAdd }) {
    const [q, setQ] = useState("");
    return (
        <div className="admin-topbar">
            <div className="admin-title">{title}</div>
            <div className="admin-tools">
                <label className="search">
                    <input placeholder="검색..." value={q} onChange={e => setQ(e.target.value)} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_169_583)">
                            <path d="M16.3099 16.28C14.6717 17.9013 12.4598 18.8108 10.1549 18.8108C7.85002 18.8108 5.63819 17.9013 3.99993 16.28C3.19447 15.4855 2.5549 14.5389 2.11836 13.4952C1.68183 12.4514 1.45703 11.3313 1.45703 10.2C1.45703 9.06862 1.68183 7.94855 2.11836 6.9048C2.5549 5.86106 3.19447 4.91446 3.99993 4.11998C5.63393 2.50593 7.83817 1.60083 10.1349 1.60083C12.4317 1.60083 14.6359 2.50593 16.2699 4.11998C17.078 4.9118 17.7207 5.8563 18.1607 6.89861C18.6006 7.94092 18.8291 9.06026 18.8329 10.1916C18.8366 11.323 18.6155 12.4438 18.1824 13.489C17.7492 14.5341 17.1128 15.4829 16.3099 16.28Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16.3101 16.28L22.5001 22.4" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_169_583">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </label>
                <button className="tool-btn" title="필터">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="17" viewBox="0 0 25 17" fill="none">
                        <path d="M4.125 9.625H20.625V6.875H4.125V9.625ZM0 0V2.75H24.75V0H0ZM9.625 16.5H15.125V13.75H9.625V16.5Z" fill="black" />
                    </svg>
                </button>
                <button className="tool-btn" title="추가" onClick={onAdd}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 33 33" fill="none">
                        <g clip-path="url(#clip0_169_574)">
                            <path d="M0 16.49C0 17.4694 0.820002 18.2688 1.78001 18.2688H14.72V31.2011C14.72 32.1605 15.52 32.9799 16.5 32.9799C17.4801 32.9799 18.3001 32.1605 18.3001 31.2011V18.2688H31.2201C32.1801 18.2688 33 17.4694 33 16.49C33 15.5106 32.1801 14.6911 31.2201 14.6911H18.3001V1.77892C18.3001 0.819502 17.4801 0 16.5 0C15.52 0 14.72 0.819502 14.72 1.77892V14.6911H1.78001C0.820002 14.6911 0 15.5106 0 16.49Z" fill="black" fill-opacity="0.85" />
                        </g>
                        <defs>
                            <clipPath id="clip0_169_574">
                                <rect width="32" height="33" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </div>
    );
}


// 판례 관리 추후 데이터 연동 예정
export default function Cases() {
    const [rows, setRows] = useState([
        { id: 1, no: "1", name: "전세 사기", court: "대법원", caseNo: "0000다0000", result: "인용/기각", updated: "0000.00.00" },
        { id: 2, no: "1", name: "전세 사기", court: "대법원", caseNo: "구급", result: "인용/기각", updated: "0000.00.00" },
    ]);
    
    const [sort, setSort] = useState({ key: "updated", dir: "desc" });
    const [modal, setModal] = useState(null); 

    const sorted = useMemo(() => {
        const cp = [...rows];
        cp.sort((a, b) => {
            const k = sort.key, d = sort.dir === "asc" ? 1 : -1;
            return (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0) * d;
        });
        return cp;
    }, [rows, sort]);

    const toggleSort = (key) => {
        setSort(s => s.key === key ? ({ key, dir: s.dir === "asc" ? "desc" : "asc" }) : ({ key, dir: "asc" }));
    };

    const save = (data) => {
        if (data.id) {
            setRows(prev => prev.map(r => r.id === data.id ? data : r));
        } else {
            const nextId = rows.length ? Math.max(...rows.map(r => r.id)) + 1 : 1;
            setRows(prev => [{ ...data, id: nextId }, ...prev]);
        }
        setModal(null);
    };

    const remove = (id) => setRows(prev => prev.filter(r => r.id !== id));

    return (
        <>
            <Topbar title="판례 관리" onAdd={() => setModal({})} />
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={() => toggleSort("no")}>판례번호</th>
                        <th onClick={() => toggleSort("name")}>사건명</th>
                        <th onClick={() => toggleSort("court")}>법원/부</th>
                        <th onClick={() => toggleSort("caseNo")}>사건번호</th>
                        <th onClick={() => toggleSort("result")}>주요결과</th>
                        <th onClick={() => toggleSort("updated")}>수정일</th>
                        <th>행동</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map(r => (
                        <tr key={r.id}>
                            <td>{r.no}</td><td>{r.name}</td><td>{r.court}</td>
                            <td>{r.caseNo}</td><td>{r.result}</td><td>{r.updated}</td>
                            <td className="row-actions">
                                <button className="small-btn" onClick={() => setModal(r)}>수정</button>
                                <button className="small-btn" onClick={() => remove(r.id)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pager">
                <span>Page</span>
                <input/>
            </div>

            {modal !== null && (
                <div className="modal-backdrop" onClick={() => setModal(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h3>{modal.id ? "수정" : "추가"}</h3>
                        <div className="form">
                            <label>사건명</label>
                            <input value={modal.name || ""} onChange={e => setModal(m => ({ ...m, name: e.target.value }))} />
                            <label>법원/부</label>
                            <input value={modal.court || ""} onChange={e => setModal(m => ({ ...m, court: e.target.value }))} />
                            <label>사건번호</label>
                            <input value={modal.caseNo || ""} onChange={e => setModal(m => ({ ...m, caseNo: e.target.value }))} />
                            <label>주요결과</label>
                            <input value={modal.result || ""} onChange={e => setModal(m => ({ ...m, result: e.target.value }))} />
                            <label>수정일</label>
                            <input value={modal.updated || ""} onChange={e => setModal(m => ({ ...m, updated: e.target.value }))} />
                        </div>
                        <div className="actions">
                            <button className="small-btn" onClick={() => save(modal)}>{modal.id ? "수정" : "추가"}</button>
                            <button className="small-btn" onClick={() => setModal(null)}>닫기</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
