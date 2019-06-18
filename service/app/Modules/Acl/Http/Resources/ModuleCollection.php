<?php

namespace App\Modules\Acl\Http\Resources;

use App\Modules\Acl\Http\Resources\Module;
use Damnyan\Cmn\Abstracts\AbstractResourceCollection as ResourceCollection;

class ModuleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return Module::collection($this->collection);
    }
}
