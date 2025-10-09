<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClubController;
use App\Http\Controllers\Api\PlayerController;
use App\Http\Controllers\Api\MatchController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\StandingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Routes d'authentification
Route::prefix('v1/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'userLogin']);
    
    // Routes d'authentification des administrateurs
    Route::prefix('admin')->group(function () {
        // Route de diagnostic temporaire (à retirer après debug)
        Route::get('/debug', function () {
            $email = 'admin@samafoot.sn';
            $admin = \App\Models\AdminUser::where('email', $email)->first();

            if (!$admin) {
                return response()->json([
                    'email' => $email,
                    'exists' => false,
                    'all_admins' => \App\Models\AdminUser::all(['id', 'email', 'is_active'])->toArray(),
                ]);
            }

            $passwordOk = \Illuminate\Support\Facades\Hash::check('admin123', $admin->password);
            $passwordHash = $admin->password;

            return response()->json([
                'email' => $email,
                'exists' => true,
                'is_active' => (bool) $admin->is_active,
                'password_matches_admin123' => $passwordOk,
                'password_hash' => $admin->password,
                'admin_data' => $admin->toArray(),
            ]);
        });

        // Route pour réinitialiser le mot de passe admin (temporaire)
        Route::post('/reset-password', function () {
            $email = 'admin@samafoot.sn';
            $admin = \App\Models\AdminUser::where('email', $email)->first();
            
            if (!$admin) {
                return response()->json(['error' => 'Admin non trouvé'], 404);
            }
            
            $admin->password = \Illuminate\Support\Facades\Hash::make('admin123');
            $admin->save();
            
            return response()->json([
                'message' => 'Mot de passe réinitialisé',
                'new_password' => 'admin123',
                'password_matches' => \Illuminate\Support\Facades\Hash::check('admin123', $admin->password)
            ]);
        });

        // GET informatif pour guider vers POST
        Route::get('/login', function () {
            return response()->json([
                'message' => 'Utilisez la méthode POST pour vous connecter',
                'endpoint' => '/api/v1/auth/admin/login',
                'method' => 'POST',
                'expected_body' => ['email' => 'string', 'password' => 'string'],
            ], 405);
        })->name('admin.login.info');

        Route::post('/login', [AuthController::class, 'login']);
        
        // Routes protégées par authentification admin
        Route::middleware(['auth:admin', \App\Http\Middleware\AdminAuth::class])->group(function () {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::get('/me', [AuthController::class, 'me']);
            Route::post('/change-password', [AuthController::class, 'changePassword']);

            // Routes réservées aux super administrateurs
            Route::middleware(\App\Http\Middleware\AdminAuth::class . ':super_admin')->group(function () {
                Route::post('/create', [AuthController::class, 'createAdmin']);
                Route::get('/list', [AuthController::class, 'listAdmins']);
                Route::post('/{id}/toggle-status', [AuthController::class, 'toggleAdminStatus']);
                Route::delete('/{id}', [AuthController::class, 'deleteAdmin']);
            });
        });
    });
});

// Routes publiques (lecture seule)
Route::prefix('v1')->group(function () {
    // Routes des clubs
    Route::get('/clubs', [ClubController::class, 'index']);
    Route::get('/clubs/{club}', [ClubController::class, 'show']);
    
    // Routes des joueurs
    Route::get('/players', [PlayerController::class, 'index']);
    Route::get('/players/{player}', [PlayerController::class, 'show']);
    
    // Routes des matchs
    Route::get('/matches', [MatchController::class, 'index']);
    Route::get('/matches/{match}', [MatchController::class, 'show']);
    
    // Routes des articles
    Route::get('/articles', [ArticleController::class, 'index']);
    Route::get('/articles/{article}', [ArticleController::class, 'show']);
    
    // Routes des classements
    Route::get('/standings', [StandingController::class, 'index']);
    Route::get('/standings/{standing}', [StandingController::class, 'show']);
});

// Routes protégées (administration)
Route::middleware(['auth:admin', \App\Http\Middleware\AdminAuth::class . ':editor'])->prefix('v1/admin')->group(function () {
    // Gestion des clubs
    Route::apiResource('clubs', ClubController::class);
    
    // Gestion des joueurs
    Route::apiResource('players', PlayerController::class);
    
    // Gestion des matchs
    Route::apiResource('matches', MatchController::class);
    
    // Gestion des articles
    Route::apiResource('articles', ArticleController::class);
    Route::post('/articles/{article}/toggle-publish', [ArticleController::class, 'togglePublish']);
    
    // Gestion des classements
    Route::apiResource('standings', StandingController::class);
    Route::post('/standings/update-from-matches', [StandingController::class, 'updateFromMatches']);
});
        
