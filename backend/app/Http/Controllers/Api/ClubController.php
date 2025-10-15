<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Club;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClubController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clubs = Club::where('is_active', true)->get();
        
        return response()->json([
            'success' => true,
            'data' => $clubs
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'short_name' => 'required|string|max:50',
            'logo' => 'nullable|string|url',
            'logo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'founded' => 'nullable|integer|min:1800|max:' . (date('Y') + 1),
            'stadium' => 'required|string|max:255',
            'coach' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'colors' => 'required|string|max:255',
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

        // Handle logo upload
        if ($request->hasFile('logo_file')) {
            $logoPath = $request->file('logo_file')->store('images/clubs', 'public');
            $data['logo'] = asset('storage/' . $logoPath);
        }

        $club = Club::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Club créé avec succès',
            'data' => $club
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Club $club)
    {
        if (!$club->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Club non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $club->load('players')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Club $club)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'short_name' => 'sometimes|required|string|max:50',
            'logo' => 'sometimes|nullable|string|url',
            'logo_file' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'founded' => 'sometimes|nullable|integer|min:1800|max:' . (date('Y') + 1),
            'stadium' => 'sometimes|required|string|max:255',
            'coach' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
            'colors' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();

        // Handle logo upload
        if ($request->hasFile('logo_file')) {
            $logoPath = $request->file('logo_file')->store('images/clubs', 'public');
            $data['logo'] = asset('storage/' . $logoPath);
        }

        $club->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Club mis à jour avec succès',
            'data' => $club
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Club $club)
    {
        // Soft delete - marquer comme inactif
        $club->update(['is_active' => false]);

        return response()->json([
            'success' => true,
            'message' => 'Club supprimé avec succès'
        ]);
    }
}
