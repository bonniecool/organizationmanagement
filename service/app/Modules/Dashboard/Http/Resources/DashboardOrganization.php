<?php

namespace App\Modules\Dashboard\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;
use App\Modules\Organization\Repositories\OrganizationRepository;

class DashboardOrganization extends Resource
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
        $organizations = OrganizationRepository::all();
        foreach ($organizations as $organization) {
            $resource = $this->resource->where('organization_id', $organization->id)->first();
            array_push(
                $data,
                [
                    'label' => $organization->name,
                    'count' => $resource ? $resource->count : 0,
                ]
            );
        }

        return $data;
    }
}
