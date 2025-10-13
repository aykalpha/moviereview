<?php

namespace App\Http\Controllers;

use App\Http\Requests\Movie\SearchMovieRequest;
use App\Http\Requests\Movie\StoreMovieRequest;
use App\Models\Movie;

class MovieController extends Controller
{
    // 映画検索
    public function search(SearchMovieRequest $request)
    {
        $query = Movie::with('genre')
            ->withCount('reviews')
            ->withAvg('reviews', 'evaluation');
        if ($request->title) {
            $query->where('title', 'like', "%{$request->title}%");
        }
        return $query->get();
    }

    // 映画登録
    public function store(StoreMovieRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $filename = time() . '_' . $image->getClientOriginalName();
            $path = $image->storeAs(config('constants.paths.movie_image'), $filename, 'public');
            $data['image_path'] = $path;
        }
        $movie = Movie::create($data);
        return response()->json($movie, 201);
    }
}
