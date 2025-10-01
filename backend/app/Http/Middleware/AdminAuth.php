<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $role
     */
    public function handle(Request $request, Closure $next, string $role = null): Response
    {
        $user = $request->user();
        
        // Vérifier si l'utilisateur est authentifié
        if (!$user) {
            return response()->json([
                'message' => 'Non authentifié'
            ], 401);
        }

        // Vérifier si l'utilisateur est un administrateur
        if (!$user instanceof \App\Models\AdminUser) {
            return response()->json([
                'message' => 'Accès non autorisé. Administrateur requis.'
            ], 403);
        }

        // Vérifier si l'administrateur est actif
        if (!$user->is_active) {
            return response()->json([
                'message' => 'Votre compte administrateur est suspendu'
            ], 403);
        }

        // Vérifier les rôles spécifiques si demandé
        if ($role) {
            $roles = explode('|', $role);
            $hasRole = false;
            
            foreach ($roles as $requiredRole) {
                if ($requiredRole === 'super_admin' && $user->isSuperAdmin()) {
                    $hasRole = true;
                    break;
                }
                if ($requiredRole === 'admin' && $user->isAdmin()) {
                    $hasRole = true;
                    break;
                }
                if ($requiredRole === 'editor' && $user->canEdit()) {
                    $hasRole = true;
                    break;
                }
            }
            
            if (!$hasRole) {
                return response()->json([
                    'message' => 'Permissions insuffisantes. Rôle requis: ' . $role
                ], 403);
            }
        }

        return $next($request);
    }
}
