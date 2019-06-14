<?php

namespace App\Modules\Common\Database\Seeds;

use Illuminate\Database\Seeder;

class CommonDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RegionDatabaseSeeder::class);
        $this->call(ProvinceDatabaseSeeder::class);
        $this->call(MunicipalityDatabaseSeeder::class);
        $this->call(BarangayDatabaseSeeder::class);
    }
}
