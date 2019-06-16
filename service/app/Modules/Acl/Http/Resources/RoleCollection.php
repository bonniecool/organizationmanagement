<?php

namespace App\Modules\Acl\Http\Resources;

use App\Modules\Acl\Http\Resources\Role;
use Damnyan\Cmn\Abstracts\AbstractResourceCollection as ResourceCollection;

class RoleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return Role::collection($this->collection);
    }
}
