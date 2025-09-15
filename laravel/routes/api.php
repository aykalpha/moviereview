<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(MovieController::class)->group(function () {
    //@TODO:順番指定などを実装
    Route::get('/movies/search', 'search');
    Route::post('/movies', 'store');
    Route::get('/movies/{id}', 'show');
    Route::put('/movies/{id}', 'update');
    Route::delete('/movies/{id}', 'delete');

});

Route::get('/genres/index', [GenreController::class, 'index']);

//@TODO:順番指定などを実装
Route::controller(ReviewController::class)->group(function () {
    Route::get('/reviews/search', 'search');
    Route::post('/reviews', 'store');
    Route::put('/reviews/{id}', 'update');
    Route::delete('/reviews/{id}', 'delete');
});

Route::get('/users', [UserController::class, 'index']);