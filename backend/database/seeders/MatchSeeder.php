<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Club;
use App\Models\Game;

class MatchSeeder extends Seeder
{
    public function run()
    {
        $jaraaf = Club::where('short_name', 'Jaraaf')->first();
        $casa = Club::where('short_name', 'Casa')->first();

        if ($jaraaf && $casa) {
            Game::create([
                'home_team_id' => $jaraaf->id,
                'away_team_id' => $casa->id,
                'home_score' => null,
                'away_score' => null,
                'date' => now()->addDays(7)->toDateString(),
                'time' => '16:30',
                'venue' => 'Stade Demba Diop',
                'status' => 'upcoming',
                'competition' => 'Ligue 1',
                'is_active' => true,
            ]);
        }

        $this->command->info('Matchs créés avec succès !');
    }
}
