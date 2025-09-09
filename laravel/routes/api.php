<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;

Route::controller(MovieController::class)->group(function () {
    //@TODO:順番指定などを実装
    Route::get('/movies/search', 'search');
    Route::get('/movies/{id}', 'show');
    Route::put('/movies/{id}', 'update');
    Route::post('/movies', 'store');
});

Route::get('/genres/index', [GenreController::class, 'index']);

//@TODO:順番指定などを実装
Route::controller(ReviewController::class)->group(function () {
    Route::get('/reviews/search', 'search');
    Route::post('/reviews', 'store');
    Route::put('/reviews/{id}', 'update');
});
