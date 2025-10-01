<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $matches = Game::with(['homeTeam', 'awayTeam'])
            ->where('is_active', true)
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
            'status' => 'required|in:upcoming,live,completed',
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
        if (!$match->is_active) {
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
        $validator = Validator::make($request->all(), [
            'home_team_id' => 'sometimes|required|uuid|exists:clubs,id',
            'away_team_id' => 'sometimes|required|uuid|exists:clubs,id|different:home_team_id',
            'home_score' => 'sometimes|nullable|integer|min:0',
            'away_score' => 'sometimes|nullable|integer|min:0',
            'date' => 'sometimes|required|date',
            'time' => 'sometimes|required|date_format:H:i',
            'venue' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|in:upcoming,live,completed',
            'competition' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $match->update($request->all());

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
