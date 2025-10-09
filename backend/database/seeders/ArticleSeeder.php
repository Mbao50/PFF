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
                'content' => "Dans un match très disputé au Stade Demba Diop, l'ASC Jaraaf a remporté le derby dakaroise contre Casa Sports sur le score de 2-1. Les buts ont été marqués par Pape Amadou Diop (23e) et Moussa Ndiaye (67e) pour Jaraaf, tandis que Ibrahima Niane a réduit l'écart pour Casa Sports à la 82e minute. Cette victoire permet à Jaraaf de consolider sa deuxième place au classement.",
                'image' => 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600',
                'author' => 'Mamadou Diallo',
                'category' => 'news',
                'tags' => ['Jaraaf', 'Casa Sports', 'Derby', 'Ligue 1', 'Dakar'],
                'is_published' => true,
                'published_at' => now(),
                'is_active' => true,
            ],
            [
                'title' => "Teungueth FC signe un jeune talent de l'académie",
                'content' => "Le Teungueth Football Club a officialisé la signature de son jeune prodige, Cheikh Ahmadou Bamba, 18 ans. Formé au club depuis l'âge de 12 ans, ce milieu de terrain offensif a impressionné lors des matches de préparation. Le contrat court sur 3 saisons avec une option de prolongation. 'Cheikh représente l'avenir du club', a déclaré le président du TFC.",
                'image' => 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600',
                'author' => 'Fatou Sow',
                'category' => 'transfer',
                'tags' => ['Transfert', 'TFC', 'Jeune talent', 'Académie'],
                'is_published' => true,
                'published_at' => now()->subDays(5),
                'is_active' => true,
            ],
            [
                'title' => "Génération Foot domine le championnat cette saison",
                'content' => "Avec 8 victoires en 10 matches, Génération Foot caracole en tête du championnat sénégalais. L'équipe de Mbour, entraînée par le technicien français Alain Giresse, affiche un jeu collectif impressionnant. Leur défense reste invaincue depuis 7 matches, et l'attaque fait trembler les filets adverses avec une moyenne de 2,3 buts par match.",
                'image' => 'https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg?auto=compress&cs=tinysrgb&w=600',
                'author' => 'Samba Ndiaye',
                'category' => 'analysis',
                'tags' => ['Génération Foot', 'Championnat', 'Leader', 'Alain Giresse'],
                'is_published' => true,
                'published_at' => now()->subDays(3),
                'is_active' => true,
            ],
            [
                'title' => "Interview exclusive: Lamine Ndiaye, capitaine de l'ASC Diaraf",
                'content' => "Dans cette interview exclusive, Lamine Ndiaye, capitaine de l'ASC Diaraf, nous parle de ses ambitions pour la saison. 'Notre objectif est de terminer dans le top 5 cette année. Nous avons une équipe jeune et talentueuse qui mérite de jouer les premiers rôles.' Le défenseur central de 32 ans est l'un des piliers de l'équipe keur Massar.",
                'image' => 'https://images.pexels.com/photos/1210843/pexels-photo-1210843.jpeg?auto=compress&cs=tinysrgb&w=600',
                'author' => 'Aminata Ba',
                'category' => 'interview',
                'tags' => ['Interview', 'ASC Diaraf', 'Capitaine', 'Lamine Ndiaye'],
                'is_published' => true,
                'published_at' => now()->subDays(7),
                'is_active' => true,
            ],
            [
                'title' => "Casa Sports en difficulté financière",
                'content' => "Le club historique de Casa Sports fait face à d'importantes difficultés financières. Selon nos sources, les salaires des joueurs sont en retard de deux mois, et plusieurs sponsors ont suspendu leurs versements. Le président du club a annoncé des négociations avec la Fédération sénégalaise de football pour trouver des solutions. L'avenir du club phare de Ziguinchor semble incertain.",
                'image' => 'https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=600',
                'author' => 'Omar Faye',
                'category' => 'news',
                'tags' => ['Casa Sports', 'Finances', 'Crise', 'Ziguinchor'],
                'is_published' => true,
                'published_at' => now()->subDays(2),
                'is_active' => true,
            ],
            [
                'title' => "Le mercato hivernal s'annonce mouvementé",
                'content' => "Avec la trêve internationale qui approche, les clubs sénégalais se préparent pour le mercato hivernal. Plusieurs joueurs étrangers pourraient quitter le championnat, tandis que des renforts africains sont attendus. Génération Foot et Teungueth FC seraient particulièrement actifs sur ce marché des transferts.",
                'image' => 'https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=600',
                'author' => 'Khadim Diop',
                'category' => 'transfer',
                'tags' => ['Mercato', 'Transferts', 'Hivernal', 'Renforts'],
                'is_published' => true,
                'published_at' => now()->subDays(10),
                'is_active' => true,
            ],
            [
                'title' => "Analyse: Pourquoi l'ASC Jaraaf domine le championnat",
                'content' => "L'ASC Jaraaf affiche des statistiques impressionnantes cette saison : meilleure attaque, meilleure défense, et un jeu collectif rodé. Leur entraîneur, Youssoupha Dabo, a su créer une alchimie parfaite entre les jeunes talents locaux et les joueurs d'expérience. Cette domination pourrait-elle durer jusqu'à la fin de la saison ?",
                'image' => 'https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg?auto=compress&cs=tinysrgb&w=600',
                'author' => 'Moustapha Gueye',
                'category' => 'analysis',
                'tags' => ['Analyse', 'ASC Jaraaf', 'Championnat', 'Youssoupha Dabo'],
                'is_published' => true,
                'published_at' => now()->subDays(4),
                'is_active' => true,
            ],
            [
                'title' => "Le Stade de Mbour enfin homologué",
                'content' => "Après plusieurs mois de travaux, le Stade Caroline Faye de Mbour a enfin été homologué par la CAF. Génération Foot pourra désormais accueillir les matches internationaux dans des conditions optimales. Cette homologation représente une avancée majeure pour le football sénégalais en région.",
                'image' => 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600',
                'author' => 'Seynabou Diagne',
                'category' => 'news',
                'tags' => ['Stade', 'Mbour', 'Homologation', 'CAF', 'Génération Foot'],
                'is_published' => true,
                'published_at' => now()->subDays(6),
                'is_active' => true,
            ],
        ];

        foreach ($articles as $data) {
            Article::create($data);
        }

        $this->command->info('Articles créés avec succès !');
    }
}
