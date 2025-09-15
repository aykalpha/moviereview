<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
        protected $fillable = [
        'title',
        'release_year',
        'genre_id',
        'description',
        'image_path',
    ];
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }
}
