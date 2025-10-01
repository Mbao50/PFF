<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Club extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'short_name',
        'logo',
        'founded',
        'stadium',
        'coach',
        'location',
        'colors',
        'is_active',
    ];

    protected $casts = [
        'founded' => 'integer',
        'is_active' => 'boolean',
    ];

    // Relations
    public function players()
    {
        return $this->hasMany(Player::class);
    }

    public function homeMatches()
    {
        return $this->hasMany(Game::class, 'home_team_id');
    }

    public function awayMatches()
    {
        return $this->hasMany(Game::class, 'away_team_id');
    }

    public function standings()
    {
        return $this->hasMany(StandingEntry::class);
    }
}
