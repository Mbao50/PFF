@extends('admin.layout')

@section('title', 'Détails du Match - Admin SAMAFOOT')

@section('content')
<div>
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-green-900">
            {{ $match->homeTeam->name ?? 'Équipe à domicile' }} vs {{ $match->awayTeam->name ?? 'Équipe à l\'extérieur' }}
        </h1>
        <div class="flex space-x-3">
            <a href="{{ route('admin.matches.edit', $match) }}" 
               class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                <i class="fas fa-edit mr-2"></i>
                Modifier
            </a>
            <a href="{{ route('admin.matches.index') }}" 
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
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Informations du match</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Équipe à domicile</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $match->homeTeam->name ?? 'Non définie' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Équipe à l'extérieur</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $match->awayTeam->name ?? 'Non définie' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Date</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $match->date ? $match->date->format('d/m/Y') : 'Non définie' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Heure</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $match->time ?? 'Non définie' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Compétition</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $match->competition ?? 'Non définie' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Lieu</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $match->venue ?? 'Non défini' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Statut</label>
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                            @if($match->status === 'completed') bg-green-100 text-green-800
                            @elseif($match->status === 'live') bg-red-100 text-red-800
                            @elseif($match->status === 'scheduled') bg-blue-100 text-blue-800
                            @else bg-yellow-100 text-yellow-800
                            @endif">
                            @switch($match->status)
                                @case('completed') Terminé @break
                                @case('live') En cours @break
                                @case('scheduled') Programmé @break
                                @case('postponed') Reporté @break
                                @default {{ $match->status }}
                            @endswitch
                        </span>
                    </div>
                </div>
            </div>

            <!-- Score -->
            <div class="bg-white rounded-lg shadow p-6 mt-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Score</h2>
                
                <div class="text-center">
                    <div class="text-4xl font-bold text-gray-900">
                        {{ $match->home_score ?? '?' }} - {{ $match->away_score ?? '?' }}
                    </div>
                    <div class="text-sm text-gray-600 mt-2">
                        {{ $match->homeTeam->name ?? 'Équipe à domicile' }} - {{ $match->awayTeam->name ?? 'Équipe à l\'extérieur' }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Actions -->
        <div>
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                
                <div class="space-y-3">
                    <a href="{{ route('admin.matches.edit', $match) }}" 
                       class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                        <i class="fas fa-edit mr-2"></i>
                        Modifier le match
                    </a>
                    
                    <form method="POST" action="{{ route('admin.matches.toggle-status', $match) }}">
                        @csrf
                        <button type="submit" 
                                class="w-full @if($match->is_active) bg-red-600 hover:bg-red-700 @else bg-green-600 hover:bg-green-700 @endif text-white px-4 py-2 rounded-lg flex items-center justify-center"
                                onclick="return confirm('Êtes-vous sûr de vouloir @if($match->is_active) désactiver @else activer @endif ce match ?')">
                            <i class="fas fa-@if($match->is_active) ban @else check @endif mr-2"></i>
                            @if($match->is_active) Désactiver @else Activer @endif
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
