import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Movie {
    id: number;
    title: string;
    description: string;
    release_year: number;
    genre: { genre_name: string };
    image_path: string;
    reviews_count: number;
    reviews_avg_evaluation: number | null;
}

interface Review {
    id?: number;
    user_id: number;
    evaluation: number;
    comment: string;
}

interface User {
    id: number;
    name: string;
}

function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<Movie>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const [newReview, setNewReview] = useState<Partial<Review>>({});
    const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
    const [editingReview, setEditingReview] = useState<Partial<Review>>({});

    // --- StarRating コンポーネント ---
    const StarRating = ({
        value,
        editable = false,
        onChange,
    }: {
        value: number;
        editable?: boolean;
        onChange?: (val: number) => void;
    }) => {
        const stars = [1, 2, 3, 4, 5];
        const handleClick = (val: number) => {
            if (!editable || !onChange) return;
            onChange(val);
        };
        return (
            <span>
                {stars.map((star) => (
                    <span
                        key={star}
                        style={{
                            cursor: editable ? "pointer" : "default",
                            color: star <= value ? "gold" : "#ccc",
                            fontSize: 20,
                        }}
                        onClick={() => handleClick(star)}
                    >
                        ★
                    </span>
                ))}
            </span>
        );
    };

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // ユーザー一覧
                const usersRes = await axios.get(`http://localhost:8000/api/users`);
                setUsers(usersRes.data);

                // 映画取得
                const movieRes = await axios.get(`http://localhost:8000/api/movies/${id}`);
                setMovie(movieRes.data);

                // レビュー取得
                const reviewsRes = await axios.get(`http://localhost:8000/api/reviews/search?movie_id=${id}`);
                setReviews(reviewsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // ユーザーIDから名前を取得する関数
    const getUserName = (userId: number) => {
        return users.find(u => u.id === userId)?.name || "不明";
    };

    // 新規レビュー登録
    const addReview = async () => {
        if (!newReview.user_id || !newReview.evaluation) return alert("ユーザーと評価は必須");
        try {
            const res = await axios.post(`http://localhost:8000/api/reviews`, {
                movie_id: id,
                user_id: newReview.user_id,
                evaluation: newReview.evaluation,
                comment: newReview.comment || "",
            });
            setReviews([...reviews, res.data]);
            setNewReview({});
        } catch (err) {
            console.error(err);
        }
    };

    // 編集開始
    const startEditReview = (review: Review) => {
        setEditingReviewId(review.id || null);
        setEditingReview({ ...review });
    };

    // 編集更新
    const updateReview = async (reviewId: number) => {
        if (!editingReview.user_id || !editingReview.evaluation) return alert("ユーザーと評価は必須");
        try {
            const res = await axios.put(`http://localhost:8000/api/reviews/${reviewId}`, editingReview);
            setReviews(reviews.map(r => r.id === reviewId ? res.data : r));
            setEditingReviewId(null);
            setEditingReview({});
        } catch (err) {
            console.error(err);
        }
    };

    // 削除
    const deleteReview = async (reviewId: number) => {
        if (!window.confirm("本当に削除しますか？")) return;
        try {
            await axios.delete(`http://localhost:8000/api/reviews/${reviewId}`);
            setReviews(reviews.filter(r => r.id !== reviewId));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>読み込み中...</p>;
    if (!movie) return <p>映画が見つかりません</p>;

    return (
        <div>
            <h2>{movie.title}</h2>
            <img src={movie.image_path} width={150} height={150} alt={movie.title} />
            <p><strong>説明:</strong> {movie.description}</p>
            <p><strong>公開年:</strong> {movie.release_year}</p>
            <p><strong>ジャンル:</strong> {movie.genre.genre_name}</p>
            <p>
                <strong>平均評価:</strong>
                {movie.reviews_avg_evaluation !== null ? (
                    <StarRating value={movie.reviews_avg_evaluation} editable={false} onChange={() => {}} />
                ) : "評価無し"}
            </p>
            <p><strong>レビュー数:</strong> {movie.reviews_count}</p>

            <h3>レビュー一覧</h3>
            {reviews.length === 0 ? (
                <p>レビューはまだありません</p>
            ) : (
                <table border={1} cellPadding={5}>
                    <thead>
                        <tr>
                            <th>ユーザー名</th>
                            <th>評価</th>
                            <th>コメント</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(review => (
                            <tr key={review.id}>
                                <td>
                                    {editingReviewId === review.id ? (
                                        <select
                                            value={editingReview.user_id || ""}
                                            onChange={e => setEditingReview({
                                                ...editingReview,
                                                user_id: Number(e.target.value)
                                            })}
                                        >
                                            <option value="">選択してください</option>
                                            {users.map(user => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        getUserName(review.user_id)
                                    )}
                                </td>
                                <td>
                                    {editingReviewId === review.id ? (
                                        <StarRating
                                            value={editingReview.evaluation || 0}
                                            editable={true}
                                            onChange={(val: number) => setEditingReview({...editingReview, evaluation: val})}
                                        />
                                    ) : review.evaluation ? (
                                        <StarRating value={review.evaluation} editable={false} onChange={() => {}} />
                                    ) : "評価無し"}
                                </td>
                                <td>
                                    {editingReviewId === review.id ? (
                                        <input
                                            type="text"
                                            value={editingReview.comment || ""}
                                            onChange={e => setEditingReview({...editingReview, comment: e.target.value})}
                                        />
                                    ) : review.comment}
                                </td>
                                <td>
                                    {editingReviewId === review.id ? (
                                        <>
                                            <button onClick={() => updateReview(review.id!)}>保存</button>
                                            <button onClick={() => setEditingReviewId(null)}>キャンセル</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => startEditReview(review)}>編集</button>
                                            <button onClick={() => deleteReview(review.id!)}>削除</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h3>新規レビュー登録</h3>
            <select
                value={newReview.user_id || ""}
                onChange={e => setNewReview({...newReview, user_id: Number(e.target.value)})}
            >
                <option value="">ユーザーを選択</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <StarRating
                value={newReview.evaluation || 0}
                editable={true}
                onChange={(val: number) => setNewReview({...newReview, evaluation: val})}
            />
            <input
                type="text"
                placeholder="コメント"
                value={newReview.comment || ""}
                onChange={e => setNewReview({...newReview, comment: e.target.value})}
            />
            <button onClick={addReview}>登録</button>

            <div>
                <button onClick={() => navigate(-1)}>戻る</button>
            </div>
        </div>
    );
}

export default MovieDetails;
