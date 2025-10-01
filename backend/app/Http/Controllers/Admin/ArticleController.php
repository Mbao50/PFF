<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::orderBy('created_at', 'desc')->paginate(15);
        return view('admin.articles.index', compact('articles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.articles.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string|url',
            'author' => 'required|string|max:255',
            'category' => 'required|in:news,transfer,interview,analysis',
            'tags' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->all();
        
        // Convertir les tags en array
        if (!empty($data['tags'])) {
            $data['tags'] = array_map('trim', explode(',', $data['tags']));
        } else {
            $data['tags'] = [];
        }

        // Gérer la publication
        if ($data['is_published'] ?? false) {
            $data['published_at'] = now();
        }

        // S'assurer que l'article est actif pour l'affichage côté API publique
        $data['is_active'] = true;

        Article::create($data);

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article créé avec succès');
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return view('admin.articles.show', compact('article'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        return view('admin.articles.edit', compact('article'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string|url',
            'author' => 'required|string|max:255',
            'category' => 'required|in:news,transfer,interview,analysis',
            'tags' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->all();
        
        // Convertir les tags en array
        if (!empty($data['tags'])) {
            $data['tags'] = array_map('trim', explode(',', $data['tags']));
        } else {
            $data['tags'] = [];
        }

        // Gérer la publication
        if (isset($data['is_published']) && $data['is_published'] && !$article->is_published) {
            $data['published_at'] = now();
        } elseif (!($data['is_published'] ?? false)) {
            $data['published_at'] = null;
        }

        $article->update($data);

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article mis à jour avec succès');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->update(['is_active' => false]);

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article supprimé avec succès');
    }

    /**
     * Toggle publish status
     */
    public function togglePublish(Article $article)
    {
        $newStatus = !$article->is_published;
        $article->update([
            'is_published' => $newStatus,
            'published_at' => $newStatus ? now() : null,
        ]);

        $status = $newStatus ? 'publié' : 'dépublié';
        
        return redirect()->route('admin.articles.index')
            ->with('success', "Article {$status} avec succès");
    }
}