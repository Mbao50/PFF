@extends('admin.layout')

@section('title', 'Modifier le Match - Admin SAMAFOOT')

@section('content')
<div>
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-green-900">Modifier le match</h1>
        <a href="{{ route('admin.matches.index') }}" 
           class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center">
            <i class="fas fa-arrow-left mr-2"></i>
            Retour
        </a>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <form method="POST" action="{{ route('admin.matches.update', $match) }}">
            @csrf
            @method('PUT')
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="home_team_id" class="block text-sm font-medium text-gray-700 mb-2">
                        Équipe à domicile *
                    </label>
                    <select id="home_team_id" 
                            name="home_team_id" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('home_team_id') border-red-500 @enderror"
                            required>
                        <option value="">Sélectionner l'équipe à domicile</option>
                        @foreach($clubs as $club)
                            <option value="{{ $club->id }}" {{ old('home_team_id', $match->home_team_id) == $club->id ? 'selected' : '' }}>
                                {{ $club->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('home_team_id')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="away_team_id" class="block text-sm font-medium text-gray-700 mb-2">
                        Équipe à l'extérieur *
                    </label>
                    <select id="away_team_id" 
                            name="away_team_id" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('away_team_id') border-red-500 @enderror"
                            required>
                        <option value="">Sélectionner l'équipe à l'extérieur</option>
                        @foreach($clubs as $club)
                            <option value="{{ $club->id }}" {{ old('away_team_id', $match->away_team_id) == $club->id ? 'selected' : '' }}>
                                {{ $club->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('away_team_id')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="date" class="block text-sm font-medium text-gray-700 mb-2">
                        Date du match *
                    </label>
                    <input type="date" 
                           id="date" 
                           name="date" 
                           value="{{ old('date', $match->date ? $match->date->format('Y-m-d') : '') }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('date') border-red-500 @enderror"
                           required>
                    @error('date')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="time" class="block text-sm font-medium text-gray-700 mb-2">
                        Heure du match *
                    </label>
                    <input type="time" 
                           id="time" 
                           name="time" 
                           value="{{ old('time', $match->time) }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('time') border-red-500 @enderror"
                           required>
                    @error('time')
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
                           value="{{ old('competition', $match->competition) }}"
                           placeholder="Ex: Ligue 1, Coupe du Sénégal"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('competition') border-red-500 @enderror"
                           required>
                    @error('competition')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="venue" class="block text-sm font-medium text-gray-700 mb-2">
                        Lieu du match
                    </label>
                    <input type="text" 
                           id="venue" 
                           name="venue" 
                           value="{{ old('venue', $match->venue) }}"
                           placeholder="Ex: Stade Léopold Sédar Senghor"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('venue') border-red-500 @enderror">
                    @error('venue')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
                        Statut du match *
                    </label>
                    <select id="status" 
                            name="status" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('status') border-red-500 @enderror"
                            required>
                        <option value="">Sélectionner le statut</option>
                        <option value="scheduled" {{ old('status', $match->status) == 'scheduled' ? 'selected' : '' }}>Programmé</option>
                        <option value="live" {{ old('status', $match->status) == 'live' ? 'selected' : '' }}>En cours</option>
                        <option value="completed" {{ old('status', $match->status) == 'completed' ? 'selected' : '' }}>Terminé</option>
                        <option value="postponed" {{ old('status', $match->status) == 'postponed' ? 'selected' : '' }}>Reporté</option>
                    </select>
                    @error('status')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="home_score" class="block text-sm font-medium text-gray-700 mb-2">
                        Score équipe domicile
                    </label>
                    <input type="number" 
                           id="home_score" 
                           name="home_score" 
                           value="{{ old('home_score', $match->home_score) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('home_score') border-red-500 @enderror">
                    @error('home_score')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="away_score" class="block text-sm font-medium text-gray-700 mb-2">
                        Score équipe extérieur
                    </label>
                    <input type="number" 
                           id="away_score" 
                           name="away_score" 
                           value="{{ old('away_score', $match->away_score) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('away_score') border-red-500 @enderror">
                    @error('away_score')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
                <a href="{{ route('admin.matches.index') }}" 
                   class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">
                    Annuler
                </a>
                <button type="submit" 
                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    Mettre à jour
                </button>
            </div>
        </form>
    </div>
</div>
@endsection



