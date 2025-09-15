<?php

namespace App\Http\Requests\Movie;

use Illuminate\Foundation\Http\FormRequest;

class StoreMovieRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'image' => 'required|image|max:2048',
            'description' => 'required|string|max:1000',
            'release_year' => 'required|integer|min:1900|max:2050',
            'genre_id' => 'required|exists:genres,id',
        ];
    }
}