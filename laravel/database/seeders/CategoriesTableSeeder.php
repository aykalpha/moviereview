<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        $categoryNames = ['アクション', 'コメディ', 'ドラマ', 'ホラー', 'アニメ'];

        DB::table('categories')->insert(
            array_map(fn($name) => [
                'category_name' => $name,
                'created_at' => $now,
                'updated_at' => $now,
            ], $categoryNames)
        );
    }
}
