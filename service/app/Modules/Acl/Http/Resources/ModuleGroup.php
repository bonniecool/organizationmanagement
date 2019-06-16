<?php

namespace App\Modules\Acl\Http\Resources;

use App\Modules\Acl\Http\Resources\ModuleCollection;
use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class ModuleGroup extends Resource
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
            'name' => $this->name,
            'modules' => new ModuleCollection($this->whenLoaded('modules')),
        ];
    }
}
