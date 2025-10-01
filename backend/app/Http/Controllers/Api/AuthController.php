<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * Authentification d'un administrateur
     */
    public function login(Request $request)
    {
        // Normaliser les entrées
        $request->merge([
            'email' => strtolower(trim((string) $request->input('email'))),
        ]);

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = AdminUser::where('email', $request->email)
            ->where('is_active', true)
            ->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'message' => 'Identifiants invalides'
            ], 401);
        }

        $token = $admin->createToken('admin-token', ['admin'])->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'role' => $admin->role,
            ],
            'token' => $token
        ]);
    }

    /**
     * Authentification d'un utilisateur régulier
     */
    public function userLogin(Request $request)
    {
        // Normaliser les entrées
        $request->merge([
            'email' => strtolower(trim((string) $request->input('email'))),
        ]);

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Récupérer l'utilisateur en utilisant le modèle User
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Identifiants invalides'
            ], 401);
        }

        // Créer un token pour l'utilisateur
        // Note: This assumes the User model has the Laravel Sanctum HasApiTokens trait
        $token = $user->createToken('user-token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'token' => $token
        ]);
    }

    /**
     * Déconnexion de l'administrateur
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }

    /**
     * Récupérer les informations de l'administrateur connecté
     */
    public function me(Request $request)
    {
        return response()->json([
            'admin' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'role' => $request->user()->role,
                'is_active' => $request->user()->is_active,
            ]
        ]);
    }

    /**
     * Changer le mot de passe de l'administrateur
     */
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = $request->user();

        if (!Hash::check($request->current_password, $admin->password)) {
            return response()->json([
                'message' => 'Mot de passe actuel incorrect'
            ], 422);
        }

        $admin->password = Hash::make($request->new_password);
        $admin->save();

        return response()->json([
            'message' => 'Mot de passe modifié avec succès'
        ]);
    }

    /**
     * Créer un nouvel administrateur (réservé aux super admins)
     */
    public function createAdmin(Request $request)
    {
        if (!$request->user()->isSuperAdmin()) {
            return response()->json([
                'message' => 'Accès non autorisé. Seuls les super administrateurs peuvent créer des administrateurs.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admin_users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:super_admin,admin,editor',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = AdminUser::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'Administrateur créé avec succès',
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'role' => $admin->role,
            ]
        ], 201);
    }

    /**
     * Lister tous les administrateurs (réservé aux super admins)
     */
    public function listAdmins(Request $request)
    {
        if (!$request->user()->isSuperAdmin()) {
            return response()->json([
                'message' => 'Accès non autorisé. Seuls les super administrateurs peuvent voir la liste des administrateurs.'
            ], 403);
        }

        $admins = AdminUser::all();

        return response()->json([
            'admins' => $admins->map(function ($admin) {
                return [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'email' => $admin->email,
                    'role' => $admin->role,
                    'is_active' => $admin->is_active,
                    'created_at' => $admin->created_at,
                ];
            })
        ]);
    }

    /**
     * Suspendre/réactiver un administrateur (réservé aux super admins)
     */
    public function toggleAdminStatus(Request $request, $id)
    {
        if (!$request->user()->isSuperAdmin()) {
            return response()->json([
                'message' => 'Accès non autorisé. Seuls les super administrateurs peuvent modifier le statut des administrateurs.'
            ], 403);
        }

        $admin = AdminUser::findOrFail($id);

        // Empêcher l'auto-suspension
        if ($admin->id === $request->user()->id) {
            return response()->json([
                'message' => 'Vous ne pouvez pas modifier votre propre statut'
            ], 422);
        }

        $admin->is_active = !$admin->is_active;
        $admin->save();

        return response()->json([
            'message' => $admin->is_active ? 'Administrateur réactivé' : 'Administrateur suspendu',
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'role' => $admin->role,
                'is_active' => $admin->is_active,
            ]
        ]);
    }

    /**
     * Supprimer un administrateur (réservé aux super admins)
     */
    public function deleteAdmin(Request $request, $id)
    {
        if (!$request->user()->isSuperAdmin()) {
            return response()->json([
                'message' => 'Accès non autorisé. Seuls les super administrateurs peuvent supprimer des administrateurs.'
            ], 403);
        }

        $admin = AdminUser::findOrFail($id);

        // Empêcher l'auto-suppression
        if ($admin->id === $request->user()->id) {
            return response()->json([
                'message' => 'Vous ne pouvez pas vous supprimer vous-même'
            ], 422);
        }

        $admin->delete();

        return response()->json([
            'message' => 'Administrateur supprimé avec succès'
        ]);
    }
}
