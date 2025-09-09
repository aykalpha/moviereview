<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id()->comment('映画ID');
            $table->string('title')->comment('タイトル');
            $table->string('image_path')->comment('画像パス');
            $table->string('description', 1000)->comment('説明');
            $table->integer('release_year')->comment('公開年');
            $table->foreignId('genre_id')->constrained('genres')->cascadeOnDelete()->comment('ジャンルID');
            $table->timestamps();
        });
        DB::statement("COMMENT ON TABLE movies IS '映画テーブル'");
    }

    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
