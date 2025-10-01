<?php

namespace App\Http\Controllers\Admin;

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
        $clubs = Club::orderBy('name')->paginate(15);
        return view('admin.clubs.index', compact('clubs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.clubs.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'short_name' => 'required|string|max:10',
            'logo' => 'nullable|string|url',
            'founded' => 'nullable|integer|min:1800|max:' . date('Y'),
            'stadium' => 'nullable|string|max:255',
            'coach' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'colors' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->all();
        $data['is_active'] = true;

        Club::create($data);

        return redirect()->route('admin.clubs.index')
            ->with('success', 'Club créé avec succès');
    }

    /**
     * Display the specified resource.
     */
    public function show(Club $club)
    {
        return view('admin.clubs.show', compact('club'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Club $club)
    {
        return view('admin.clubs.edit', compact('club'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Club $club)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'short_name' => 'required|string|max:10',
            'logo' => 'nullable|string|url',
            'founded' => 'nullable|integer|min:1800|max:' . date('Y'),
            'stadium' => 'nullable|string|max:255',
            'coach' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'colors' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $club->update($request->all());

        return redirect()->route('admin.clubs.index')
            ->with('success', 'Club mis à jour avec succès');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Club $club)
    {
        $club->update(['is_active' => false]);

        return redirect()->route('admin.clubs.index')
            ->with('success', 'Club supprimé avec succès');
    }

    /**
     * Toggle active status
     */
    public function toggleStatus(Club $club)
    {
        $club->update(['is_active' => !$club->is_active]);

        $status = $club->is_active ? 'activé' : 'désactivé';
        
        return redirect()->route('admin.clubs.index')
            ->with('success', "Club {$status} avec succès");
    }
}



