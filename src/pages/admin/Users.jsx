import React, { useEffect, useMemo, useState, useCallback } from "react";
import { getUsers, updateUser, deleteUser, createUser } from "../../api/adminApi";
import "../../styles/admin.css";
import InNav from "./InNav";

import Pagination from "./Pagination";

const roleLabel = (v) => (Number(v) === 1 ? "관리자" : "사용자");
const subLevelLabel = (status) => (Number(status) === 1 ? "Premium" : "Basic");
const subPeriodLabel = (status, subDate) => {
  if (Number(status) !== 1 || !subDate) return "";

  const startDate = new Date(subDate);
  if (Number.isNaN(startDate.getTime())) return "";

  const startStr = startDate.toISOString().slice(0, 10);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);
  const endStr = endDate.toISOString().slice(0, 10);

  return `${startStr} ~ ${endStr}`;
};

export default function Users() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    userName: "",
    userRole: 0,
  });

  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    userId: "",
    userName: "",
    password: "",
    userRole: 0,
  });

// 유저 목록
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      alert("목록 불러오기 실패: " + e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

//검색 코드
  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return rows;
    return rows.filter(
      (r) =>
        (r.USER_ID || "").toLowerCase().includes(qq) ||
        (r.USER_NAME || "").toLowerCase().includes(qq)
    );
  }, [rows, q]);

  // 페이지
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);

  const pagedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
    // eslint-disable-next-line
  }, [pageCount]);

  //수정 코드
  const beginEdit = (r) => {
    setEditing(r.USER_ID);
    setForm({
      userName: r.USER_NAME || "",
      userRole: Number(r.USER_ROLE ?? 0),
    });
  };
  const cancelEdit = () => {
    setEditing(null);
    setForm({ userName: "", userRole: 0 });
  };

  //저장 코드
  const save = async () => {
    if (!editing) return;
    try {
      await updateUser(editing, {
        userName: form.userName.trim(),
        userRole: Number(form.userRole),
      });
      await load();
      cancelEdit();
    } catch (e) {
      alert("수정 실패: " + e.message);
    }
  };

  //삭제 코드
  const remove = async (id) => {
    if (!window.confirm(`${id} 계정을 삭제할까요?`)) return;
    try {
      await deleteUser(id);
      await load();
    } catch (e) {
      alert("삭제 실패: " + e.message);
    }
  };

  //추가 제출
  const submitAdd = async () => {
    const { userId, userName, password, userRole } = addForm;
    if (!userId.trim() || !userName.trim())
      return alert("필수 항목을 확인하세요.");

    try {
      const payload = {
        userId: userId.trim(),
        userName: userName.trim(),
        userRole: Number(userRole),
      };
      if (password.trim()) payload.password = password.trim();

      await createUser(payload);
      setAddOpen(false);
      setAddForm({ userId: "", userName: "", password: "", userRole: 0 });
      await load();
    } catch (e) {
      alert("생성 실패: " + e.message);
    }
  };

  return (
    <>
      <InNav title="사용자" q={q} onQChange={setQ} onAdd={() => setAddOpen(true)} />

      {loading && <div style={{ padding: 12 }}>로딩중…</div>}

      <table className="table">
        <thead>
          <tr>
            <th>사용자 아이디</th>
            <th>이름</th>
            <th>권한</th>
            <th>구독 레벨</th>
            <th>구독 기간</th>
            <th style={{ width: 160 }}>행동</th>
          </tr>
        </thead>

        <tbody>
          {pagedRows.map((r) => (
            <tr key={r.USER_ID}>
              <td>{r.USER_ID}</td>

              <td>
                {editing === r.USER_ID ? (
                  <input
                    value={form.userName}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, userName: e.target.value }))
                    }
                  />
                ) : (
                  r.USER_NAME
                )}
              </td>

              <td>
                {editing === r.USER_ID ? (
                  <select
                    value={form.userRole}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,
                        userRole: Number(e.target.value),
                      }))
                    }
                  >
                    <option value={0}>사용자</option>
                    <option value={1}>관리자</option>
                  </select>
                ) : (
                  roleLabel(r.USER_ROLE)
                )}
              </td>

              <td>{subLevelLabel(r.SUB_STATUS)}</td>
              <td>{subPeriodLabel(r.SUB_STATUS, r.SUB_DATE)}</td>

              <td>
                {editing === r.USER_ID ? (
                  <>
                    <button className="small-btn" onClick={save}>저장</button>
                    <button className="small-btn" onClick={cancelEdit}>취소</button>
                  </>
                ) : (
                  <>
                    <button className="small-btn" onClick={() => beginEdit(r)}>수정</button>
                    <button className="small-btn" onClick={() => remove(r.USER_ID)}>삭제</button>
                  </>
                )}
              </td>
            </tr>
          ))}

          {pagedRows.length === 0 && !loading && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                데이터 없음
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        page={currentPage}
        pageCount={pageCount}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(pageCount, p + 1))}
      />

      {addOpen && (
        <div className="modal-backdrop">
          <div className="modal" role="dialog" aria-modal="true">
            <h3>사용자 생성</h3>

            <div className="form">
              <label>User ID</label>
              <input
                value={addForm.userId}
                onChange={(e) =>
                  setAddForm({ ...addForm, userId: e.target.value })
                }
              />

              <label>User Name</label>
              <input
                value={addForm.userName}
                onChange={(e) =>
                  setAddForm({ ...addForm, userName: e.target.value })
                }
              />

              <label>Password</label>
              <input
                type="password"
                value={addForm.password}
                onChange={(e) =>
                  setAddForm({ ...addForm, password: e.target.value })
                }
              />

              <label>Role</label>
              <select
                value={addForm.userRole}
                onChange={(e) =>
                  setAddForm({ ...addForm, userRole: e.target.value })
                }
              >
                <option value={0}>사용자</option>
                <option value={1}>관리자</option>
              </select>
            </div>

            <div className="actions">
              <button className="small-btn" onClick={submitAdd}>생성</button>
              <button className="small-btn" onClick={() => setAddOpen(false)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
