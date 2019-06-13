<?php

namespace App\Modules\User\Database\Seeds;

use Illuminate\Database\Seeder;

class UserDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(SuperAdministratorSeeder::class);
        $this->call(AdministratorDatabaseSeeder::class);
//        $this->call(SiteUserSeeder::class);
    }
}
