<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Player;
use App\Models\Club;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $players = Player::with('club')->orderBy('name')->paginate(15);
        return view('admin.players.index', compact('players'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clubs = Club::where('is_active', true)->orderBy('name')->get();
        return view('admin.players.create', compact('clubs'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:50',
            'birthdate' => 'nullable|date|before:today',
            'nationality' => 'nullable|string|max:100',
            'club_id' => 'required|exists:clubs,id',
            'image' => 'nullable|string|url',
            'height' => 'nullable|integer|min:100|max:250',
            'weight' => 'nullable|integer|min:40|max:150',
            'appearances' => 'nullable|integer|min:0',
            'goals' => 'nullable|integer|min:0',
            'assists' => 'nullable|integer|min:0',
            'yellow_cards' => 'nullable|integer|min:0',
            'red_cards' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->all();
        $data['is_active'] = true;

        Player::create($data);

        return redirect()->route('admin.players.index')
            ->with('success', 'Joueur créé avec succès');
    }

    /**
     * Display the specified resource.
     */
    public function show(Player $player)
    {
        $player->load('club');
        return view('admin.players.show', compact('player'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Player $player)
    {
        $clubs = Club::where('is_active', true)->orderBy('name')->get();
        return view('admin.players.edit', compact('player', 'clubs'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Player $player)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:50',
            'birthdate' => 'nullable|date|before:today',
            'nationality' => 'nullable|string|max:100',
            'club_id' => 'required|exists:clubs,id',
            'image' => 'nullable|string|url',
            'height' => 'nullable|integer|min:100|max:250',
            'weight' => 'nullable|integer|min:40|max:150',
            'appearances' => 'nullable|integer|min:0',
            'goals' => 'nullable|integer|min:0',
            'assists' => 'nullable|integer|min:0',
            'yellow_cards' => 'nullable|integer|min:0',
            'red_cards' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $player->update($request->all());

        return redirect()->route('admin.players.index')
            ->with('success', 'Joueur mis à jour avec succès');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player)
    {
        $player->update(['is_active' => false]);

        return redirect()->route('admin.players.index')
            ->with('success', 'Joueur supprimé avec succès');
    }

    /**
     * Toggle active status
     */
    public function toggleStatus(Player $player)
    {
        $player->update(['is_active' => !$player->is_active]);

        $status = $player->is_active ? 'activé' : 'désactivé';
        
        return redirect()->route('admin.players.index')
            ->with('success', "Joueur {$status} avec succès");
    }
}



