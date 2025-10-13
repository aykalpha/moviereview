<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Http\Requests\Review\SearchReviewRequest;
use App\Http\Requests\Review\UpdateReviewRequest;
use App\Http\Requests\Review\StoreReviewRequest;

class ReviewController extends Controller
{
    // レビュー検索
    public function search(SearchReviewRequest $request)
    {
        $query = Review::query();
        if ($request->has('movie_id')) {
            $query->where('movie_id', $request->movie_id);
        }
        return response()->json($query->get());
    }

    // レビュー登録
    public function store(StoreReviewRequest $request)
    {
        $review = Review::create($request->validated());
        return response()->json($review, 201);
    }
}
