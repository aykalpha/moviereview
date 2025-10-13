<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Movie extends Model
{
    protected $fillable = [
        'title',
        'release_year',
        'genre_id',
        'description',
        'image_path',
    ];

    protected static function booted()
    {
        static::addGlobalScope('createdAtDesc', function (Builder $builder) {
            $builder->orderByDesc('created_at');
        });
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }
}
