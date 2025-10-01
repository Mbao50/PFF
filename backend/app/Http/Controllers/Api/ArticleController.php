<?php

namespace App\Http\Controllers\Api;

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
        $articles = Article::where('is_active', true)
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
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
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:100',
            'is_published' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();
        if ($data['is_published'] ?? false) {
            $data['published_at'] = now();
        }

        $article = Article::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Article créé avec succès',
            'data' => $article
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        if (!$article->is_active || !$article->is_published) {
            return response()->json([
                'success' => false,
                'message' => 'Article non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'image' => 'sometimes|nullable|string|url',
            'author' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|in:news,transfer,interview,analysis',
            'tags' => 'sometimes|nullable|array',
            'tags.*' => 'string|max:100',
            'is_published' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();
        if (isset($data['is_published']) && $data['is_published'] && !$article->is_published) {
            $data['published_at'] = now();
        }

        $article->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Article mis à jour avec succès',
            'data' => $article
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        // Soft delete - marquer comme inactif
        $article->update(['is_active' => false]);

        return response()->json([
            'success' => true,
            'message' => 'Article supprimé avec succès'
        ]);
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

        return response()->json([
            'success' => true,
            'message' => $newStatus ? 'Article publié' : 'Article dépublié',
            'data' => $article
        ]);
    }
}
