@extends('admin.layout')

@section('title', 'Modifier le Club - Admin SAMAFOOT')

@section('content')
<div>
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-green-900">Modifier le club: {{ $club->name }}</h1>
        <a href="{{ route('admin.clubs.index') }}" 
           class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center">
            <i class="fas fa-arrow-left mr-2"></i>
            Retour
        </a>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <form method="POST" action="{{ route('admin.clubs.update', $club) }}">
            @csrf
            @method('PUT')
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                        Nom du club *
                    </label>
                    <input type="text" 
                           id="name" 
                           name="name" 
                           value="{{ old('name', $club->name) }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('name') border-red-500 @enderror"
                           required>
                    @error('name')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="short_name" class="block text-sm font-medium text-gray-700 mb-2">
                        Nom court *
                    </label>
                    <input type="text" 
                           id="short_name" 
                           name="short_name" 
                           value="{{ old('short_name', $club->short_name) }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('short_name') border-red-500 @enderror"
                           required>
                    @error('short_name')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="logo" class="block text-sm font-medium text-gray-700 mb-2">
                        URL du logo
                    </label>
                    <input type="url" 
                           id="logo" 
                           name="logo" 
                           value="{{ old('logo', $club->logo) }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('logo') border-red-500 @enderror">
                    @error('logo')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="founded" class="block text-sm font-medium text-gray-700 mb-2">
                        Année de fondation
                    </label>
                    <input type="number" 
                           id="founded" 
                           name="founded" 
                           value="{{ old('founded', $club->founded) }}"
                           min="1800" 
                           max="{{ date('Y') }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('founded') border-red-500 @enderror">
                    @error('founded')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="stadium" class="block text-sm font-medium text-gray-700 mb-2">
                        Stade
                    </label>
                    <input type="text" 
                           id="stadium" 
                           name="stadium" 
                           value="{{ old('stadium', $club->stadium) }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('stadium') border-red-500 @enderror">
                    @error('stadium')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="coach" class="block text-sm font-medium text-gray-700 mb-2">
                        Entraîneur
                    </label>
                    <input type="text" 
                           id="coach" 
                           name="coach" 
                           value="{{ old('coach', $club->coach) }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('coach') border-red-500 @enderror">
                    @error('coach')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
                        Localisation
                    </label>
                    <input type="text" 
                           id="location" 
                           name="location" 
                           value="{{ old('location', $club->location) }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('location') border-red-500 @enderror">
                    @error('location')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="colors" class="block text-sm font-medium text-gray-700 mb-2">
                        Couleurs
                    </label>
                    <input type="text" 
                           id="colors" 
                           name="colors" 
                           value="{{ old('colors', $club->colors) }}"
                           placeholder="Ex: Rouge et Blanc"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 @error('colors') border-red-500 @enderror">
                    @error('colors')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
                <a href="{{ route('admin.clubs.index') }}" 
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



