<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StandingEntry;
use App\Models\Club;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StandingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $standings = StandingEntry::with('club')
            ->where('is_active', true)
            ->orderBy('position')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $standings
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'club_id' => 'required|uuid|exists:clubs,id',
            'position' => 'required|integer|min:1',
            'matches_played' => 'required|integer|min:0',
            'wins' => 'required|integer|min:0',
            'draws' => 'required|integer|min:0',
            'losses' => 'required|integer|min:0',
            'goals_for' => 'required|integer|min:0',
            'goals_against' => 'required|integer|min:0',
            'points' => 'required|integer|min:0',
            'competition' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();
        $data['is_active'] = true;
        $standing = StandingEntry::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Classement créé avec succès',
            'data' => $standing->load('club')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(StandingEntry $standing)
    {
        if (!$standing->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Classement non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $standing->load('club')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StandingEntry $standing)
    {
        $validator = Validator::make($request->all(), [
            'club_id' => 'sometimes|required|uuid|exists:clubs,id',
            'position' => 'sometimes|required|integer|min:1',
            'matches_played' => 'sometimes|required|integer|min:0',
            'wins' => 'sometimes|required|integer|min:0',
            'draws' => 'sometimes|required|integer|min:0',
            'losses' => 'sometimes|required|integer|min:0',
            'goals_for' => 'sometimes|required|integer|min:0',
            'goals_against' => 'sometimes|required|integer|min:0',
            'points' => 'sometimes|required|integer|min:0',
            'competition' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $standing->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Classement mis à jour avec succès',
            'data' => $standing->load('club')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StandingEntry $standing)
    {
        // Soft delete - marquer comme inactif
        $standing->update(['is_active' => false]);

        return response()->json([
            'success' => true,
            'message' => 'Classement supprimé avec succès'
        ]);
    }

    /**
     * Mettre à jour automatiquement les classements basés sur les matchs
     */
    public function updateFromMatches(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'competition' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $competition = $request->competition;
        
        // Récupérer tous les matchs terminés de cette compétition
        $completedMatches = \App\Models\Game::where('competition', $competition)
            ->where('status', 'completed')
            ->where('is_active', true)
            ->get();

        // Réinitialiser les classements pour cette compétition
        StandingEntry::where('competition', $competition)->update(['is_active' => false]);

        // Calculer les statistiques pour chaque club
        $clubStats = [];
        
        foreach ($completedMatches as $match) {
            $homeClubId = $match->home_team_id;
            $awayClubId = $match->away_team_id;
            
            if (!isset($clubStats[$homeClubId])) {
                $clubStats[$homeClubId] = [
                    'club_id' => $homeClubId,
                    'matches_played' => 0,
                    'wins' => 0,
                    'draws' => 0,
                    'losses' => 0,
                    'goals_for' => 0,
                    'goals_against' => 0,
                    'points' => 0,
                ];
            }
            
            if (!isset($clubStats[$awayClubId])) {
                $clubStats[$awayClubId] = [
                    'club_id' => $awayClubId,
                    'matches_played' => 0,
                    'wins' => 0,
                    'draws' => 0,
                    'losses' => 0,
                    'goals_for' => 0,
                    'goals_against' => 0,
                    'points' => 0,
                ];
            }
            
            // Mettre à jour les statistiques
            $clubStats[$homeClubId]['matches_played']++;
            $clubStats[$awayClubId]['matches_played']++;
            $clubStats[$homeClubId]['goals_for'] += $match->home_score ?? 0;
            $clubStats[$homeClubId]['goals_against'] += $match->away_score ?? 0;
            $clubStats[$awayClubId]['goals_for'] += $match->away_score ?? 0;
            $clubStats[$awayClubId]['goals_against'] += $match->home_score ?? 0;
            
            // Déterminer le résultat
            if ($match->home_score > $match->away_score) {
                $clubStats[$homeClubId]['wins']++;
                $clubStats[$homeClubId]['points'] += 3;
                $clubStats[$awayClubId]['losses']++;
            } elseif ($match->home_score < $match->away_score) {
                $clubStats[$awayClubId]['wins']++;
                $clubStats[$awayClubId]['points'] += 3;
                $clubStats[$homeClubId]['losses']++;
            } else {
                $clubStats[$homeClubId]['draws']++;
                $clubStats[$homeClubId]['points'] += 1;
                $clubStats[$awayClubId]['draws']++;
                $clubStats[$awayClubId]['points'] += 1;
            }
        }
        
        // Trier par points (décroissant) puis par différence de buts
        uasort($clubStats, function($a, $b) {
            if ($a['points'] === $b['points']) {
                $diffA = $a['goals_for'] - $a['goals_against'];
                $diffB = $b['goals_for'] - $b['goals_against'];
                return $diffB - $diffA;
            }
            return $b['points'] - $a['points'];
        });
        
        // Créer les entrées de classement
        $position = 1;
        foreach ($clubStats as $stats) {
            StandingEntry::create([
                'club_id' => $stats['club_id'],
                'position' => $position++,
                'matches_played' => $stats['matches_played'],
                'wins' => $stats['wins'],
                'draws' => $stats['draws'],
                'losses' => $stats['losses'],
                'goals_for' => $stats['goals_for'],
                'goals_against' => $stats['goals_against'],
                'points' => $stats['points'],
                'competition' => $competition,
            ]);
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Classements mis à jour automatiquement',
            'data' => StandingEntry::with('club')
                ->where('competition', $competition)
                ->where('is_active', true)
                ->orderBy('position')
                ->get()
        ]);
    }
}