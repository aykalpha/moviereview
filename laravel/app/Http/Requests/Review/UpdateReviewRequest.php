<?php

namespace App\Http\Requests\Review;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'movie_id' => 'sometimes|exists:movies,id',
            'user_id' => 'sometimes|exists:users,id',
            'evaluation' => ['sometimes', Rule::enum(Evaluation::class)],
            'comment' => 'sometimes|string|max:1000',
        ];
    }
}
