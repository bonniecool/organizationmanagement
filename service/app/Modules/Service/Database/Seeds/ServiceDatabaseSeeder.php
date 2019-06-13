<?php

namespace App\Modules\Service\Database\Seeds;

use Illuminate\Database\Seeder;

class ServiceDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ServiceSeeder::class);
        $this->call(ServiceStageSeeder::class);
    }
}
