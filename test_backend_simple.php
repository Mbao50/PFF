<?php
// Test simple pour vérifier que le backend fonctionne

echo "🔧 Test Backend SAMAFOOT\n";
echo "========================\n\n";

// Test 1: Vérifier que le serveur répond
echo "1. Test de connexion au serveur...\n";
$url = 'http://127.0.0.1:8000/api/v1/clubs';
$context = stream_context_create([
    'http' => [
        'method' => 'GET',
        'header' => 'Accept: application/json',
        'timeout' => 5
    ]
]);

$response = @file_get_contents($url, false, $context);

if ($response === false) {
    echo "❌ Erreur: Impossible de se connecter au serveur\n";
    echo "   Vérifiez que le serveur Laravel est démarré:\n";
    echo "   cd backend && php artisan serve\n\n";
    exit(1);
}

echo "✅ Serveur accessible\n\n";

// Test 2: Vérifier la structure de la réponse
echo "2. Test de la structure de l'API...\n";
$data = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo "❌ Erreur: Réponse JSON invalide\n";
    echo "   Réponse reçue: " . substr($response, 0, 200) . "...\n\n";
    exit(1);
}

if (!isset($data['success']) || !isset($data['data'])) {
    echo "❌ Erreur: Structure de réponse incorrecte\n";
    echo "   Structure attendue: {success: true, data: [...]}\n";
    echo "   Structure reçue: " . json_encode(array_keys($data)) . "\n\n";
    exit(1);
}

echo "✅ Structure de l'API correcte\n";
echo "   Nombre de clubs: " . count($data['data']) . "\n\n";

// Test 3: Test d'authentification admin
echo "3. Test d'authentification admin...\n";
$authUrl = 'http://127.0.0.1:8000/api/v1/auth/admin/login';
$authData = json_encode([
    'email' => 'admin@samafoot.sn',
    'password' => 'admin123'
]);

$authContext = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => [
            'Content-Type: application/json',
            'Accept: application/json'
        ],
        'content' => $authData,
        'timeout' => 5
    ]
]);

$authResponse = @file_get_contents($authUrl, false, $authContext);

if ($authResponse === false) {
    echo "❌ Erreur: Impossible de tester l'authentification\n\n";
    exit(1);
}

$authData = json_decode($authResponse, true);

if (isset($authData['token'])) {
    echo "✅ Authentification admin fonctionnelle\n";
    echo "   Token reçu: " . substr($authData['token'], 0, 20) . "...\n\n";
} else {
    echo "❌ Erreur: Authentification admin échouée\n";
    echo "   Réponse: " . $authResponse . "\n\n";
    exit(1);
}

// Test 4: Test de création d'article
echo "4. Test de création d'article...\n";
$articleUrl = 'http://127.0.0.1:8000/api/v1/admin/articles';
$articleData = json_encode([
    'title' => 'Test Article Backend',
    'content' => 'Ceci est un article de test créé via le backend.',
    'author' => 'Backend Test',
    'category' => 'news',
    'is_published' => true
]);

$articleContext = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . $authData['token']
        ],
        'content' => $articleData,
        'timeout' => 5
    ]
]);

$articleResponse = @file_get_contents($articleUrl, false, $articleContext);

if ($articleResponse === false) {
    echo "❌ Erreur: Impossible de créer un article\n\n";
    exit(1);
}

$articleResult = json_decode($articleResponse, true);

if (isset($articleResult['success']) && $articleResult['success']) {
    echo "✅ Création d'article fonctionnelle\n";
    echo "   Article créé: " . $articleResult['data']['title'] . "\n\n";
} else {
    echo "❌ Erreur: Création d'article échouée\n";
    echo "   Réponse: " . $articleResponse . "\n\n";
    exit(1);
}

echo "🎉 TOUS LES TESTS SONT PASSÉS !\n";
echo "===============================\n";
echo "Le backend SAMAFOOT fonctionne correctement.\n";
echo "Vous pouvez maintenant utiliser l'interface admin.\n\n";
echo "Prochaines étapes:\n";
echo "1. Démarrer le frontend: npm run dev\n";
echo "2. Aller sur: http://localhost:5173/admin\n";
echo "3. Se connecter avec: admin@samafoot.sn / admin123\n";
?>