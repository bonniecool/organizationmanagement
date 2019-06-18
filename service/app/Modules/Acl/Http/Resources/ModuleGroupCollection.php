<?php

namespace App\Modules\Acl\Http\Resources;

use App\Modules\Acl\Http\Resources\ModuleGroup;
use Damnyan\Cmn\Abstracts\AbstractResourceCollection as ResourceCollection;

class ModuleGroupCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return ModuleGroup::collection($this->collection);
    }
}
