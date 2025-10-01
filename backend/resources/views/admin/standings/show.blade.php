@extends('admin.layout')

@section('title', 'Détails du Classement - Admin SAMAFOOT')

@section('content')
<div>
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-green-900">
            Position {{ $standing->position }} - {{ $standing->club->name ?? 'Club non défini' }}
        </h1>
        <div class="flex space-x-3">
            <a href="{{ route('admin.standings.edit', $standing) }}" 
               class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                <i class="fas fa-edit mr-2"></i>
                Modifier
            </a>
            <a href="{{ route('admin.standings.index') }}" 
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
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Informations du classement</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Position</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $standing->position }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Club</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $standing->club->name ?? 'Non défini' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Compétition</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $standing->competition ?? 'Non définie' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Points</label>
                        <p class="mt-1 text-sm text-gray-900 font-bold">{{ $standing->points }} pts</p>
                    </div>
                </div>
            </div>

            <!-- Statistiques -->
            <div class="bg-white rounded-lg shadow p-6 mt-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Statistiques</h2>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-blue-600">{{ $standing->matches_played }}</div>
                        <div class="text-sm text-gray-600">Matchs joués</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-green-600">{{ $standing->wins }}</div>
                        <div class="text-sm text-gray-600">Victoires</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-yellow-600">{{ $standing->draws }}</div>
                        <div class="text-sm text-gray-600">Nuls</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-red-600">{{ $standing->losses }}</div>
                        <div class="text-sm text-gray-600">Défaites</div>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-purple-600">{{ $standing->goals_for }}</div>
                        <div class="text-sm text-gray-600">Buts marqués</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-orange-600">{{ $standing->goals_against }}</div>
                        <div class="text-sm text-gray-600">Buts encaissés</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Actions -->
        <div>
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                
                <div class="space-y-3">
                    <a href="{{ route('admin.standings.edit', $standing) }}" 
                       class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                        <i class="fas fa-edit mr-2"></i>
                        Modifier l'entrée
                    </a>
                    
                    <form method="POST" action="{{ route('admin.standings.toggle-status', $standing) }}">
                        @csrf
                        <button type="submit" 
                                class="w-full @if($standing->is_active) bg-red-600 hover:bg-red-700 @else bg-green-600 hover:bg-green-700 @endif text-white px-4 py-2 rounded-lg flex items-center justify-center"
                                onclick="return confirm('Êtes-vous sûr de vouloir @if($standing->is_active) désactiver @else activer @endif cette entrée ?')">
                            <i class="fas fa-@if($standing->is_active) ban @else check @endif mr-2"></i>
                            @if($standing->is_active) Désactiver @else Activer @endif
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
