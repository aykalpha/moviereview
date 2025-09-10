import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Movies() {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genreId, setGenreId] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const searchMovies = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/movies/search", {
        params: {
          title: title,
          release_year: releaseYear,
          genre_id: genreId,
        },
      });
      setMovies(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const goToDetail = (id: number) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="公開年"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="ジャンルID"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
        />
        <button type="submit">検索</button>
      </form>

      {loading && <p>検索中...</p>}

      {movies.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>画像</th>
              <th>タイトル</th>
              <th>説明</th>
              <th>公開年</th>
              <th>ジャンル</th>
              <th>レビュー数</th>
              <th>平均評価</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr
                key={movie.id}
                onClick={() => goToDetail(movie.id)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <img
                    src={movie.image_path}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>{movie.release_year}</td>
                <td>{movie.genre.genre_name}</td>
                <td>{movie.reviews_count}</td>
                <td>
                  {movie.reviews_avg_evaluation
                    ? "★".repeat(
                      Math.round(movie.reviews_avg_evaluation)
                    ) +
                    "☆".repeat(
                      5 - Math.round(movie.reviews_avg_evaluation)
                    )
                    : "評価無し"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Movies;
