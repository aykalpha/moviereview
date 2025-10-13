import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./constants/api";
import type { User } from "./constants/type";

function ReviewsCreate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [review, setReview] = useState({
    user_id: "",
    evaluation: 0,
    comment: "",
  });

  // 初期処理
  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  // 登録
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 【課題】バリデーションチェックを「zod」に置き換えてみよう（映画一覧・レビュー一覧）
    if (!review.user_id) { alert("ユーザーは必須です"); return; }
    if (!review.evaluation) { alert("評価は必須です"); return; }

    axios
      .post(`${API_URL}/reviews`, {
        movie_id: id,
        ...review,
      })
      .then(() => {
        navigate(`/${id}`);
      })
      .catch(console.error);
  };

  return (
    <div>
      <h2>レビュー登録</h2>

      <form onSubmit={onSubmit}>
        ユーザー
        <select
          value={review.user_id}
          onChange={(e) =>
            setReview({ ...review, user_id: e.target.value })
          }
        >
          <option value="">選択してください</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        評価
        <select
          value={review.evaluation}
          onChange={(e) =>
            setReview({ ...review, evaluation: Number(e.target.value) })
          }
        >
          <option value="">選択してください</option>
          {[1, 2, 3, 4, 5].map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="コメント"
          value={review.comment}
          onChange={(e) =>
            setReview({ ...review, comment: e.target.value })
          }
        />

        <button type="submit">
          登録
        </button>
      </form>

      <button type="button" onClick={() => navigate(-1)} style={{ marginTop: 10 }}>
        戻る
      </button>
    </div>
  );
}

export default ReviewsCreate;
