import http from "./http";

//목록
export const listRequiredLaws = () =>
  http.get("/api/law/list").then((r) => r.data);

// 특정 목록
export const getLawArticles = (lawSeq) =>
  http.get(`/api/law/${lawSeq}/articles`).then((r) => r.data);

// 특정 법령 상세
export const getArticleDetail = (lawSeq, articleNo) =>
  http
    .get(`/api/law/${lawSeq}/articles/${articleNo}`)
    .then((r) => r.data);
