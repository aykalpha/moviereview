<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Review extends Model
{
    protected $guarded = [];
    
    protected static function booted()
    {
        static::addGlobalScope('createdAtDesc', function (Builder $builder) {
            $builder->orderByDesc('created_at');
        });
    }
}