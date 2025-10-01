<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin SAMAFOOT')</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .sidebar-transition {
            transition: all 0.3s ease-in-out;
        }
    </style>
</head>
<body class="bg-gray-100">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-64 bg-green-800 text-white sidebar-transition">
            <div class="p-4 border-b border-green-700">
                <div class="text-lg font-bold">SAMAFOOT Admin</div>
                <div class="text-sm text-green-300">
                    Bienvenue, {{ Auth::guard('admin')->user()->name ?? 'Admin' }}
                </div>
                <div class="text-xs text-green-400 capitalize">
                    Rôle: {{ Auth::guard('admin')->user()->role ?? 'admin' }}
                </div>
            </div>
            
            <nav class="mt-4">
                <ul class="space-y-1">
                    <li>
                        <a href="{{ route('admin.dashboard') }}" 
                           class="flex items-center w-full px-4 py-3 text-sm transition duration-150 {{ request()->routeIs('admin.dashboard') ? 'bg-green-700 font-medium' : 'hover:bg-green-700' }}">
                            <i class="fas fa-tachometer-alt mr-3"></i>
                            Tableau de bord
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.articles.index') }}" 
                           class="flex items-center w-full px-4 py-3 text-sm transition duration-150 {{ request()->routeIs('admin.articles.*') ? 'bg-green-700 font-medium' : 'hover:bg-green-700' }}">
                            <i class="fas fa-newspaper mr-3"></i>
                            Articles
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.clubs.index') }}" 
                           class="flex items-center w-full px-4 py-3 text-sm transition duration-150 {{ request()->routeIs('admin.clubs.*') ? 'bg-green-700 font-medium' : 'hover:bg-green-700' }}">
                            <i class="fas fa-trophy mr-3"></i>
                            Clubs
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.players.index') }}" 
                           class="flex items-center w-full px-4 py-3 text-sm transition duration-150 {{ request()->routeIs('admin.players.*') ? 'bg-green-700 font-medium' : 'hover:bg-green-700' }}">
                            <i class="fas fa-users mr-3"></i>
                            Joueurs
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.matches.index') }}" 
                           class="flex items-center w-full px-4 py-3 text-sm transition duration-150 {{ request()->routeIs('admin.matches.*') ? 'bg-green-700 font-medium' : 'hover:bg-green-700' }}">
                            <i class="fas fa-calendar mr-3"></i>
                            Matchs
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.standings.index') }}" 
                           class="flex items-center w-full px-4 py-3 text-sm transition duration-150 {{ request()->routeIs('admin.standings.*') ? 'bg-green-700 font-medium' : 'hover:bg-green-700' }}">
                            <i class="fas fa-chart-bar mr-3"></i>
                            Classements
                        </a>
                    </li>
                </ul>
                
                <div class="mt-auto pt-4 border-t border-green-700 absolute bottom-0 w-64">
                    <form method="POST" action="{{ route('admin.logout') }}" class="w-full">
                        @csrf
                        <button type="submit" 
                                class="flex items-center w-full px-4 py-3 text-sm text-green-300 hover:bg-green-700 transition duration-150">
                            <i class="fas fa-sign-out-alt mr-3"></i>
                            Déconnexion
                        </button>
                    </form>
                </div>
            </nav>
        </div>
        
        <!-- Main content -->
        <div class="flex-1 overflow-y-auto">
            <div class="p-8">
                @yield('content')
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    @yield('scripts')
</body>
</html>