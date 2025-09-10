import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./Movies";
import MovieDetails from "./MovieDetails";

function Root() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 検索ページ */}
                <Route path="/" element={<Movie />} />

                {/* 詳細ページ */}
                <Route path="/movies/:id" element={<MovieDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Root;
