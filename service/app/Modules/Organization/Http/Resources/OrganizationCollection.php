<?php

namespace App\Modules\Organization\Http\Resources;

use App\Modules\Organization\Http\Resources\Organization;
use Damnyan\Cmn\Abstracts\AbstractResourceCollection as ResourceCollection;

class OrganizationCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return Organization::collection($this->collection);
    }
}
