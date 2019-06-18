<?php

namespace App\Modules\Common\Database\Seeds;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Modules\Common\Models\Region;

class RegionDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Region::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $csv = resource_path('db/regions.csv');

        if (($handle = fopen($csv, "r")) !== false) {
            while (($data = fgetcsv($handle, 1000, ",")) !== false) {
                Region::create([
                    'code' => $this->padIt($data[0]),
                    'name' => $data[1],
                ]);
            }
        }
    }

    /**
     * Add padding
     *
     * @param  int  $int
     *
     * @return void
     */
    public function padIt($int)
    {
        return str_pad($int, 9, 0, STR_PAD_LEFT);
    }
}
