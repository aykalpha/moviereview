import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoviesList from "./MoviesList";
import MoviesCreate from "./MoviesCreate";
import ReviewsList from "./ReviewsList";
import ReviewCreate from "./ReviewsCreate";

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
