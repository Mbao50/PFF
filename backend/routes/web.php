<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\ClubController;
use App\Http\Controllers\Admin\PlayerController;
use App\Http\Controllers\Admin\MatchController;
use App\Http\Controllers\Admin\StandingController;

Route::get('/', function () {
    return view('welcome');
});

// Alias global pour éviter l'erreur "Route [login] not defined" et rediriger vers la page de login admin
Route::get('/login', function () {
    return redirect()->route('admin.login');
})->name('login');

// Routes d'authentification admin
Route::prefix('admin')->name('admin.')->group(function () {
    // Routes publiques
    Route::get('/login', [AdminController::class, 'login'])->name('login');
    Route::post('/login', [AdminController::class, 'authenticate'])->name('authenticate');
    
    // Routes protégées
    Route::middleware('auth:admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::post('/logout', [AdminController::class, 'logout'])->name('logout');
        
        // Routes des articles
        Route::resource('articles', ArticleController::class);
        Route::post('/articles/{article}/toggle-publish', [ArticleController::class, 'togglePublish'])->name('articles.toggle-publish');
        
        // Routes des clubs
        Route::resource('clubs', ClubController::class);
        Route::post('/clubs/{club}/toggle-status', [ClubController::class, 'toggleStatus'])->name('clubs.toggle-status');
        
        // Routes des joueurs
        Route::resource('players', PlayerController::class);
        Route::post('/players/{player}/toggle-status', [PlayerController::class, 'toggleStatus'])->name('players.toggle-status');
        
        // Routes des matchs
        Route::resource('matches', MatchController::class);
        Route::post('/matches/{match}/toggle-status', [MatchController::class, 'toggleStatus'])->name('matches.toggle-status');
        
        // Routes des classements
        Route::resource('standings', StandingController::class);
        Route::post('/standings/{standing}/toggle-status', [StandingController::class, 'toggleStatus'])->name('standings.toggle-status');
    });
});
