<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id()->comment('レビューID');
            $table->foreignId('movie_id')->constrained('movies')->cascadeOnDelete()->comment('映画ID');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete()->comment('ユーザーID');
            $table->unsignedTinyInteger('evaluation')->comment('評価');
            $table->string('comment', 1000)->nullable()->comment('コメント');
            $table->timestamps();
        });
        DB::statement('ALTER TABLE reviews ADD CONSTRAINT evaluation_check CHECK (evaluation BETWEEN 1 AND 5)');
        DB::statement("COMMENT ON TABLE reviews IS 'レビューテーブル'");
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
