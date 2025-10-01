@extends('admin.layout')

@section('title', 'Créer une Entrée de Classement - Admin SAMAFOOT')

@section('content')
<div>
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-green-900">Créer une nouvelle entrée de classement</h1>
        <a href="{{ route('admin.standings.index') }}" 
           class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center">
            <i class="fas fa-arrow-left mr-2"></i>
            Retour
        </a>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <form method="POST" action="{{ route('admin.standings.store') }}">
            @csrf
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="position" class="block text-sm font-medium text-gray-700 mb-2">
                        Position *
                    </label>
                    <input type="number" 
                           id="position" 
                           name="position" 
                           value="{{ old('position') }}"
                           min="1"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('position') border-red-500 @enderror"
                           required>
                    @error('position')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="club_id" class="block text-sm font-medium text-gray-700 mb-2">
                        Club *
                    </label>
                    <select id="club_id" 
                            name="club_id" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('club_id') border-red-500 @enderror"
                            required>
                        <option value="">Sélectionner un club</option>
                        @foreach($clubs as $club)
                            <option value="{{ $club->id }}" {{ old('club_id') == $club->id ? 'selected' : '' }}>
                                {{ $club->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('club_id')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="competition" class="block text-sm font-medium text-gray-700 mb-2">
                        Compétition *
                    </label>
                    <input type="text" 
                           id="competition" 
                           name="competition" 
                           value="{{ old('competition') }}"
                           placeholder="Ex: Ligue 1, Coupe du Sénégal"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('competition') border-red-500 @enderror"
                           required>
                    @error('competition')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="matches_played" class="block text-sm font-medium text-gray-700 mb-2">
                        Matchs joués *
                    </label>
                    <input type="number" 
                           id="matches_played" 
                           name="matches_played" 
                           value="{{ old('matches_played', 0) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('matches_played') border-red-500 @enderror"
                           required>
                    @error('matches_played')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="wins" class="block text-sm font-medium text-gray-700 mb-2">
                        Victoires *
                    </label>
                    <input type="number" 
                           id="wins" 
                           name="wins" 
                           value="{{ old('wins', 0) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('wins') border-red-500 @enderror"
                           required>
                    @error('wins')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="draws" class="block text-sm font-medium text-gray-700 mb-2">
                        Nuls *
                    </label>
                    <input type="number" 
                           id="draws" 
                           name="draws" 
                           value="{{ old('draws', 0) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('draws') border-red-500 @enderror"
                           required>
                    @error('draws')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="losses" class="block text-sm font-medium text-gray-700 mb-2">
                        Défaites *
                    </label>
                    <input type="number" 
                           id="losses" 
                           name="losses" 
                           value="{{ old('losses', 0) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('losses') border-red-500 @enderror"
                           required>
                    @error('losses')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="goals_for" class="block text-sm font-medium text-gray-700 mb-2">
                        Buts marqués *
                    </label>
                    <input type="number" 
                           id="goals_for" 
                           name="goals_for" 
                           value="{{ old('goals_for', 0) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('goals_for') border-red-500 @enderror"
                           required>
                    @error('goals_for')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="goals_against" class="block text-sm font-medium text-gray-700 mb-2">
                        Buts encaissés *
                    </label>
                    <input type="number" 
                           id="goals_against" 
                           name="goals_against" 
                           value="{{ old('goals_against', 0) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('goals_against') border-red-500 @enderror"
                           required>
                    @error('goals_against')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="points" class="block text-sm font-medium text-gray-700 mb-2">
                        Points *
                    </label>
                    <input type="number" 
                           id="points" 
                           name="points" 
                           value="{{ old('points', 0) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('points') border-red-500 @enderror"
                           required>
                    @error('points')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
                <a href="{{ route('admin.standings.index') }}" 
                   class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">
                    Annuler
                </a>
                <button type="submit" 
                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    Créer l'entrée
                </button>
            </div>
        </form>
    </div>
</div>
@endsection



