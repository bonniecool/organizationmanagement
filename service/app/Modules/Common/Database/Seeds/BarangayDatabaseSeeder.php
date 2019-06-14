<?php

namespace App\Modules\Common\Database\Seeds;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Modules\Common\Models\Barangay;

class BarangayDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Barangay::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $csv = resource_path('db/barangays.csv');

        if (($handle = fopen($csv, "r")) !== false) {
            while (($data = fgetcsv($handle, 1000, ",")) !== false) {
                Barangay::create([
                    'region_code' => $this->padIt($data[0]),
                    'province_code' => $this->padIt($data[1]),
                    'municipality_code' => $this->padIt($data[2]),
                    'code' => $this->padIt($data[3]),
                    'name' => $data[4],
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
