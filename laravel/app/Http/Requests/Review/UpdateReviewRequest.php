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
            // @TODO:Enum定義
            'evaluation' => 'sometimes|integer|min:1|max:5',
            'comment' => 'sometimes|string|max:1000',
        ];
    }
}
