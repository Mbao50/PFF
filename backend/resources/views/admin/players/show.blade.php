@extends('admin.layout')

@section('title', 'Détails du Joueur - Admin SAMAFOOT')

@section('content')
<div>
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-green-900">{{ $player->name }}</h1>
        <div class="flex space-x-3">
            <a href="{{ route('admin.players.edit', $player) }}" 
               class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                <i class="fas fa-edit mr-2"></i>
                Modifier
            </a>
            <a href="{{ route('admin.players.index') }}" 
               class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center">
                <i class="fas fa-arrow-left mr-2"></i>
                Retour
            </a>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Informations principales -->
        <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Informations du joueur</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Nom</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $player->name }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Position</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $player->position }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Club</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $player->club->name ?? 'Aucun club' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Nationalité</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $player->nationality ?? 'Non définie' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Date de naissance</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $player->birthdate ? $player->birthdate->format('d/m/Y') : 'Non définie' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Taille</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $player->height ? $player->height . ' cm' : 'Non définie' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Poids</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $player->weight ? $player->weight . ' kg' : 'Non défini' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Statut</label>
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $player->is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                            {{ $player->is_active ? 'Actif' : 'Inactif' }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Statistiques -->
            <div class="bg-white rounded-lg shadow p-6 mt-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Statistiques</h2>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-blue-600">{{ $player->appearances ?? 0 }}</div>
                        <div class="text-sm text-gray-600">Matchs</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-green-600">{{ $player->goals ?? 0 }}</div>
                        <div class="text-sm text-gray-600">Buts</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-purple-600">{{ $player->assists ?? 0 }}</div>
                        <div class="text-sm text-gray-600">Passes</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-yellow-600">{{ ($player->yellow_cards ?? 0) + ($player->red_cards ?? 0) }}</div>
                        <div class="text-sm text-gray-600">Cartons</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Photo et actions -->
        <div>
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Photo du joueur</h3>
                
                @if($player->image)
                    <div class="text-center">
                        <img src="{{ $player->image }}" 
                             alt="{{ $player->name }}" 
                             class="mx-auto h-32 w-32 object-cover rounded-lg">
                    </div>
                @else
                    <div class="text-center">
                        <div class="mx-auto h-32 w-32 bg-gray-300 rounded-lg flex items-center justify-center">
                            <i class="fas fa-user text-gray-600 text-4xl"></i>
                        </div>
                        <p class="text-sm text-gray-500 mt-2">Aucune photo définie</p>
                    </div>
                @endif
            </div>

            <div class="bg-white rounded-lg shadow p-6 mt-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                
                <div class="space-y-3">
                    <a href="{{ route('admin.players.edit', $player) }}" 
                       class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                        <i class="fas fa-edit mr-2"></i>
                        Modifier le joueur
                    </a>
                    
                    <form method="POST" action="{{ route('admin.players.toggle-status', $player) }}">
                        @csrf
                        <button type="submit" 
                                class="w-full @if($player->is_active) bg-red-600 hover:bg-red-700 @else bg-green-600 hover:bg-green-700 @endif text-white px-4 py-2 rounded-lg flex items-center justify-center"
                                onclick="return confirm('Êtes-vous sûr de vouloir @if($player->is_active) désactiver @else activer @endif ce joueur ?')">
                            <i class="fas fa-@if($player->is_active) ban @else check @endif mr-2"></i>
                            @if($player->is_active) Désactiver @else Activer @endif
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
