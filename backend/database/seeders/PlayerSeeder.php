<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Club;
use App\Models\Player;

class PlayerSeeder extends Seeder
{
    public function run()
    {
        $jaraaf = Club::where('short_name', 'Jaraaf')->first();
        $casa = Club::where('short_name', 'Casa')->first();
        $douanes = Club::where('short_name', 'Douanes')->first();
        $gf = Club::where('short_name', 'GF')->first();
        $tfc = Club::where('short_name', 'TFC')->first();
        $goree = Club::where('short_name', 'Gorée')->first();

        $players = [
            [
                'name' => 'Moussa Ndiaye',
                'position' => 'Defender',
                'birthdate' => '1998-06-15',
                'nationality' => 'Senegalese',
                'club_id' => $jaraaf?->id,
                'image' => 'https://images.pexels.com/photos/3641600/pexels-photo-3641600.jpeg?auto=compress&cs=tinysrgb&w=150',
                'height' => '1.80m',
                'weight' => '75kg',
                'appearances' => 25,
                'goals' => 2,
                'assists' => 4,
                'yellow_cards' => 5,
                'red_cards' => 0,
                'is_active' => true,
            ],
            [
                'name' => 'Abdou Aziz Ndiaye',
                'position' => 'Midfielder',
                'birthdate' => '1999-08-20',
                'nationality' => 'Senegalese',
                'club_id' => $jaraaf?->id,
                'image' => 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=150',
                'height' => '1.77m',
                'weight' => '72kg',
                'appearances' => 28,
                'goals' => 6,
                'assists' => 8,
                'yellow_cards' => 3,
                'red_cards' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Mamadou Lamine Diallo',
                'position' => 'Forward',
                'birthdate' => '2001-04-12',
                'nationality' => 'Senegalese',
                'club_id' => $casa?->id,
                'image' => 'https://images.pexels.com/photos/2859616/pexels-photo-2859616.jpeg?auto=compress&cs=tinysrgb&w=150',
                'height' => '1.82m',
                'weight' => '76kg',
                'appearances' => 30,
                'goals' => 14,
                'assists' => 5,
                'yellow_cards' => 2,
                'red_cards' => 0,
                'is_active' => true,
            ],
            [
                'name' => 'Cheikh Tidiane Diop',
                'position' => 'Goalkeeper',
                'birthdate' => '1996-11-05',
                'nationality' => 'Senegalese',
                'club_id' => $douanes?->id,
                'image' => 'https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg?auto=compress&cs=tinysrgb&w=150',
                'height' => '1.90m',
                'weight' => '85kg',
                'appearances' => 26,
                'goals' => 0,
                'assists' => 0,
                'yellow_cards' => 1,
                'red_cards' => 0,
                'is_active' => true,
            ],
            [
                'name' => 'Pape Demba Diop',
                'position' => 'Midfielder',
                'birthdate' => '2000-01-29',
                'nationality' => 'Senegalese',
                'club_id' => $gf?->id,
                'image' => 'https://images.pexels.com/photos/3760822/pexels-photo-3760822.jpeg?auto=compress&cs=tinysrgb&w=150',
                'height' => '1.76m',
                'weight' => '70kg',
                'appearances' => 22,
                'goals' => 3,
                'assists' => 2,
                'yellow_cards' => 4,
                'red_cards' => 0,
                'is_active' => true,
            ],
            [
                'name' => 'Babacar Niang',
                'position' => 'Forward',
                'birthdate' => '1994-03-15',
                'nationality' => 'Senegalese',
                'club_id' => $tfc?->id,
                'image' => 'https://images.pexels.com/photos/3775540/pexels-photo-3775540.jpeg?auto=compress&cs=tinysrgb&w=150',
                'height' => '1.85m',
                'weight' => '78kg',
                'appearances' => 25,
                'goals' => 8,
                'assists' => 3,
                'yellow_cards' => 3,
                'red_cards' => 0,
                'is_active' => true,
            ],
            [
                'name' => 'Mouhamed Diop',
                'position' => 'Defender',
                'birthdate' => '1996-07-22',
                'nationality' => 'Senegalese',
                'club_id' => $goree?->id,
                'image' => 'https://images.pexels.com/photos/3772511/pexels-photo-3772511.jpeg?auto=compress&cs=tinysrgb&w=150',
                'height' => '1.82m',
                'weight' => '76kg',
                'appearances' => 20,
                'goals' => 1,
                'assists' => 1,
                'yellow_cards' => 5,
                'red_cards' => 1,
                'is_active' => true,
            ],
        ];

        foreach ($players as $data) {
            if ($data['club_id']) {
                Player::create($data);
            }
        }

        $this->command->info('Joueurs créés avec succès !');
    }
}
