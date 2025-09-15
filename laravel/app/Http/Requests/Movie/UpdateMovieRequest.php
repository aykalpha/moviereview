<?php

namespace App\Http\Requests\Movie;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMovieRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'image' => 'sometimes|image|max:2048',
            'description' => 'sometimes|string|max:1000',
            'release_year' => 'sometimes|integer|min:1900|max:2050',
            'genre_id' => 'sometimes|exists:genres,id',
        ];
    }
}
