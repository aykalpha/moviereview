import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants/api";
import type { Genre } from "../constants/type";

function MoviesCreate() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    release_year: "",
    genre_id: "",
  });
  const [file, setFile] = useState<File | null>(null);

  // 初期処理
  useEffect(() => {
    axios
      .get(`${API_URL}/genres`)
      .then((response) => 
        setGenres(response.data))
      .catch(console.error);
  }, []);

  // 入力
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  // 登録
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    // 【課題】バリデーションチェックを「zod」に置き換えてみよう（映画一覧・レビュー一覧）
    if (!movie.title.trim()) return alert("タイトルは必須です");
    if (!movie.description.trim()) return alert("説明は必須です");
    if (!movie.release_year.trim()) return alert("公開年は必須です");
    if (!movie.genre_id) return alert("ジャンルは必須です");
    if (!file) return alert("画像は必須です");

    const formData = new FormData();
    Object.entries(movie).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });
    formData.append("image", file);

    axios
      .post(`${API_URL}/movies`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        })
      .then(() => {
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <div>
      <h1>映画登録</h1>

      {/* フォーム */}
      <form onSubmit={onSubmit}>
        <input 
          type="file" 
          name="image"           
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <input
          name="title"
          placeholder="タイトル"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="説明"
          value={movie.description}
          onChange={handleChange}
        />
        <input
          name="release_year"
          placeholder="公開年"
          value={movie.release_year}
          onChange={handleChange}
        />
        <select
          name="genre_id"
          value={movie.genre_id}
          onChange={handleChange}
        >
          <option value="">ジャンルを選択してください</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <button type="submit">
          登録
        </button>
      </form>

      <button type="button" onClick={() => navigate("/")}>
        戻る
      </button>
    </div>
  );
}

export default MoviesCreate;
