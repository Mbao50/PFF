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
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/ASC_Jaraaf_logo.svg/200px-ASC_Jaraaf_logo.svg.png',
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
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Casa_Sports_FC_logo.svg/200px-Casa_Sports_FC_logo.svg.png',
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
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/AS_Douanes_%28Senegal%29_logo.svg/200px-AS_Douanes_%28Senegal%29_logo.svg.png',
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
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/G%C3%A9n%C3%A9ration_Foot_logo.svg/200px-G%C3%A9n%C3%A9ration_Foot_logo.svg.png',
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
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Teungueth_FC_logo.svg/200px-Teungueth_FC_logo.svg.png',
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
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/US_Gor%C3%A9e_logo.svg/200px-US_Gor%C3%A9e_logo.svg.png',
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
