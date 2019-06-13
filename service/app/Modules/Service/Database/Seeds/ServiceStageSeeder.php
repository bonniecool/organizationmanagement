<?php

namespace App\Modules\Service\Database\Seeds;

use App\Modules\Service\Repositories\ServiceRepository;
use App\Modules\Service\Repositories\StageRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class ServiceStageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $services = ServiceRepository::get();
        $stages = self::getStages();
        foreach ($services as $service){
            foreach ($stages as $stage){
                $exists = StageRepository::where('service_id', $service->id)
                    ->where('name', $stage['name'])
                    ->first();
                if(is_null($exists))
                {
                    $serviceStage = StageRepository::create($stage);
                    $serviceStage->service()->associate($service)->save();
                }
            }
        }
    }

    public function getStages()
    {
        return [
            [
                'name' => 'Verification',
                'description' => 'Verify requirements',
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'Capability Assessment',
                'description' => 'Assessment',
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'Billing',
                'description' => 'Issuance of payment.',
                'created_by' => 1,
                'updated_by' => 1,
            ],
        ];
    }
}
