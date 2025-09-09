<?php

use App\Http\Controllers\MovieController;
use Illuminate\Support\Facades\Route;

Route::controller(MovieController::class)->group(function () {
    Route::get('/movies/search', 'search');
    Route::get('/movies/{id}', 'show');
    Route::put('/movies/{id}', 'update');
    Route::post('/movies', 'store');
});
