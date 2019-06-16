<?php

namespace App\Modules\Acl\Http\Resources;

use App\Modules\Acl\Http\Resources\ModuleGroup;
use Damnyan\Cmn\Abstracts\AbstractResource as Resource;
use App\Modules\Acl\Http\Resources\PermissionCollection;

class Module extends Resource
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
            'code' => $this->code,
            'acl_module_group_code' => $this->acl_module_group_code,
            'name' => $this->name,
            'module_group' => new ModuleGroup($this->whenLoaded('moduleGroup')),
            'permissions' => new PermissionCollection($this->whenLoaded('permissions')),
        ];
    }
}
