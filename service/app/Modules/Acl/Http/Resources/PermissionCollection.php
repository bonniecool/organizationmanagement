<?php

namespace App\Modules\Acl\Http\Resources;

use App\Modules\Acl\Http\Resources\Permission;
use Damnyan\Cmn\Abstracts\AbstractResourceCollection as ResourceCollection;

class PermissionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return Permission::collection($this->collection);
    }
}
