<?php

namespace App\Modules\Acl\Http\Resources;

use App\Modules\Acl\Http\Resources\Module;
use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class Permission extends Resource
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
            'acl_module_code' => $this->acl_module_code,
            'name' => $this->name,
            'module' => new Module($this->whenLoaded('module')),
        ];
    }
}
