<?php

namespace App\Http\Controllers;

use App\Http\Requests\Movie\SearchMovieRequest;
use App\Http\Requests\Movie\StoreMovieRequest;
use App\Http\Requests\Movie\UpdateMovieRequest;
use App\Models\Movie;

class MovieController extends Controller
{
    public function search(SearchMovieRequest $request)
    {
        $query = Movie::with('genre')
            ->withCount('reviews')
            ->withAvg('reviews', 'evaluation');

        if ($request->title) {
            $query->where('title', 'like', "%{$request->title}%");
        }

        if ($request->release_year) {
            $query->where('release_year', $request->release_year);
        }

        if ($request->genre_id) {
            $query->where('genre_id', $request->genre_id);
        }

        return $query->get();
    }

    public function show(int $id)
    {
        $movie = Movie::with('genre')
            ->withCount('reviews')
            ->withAvg('reviews', 'evaluation')
            ->findOrFail($id);
        return response()->json($movie, 200);
    }

    public function update(UpdateMovieRequest $request, int $id)
    {
        $data = $request->validated();
        $movie = Movie::findOrFail($id);
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('movies', $filename, 'public');
            // @TODO:定数に変更
            $data['image_path'] = 'movies/' . $filename;
        }
        $movie->update($data);
        return response()->json($movie, 200);
    }

    public function store(StoreMovieRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('movies', $filename, 'public');
            // @TODO:定数に変更
            $data['image_path'] = 'storage/movies/' . $filename;
        }
        $movie = Movie::create($data);
        return response()->json($movie, 201);
    }

    public function delete(int $id)
    {
        $movie = Movie::findOrFail($id)->delete();
        return response()->json($movie, 200);
    }
}
