// src/App.tsx

/*
function App() {
  return (
    <div>
      <h1>映画・アニメ検索</h1>
    </div>
  );
}

export default App;
*/

// src/App.tsx（動作確認用）
import { useEffect, useState } from "react";
import { searchMovies } from "./api/tmdb";
import type { Movie } from "./types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovies("となりのトトロ");
        setMovies(data.results);
      } catch {
        setError("取得失敗");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>映画・アニメ検索</h1>
      {movies.map((movie) => (
        <div key={movie.id}>
          <p>{movie.title} ({movie.release_date?.slice(0, 4) || "不明"})</p>
        </div>
      ))}
    </div>
  );
}

// App.tsx に一時的に追加して確認
console.log(import.meta.env.VITE_TMDB_API_KEY);
// undefined と出たら .env の書き方ミス

export default App;