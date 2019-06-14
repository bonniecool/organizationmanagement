<?php

namespace App\Modules\Common\Database\Seeds;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Modules\Common\Models\Municipality;

class MunicipalityDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Municipality::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $csv = resource_path('db/municipalities.csv');

        if (($handle = fopen($csv, "r")) !== false) {
            while (($data = fgetcsv($handle, 1000, ",")) !== false) {
                Municipality::create([
                    'region_code' => $this->padIt($data[0]),
                    'province_code' => $this->padIt($data[1]),
                    'code' => $this->padIt($data[2]),
                    'name' => $data[3],
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
