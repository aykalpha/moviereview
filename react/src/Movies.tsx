import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Genre {
  id: number;
  genre_name: string;
}

interface Movie {
  id: number;
  title: string;
  release_year: number;
  genre_id: number;
  description: string;
  image_path: string;
  image?: File;
  genre?: Genre;
  reviews_count?: number;
  reviews_avg_evaluation?: number;
}

function Movies() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchReleaseYear, setSearchReleaseYear] = useState("");
  const [searchGenreId, setSearchGenreId] = useState<number | "">("");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);

  // 編集用状態
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
  const [editingMovieData, setEditingMovieData] = useState<Partial<Movie>>({});

  // 新規登録用状態
  const [newMovieData, setNewMovieData] = useState<Partial<Movie>>({});

  const navigate = useNavigate();

  // ジャンル一覧取得
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/genres/index")
      .then((res) => setGenres(res.data || []))
      .catch(console.error);
  }, []);

  // 映画検索
  const searchMovies = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/movies/search", {
        params: {
          title: searchTitle,
          release_year: searchReleaseYear,
          genre_id: searchGenreId,
        },
      });
      setMovies(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 編集開始
  const startEdit = (movie: Movie) => {
    setEditingMovieId(movie.id);
    setEditingMovieData({ ...movie });
  };

  // 編集保存
  const updateMovie = async (id: number) => {
    try {
      const formData = new FormData();
      Object.entries(editingMovieData).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === "image") formData.append("image", value as File);
          else formData.append(key, value as any);
        }
      });

      await axios.post(`http://localhost:8000/api/movies/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setEditingMovieId(null);
      setEditingMovieData({});
      searchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  // 削除
  const deleteMovie = async (id: number) => {
    if (!window.confirm("本当に削除しますか？")) return;
    try {
      await axios.delete(`http://localhost:8000/api/movies/${id}`);
      searchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  // 新規登録
  const addNewMovie = async () => {
    if (!newMovieData.title) return alert("タイトル必須");
    try {
      const formData = new FormData();
      Object.entries(newMovieData).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === "image") formData.append("image", value as File);
          else formData.append(key, value as any);
        }
      });

      const res = await axios.post("http://localhost:8000/api/movies", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewMovieData({});
      setMovies((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const goToDetail = (id: number) => navigate(`/movies/${id}`);

  return (
    <div>
      {/* 検索フォーム */}
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="タイトル"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="公開年"
          value={searchReleaseYear}
          onChange={(e) => setSearchReleaseYear(e.target.value)}
        />
        <select
          value={searchGenreId}
          onChange={(e) =>
            setSearchGenreId(e.target.value ? Number(e.target.value) : "")
          }
        >
          <option value="">全ジャンル</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.genre_name}
            </option>
          ))}
        </select>
        <button type="submit">検索</button>
      </form>

      {loading && <p>検索中...</p>}

      {/* 映画テーブル */}
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
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                {editingMovieId === movie.id ? (
                  <input
                    type="file"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setEditingMovieData({ ...editingMovieData, image: e.target.files[0] });
                    }}
                  />
                ) : (
                  <img   src={"http://localhost:8000/" + movie.image_path} width={50} height={50} />
                )}
              </td>
              <td>
                {editingMovieId === movie.id ? (
                  <input
                    type="text"
                    value={editingMovieData.title || ""}
                    onChange={(e) =>
                      setEditingMovieData({ ...editingMovieData, title: e.target.value })
                    }
                  />
                ) : (
                  <span onClick={() => goToDetail(movie.id)} style={{ cursor: "pointer" }}>
                    {movie.title}
                  </span>
                )}
              </td>
              <td>
                {editingMovieId === movie.id ? (
                  <input
                    type="text"
                    value={editingMovieData.description || ""}
                    onChange={(e) =>
                      setEditingMovieData({ ...editingMovieData, description: e.target.value })
                    }
                  />
                ) : (
                  movie.description
                )}
              </td>
              <td>
                {editingMovieId === movie.id ? (
                  <input
                    type="number"
                    value={editingMovieData.release_year || ""}
                    onChange={(e) =>
                      setEditingMovieData({
                        ...editingMovieData,
                        release_year: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  movie.release_year
                )}
              </td>
              <td>
                {editingMovieId === movie.id ? (
                  <select
                    value={editingMovieData.genre_id || ""}
                    onChange={(e) =>
                      setEditingMovieData({ ...editingMovieData, genre_id: Number(e.target.value) })
                    }
                  >
                    <option value="">選択してください</option>
                    {genres.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.genre_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  movie.genre?.genre_name
                )}
              </td>
              <td>{movie.reviews_count}</td>
              <td>
                {movie.reviews_avg_evaluation
                  ? "★".repeat(Math.round(movie.reviews_avg_evaluation)) +
                    "☆".repeat(5 - Math.round(movie.reviews_avg_evaluation))
                  : "評価無し"}
              </td>
              <td>
                {editingMovieId === movie.id ? (
                  <>
                    <button onClick={() => updateMovie(movie.id)}>保存</button>
                    <button onClick={() => setEditingMovieId(null)}>キャンセル</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(movie)}>編集</button>
                    <button onClick={() => deleteMovie(movie.id)}>削除</button>
                  </>
                )}
              </td>
            </tr>
          ))}

          {/* 新規登録行 */}
          <tr>
            <td>
              <input
                type="file"
                onChange={(e) => {
                  if (!e.target.files) return;
                  setNewMovieData({ ...newMovieData, image: e.target.files[0] });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="タイトル"
                value={newMovieData.title || ""}
                onChange={(e) => setNewMovieData({ ...newMovieData, title: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="説明"
                value={newMovieData.description || ""}
                onChange={(e) => setNewMovieData({ ...newMovieData, description: e.target.value })}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="公開年"
                value={newMovieData.release_year || ""}
                onChange={(e) =>
                  setNewMovieData({ ...newMovieData, release_year: Number(e.target.value) })
                }
              />
            </td>
            <td>
              <select
                value={newMovieData.genre_id || ""}
                onChange={(e) => setNewMovieData({ ...newMovieData, genre_id: Number(e.target.value) })}
              >
                <option value="">選択してください</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.genre_name}
                  </option>
                ))}
              </select>
            </td>
            <td colSpan={3}>
              <button onClick={addNewMovie}>登録</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Movies;
