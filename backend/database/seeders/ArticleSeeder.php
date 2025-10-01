<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    public function run()
    {
        $articles = [
            [
                'title' => "ASC Jaraaf remporte le derby contre Casa Sports",
                'content' => 'Un match intense s\'est déroulé entre les deux équipes...',
                'image' => 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600',
                'author' => 'Mamadou Diallo',
                'category' => 'news',
                'tags' => ['Jaraaf', 'Casa', 'Derby'],
                'is_published' => true,
                'published_at' => now(),
                'is_active' => true,
            ],
            [
                'title' => "Teungueth FC signe un jeune talent de l\'académie",
                'content' => 'Le club a officialisé la signature...',
                'image' => 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600',
                'author' => 'Fatou Sow',
                'category' => 'transfer',
                'tags' => ['Transfert', 'TFC'],
                'is_published' => true,
                'published_at' => now()->subDays(5),
                'is_active' => true,
            ],
        ];

        foreach ($articles as $data) {
            Article::create($data);
        }

        $this->command->info('Articles créés avec succès !');
    }
}
