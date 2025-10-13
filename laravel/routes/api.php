<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(MovieController::class)->group(function () {
    Route::get('/movies/search', 'search');
    Route::post('/movies', 'store');
});

Route::get('/genres', [GenreController::class, 'index']);

Route::controller(ReviewController::class)->group(function () {
    Route::get('/reviews/search', 'search');
    Route::post('/reviews', 'store');
});

Route::get('/users', [UserController::class, 'index']);