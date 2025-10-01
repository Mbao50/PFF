<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('standing_entries', function (Blueprint $table) {
            // Supprimer d'abord la contrainte de clé étrangère
            $table->dropForeign(['competition_id']);
            
            // Supprimer les anciennes colonnes
            $table->dropColumn(['competition_id', 'played', 'won', 'drawn', 'lost', 'goal_difference', 'form']);
            
            // Ajouter les nouvelles colonnes
            $table->string('competition')->after('club_id');
            $table->integer('matches_played')->default(0)->after('competition');
            $table->integer('wins')->default(0)->after('matches_played');
            $table->integer('draws')->default(0)->after('wins');
            $table->integer('losses')->default(0)->after('draws');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('standing_entries', function (Blueprint $table) {
            // Supprimer les nouvelles colonnes
            $table->dropColumn(['competition', 'matches_played', 'wins', 'draws', 'losses']);
            
            // Remettre les anciennes colonnes
            $table->uuid('competition_id')->after('club_id');
            $table->integer('played')->default(0)->after('competition_id');
            $table->integer('won')->default(0)->after('played');
            $table->integer('drawn')->default(0)->after('won');
            $table->integer('lost')->default(0)->after('drawn');
            $table->integer('goal_difference')->default(0)->after('goals_against');
            $table->json('form')->nullable()->after('points');
            
            // Remettre la contrainte de clé étrangère
            $table->foreign('competition_id')->references('id')->on('competitions')->onDelete('cascade');
        });
    }
};