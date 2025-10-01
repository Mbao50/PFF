<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AdminUser;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Créer / mettre à jour les administrateurs par défaut (idempotent)
        AdminUser::updateOrCreate(
            ['email' => 'admin@samafoot.sn'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('admin123'),
                'role' => 'super_admin',
                'is_active' => true,
            ]
        );

        AdminUser::updateOrCreate(
            ['email' => 'editor@samafoot.sn'],
            [
                'name' => 'Admin Editor',
                'password' => Hash::make('editor123'),
                'role' => 'editor',
                'is_active' => true,
            ]
        );

        AdminUser::updateOrCreate(
            ['email' => 'manager@samafoot.sn'],
            [
                'name' => 'Content Manager',
                'password' => Hash::make('manager123'),
                'role' => 'admin',
                'is_active' => true,
            ]
        );

        $this->command->info('Administrateurs créés avec succès !');
        $this->command->info('Super Admin: admin@samafoot.sn / admin123');
        $this->command->info('Editor: editor@samafoot.sn / editor123');
        $this->command->info('Manager: manager@samafoot.sn / manager123');
    }
}
