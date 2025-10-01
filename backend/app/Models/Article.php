<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Article extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'content',
        'image',
        'author',
        'category',
        'tags',
        'is_published',
        'published_at',
        'is_active',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'is_active' => 'boolean',
    ];
}










