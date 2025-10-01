@extends('admin.layout')

@section('title', 'Modifier le Joueur - Admin SAMAFOOT')

@section('content')
<div>
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-green-900">Modifier le joueur: {{ $player->name }}</h1>
        <a href="{{ route('admin.players.index') }}" 
           class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center">
            <i class="fas fa-arrow-left mr-2"></i>
            Retour
        </a>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <form method="POST" action="{{ route('admin.players.update', $player) }}">
            @csrf
            @method('PUT')
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                        Nom du joueur *
                    </label>
                    <input type="text" 
                           id="name" 
                           name="name" 
                           value="{{ old('name', $player->name) }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('name') border-red-500 @enderror"
                           required>
                    @error('name')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="position" class="block text-sm font-medium text-gray-700 mb-2">
                        Position *
                    </label>
                    <select id="position" 
                            name="position" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('position') border-red-500 @enderror"
                            required>
                        <option value="">Sélectionner une position</option>
                        <option value="Gardien" {{ old('position', $player->position) == 'Gardien' ? 'selected' : '' }}>Gardien</option>
                        <option value="Défenseur" {{ old('position', $player->position) == 'Défenseur' ? 'selected' : '' }}>Défenseur</option>
                        <option value="Milieu" {{ old('position', $player->position) == 'Milieu' ? 'selected' : '' }}>Milieu</option>
                        <option value="Attaquant" {{ old('position', $player->position) == 'Attaquant' ? 'selected' : '' }}>Attaquant</option>
                    </select>
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
                            <option value="{{ $club->id }}" {{ old('club_id', $player->club_id) == $club->id ? 'selected' : '' }}>
                                {{ $club->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('club_id')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="nationality" class="block text-sm font-medium text-gray-700 mb-2">
                        Nationalité
                    </label>
                    <input type="text" 
                           id="nationality" 
                           name="nationality" 
                           value="{{ old('nationality', $player->nationality) }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('nationality') border-red-500 @enderror">
                    @error('nationality')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="birthdate" class="block text-sm font-medium text-gray-700 mb-2">
                        Date de naissance
                    </label>
                    <input type="date" 
                           id="birthdate" 
                           name="birthdate" 
                           value="{{ old('birthdate', $player->birthdate ? $player->birthdate->format('Y-m-d') : '') }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('birthdate') border-red-500 @enderror">
                    @error('birthdate')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="image" class="block text-sm font-medium text-gray-700 mb-2">
                        URL de l'image
                    </label>
                    <input type="url" 
                           id="image" 
                           name="image" 
                           value="{{ old('image', $player->image) }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('image') border-red-500 @enderror">
                    @error('image')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="height" class="block text-sm font-medium text-gray-700 mb-2">
                        Taille (cm)
                    </label>
                    <input type="number" 
                           id="height" 
                           name="height" 
                           value="{{ old('height', $player->height) }}"
                           min="100" 
                           max="250"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('height') border-red-500 @enderror">
                    @error('height')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="weight" class="block text-sm font-medium text-gray-700 mb-2">
                        Poids (kg)
                    </label>
                    <input type="number" 
                           id="weight" 
                           name="weight" 
                           value="{{ old('weight', $player->weight) }}"
                           min="40" 
                           max="150"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('weight') border-red-500 @enderror">
                    @error('weight')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="appearances" class="block text-sm font-medium text-gray-700 mb-2">
                        Matchs joués
                    </label>
                    <input type="number" 
                           id="appearances" 
                           name="appearances" 
                           value="{{ old('appearances', $player->appearances) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('appearances') border-red-500 @enderror">
                    @error('appearances')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="goals" class="block text-sm font-medium text-gray-700 mb-2">
                        Buts
                    </label>
                    <input type="number" 
                           id="goals" 
                           name="goals" 
                           value="{{ old('goals', $player->goals) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('goals') border-red-500 @enderror">
                    @error('goals')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="assists" class="block text-sm font-medium text-gray-700 mb-2">
                        Passes décisives
                    </label>
                    <input type="number" 
                           id="assists" 
                           name="assists" 
                           value="{{ old('assists', $player->assists) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('assists') border-red-500 @enderror">
                    @error('assists')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="yellow_cards" class="block text-sm font-medium text-gray-700 mb-2">
                        Cartons jaunes
                    </label>
                    <input type="number" 
                           id="yellow_cards" 
                           name="yellow_cards" 
                           value="{{ old('yellow_cards', $player->yellow_cards) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('yellow_cards') border-red-500 @enderror">
                    @error('yellow_cards')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="red_cards" class="block text-sm font-medium text-gray-700 mb-2">
                        Cartons rouges
                    </label>
                    <input type="number" 
                           id="red_cards" 
                           name="red_cards" 
                           value="{{ old('red_cards', $player->red_cards) }}"
                           min="0"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('red_cards') border-red-500 @enderror">
                    @error('red_cards')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
                <a href="{{ route('admin.players.index') }}" 
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



