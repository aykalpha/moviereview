<?php

namespace App\Http\Requests\Review;

use Illuminate\Foundation\Http\FormRequest;

class StoreReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'movie_id' => 'required|exists:movies,id',
            'user_id' => 'required|exists:users,id',
            'evaluation' => ['required', Rule::enum(Evaluation::class)],
            'comment' => 'nullable|string|max:1000',
        ];
    }
}
