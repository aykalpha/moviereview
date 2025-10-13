<?php

namespace App\Http\Requests\Review;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use App\Enums\Evaluation;

class StoreReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'movie_id' => ['required', Rule::exists('movies', 'id')],
            'user_id' => ['required', Rule::exists('users', 'id')],
            'evaluation' => ['required', new Enum(Evaluation::class)],
            'comment' => 'nullable|string|max:1000',
        ];
    }
}
