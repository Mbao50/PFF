@extends('admin.layout')

@section('title', 'Tableau de bord - Admin SAMAFOOT')

@section('content')
<div>
    <h1 class="text-2xl font-bold text-green-900 mb-6">Tableau de bord</h1>
    
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 class="text-lg font-semibold text-blue-900 mb-2">
            Bienvenue, {{ Auth::guard('admin')->user()->name }} !
        </h3>
        <p class="text-blue-800">
            Vous êtes connecté en tant qu'administrateur. Utilisez le menu de gauche pour gérer le contenu du site.
        </p>
    </div>

    <!-- Statistiques rapides -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center">
                <div class="p-2 bg-blue-100 rounded-lg">
                    <i class="fas fa-newspaper text-blue-600"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Articles</p>
                    <p class="text-2xl font-semibold text-gray-900">{{ $stats['articles'] ?? 0 }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center">
                <div class="p-2 bg-green-100 rounded-lg">
                    <i class="fas fa-trophy text-green-600"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Clubs</p>
                    <p class="text-2xl font-semibold text-gray-900">{{ $stats['clubs'] ?? 0 }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center">
                <div class="p-2 bg-purple-100 rounded-lg">
                    <i class="fas fa-users text-purple-600"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Joueurs</p>
                    <p class="text-2xl font-semibold text-gray-900">{{ $stats['players'] ?? 0 }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center">
                <div class="p-2 bg-orange-100 rounded-lg">
                    <i class="fas fa-calendar text-orange-600"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Matchs</p>
                    <p class="text-2xl font-semibold text-gray-900">{{ $stats['matches'] ?? 0 }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Actions rapides -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
            <div class="space-y-3">
                <a href="{{ route('admin.articles.create') }}" 
                   class="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <i class="fas fa-plus text-blue-600 mr-3"></i>
                    <span class="text-blue-800">Créer un nouvel article</span>
                </a>
                <a href="{{ route('admin.matches.create') }}" 
                   class="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <i class="fas fa-plus text-green-600 mr-3"></i>
                    <span class="text-green-800">Ajouter un match</span>
                </a>
                <a href="{{ route('admin.players.create') }}" 
                   class="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <i class="fas fa-plus text-purple-600 mr-3"></i>
                    <span class="text-purple-800">Ajouter un joueur</span>
                </a>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Articles récents</h3>
            @if(isset($recentArticles) && $recentArticles->count() > 0)
                <div class="space-y-3">
                    @foreach($recentArticles as $article)
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p class="font-medium text-gray-900">{{ $article->title }}</p>
                                <p class="text-sm text-gray-600">{{ $article->author }} • {{ $article->created_at->format('d/m/Y') }}</p>
                            </div>
                            <span class="px-2 py-1 text-xs rounded-full {{ $article->is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }}">
                                {{ $article->is_published ? 'Publié' : 'Brouillon' }}
                            </span>
                        </div>
                    @endforeach
                </div>
            @else
                <p class="text-gray-500">Aucun article récent</p>
            @endif
        </div>
    </div>
</div>
@endsection