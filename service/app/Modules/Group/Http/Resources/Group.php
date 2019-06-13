<?php

namespace App\Modules\Group\Http\Resources;

use App\Modules\Administrator\Http\Resources\CompanyAdministratorProfileCollection;
use App\Modules\User\Http\Resources\Profile\Administrator;
use App\Modules\User\Http\Resources\UserCollection;
use Illuminate\Http\Resources\Json\Resource;

class Group extends Resource
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
            'description' => $this->description,
            'administrators' => new UserCollection($this->administrators)
        ];
    }
}