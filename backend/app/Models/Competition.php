<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Competition extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'season',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Relations
    public function standings()
    {
        return $this->hasMany(StandingEntry::class);
    }

    public function matches()
    {
        return $this->hasMany(Game::class);
    }
}










