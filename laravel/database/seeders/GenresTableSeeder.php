<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class GenresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        $genreNames = ['アクション', 'コメディ', 'ドラマ', 'ホラー', 'アニメ'];

        DB::table('genres')->insert(
            array_map(fn($name) => [
                'genre_name' => $name,
                'created_at' => $now,
                'updated_at' => $now,
            ], $genreNames)
        );
    }
}
