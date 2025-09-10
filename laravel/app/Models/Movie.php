<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }
}
