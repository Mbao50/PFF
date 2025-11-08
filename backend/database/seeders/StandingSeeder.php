<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StandingEntry;
use App\Models\Club;

class StandingSeeder extends Seeder
{
    public function run()
    {
        // Supprimer les classements existants
        StandingEntry::where('competition', 'Ligue 1 Sénégalaise')->delete();

        // Récupérer tous les clubs
        $clubs = Club::all();

        // Créer des classements fictifs pour la Ligue 1 Sénégalaise
        $standings = [
            ['position' => 1, 'short_name' => 'Jaraaf', 'matches_played' => 10, 'wins' => 7, 'draws' => 2, 'losses' => 1, 'goals_for' => 18, 'goals_against' => 8, 'points' => 23],
            ['position' => 2, 'short_name' => 'Casa', 'matches_played' => 10, 'wins' => 6, 'draws' => 3, 'losses' => 1, 'goals_for' => 16, 'goals_against' => 7, 'points' => 21],
            ['position' => 3, 'short_name' => 'Douanes', 'matches_played' => 10, 'wins' => 5, 'draws' => 4, 'losses' => 1, 'goals_for' => 14, 'goals_against' => 9, 'points' => 19],
            ['position' => 4, 'short_name' => 'GF', 'matches_played' => 10, 'wins' => 5, 'draws' => 2, 'losses' => 3, 'goals_for' => 15, 'goals_against' => 12, 'points' => 17],
            ['position' => 5, 'short_name' => 'TFC', 'matches_played' => 10, 'wins' => 4, 'draws' => 3, 'losses' => 3, 'goals_for' => 13, 'goals_against' => 11, 'points' => 15],
            ['position' => 6, 'short_name' => 'Gorée', 'matches_played' => 10, 'wins' => 3, 'draws' => 4, 'losses' => 3, 'goals_for' => 12, 'goals_against' => 13, 'points' => 13],
        ];

        foreach ($standings as $standing) {
            $club = $clubs->where('short_name', $standing['short_name'])->first();

            if ($club) {
                StandingEntry::create([
                    'club_id' => $club->id,
                    'position' => $standing['position'],
                    'matches_played' => $standing['matches_played'],
                    'wins' => $standing['wins'],
                    'draws' => $standing['draws'],
                    'losses' => $standing['losses'],
                    'goals_for' => $standing['goals_for'],
                    'goals_against' => $standing['goals_against'],
                    'points' => $standing['points'],
                    'competition' => 'Ligue 1 Sénégalaise',
                    'is_active' => true,
                ]);
            }
        }

        $this->command->info('Classements créés avec succès !');
    }
}
