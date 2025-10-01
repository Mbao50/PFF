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
                'yellow_cards' => 6,
                'red_cards' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Ibrahima Faye',
                'position' => 'Forward',
                'birthdate' => '2001-03-12',
                'nationality' => 'Senegalese',
                'club_id' => $casa?->id,
                'image' => 'https://images.pexels.com/photos/257970/pexels-photo-257970.jpeg?auto=compress&cs=tinysrgb&w=150',
                'height' => '1.82m',
                'weight' => '76kg',
                'appearances' => 22,
                'goals' => 10,
                'assists' => 3,
                'yellow_cards' => 2,
                'red_cards' => 0,
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
