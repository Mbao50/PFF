<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Club;
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
            ->orderBy('date', 'desc')
            ->paginate(15);
        return view('admin.matches.index', compact('matches'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clubs = Club::where('is_active', true)->orderBy('name')->get();
        return view('admin.matches.create', compact('clubs'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'home_team_id' => 'required|exists:clubs,id',
            'away_team_id' => 'required|exists:clubs,id|different:home_team_id',
            'home_score' => 'nullable|integer|min:0',
            'away_score' => 'nullable|integer|min:0',
            'date' => 'required|date',
            'time' => 'required|string',
            'venue' => 'nullable|string|max:255',
            'status' => 'required|in:scheduled,live,completed,postponed',
            'competition' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->all();
        $data['is_active'] = true;

        Game::create($data);

        return redirect()->route('admin.matches.index')
            ->with('success', 'Match créé avec succès');
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $match)
    {
        $match->load(['homeTeam', 'awayTeam']);
        return view('admin.matches.show', compact('match'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Game $match)
    {
        $clubs = Club::where('is_active', true)->orderBy('name')->get();
        return view('admin.matches.edit', compact('match', 'clubs'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Game $match)
    {
        $validator = Validator::make($request->all(), [
            'home_team_id' => 'required|exists:clubs,id',
            'away_team_id' => 'required|exists:clubs,id|different:home_team_id',
            'home_score' => 'nullable|integer|min:0',
            'away_score' => 'nullable|integer|min:0',
            'date' => 'required|date',
            'time' => 'required|string',
            'venue' => 'nullable|string|max:255',
            'status' => 'required|in:scheduled,live,completed,postponed',
            'competition' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $match->update($request->all());

        return redirect()->route('admin.matches.index')
            ->with('success', 'Match mis à jour avec succès');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $match)
    {
        $match->update(['is_active' => false]);

        return redirect()->route('admin.matches.index')
            ->with('success', 'Match supprimé avec succès');
    }

    /**
     * Toggle active status
     */
    public function toggleStatus(Game $match)
    {
        $match->update(['is_active' => !$match->is_active]);

        $status = $match->is_active ? 'activé' : 'désactivé';
        
        return redirect()->route('admin.matches.index')
            ->with('success', "Match {$status} avec succès");
    }
}



