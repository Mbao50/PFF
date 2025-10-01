<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Créer les utilisateurs admin d'abord
        $this->call(AdminUserSeeder::class);
        
        // Créer les données de test
        $this->call(ClubSeeder::class);
        $this->call(PlayerSeeder::class);
        $this->call(MatchSeeder::class);
        $this->call(ArticleSeeder::class);
        
        $this->command->info('Base de données peuplée avec succès !');
    }
}
