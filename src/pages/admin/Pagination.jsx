
import React from "react";
import "../../styles/admin.css"; 

export default function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
}) {
  // 페이지가 1페이지뿐 페이지부분 렌더링x
  if (!totalPages || totalPages <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="pager">
      <button
        className="small-btn"
        onClick={onPrev}
        disabled={!canPrev}
      >
        이전
      </button>
      <span style={{ margin: "0 8px" }}>
        {page} / {totalPages}
      </span>
      <button
        className="small-btn"
        onClick={onNext}
        disabled={!canNext}
      >
        다음
      </button>
    </div>
  );
}
