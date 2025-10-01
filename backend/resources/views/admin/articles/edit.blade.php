@extends('admin.layout')

@section('title', 'Modifier l\'Article - Admin SAMAFOOT')

@section('content')
<div>
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-green-900">Modifier l'article</h1>
        <a href="{{ route('admin.articles.index') }}" 
           class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
            <i class="fas fa-arrow-left mr-2"></i>Retour
        </a>
    </div>

    @if ($errors->any())
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <ul class="list-disc list-inside">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('admin.articles.update', $article) }}" class="bg-white p-6 rounded-lg shadow">
        @csrf
        @method('PUT')
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 space-y-6">
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                        Titre de l'article *
                    </label>
                    <input type="text" id="title" name="title" value="{{ old('title', $article->title) }}" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                </div>

                <div>
                    <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
                        Contenu *
                    </label>
                    <textarea id="content" name="content" rows="15" required
                              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">{{ old('content', $article->content) }}</textarea>
                </div>
            </div>

            <div class="space-y-6">
                <div>
                    <label for="author" class="block text-sm font-medium text-gray-700 mb-2">
                        Auteur *
                    </label>
                    <input type="text" id="author" name="author" value="{{ old('author', $article->author) }}" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                </div>

                <div>
                    <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie *
                    </label>
                    <select id="category" name="category" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option value="">Sélectionner une catégorie</option>
                        <option value="news" {{ old('category', $article->category) == 'news' ? 'selected' : '' }}>Actualités</option>
                        <option value="transfer" {{ old('category', $article->category) == 'transfer' ? 'selected' : '' }}>Transferts</option>
                        <option value="interview" {{ old('category', $article->category) == 'interview' ? 'selected' : '' }}>Interviews</option>
                        <option value="analysis" {{ old('category', $article->category) == 'analysis' ? 'selected' : '' }}>Analyses</option>
                    </select>
                </div>

                <div>
                    <label for="image" class="block text-sm font-medium text-gray-700 mb-2">
                        URL de l'image
                    </label>
                    <input type="url" id="image" name="image" value="{{ old('image', $article->image) }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                </div>

                <div>
                    <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">
                        Tags (séparés par des virgules)
                    </label>
                    <input type="text" id="tags" name="tags" value="{{ old('tags', is_array($article->tags) ? implode(', ', $article->tags) : $article->tags) }}"
                           placeholder="football, ligue 1, sénégal"
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                </div>

                <div class="space-y-3">
                    <div class="flex items-center">
                        <input type="checkbox" id="is_published" name="is_published" value="1" {{ old('is_published', $article->is_published) ? 'checked' : '' }}
                               class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
                        <label for="is_published" class="ml-2 block text-sm text-gray-900">
                            Publié
                        </label>
                    </div>
                </div>

                <div class="pt-4 space-y-2">
                    <button type="submit" 
                            class="w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors">
                        <i class="fas fa-save mr-2"></i>Mettre à jour
                    </button>
                    
                    <div class="text-sm text-gray-600">
                        <p><strong>Créé le:</strong> {{ $article->created_at->format('d/m/Y H:i') }}</p>
                        @if($article->updated_at != $article->created_at)
                            <p><strong>Modifié le:</strong> {{ $article->updated_at->format('d/m/Y H:i') }}</p>
                        @endif
                        @if($article->published_at)
                            <p><strong>Publié le:</strong> {{ $article->published_at->format('d/m/Y H:i') }}</p>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
@endsection