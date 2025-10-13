import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Review } from "./constants/type";
import { API_URL } from "./constants/api";

function ReviewsList() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/movies/${id}`)
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch(console.error);
  }, [id]);
  
  // 【課題】ローディング画面を作ってみよう（検索一覧・レビュー一覧）
  // 【課題】レビューが1件もなかった場合の処理を作ってみよう（検索一覧・レビュー一覧）

  return (
    <div>
      {/* 【課題】映画の詳細情報も表示してみよう */}
      <h1>レビュー一覧</h1>
        <table>
          <thead>
            <tr>
              <th>ユーザー</th>
              <th>評価</th>
              <th>コメント</th>
            </tr>
          </thead>
          <tbody>
            {reviews && reviews.map(review => (
              <tr key={review.id}>
                <td>{review.user.name}</td>
                <td>{review.evaluation}</td>
                <td>{review.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>

      <button onClick={() => navigate(`/${id}/create`)}>
        登録
      </button>

      <button onClick={() => navigate(-1)}>
        戻る
      </button>
    </div>
  );
}

export default ReviewsList;
