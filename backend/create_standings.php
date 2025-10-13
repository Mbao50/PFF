<?php

require_once __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$clubs = [
    '0199df03-b4fc-7193-acba-4ac351dd3861' => ['name' => 'ASC Jaraaf', 'wins' => 0, 'draws' => 0, 'losses' => 0, 'gf' => 0, 'ga' => 0, 'pts' => 0],
    '0199df03-b4ff-739e-811a-b347027e1bc8' => ['name' => 'Casa Sports', 'wins' => 0, 'draws' => 0, 'losses' => 0, 'gf' => 0, 'ga' => 0, 'pts' => 0],
    '0199df03-b502-7202-82c8-3e56726697d8' => ['name' => 'AS Douanes', 'wins' => 0, 'draws' => 0, 'losses' => 0, 'gf' => 0, 'ga' => 0, 'pts' => 0],
    '0199df03-b514-73f5-8da2-560ec7142806' => ['name' => 'Génération Foot', 'wins' => 0, 'draws' => 0, 'losses' => 0, 'gf' => 0, 'ga' => 0, 'pts' => 0],
    '0199df03-b517-7384-92b9-431c9afa8202' => ['name' => 'Teungueth FC', 'wins' => 0, 'draws' => 0, 'losses' => 0, 'gf' => 0, 'ga' => 0, 'pts' => 0],
    '0199df03-b519-7388-8d27-0d8522816210' => ['name' => 'US Gorée', 'wins' => 0, 'draws' => 0, 'losses' => 0, 'gf' => 0, 'ga' => 0, 'pts' => 0],
];

$matches = \App\Models\Game::where('competition', 'Ligue 1 Sénégalaise')->where('status', 'completed')->get();

foreach ($matches as $match) {
    $homeId = $match->home_team_id;
    $awayId = $match->away_team_id;
    $homeScore = $match->home_score ?? 0;
    $awayScore = $match->away_score ?? 0;

    if (isset($clubs[$homeId])) {
        $clubs[$homeId]['gf'] += $homeScore;
        $clubs[$homeId]['ga'] += $awayScore;
    }
    if (isset($clubs[$awayId])) {
        $clubs[$awayId]['gf'] += $awayScore;
        $clubs[$awayId]['ga'] += $homeScore;
    }

    if ($homeScore > $awayScore) {
        if (isset($clubs[$homeId])) $clubs[$homeId]['wins']++;
        if (isset($clubs[$awayId])) $clubs[$awayId]['losses']++;
    } elseif ($homeScore < $awayScore) {
        if (isset($clubs[$awayId])) $clubs[$awayId]['wins']++;
        if (isset($clubs[$homeId])) $clubs[$homeId]['losses']++;
    } else {
        if (isset($clubs[$homeId])) $clubs[$homeId]['draws']++;
        if (isset($clubs[$awayId])) $clubs[$awayId]['draws']++;
    }
}

foreach ($clubs as &$club) {
    $club['pts'] = ($club['wins'] * 3) + $club['draws'];
}

uasort($clubs, function($a, $b) {
    if ($a['pts'] === $b['pts']) {
        $diffA = $a['gf'] - $a['ga'];
        $diffB = $b['gf'] - $b['ga'];
        return $diffB - $diffA;
    }
    return $b['pts'] - $a['pts'];
});

$position = 1;
foreach ($clubs as $id => $club) {
    \App\Models\StandingEntry::create([
        'club_id' => $id,
        'position' => $position++,
        'matches_played' => $club['wins'] + $club['draws'] + $club['losses'],
        'wins' => $club['wins'],
        'draws' => $club['draws'],
        'losses' => $club['losses'],
        'goals_for' => $club['gf'],
        'goals_against' => $club['ga'],
        'points' => $club['pts'],
        'competition' => 'Ligue 1 Sénégalaise',
        'is_active' => true,
    ]);
}

echo 'Standings created successfully';
