<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MatchController extends Controller
{
    /**
     * Mettre à jour automatiquement les classements pour une compétition
     */
    private function updateStandings($competition)
    {
        // Récupérer tous les matchs terminés de cette compétition
        $completedMatches = Game::where('competition', $competition)
            ->where('status', 'completed')
            ->where('is_active', true)
            ->get();

        // Réinitialiser les classements pour cette compétition
        \App\Models\StandingEntry::where('competition', $competition)->update(['is_active' => false]);

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
            \App\Models\StandingEntry::create([
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
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $matches = Game::where('is_active', true)
            ->with(['homeTeam', 'awayTeam'])
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $matches
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'home_team_id' => 'required|uuid|exists:clubs,id',
            'away_team_id' => 'required|uuid|exists:clubs,id|different:home_team_id',
            'home_score' => 'nullable|integer|min:0',
            'away_score' => 'nullable|integer|min:0',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'venue' => 'required|string|max:255',
            'status' => 'required|in:upcoming,live,completed,cancelled',
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
        $match = Game::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Match créé avec succès',
            'data' => $match->load(['homeTeam', 'awayTeam'])
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $match)
    {
        // For admin routes, allow viewing soft-deleted matches
        // For public routes, only allow active matches
        if (!request()->is('api/v1/admin/*') && !$match->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Match non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $match->load(['homeTeam', 'awayTeam'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Game $match)
    {
        $requestData = $request->all();

        // Remove empty strings to treat them as not provided for nullable fields
        foreach ($requestData as $key => $value) {
            if ($value === '') {
                unset($requestData[$key]);
            }
        }

        $validator = Validator::make($requestData, [
            'home_team_id' => 'sometimes|nullable|uuid|exists:clubs,id',
            'away_team_id' => 'sometimes|nullable|uuid|exists:clubs,id|different:home_team_id',
            'home_score' => 'sometimes|nullable|integer|min:0',
            'away_score' => 'sometimes|nullable|integer|min:0',
            'date' => 'sometimes|nullable|date',
            'time' => 'sometimes|nullable|date_format:H:i',
            'venue' => 'sometimes|nullable|string|max:255',
            'status' => 'sometimes|nullable|in:upcoming,live,completed,cancelled',
            'competition' => 'sometimes|nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = collect($requestData)->only([
            'home_team_id', 'away_team_id', 'home_score', 'away_score',
            'date', 'time', 'venue', 'status', 'competition'
        ])->toArray();

        // Update fields that are provided in the request (including null values to clear them)
        $updateData = [];
        foreach ($data as $key => $value) {
            $updateData[$key] = $value;
        }

        if (!empty($updateData)) {
            $match->update($updateData);
        }

        // Mettre à jour automatiquement les classements si le match est terminé
        if ($match->status === 'completed' && $match->competition) {
            $this->updateStandings($match->competition);
        }

        return response()->json([
            'success' => true,
            'message' => 'Match mis à jour avec succès',
            'data' => $match->load(['homeTeam', 'awayTeam'])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $match)
    {
        // Soft delete - marquer comme inactif
        $match->update(['is_active' => false]);

        return response()->json([
            'success' => true,
            'message' => 'Match supprimé avec succès'
        ]);
    }
}
