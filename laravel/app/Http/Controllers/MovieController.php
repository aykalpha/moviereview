<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchMovieRequest;
use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Models\Movie;

class MovieController extends Controller
{
    public function search(SearchMovieRequest $request)
    {
        $query = Movie::query();

        if ($request->title) {
            $query->where('title', 'like', "%{$request->title}%");
        }

        if ($request->release_year) {
            $query->whereYear('release_date', $request->release_year);
        }

        if ($request->genre_id) {
            $query->where('genre_id', $request->genre_id);
        }

        return $query->get();
    }

    public function show(int $id)
    {
        $movie = Movie::findOrFail($id);
        return response()->json($movie, 200);
    }

    public function update(UpdateMovieRequest $request, int $id)
    {
        $movie = Movie::findOrFail($id)->update($request);
        return response()->json($movie, 200);
    }

    public function store(StoreMovieRequest $request)
    {
        $movie = Movie::create($request);
        return response()->json($movie, 201);
    }
}
