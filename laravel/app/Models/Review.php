<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'movie_id',
        'user_id',
        'evaluation',
        'comment',
    ];
    
    protected static function booted()
    {
        static::addGlobalScope('createdAtDesc', function (Builder $builder) {
            $builder->orderByDesc('created_at');
        });
    }
}