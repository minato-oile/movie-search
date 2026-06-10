// src/api/tmdb.ts

import type { SearchResponse, MovieDetail } from "../types/movie";

// 環境変数からAPIキーを取得
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// ── 映画検索 ────────────────────────────────────────
export async function searchMovies(query: string): Promise<SearchResponse> {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=ja-JP`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`検索失敗: ${res.status}`);

  return res.json() as Promise<SearchResponse>;
}

// ── 映画詳細取得 ─────────────────────────────────────
export async function fetchMovieDetail(id: number): Promise<MovieDetail> {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ja-JP`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`詳細取得失敗: ${res.status}`);

  return res.json() as Promise<MovieDetail>;
}

// ── ポスター画像URLを組み立てる ───────────────────────
export function getPosterUrl(path: string | null): string {
  if (!path) return "https://placehold.co/300x450?text=No+Image";
  return `https://image.tmdb.org/t/p/w300${path}`;
}

// ── 公開年だけ取り出す ────────────────────────────────
export function getYear(dateStr: string): string {
  if (!dateStr) return "不明";
  return dateStr.slice(0, 4); // "1988-04-16" → "1988"
}