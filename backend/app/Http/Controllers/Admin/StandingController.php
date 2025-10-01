<?php

namespace App\Http\Controllers\Admin;

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
            ->orderBy('competition')
            ->orderBy('position')
            ->paginate(15);
        return view('admin.standings.index', compact('standings'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clubs = Club::where('is_active', true)->orderBy('name')->get();
        return view('admin.standings.create', compact('clubs'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'position' => 'required|integer|min:1',
            'club_id' => 'required|exists:clubs,id',
            'competition' => 'required|string|max:255',
            'matches_played' => 'required|integer|min:0',
            'wins' => 'required|integer|min:0',
            'draws' => 'required|integer|min:0',
            'losses' => 'required|integer|min:0',
            'goals_for' => 'required|integer|min:0',
            'goals_against' => 'required|integer|min:0',
            'points' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->all();
        $data['is_active'] = true;

        StandingEntry::create($data);

        return redirect()->route('admin.standings.index')
            ->with('success', 'Entrée de classement créée avec succès');
    }

    /**
     * Display the specified resource.
     */
    public function show(StandingEntry $standing)
    {
        $standing->load('club');
        return view('admin.standings.show', compact('standing'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StandingEntry $standing)
    {
        $clubs = Club::where('is_active', true)->orderBy('name')->get();
        return view('admin.standings.edit', compact('standing', 'clubs'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StandingEntry $standing)
    {
        $validator = Validator::make($request->all(), [
            'position' => 'required|integer|min:1',
            'club_id' => 'required|exists:clubs,id',
            'competition' => 'required|string|max:255',
            'matches_played' => 'required|integer|min:0',
            'wins' => 'required|integer|min:0',
            'draws' => 'required|integer|min:0',
            'losses' => 'required|integer|min:0',
            'goals_for' => 'required|integer|min:0',
            'goals_against' => 'required|integer|min:0',
            'points' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $standing->update($request->all());

        return redirect()->route('admin.standings.index')
            ->with('success', 'Entrée de classement mise à jour avec succès');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StandingEntry $standing)
    {
        $standing->update(['is_active' => false]);

        return redirect()->route('admin.standings.index')
            ->with('success', 'Entrée de classement supprimée avec succès');
    }

    /**
     * Toggle active status
     */
    public function toggleStatus(StandingEntry $standing)
    {
        $standing->update(['is_active' => !$standing->is_active]);

        $status = $standing->is_active ? 'activée' : 'désactivée';
        
        return redirect()->route('admin.standings.index')
            ->with('success', "Entrée de classement {$status} avec succès");
    }
}



