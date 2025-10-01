<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Club;

class ClubSeeder extends Seeder
{
    public function run()
    {
        $clubs = [
            [
                'name' => 'ASC Jaraaf',
                'short_name' => 'Jaraaf',
                'logo' => 'https://images.pexels.com/photos/1667583/pexels-photo-1667583.jpeg?auto=compress&cs=tinysrgb&w=100',
                'founded' => 1969,
                'stadium' => 'Stade Demba Diop',
                'coach' => 'Malick Daf',
                'location' => 'Dakar',
                'colors' => 'Green and White',
                'is_active' => true,
            ],
            [
                'name' => 'Casa Sports',
                'short_name' => 'Casa',
                'logo' => 'https://images.pexels.com/photos/1005697/pexels-photo-1005697.jpeg?auto=compress&cs=tinysrgb&w=100',
                'founded' => 1960,
                'stadium' => 'Stade Aline Sitoe Diatta',
                'coach' => 'Ansou Diadhiou',
                'location' => 'Ziguinchor',
                'colors' => 'Yellow and Green',
                'is_active' => true,
            ],
            [
                'name' => 'AS Douanes',
                'short_name' => 'Douanes',
                'logo' => 'https://images.pexels.com/photos/1146278/pexels-photo-1146278.jpeg?auto=compress&cs=tinysrgb&w=100',
                'founded' => 1980,
                'stadium' => 'Stade Amadou Barry',
                'coach' => 'Mamadou Guèye',
                'location' => 'Dakar',
                'colors' => 'Blue and White',
                'is_active' => true,
            ],
            [
                'name' => 'Génération Foot',
                'short_name' => 'GF',
                'logo' => 'https://images.pexels.com/photos/3775708/pexels-photo-3775708.jpeg?auto=compress&cs=tinysrgb&w=100',
                'founded' => 2000,
                'stadium' => 'Stade Déni Biram Ndao',
                'coach' => 'Balla Djiba',
                'location' => 'Dakar',
                'colors' => 'Red and White',
                'is_active' => true,
            ],
            [
                'name' => 'Teungueth FC',
                'short_name' => 'TFC',
                'logo' => 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100',
                'founded' => 2010,
                'stadium' => 'Stade Ngalandou Diouf',
                'coach' => 'Ndiambour Pape',
                'location' => 'Rufisque',
                'colors' => 'Red and Black',
                'is_active' => true,
            ],
            [
                'name' => 'US Gorée',
                'short_name' => 'Gorée',
                'logo' => 'https://images.pexels.com/photos/18685188/pexels-photo-18685188/free-photo-of-circular-emblem-of-a-professional-football-team.jpeg?auto=compress&cs=tinysrgb&w=100',
                'founded' => 1933,
                'stadium' => 'Stade Demba Diop',
                'coach' => 'Mbaye Badji',
                'location' => 'Gorée Island',
                'colors' => 'Red and Yellow',
                'is_active' => true,
            ],
        ];

        foreach ($clubs as $clubData) {
            Club::create($clubData);
        }

        $this->command->info('Clubs créés avec succès !');
    }
}
