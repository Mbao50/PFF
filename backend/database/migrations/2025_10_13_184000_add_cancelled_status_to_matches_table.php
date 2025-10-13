<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE matches MODIFY COLUMN status ENUM('upcoming', 'live', 'completed', 'cancelled') NOT NULL DEFAULT 'upcoming'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE matches MODIFY COLUMN status ENUM('upcoming', 'live', 'completed') NOT NULL DEFAULT 'upcoming'");
    }
};
