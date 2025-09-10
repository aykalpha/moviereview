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
    id: number;
    reviewer_name: string;
    evaluation: number;
    comment: string;
}

function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<Movie>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchMovie = async () => {
            setLoading(true);
            try {
                const movieResponse = await axios.get(`http://localhost:8000/api/movies/${id}`);
                setMovie(movieResponse.data);

                const reviewsResponse = await axios.get(`http://localhost:8000/api/reviews/search?movie_id=${id}`);
                setReviews(reviewsResponse.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

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
                {movie.reviews_avg_evaluation
                    ? "★".repeat(Math.round(movie.reviews_avg_evaluation)) +
                    "☆".repeat(5 - Math.round(movie.reviews_avg_evaluation))
                    : "評価無し"}
            </p>
            <p><strong>レビュー数:</strong> {movie.reviews_count}</p>

            {reviews.length === 0 ? (
                <p>レビューはまだありません</p>
            ) : (
                <table border={1} cellPadding={5}>
                    <thead>
                        <tr>
                            <th>ユーザー名</th>
                            <th>評価</th>
                            <th>コメント</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review.id}>
                                <td>{review.reviewer_name}</td>
                                <td>{"★".repeat(review.evaluation) + "☆".repeat(5 - review.evaluation)}</td>
                                <td>{review.comment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button onClick={() => navigate(-1)}>戻る</button>
        </div>
    );
}

export default MovieDetails;
