<?php

namespace App\Http\Requests\Review;

use Illuminate\Foundation\Http\FormRequest;

class SearchReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'movie_id' => 'required|exists:movies,id',
        ];
    }
}
