<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class StandingEntry extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'position',
        'club_id',
        'competition',
        'matches_played',
        'wins',
        'draws',
        'losses',
        'goals_for',
        'goals_against',
        'points',
        'is_active',
    ];

    protected $casts = [
        'position' => 'integer',
        'matches_played' => 'integer',
        'wins' => 'integer',
        'draws' => 'integer',
        'losses' => 'integer',
        'goals_for' => 'integer',
        'goals_against' => 'integer',
        'points' => 'integer',
        'is_active' => 'boolean',
    ];

    // Relations
    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    // Note: competition est maintenant un champ string, pas une relation
}










