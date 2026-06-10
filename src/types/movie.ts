// src/types/movie.ts

// ── 一覧・検索で使う映画の型 ──────────────────────────
export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null; // 画像なし映画はnullが来る
  release_date: string;       // "1988-04-16" という文字列形式
  vote_average: number;       // 0.0 〜 10.0
  genre_ids: number[];        // ジャンルIDの配列
};

// ── 検索APIのレスポンス全体の型 ──────────────────────
export type SearchResponse = {
  page: number;
  results: Movie[];           // Movie型の配列
  total_results: number;
  total_pages: number;
};

// ── 詳細ページで使う型（一覧より情報が多い）──────────
export type MovieDetail = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number | null;     // 上映時間（分）。不明の場合はnull
  genres: Genre[];            // 詳細APIはジャンル名も返す
  tagline: string;            // キャッチコピー
};

// ── ジャンルの型（MovieDetailの中で使う）────────────
export type Genre = {
  id: number;
  name: string;               // "アニメーション" など
};

// ── コンポーネントのProps型 ───────────────────────────
export type MovieCardProps = {
  movie: Movie;
  onClick: (id: number) => void; // 「numberを受け取り、戻り値なし」の関数型
};

export type SearchBarProps = {
  onSearch: (query: string) => void;
};