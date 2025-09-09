<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchMovieRequest extends FormRequest
{
    public function authorize(): bool
    {
        return false;
    }

    public function rules(): array
    {
        return [
            'title' => 'nullable|string|max:255',
            'release_year' => 'nullable|integer|min:1900|max:2050',
            'genre_id' => 'nullable|exists:genres,id',
        ];
    }
}
