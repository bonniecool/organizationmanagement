<?php

namespace App\Modules\Service\Http\Resources;

use App\Modules\Branch\Http\Resources\Branch;
use Damnyan\Cmn\Abstracts\AbstractResource as Resource;
use App\Modules\Organization\Http\Resources\Organization as OrganizationResource;

class ServiceQuestionaire extends Resource
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
            'price' => $this->price,
            'description' => $this->description,
            'image' => $this->image,
            'is_active' => $this->is_active,
            'meta' => $this->questionaires
        ];
    }
}

