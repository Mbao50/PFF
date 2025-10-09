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
        $douanes = Club::where('short_name', 'Douanes')->first();
        $gf = Club::where('short_name', 'GF')->first();
        $tfc = Club::where('short_name', 'TFC')->first();
        $goree = Club::where('short_name', 'Gorée')->first();

        $matches = [
            [
                'home_team_id' => $jaraaf?->id,
                'away_team_id' => $casa?->id,
                'home_score' => 2,
                'away_score' => 1,
                'date' => '2023-10-10',
                'time' => '16:00',
                'venue' => 'Stade Demba Diop',
                'status' => 'completed',
                'competition' => 'Ligue 1 Sénégalaise',
                'is_active' => true,
            ],
            [
                'home_team_id' => $douanes?->id,
                'away_team_id' => $gf?->id,
                'home_score' => 0,
                'away_score' => 0,
                'date' => '2023-10-15',
                'time' => '17:30',
                'venue' => 'Stade Amadou Barry',
                'status' => 'completed',
                'competition' => 'Ligue 1 Sénégalaise',
                'is_active' => true,
            ],
            [
                'home_team_id' => $tfc?->id,
                'away_team_id' => $goree?->id,
                'home_score' => 3,
                'away_score' => 1,
                'date' => '2023-10-18',
                'time' => '16:00',
                'venue' => 'Stade Ngalandou Diouf',
                'status' => 'completed',
                'competition' => 'Ligue 1 Sénégalaise',
                'is_active' => true,
            ],
            [
                'home_team_id' => $casa?->id,
                'away_team_id' => $gf?->id,
                'home_score' => null,
                'away_score' => null,
                'date' => '2023-11-05',
                'time' => '17:00',
                'venue' => 'Stade Aline Sitoe Diatta',
                'status' => 'upcoming',
                'competition' => 'Ligue 1 Sénégalaise',
                'is_active' => true,
            ],
            [
                'home_team_id' => $jaraaf?->id,
                'away_team_id' => $tfc?->id,
                'home_score' => null,
                'away_score' => null,
                'date' => '2023-11-10',
                'time' => '16:30',
                'venue' => 'Stade Demba Diop',
                'status' => 'upcoming',
                'competition' => 'Coupe du Sénégal',
                'is_active' => true,
            ],
        ];

        foreach ($matches as $matchData) {
            if ($matchData['home_team_id'] && $matchData['away_team_id']) {
                Game::create($matchData);
            }
        }

        $this->command->info('Matchs créés avec succès !');
    }
}
