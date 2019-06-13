<?php

namespace App\Modules\Service\Database\Seeds;

use App\Modules\Service\Repositories\ServiceRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::reguard();
        $services = self::getServices();
        foreach ($services as $payload){
            $service = ServiceRepository::whereName($payload['name'])->first();
            if (!$service) {
                ServiceRepository::create($payload);
            }
        }
    }

    public function getServices()
    {
        return [
            [
                'name' => 'Web builder',
                'description' => 'Further Enhancement can be considered',
                'is_active' => 1,
                'code' => str_slug('Web builder')
            ],
            [
                'name' => 'EVE',
                'description' => 'Further Enhancement can be considered',
                'is_active' => 1,
                'code' => str_slug('EVE')
            ],
            [
                'name' => 'DRaaS Asigra',
                'description' => 'w/ API',
                'is_active' => 1,
                'code' => str_slug('DRaaS Asigra')
            ],
            [
                'name' => 'MSH',
                'description' => 'No API but can consider automated ordering',
                'is_active' => 1,
                'code' => str_slug('MSH')
            ],
            [
                'name' => 'STaaS',
                'description' => 'w/ Zadara API and Cisco ACI API',
                'is_active' => 1,
                'code' => str_slug('STaaS')
            ],
            [
                'name' => 'MTS',
                'description' => 'w/ API',
                'is_active' => 1,
                'code' => str_slug('MTS')
            ],
            [
                'name' => 'O365',
                'description' => 'Possible Partner API via Microsoft',
                'is_active' => 1,
                'code' => str_slug('O365')
            ],
            [
                'name' => 'Azure',
                'description' => 'Possible Partner API via ODIN APS',
                'is_active' => 1,
                'code' => str_slug('Azure')
            ]
        ];
    }
}
