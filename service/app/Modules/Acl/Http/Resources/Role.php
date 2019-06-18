<?php

namespace App\Modules\Acl\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class Role extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'permissions' => new PermissionCollection($this->whenLoaded('permissions'))
        ];
    }
}
