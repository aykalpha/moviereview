<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Http\Requests\SearchReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Http\Requests\StoreReviewRequest;

class ReviewController extends Controller
{
    public function search(SearchReviewRequest $request)
    {
        $query = Review::query();

        if ($request->has('movie_id')) {
            $query->where('movie_id', $request->movie_id);
        }

        return response()->json($query->get());
    }

    public function update(UpdateReviewRequest $request, int $id)
    {
        $review = Review::findOrFail($id);
        $review->update($request->validated());
        return response()->json($review, 200);
    }

    public function store(StoreReviewRequest $request)
    {
        $review = Review::create($request->validated());
        return response()->json($review, 201);
    }
}
