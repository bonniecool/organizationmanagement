<?php

namespace App\Modules\User\Http\Resources\Profile;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class SuperAdmin extends Resource
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
            'profile_id' => $this->id,
            'full_name' => $this->full_name,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'mobile_number' => $this->mobile_number,
            'photo' => $this->photo,
        ];
    }
}
