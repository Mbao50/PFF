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
                'logo' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-th2oaNBWsV3jlrWSog_Jt3WcootAz1ipKw&s',
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
                'logo' => 'https://upload.wikimedia.org/wikipedia/fr/3/35/IMG_casa.png',
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
                'logo' => 'https://upload.wikimedia.org/wikipedia/fr/1/1e/AS_Douanes.png',
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
                'logo' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA3Cy1cXhjFv2yL3-1EVjMvV2ztVxSQDJreg&s',
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
                'logo' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWaI_Z-i5bcE4CZKWUGHA7r0a8I3zu1WqKEn-BBuOC1JCIxupEdLc5fLdfyjm9mHWPF4I&usqp=CAU',
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
                'logo' => 'https://upload.wikimedia.org/wikipedia/fr/thumb/a/ac/IMG_Usgorre.jpeg/250px-IMG_Usgorre.jpeg',
                'founded' => 1933,
                'stadium' => 'Stade Demba Diop',
                'coach' => 'Mbaye Badji',
                'location' => 'Gorée Island',
                'colors' => 'Red and Yellow',
                'is_active' => true,
            ],
        ];

        foreach ($clubs as $clubData) {
            Club::updateOrCreate(
                ['short_name' => $clubData['short_name']],
                $clubData
            );
        }

        $this->command->info('Clubs créés avec succès !');
    }
}
