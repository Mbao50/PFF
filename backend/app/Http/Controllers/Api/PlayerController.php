<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $players = Player::with('club')->where('is_active', true)->get();
        
        return response()->json([
            'success' => true,
            'data' => $players
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:100',
            'birthdate' => 'required|date|before:today',
            'nationality' => 'required|string|max:100',
            'club_id' => 'required|uuid|exists:clubs,id',
            'image' => 'nullable|string|url',
            'height' => 'required|string|max:20',
            'weight' => 'required|string|max:20',
            'appearances' => 'nullable|integer|min:0',
            'goals' => 'nullable|integer|min:0',
            'assists' => 'nullable|integer|min:0',
            'yellow_cards' => 'nullable|integer|min:0',
            'red_cards' => 'nullable|integer|min:0',
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
        $player = Player::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Joueur créé avec succès',
            'data' => $player->load('club')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Player $player)
    {
        if (!$player->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Joueur non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $player->load('club')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Player $player)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'position' => 'sometimes|required|string|max:100',
            'birthdate' => 'sometimes|required|date|before:today',
            'nationality' => 'sometimes|required|string|max:100',
            'club_id' => 'sometimes|required|uuid|exists:clubs,id',
            'image' => 'sometimes|nullable|string|url',
            'height' => 'sometimes|required|string|max:20',
            'weight' => 'sometimes|required|string|max:20',
            'appearances' => 'sometimes|nullable|integer|min:0',
            'goals' => 'sometimes|nullable|integer|min:0',
            'assists' => 'sometimes|nullable|integer|min:0',
            'yellow_cards' => 'sometimes|nullable|integer|min:0',
            'red_cards' => 'sometimes|nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $player->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Joueur mis à jour avec succès',
            'data' => $player->load('club')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player)
    {
        // Soft delete - marquer comme inactif
        $player->update(['is_active' => false]);

        return response()->json([
            'success' => true,
            'message' => 'Joueur supprimé avec succès'
        ]);
    }
}
