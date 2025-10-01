@extends('admin.layout')

@section('title', 'Détails du Club - Admin SAMAFOOT')

@section('content')
<div>
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-green-900">{{ $club->name }}</h1>
        <div class="flex space-x-3">
            <a href="{{ route('admin.clubs.edit', $club) }}" 
               class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                <i class="fas fa-edit mr-2"></i>
                Modifier
            </a>
            <a href="{{ route('admin.clubs.index') }}" 
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
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Informations du club</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Nom complet</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $club->name }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Nom court</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $club->short_name }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Année de fondation</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $club->founded ?? 'Non définie' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Stade</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $club->stadium ?? 'Non défini' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Entraîneur</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $club->coach ?? 'Non défini' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Localisation</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $club->location ?? 'Non définie' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Couleurs</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $club->colors ?? 'Non définies' }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Statut</label>
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $club->is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                            {{ $club->is_active ? 'Actif' : 'Inactif' }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Logo et actions -->
        <div>
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Logo du club</h3>
                
                @if($club->logo)
                    <div class="text-center">
                        <img src="{{ $club->logo }}" 
                             alt="{{ $club->name }}" 
                             class="mx-auto h-32 w-32 object-cover rounded-lg">
                    </div>
                @else
                    <div class="text-center">
                        <div class="mx-auto h-32 w-32 bg-gray-300 rounded-lg flex items-center justify-center">
                            <i class="fas fa-trophy text-gray-600 text-4xl"></i>
                        </div>
                        <p class="text-sm text-gray-500 mt-2">Aucun logo défini</p>
                    </div>
                @endif
            </div>

            <div class="bg-white rounded-lg shadow p-6 mt-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                
                <div class="space-y-3">
                    <a href="{{ route('admin.clubs.edit', $club) }}" 
                       class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                        <i class="fas fa-edit mr-2"></i>
                        Modifier le club
                    </a>
                    
                    <form method="POST" action="{{ route('admin.clubs.toggle-status', $club) }}">
                        @csrf
                        <button type="submit" 
                                class="w-full @if($club->is_active) bg-red-600 hover:bg-red-700 @else bg-green-600 hover:bg-green-700 @endif text-white px-4 py-2 rounded-lg flex items-center justify-center"
                                onclick="return confirm('Êtes-vous sûr de vouloir @if($club->is_active) désactiver @else activer @endif ce club ?')">
                            <i class="fas fa-@if($club->is_active) ban @else check @endif mr-2"></i>
                            @if($club->is_active) Désactiver @else Activer @endif
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
