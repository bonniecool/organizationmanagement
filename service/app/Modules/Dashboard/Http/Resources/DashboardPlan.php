<?php

namespace App\Modules\Dashboard\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;
use App\Modules\Subscription\Repositories\PlanRepository;

class DashboardPlan extends Resource
{
    /**
    * Transform the resource into an array.
    *
    * @param \Illuminate\Http\Request
    * @return array
    */
    public function toArray($request)
    {
        $data = [];
        $plans = PlanRepository::all();
        foreach ($plans as $plan) {
            $resource = $this->resource->where('plan_id', $plan->id)->first();
            array_push(
                $data,
                [
                    'label' => $plan->label,
                    'amount' => $resource ? $resource->total :0,
                    'count' => $resource ? $resource->count : 0,
                ]
            );
        }

        return $data;
    }
}
