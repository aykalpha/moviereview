import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, API_URL } from "../constants/api";
import { Movie } from "../constants/type";

// 映画一覧
function MoviesList() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  // 【課題】初期検索が自動実行されるように修正してみよう

  // 検索
  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .get(`${API_URL}/movies/search`, {
        params: { title },
      })
      .then((response) => {
        setMovies(response.data);
      })
      .catch(console.error);
  };

  return (
    <div>
      <h1>映画一覧</h1>
      
      {/* 検索条件 */}
      {/* 【課題】検索条件を増やしてみよう */}
      <form onSubmit={onSearch}>
        <input 
          placeholder="タイトル" 
          value={title} 
          onChange={e => setTitle(e.target.value)} />
        <button>
            検索
        </button>
      </form>

      {/* 検索結果 */}
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
          {movies.map(movie => (
            <tr
              key={movie.id}
              onClick={() => navigate(`/${movie.id}`)}
            >
              <td>
                <img src={`${BASE_URL}/${movie.image_path}`} width={50} />
              </td>
              <td>{movie.title}</td>
              <td>{movie.description}</td>
              <td>{movie.release_year}</td>
              <td>{movie.genre?.name}</td>
              <td>{movie.reviews_count}</td>
              <td>{movie.reviews_avg_evaluation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/create")}>
        登録
      </button>
    </div>
  );
}

export default MoviesList;
