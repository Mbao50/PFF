<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Player extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'position',
        'birthdate',
        'nationality',
        'club_id',
        'image',
        'height',
        'weight',
        'appearances',
        'goals',
        'assists',
        'yellow_cards',
        'red_cards',
        'is_active',
    ];

    protected $casts = [
        'birthdate' => 'date',
        'appearances' => 'integer',
        'goals' => 'integer',
        'assists' => 'integer',
        'yellow_cards' => 'integer',
        'red_cards' => 'integer',
        'is_active' => 'boolean',
    ];

    // Relations
    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}

