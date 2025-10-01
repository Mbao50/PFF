@extends('admin.layout')

@section('title', 'Gestion des Matchs - Admin SAMAFOOT')

@section('content')
<div>
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-green-900">Gestion des Matchs</h1>
        <a href="{{ route('admin.matches.create') }}" 
           class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
            <i class="fas fa-plus mr-2"></i>
            Nouveau Match
        </a>
    </div>

    @if(session('success'))
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {{ session('success') }}
        </div>
    @endif

    <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Match
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Heure
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Compétition
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse($matches as $match)
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">
                                    {{ $match->homeTeam->name ?? 'Équipe à domicile' }} vs {{ $match->awayTeam->name ?? 'Équipe à l\'extérieur' }}
                                </div>
                                <div class="text-sm text-gray-500">
                                    @if($match->home_score !== null && $match->away_score !== null)
                                        {{ $match->home_score }} - {{ $match->away_score }}
                                    @else
                                        Score non défini
                                    @endif
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div>{{ $match->date ? $match->date->format('d/m/Y') : 'Date non définie' }}</div>
                                <div class="text-gray-500">{{ $match->time ?? 'Heure non définie' }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ $match->competition ?? 'Non définie' }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
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
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div class="flex space-x-2">
                                    <a href="{{ route('admin.matches.show', $match) }}" 
                                       class="text-blue-600 hover:text-blue-900">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="{{ route('admin.matches.edit', $match) }}" 
                                       class="text-indigo-600 hover:text-indigo-900">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <form method="POST" action="{{ route('admin.matches.toggle-status', $match) }}" class="inline">
                                        @csrf
                                        <button type="submit" 
                                                class="@if($match->is_active) text-red-600 hover:text-red-900 @else text-green-600 hover:text-green-900 @endif"
                                                onclick="return confirm('Êtes-vous sûr de vouloir @if($match->is_active) désactiver @else activer @endif ce match ?')">
                                            <i class="fas fa-@if($match->is_active) ban @else check @endif"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                                Aucun match trouvé.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        
        @if($matches->hasPages())
            <div class="px-6 py-3 border-t border-gray-200">
                {{ $matches->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
