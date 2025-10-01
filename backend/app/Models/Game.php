<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Game extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'matches';

    protected $fillable = [
        'home_team_id',
        'away_team_id',
        'home_score',
        'away_score',
        'date',
        'time',
        'venue',
        'status',
        'competition',
        'is_active',
    ];

    protected $casts = [
        'date' => 'date',
        'home_score' => 'integer',
        'away_score' => 'integer',
        'is_active' => 'boolean',
    ];

    // Relations
    public function homeTeam()
    {
        return $this->belongsTo(Club::class, 'home_team_id');
    }

    public function awayTeam()
    {
        return $this->belongsTo(Club::class, 'away_team_id');
    }
}
