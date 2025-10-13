import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoviesList from "./pages/MoviesList";
import MoviesCreate from "./pages/MoviesCreate";
import ReviewsList from "./pages/ReviewsList";
import ReviewCreate from "./pages/ReviewsCreate";

function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MoviesList />} />
                <Route path="/create" element={<MoviesCreate />} />
                <Route path="/:id" element={<ReviewsList />} />
                <Route path="/:id/create" element={<ReviewCreate />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Root;
